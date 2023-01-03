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

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={handleClose}
      backdropColor="#383838"
      avoidKeyboard={true}
    >
      <View style={tw`bg-black my-40 mx-1 px-6 py-3 rounded-xl`}>
        <ScrollView>
          <View style={tw`flex-row justify-between w-full pt-6`}>
            <Text style={tw`font-medium text-base text-white`}>Small Cup</Text>
            <Text style={tw`font-medium text-base text-white`}>200 ml</Text>
          </View>
          <View style={tw`flex-row justify-between w-full pt-6`}>
            <Text style={tw`font-medium text-base text-white`}>Medium Cup</Text>
            <Text style={tw`font-medium text-base text-white`}>300 ml</Text>
          </View>
          <View style={tw`flex-row justify-between w-full pt-6`}>
            <Text style={tw`font-medium text-base text-white`}>Large Cup</Text>
            <Text style={tw`font-medium text-base text-white`}>400 ml</Text>
          </View>
          <View style={tw`flex-row justify-between w-full pt-6`}>
            <Text style={tw`font-medium text-base text-white`}>
              Small Bottle
            </Text>
            <Text style={tw`font-medium text-base text-white`}>500 ml</Text>
          </View>
          <View style={tw`flex-row justify-between w-full pt-6`}>
            <Text style={tw`font-medium text-base text-white`}>
              Medium Bottle
            </Text>
            <Text style={tw`font-medium text-base text-white`}>1000 ml</Text>
          </View>
          <View style={tw`flex-row justify-between w-full pt-6`}>
            <Text style={tw`font-medium text-base text-white`}>
              Large Bottle
            </Text>
            <Text style={tw`font-medium text-base text-white`}>1500 ml</Text>
          </View>
        </ScrollView>
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
              style={tw`flex-row flex-1 items-center h-full justify-end`}
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
