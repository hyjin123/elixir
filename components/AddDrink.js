import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import ChooseSizeModal from "./ChooseSizeModal";
import ChooseTypeModal from "./ChooseTypeModal";
import { db } from "../firebase";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

const AddDrink = ({ userId, setDrinkAdded, setDrinkAddedAnimation, date }) => {
  const [cupModalVisible, setCupModalVisible] = useState(false);
  const [typeModalVisible, setTypeModalVisible] = useState(false);

  // used to keep track of selected size of drink
  const [selectedSizeName, setSelectedSizeName] = useState("Medium Cup");
  const [selectedSizeAmount, setSelectedSizeAmount] = useState(300);
  // used to keep track of selected type of drink
  const [selectedType, setSelectedType] = useState("Water");

  const handleAdd = async () => {
    // this triggers the water, popping, and number counter animation as soon as the button is clicked
    setDrinkAddedAnimation((current) => current + 1);

    const dateString = date.toISOString().slice(0, 10);

    // check if there is dates collection for today's date yet
    const todayData = await getDoc(
      doc(db, "users", userId, "dates", dateString)
    );

    const docRef = doc(db, "users", userId, "dates", dateString);

    // if there is already data for today, add to the existing drinks array
    if (todayData.data()) {
      await updateDoc(doc(db, "users", userId, "dates", dateString), {
        drinks: arrayUnion({
          type: selectedType,
          name: selectedSizeName,
          value: selectedSizeAmount,
          timestamp: new Date(),
        }),
      });
    } else {
      // if there is no data for today yet, create a new date in the dates collection and add the drink
      await setDoc(
        docRef,
        {
          date: dateString,
          drinks: [
            {
              type: selectedType,
              name: selectedSizeName,
              value: selectedSizeAmount,
              timestamp: new Date(),
            },
          ],
        },
        { merge: true }
      );
    }
    // used to render previous drink component when a new drink is added, this needs to go in the end, if not, the first drink wont be counted
    setDrinkAdded((current) => current + 1);
  };

  return (
    <View style={tw`mt-12 justify-center items-start mx-5`}>
      {/* Modal - Choose Size of Drink*/}
      <ChooseSizeModal
        userId={userId}
        modalVisible={cupModalVisible}
        setModalVisible={setCupModalVisible}
        selectedSizeName={selectedSizeName}
        setSelectedSizeName={setSelectedSizeName}
        selectedSizeAmount={selectedSizeAmount}
        setSelectedSizeAmount={setSelectedSizeAmount}
      />
      {/* Modal - Choose Type of Drink*/}
      <ChooseTypeModal
        userId={userId}
        modalVisible={typeModalVisible}
        setModalVisible={setTypeModalVisible}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <View>
        <Text style={tw`text-white font-bold text-lg`}>
          What did you drink today?
        </Text>
      </View>
      <View style={tw`flex-row justify-center mt-3`}>
        <View style={tw`flex-1`}>
          <TouchableOpacity
            onPress={() => setCupModalVisible(true)}
            style={tw`flex-row justify-between bg-[#282929] mb-3 px-3 py-4 rounded-xl`}
          >
            <View style={tw`flex-row items-center`}>
              <MaterialCommunityIcons
                name="cup-outline"
                size={24}
                color="white"
              />
              <Text style={tw`text-white text-lg ml-2 font-semibold`}>
                {selectedSizeName}
              </Text>
            </View>
            <View style={tw`justify-center`}>
              <ChevronDownIcon color="#bcc4c4" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTypeModalVisible(true)}
            style={tw`flex-row justify-between bg-[#282929] px-3 py-4 rounded-xl`}
          >
            <View style={tw`flex-row items-center`}>
              <Ionicons name="water-outline" size={24} color="white" />
              <Text style={tw`text-white text-lg ml-2 font-semibold`}>
                {selectedType}
              </Text>
            </View>
            <View style={tw`justify-center`}>
              <ChevronDownIcon color="#bcc4c4" />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleAdd}
          style={tw`bg-[#0099ff] ml-3 justify-center px-4 py-3 rounded-xl`}
        >
          <Entypo name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddDrink;
