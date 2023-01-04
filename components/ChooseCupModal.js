import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useRef } from "react";
import Modal from "react-native-modal";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

const ChooseCupModal = ({
  modalVisible,
  setModalVisible,
  selectedCup,
  setSelectedCup,
}) => {
  const [nameText, setNameText] = useState("");
  const [amountText, setAmountText] = useState("");

  // used to focus on the text input if the user pressed on the box
  const nameFocus = useRef(null);
  const amountFocus = useRef(null);

  const handleClose = () => {
    setModalVisible(false);
    setAmountText("");
    setNameText("");
  };

  const handleSelection = (selectedItem) => {
    // change the home screen UI to the selected cup size
    setSelectedCup(selectedItem);
    // close the modal once cup option is selected
    setModalVisible(false);
  };

  // dummy data
  const data = [
    { name: "Small Cup", value: "200" },
    { name: "Medium Cup", value: "300" },
    { name: "Large Cup", value: "400" },
    { name: "Small Bottle", value: "500" },
    { name: "Medium Bottle", value: "1000" },
    { name: "Large Bottle", value: "1500" },
  ];

  const mappedData = () => {
    return data.map((item, index) => (
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
