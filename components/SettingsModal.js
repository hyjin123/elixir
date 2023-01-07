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
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase";

const SettingsModal = ({ modalVisible, setModalVisible }) => {
  const [text, setText] = useState("");

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("LoginScreen");
      })
      .catch((error) => alert(error.message));
  };

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
        <View style={tw`mt-6`}>
          <Text style={tw`text-white text-3xl font-bold`}>Settings</Text>
        </View>
        <View style={tw`justify-between mb-6 mt-6 pt-2`}>
          <Text style={tw`font-bold text-lg text-white`}>
            Daily Target Amount (ml)
          </Text>
          <TouchableOpacity
            onPress={() => inputFocus.current.focus()}
            style={tw`flex-row justify-between items-center border-2 rounded-xl border-white mt-3`}
          >
            <View style={tw`p-3`}>
              <TextInput
                ref={inputFocus}
                onChangeText={(newText) => setText(newText)}
                value={text}
                color="white"
              />
            </View>
          </TouchableOpacity>
          <Text style={tw`mt-3 text-xs text-white`}>
            The U.S. National Academies of Sciences, Engineering, and Medicine
            suggests about 3.7 l of fluids a day for men and 2.7 l for women.
          </Text>
        </View>

        {/* Buttons */}
        <View style={tw`flex-row justify-evenly items-center my-6`}>
          <TouchableOpacity
            style={tw`rounded-xl py-3 px-4 bg-[#0099ff] w-18 items-center`}
          >
            <Text style={tw`text-white`}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`rounded-xl py-3 px-4 bg-[#eb4034] w-22 items-center`}
          >
            <Text style={tw`text-white`}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SettingsModal;
