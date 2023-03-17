import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Modal from "react-native-modal";
import tw from "twrnc";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { getSettings } from "../utils/getSettings";
import { XMarkIcon } from "react-native-heroicons/solid";

const ChartModal = ({ chartsModalVisible, setChartsModalVisible }) => {
  const handleClose = () => {
    setChartsModalVisible(false);
  };

  return (
    <Modal
      isVisible={chartsModalVisible}
      onBackdropPress={handleClose}
      backdropColor="#383838"
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
        </View>

        {/* Buttons */}
        <View style={tw`flex-row justify-evenly items-center my-6`}>
          <TouchableOpacity
            style={tw`rounded-xl py-3 px-4 bg-[#0099ff] w-18 items-center`}
          >
            <Text style={tw`text-white`}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChartModal;
