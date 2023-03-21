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

const ChooseTypeModal = ({
  userId,
  modalVisible,
  setModalVisible,
  selectedType,
  setSelectedType,
}) => {
  const [text, setText] = useState("");
  const [typeOptions, setTypeOptions] = useState();
  // this state is used to run the "useEffect", whenever number of types is changed (Ex. when a new type is added)
  const [numberOfAddedOptions, setNumberOfAddedOptions] = useState(0);

  // used to focus on the text input if the user pressed on the box
  const inputFocus = useRef(null);
  const scrollFlash = useRef(null);

  // when a user clicks on the down scroll icon
  const handleDownScroll = () => {
    scrollFlash.current.scrollToEnd();
    // flash the scroll bar to let user know you can scroll up and down
    scrollFlash.current.flashScrollIndicators();
  };

  const handleClose = () => {
    setModalVisible(false);
    setText("");
  };

  // / when a user selects a new option
  const handleSelection = async (selectedItem) => {
    // change the home screen UI to the selected cup size
    setSelectedType(selectedItem);
    // close the modal once cup option is selected
    setModalVisible(false);
    // set the new type setting in the firestore database
    await setDoc(
      doc(db, "users", userId),
      {
        typeSetting: selectedItem,
      },
      { merge: true }
    );
  };

  // when a user enters a custom type of drink
  const handleCustomCreation = async () => {
    // add new type of drink in the existing array in firestore
    await updateDoc(doc(db, "users", userId), {
      typeOptions: arrayUnion({ value: text }),
    });

    // update the chosen type setting to this particular custom type (UI and the database)
    setSelectedType(text);
    await setDoc(
      doc(db, "users", userId),
      {
        typeSetting: text,
      },
      { merge: true }
    );

    // close the modal after adding to database is successful
    setModalVisible(false);
    setText("");

    // add to the count of options so useEffect can be run again
    setNumberOfAddedOptions((current) => current + 1);
  };

  useEffect(() => {
    getSettings(userId).then((data) => {
      // save the initial/current size settings size options (from the database) for this user
      setSelectedType(data.typeSetting);
      setTypeOptions(data.typeOptions);
    });
  }, [numberOfAddedOptions]);

  const mappedData = () => {
    return typeOptions?.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleSelection(item.value)}
        style={tw`flex-row justify-between w-full pt-6`}
      >
        <Text
          style={tw`font-medium text-base ${
            selectedType === item.value ? "text-[#0099ff]" : "text-white"
          }`}
        >
          {item.value}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={handleClose}
      backdropColor="#383838"
      backdropOpacity={0.95}
      avoidKeyboard={true}
    >
      <View style={tw`bg-black my-40 py-3 rounded-xl h-65%`}>
        {/* display all the types of drinks for this user */}
        <TouchableOpacity
          onPress={handleClose}
          style={tw`absolute -top-8 right-2`}
        >
          <XMarkIcon color="#D3D3D3" size={23} />
        </TouchableOpacity>
        <ScrollView ref={scrollFlash} style={tw`px-4 mx-2 flex-1`}>
          {mappedData()}
        </ScrollView>
        {typeOptions?.length > 7 ? (
          <TouchableOpacity onPress={handleDownScroll} style={tw`items-center`}>
            <ChevronDoubleDownIcon size={20} color="gray" />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <View style={tw`justify-between mb-6 mt-3 pt-2 px-6`}>
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
            <TouchableOpacity
              onPress={handleCustomCreation}
              style={tw`flex-row p-3`}
            >
              <Ionicons name="add-circle" size={24} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChooseTypeModal;
