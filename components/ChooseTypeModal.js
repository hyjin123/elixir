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

const ChooseTypeModal = ({
  modalVisible,
  setModalVisible,
  selectedType,
  setSelectedType,
}) => {
  const [text, setText] = useState("");

  // used to focus on the text input if the user pressed on the box
  const inputFocus = useRef(null);

  const handleClose = () => {
    setModalVisible(false);
    setText("");
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
            <Text style={tw`font-medium text-base text-white`}>Water</Text>
          </View>
          <View style={tw`flex-row justify-between w-full pt-6`}>
            <Text style={tw`font-medium text-base text-white`}>Tea</Text>
          </View>
          <View style={tw`flex-row justify-between w-full pt-6`}>
            <Text style={tw`font-medium text-base text-white`}>Coffee</Text>
          </View>
          <View style={tw`flex-row justify-between w-full pt-6`}>
            <Text style={tw`font-medium text-base text-white`}>Soft Drink</Text>
          </View>
          <View style={tw`flex-row justify-between w-full pt-6`}>
            <Text style={tw`font-medium text-base text-white`}>Beer</Text>
          </View>
          <View style={tw`flex-row justify-between w-full pt-6`}>
            <Text style={tw`font-medium text-base text-white`}>Cocktail</Text>
          </View>

          <View style={tw`flex-row justify-between w-full pt-6`}>
            <Text style={tw`font-medium text-base text-white`}>Wine</Text>
          </View>
        </ScrollView>
        <View style={tw`justify-between mb-6 mt-12 pt-2`}>
          <Text style={tw`font-bold text-lg text-white`}>Create your own</Text>
          <TouchableOpacity
            onPress={() => inputFocus.current.focus()}
            style={tw`flex-row justify-between items-center border-2 rounded-xl border-white mt-3`}
          >
            <View style={tw`p-3`}>
              <TextInput
                ref={inputFocus}
                onChangeText={(newText) => setText(newText)}
                value={text}
                placeholder="Name"
                placeholderTextColor="gray"
                color="white"
              />
            </View>
            <TouchableOpacity style={tw`flex-row p-3`}>
              <Ionicons name="add-circle" size={24} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChooseTypeModal;
