import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import ChooseCupModal from "./ChooseCupModal";
import ChooseTypeModal from "./ChooseTypeModal";
import { auth, db } from "../firebase";

const AddDrink = () => {
  const [cupModalVisible, setCupModalVisible] = useState(false);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  // used to keep track of selected size of drink
  const [selectedCup, setSelectedCup] = useState("Medium Cup");
  // used to keep track of selected type of drink
  const [selectedType, setSelectedType] = useState("Water");

  const userId = auth.currentUser.uid;

  return (
    <View style={tw`mt-15 justify-center items-start mx-5`}>
      {/* Modal - Choose Size of Drink*/}
      <ChooseCupModal
        userId={userId}
        modalVisible={cupModalVisible}
        setModalVisible={setCupModalVisible}
        selectedCup={selectedCup}
        setSelectedCup={setSelectedCup}
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
                {selectedCup}
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
          style={tw`bg-[#0099ff] ml-3 justify-center px-4 py-3 rounded-xl`}
        >
          <Entypo name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddDrink;
