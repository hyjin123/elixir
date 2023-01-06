import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Modal from "react-native-modal";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { getSettings } from "../utils/getSettings";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const ChooseCupModal = ({
  userId,
  modalVisible,
  setModalVisible,
  selectedCup,
  setSelectedCup,
}) => {
  const [nameText, setNameText] = useState("");
  const [amountText, setAmountText] = useState("");
  const [sizeOptions, setSizeOptions] = useState();

  // used to focus on the text input if the user pressed on the box
  const nameFocus = useRef(null);
  const amountFocus = useRef(null);

  const handleClose = () => {
    setModalVisible(false);
    setAmountText("");
    setNameText("");
  };

  const handleSelection = async (selectedItem) => {
    // change the home screen UI to the selected cup size
    setSelectedCup(selectedItem);
    // close the modal once cup option is selected
    setModalVisible(false);
    // set the new cup size setting in the firestore database
    await setDoc(
      doc(db, "users", userId),
      {
        sizeSetting: selectedItem,
      },
      { merge: true }
    );
  };

  useEffect(() => {
    getSettings(userId).then((data) => {
      // save the size settings and current size option for this user
      setSelectedCup(data.sizeSetting);
      setSizeOptions(data.sizeOptions);
    });
  }, []);

  const mappedData = () => {
    return sizeOptions?.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleSelection(item.name)}
        style={tw`flex-row justify-between w-full pt-6`}
      >
        <Text
          style={tw`font-medium text-base ${
            selectedCup === item.name ? "text-[#0099ff]" : "text-white"
          }`}
        >
          {item.name}
        </Text>
        <Text
          style={tw`font-medium text-base ${
            selectedCup === item.name ? "text-[#0099ff]" : "text-white"
          }`}
        >
          {item.value} ml
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={handleClose}
      backdropColor="#383838"
      avoidKeyboard={true}
    >
      <View style={tw`bg-black my-40 mx-1 px-6 py-3 rounded-xl`}>
        {/* all the cup size options */}
        <ScrollView>{mappedData()}</ScrollView>
        <View style={tw`justify-between mb-6 mt-12 pt-2`}>
          <Text style={tw`font-bold text-lg text-white`}>Create your own</Text>
          <View
            style={tw`flex-row justify-between items-center border-2 rounded-xl border-white mt-3`}
          >
            <TouchableOpacity
              onPress={() => nameFocus.current.focus()}
              style={tw`flex-row flex-1 items-center h-full p-3`}
            >
              <TextInput
                ref={nameFocus}
                onChangeText={(newText) => setNameText(newText)}
                value={nameText}
                placeholder="Name"
                placeholderTextColor="gray"
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => amountFocus.current.focus()}
              style={tw`flex-row flex-2 items-center h-full justify-end`}
            >
              <TextInput
                ref={amountFocus}
                onChangeText={(newText) => setAmountText(newText)}
                value={amountText}
                placeholder="300"
                placeholderTextColor="gray"
                color="white"
              />
              <Text style={tw`text-white mr-4`}> ml</Text>
              <TouchableOpacity style={tw`p-3`}>
                <Ionicons name="add-circle" size={24} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChooseCupModal;
