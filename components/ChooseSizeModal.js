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
import { XMarkIcon, ChevronDoubleDownIcon } from "react-native-heroicons/solid";
import { getSettings } from "../utils/getSettings";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

const ChooseSizeModal = ({
  userId,
  modalVisible,
  setModalVisible,
  selectedSizeName,
  setSelectedSizeName,
  selectedSizeAmount,
  setSelectedSizeAmount,
}) => {
  const [nameText, setNameText] = useState("");
  const [amountText, setAmountText] = useState("");
  const [sizeOptions, setSizeOptions] = useState();
  // this state is used to run the "useEffect", whenever number of cup sizes options is changed (Ex. when a new size is added)
  const [numberOfAddedOptions, setNumberOfAddedOptions] = useState(0);

  // used to focus on the text input if the user pressed on the box
  const nameFocus = useRef(null);
  const amountFocus = useRef(null);
  const scrollFlash = useRef(null);

  // when a user clicks on the down scroll icon
  const handleDownScroll = () => {
    scrollFlash.current.scrollToEnd();
    // flash the scroll bar to let user know you can scroll up and down
    scrollFlash.current.flashScrollIndicators();
  };

  const handleClose = () => {
    setModalVisible(false);
    setAmountText("");
    setNameText("");
  };

  // when a user selects a new cup size option
  const handleSelection = async (selectedItem, selectedItemAmount) => {
    // change the home screen UI to the selected cup size
    setSelectedSizeName(selectedItem);
    setSelectedSizeAmount(selectedItemAmount);
    // close the modal once cup option is selected
    setModalVisible(false);
    // set the new cup size setting in the firestore database
    await setDoc(
      doc(db, "users", userId),
      {
        sizeSetting: selectedItem,
        sizeSettingAmount: selectedItemAmount,
      },
      { merge: true }
    );
  };

  // when a user enters a custom size of drink
  const handleCustomCreation = async () => {
    // convert amount to integer before updating database
    // add new size of drink in the existing array in firestore
    const amount = parseInt(amountText, 10);

    await updateDoc(doc(db, "users", userId), {
      sizeOptions: arrayUnion({ name: nameText, value: amount }),
    });

    // update the chosen size setting to this particular custom size (UI and the database)
    setSelectedSizeName(nameText);
    await setDoc(
      doc(db, "users", userId),
      {
        sizeSetting: nameText,
        sizeSettingAmount: amount,
      },
      { merge: true }
    );

    // close the modal after adding to database is successful
    setModalVisible(false);
    setAmountText("");
    setNameText("");

    // add to the count of options so useEffect can be run again
    setNumberOfAddedOptions((current) => current + 1);
  };

  useEffect(() => {
    getSettings(userId).then((data) => {
      // save the size settings and current size option for this user
      setSelectedSizeName(data.sizeSetting);
      setSelectedSizeAmount(data.sizeSettingAmount);
      setSizeOptions(data.sizeOptions);
    });
  }, [numberOfAddedOptions]);

  const mappedData = () => {
    return sizeOptions?.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleSelection(item.name, item.value)}
        style={tw`flex-row justify-between w-full pt-6`}
      >
        <Text
          style={tw`font-medium text-base ${
            selectedSizeName === item.name ? "text-[#0099ff]" : "text-white"
          }`}
        >
          {item.name}
        </Text>
        <Text
          style={tw`font-medium text-base ${
            selectedSizeName === item.name ? "text-[#0099ff]" : "text-white"
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
      <View style={tw`bg-black my-40 py-3 rounded-xl h-65%`}>
        <TouchableOpacity
          onPress={handleClose}
          style={tw`absolute -top-8 right-2`}
        >
          <XMarkIcon color="#D3D3D3" size={23} />
        </TouchableOpacity>
        {/* all the cup size options */}
        <ScrollView ref={scrollFlash} style={tw`px-4 mx-2 flex-1`}>
          {mappedData()}
        </ScrollView>
        {sizeOptions?.length > 7 ? (
          <TouchableOpacity onPress={handleDownScroll} style={tw`items-center`}>
            <ChevronDoubleDownIcon size={20} color="gray" />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <View style={tw`justify-between mb-6 mt-3 pt-2 px-6`}>
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
                // this allows the user to only have access to numbers and not characters
                keyboardType="number-pad"
              />
              <Text style={tw`text-white mr-4`}> ml</Text>
              <TouchableOpacity onPress={handleCustomCreation} style={tw`p-3`}>
                <Ionicons name="add-circle" size={24} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChooseSizeModal;
