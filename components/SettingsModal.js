import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Modal from "react-native-modal";
import tw from "twrnc";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { getSettings } from "../utils/getSettings";
import { XMarkIcon } from "react-native-heroicons/solid";

const SettingsModal = ({ modalVisible, setModalVisible, setDrinkAdded }) => {
  const [text, setText] = useState("");
  // this is used to persist the original target amount (ex, if user changes target amount field but does not save)
  const [targetAmount, setTargetAmount] = useState("");
  // used to re-run the useEffect when target amount changes
  const [targetChange, setTargetChange] = useState(0);

  // navigation
  const navigation = useNavigation();

  // used to focus on the text input if the user pressed on the box
  const inputFocus = useRef(null);

  // get user ID
  const userId = auth.currentUser.uid;

  useEffect(() => {
    getSettings(userId).then((data) => {
      // convert from number to string (as TextInput only accepts string)
      const targetAmountText = data.targetAmount.toString();
      // save the target amount
      setTargetAmount(targetAmountText);
      setText(targetAmountText);
    });
  }, [targetChange]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("LoginScreen");
      })
      .catch((error) => alert(error.message));
  };

  const handleClose = () => {
    setModalVisible(false);
    // if a user closes the modal without saving, the text input field reverts back to original target amount
    setText(targetAmount);
  };

  // handle when a user submits new daily target amount
  const handleTargetChange = async () => {
    // change the target amount text to integer
    const amount = parseInt(text, 10);

    // update the target amount in the database
    await setDoc(
      doc(db, "users", userId),
      {
        targetAmount: amount,
      },
      { merge: true }
    );

    // close the modal after adding to database is successful
    setModalVisible(false);

    // used to re-run useEffect
    setTargetChange((current) => current + 1);

    // used to re-render the app
    setDrinkAdded((current) => current + 1);
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={handleClose}
      backdropColor="#383838"
      avoidKeyboard={true}
    >
      <View style={tw`bg-black my-40 mx-1 px-6 py-3 rounded-xl`}>
        <TouchableOpacity
          onPress={handleClose}
          style={tw`absolute -top-8 right-2`}
        >
          <XMarkIcon color="#D3D3D3" size={23} />
        </TouchableOpacity>

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
                // this allows the user to only have access to numbers and not characters
                keyboardType="number-pad"
              />
            </View>
          </TouchableOpacity>
          <Text style={tw`mt-3 text-xs text-white`}>
            The U.S. National Academies of Sciences, Engineering, and Medicine
            suggests about 3.7 litre of fluids a day for men and 2.7 litre for
            women.
          </Text>
        </View>

        {/* Buttons */}
        <View style={tw`flex-row justify-evenly items-center my-6`}>
          <TouchableOpacity
            onPress={handleTargetChange}
            style={tw`rounded-xl py-3 px-4 bg-[#0099ff] w-18 items-center`}
          >
            <Text style={tw`text-white`}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignOut}
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
