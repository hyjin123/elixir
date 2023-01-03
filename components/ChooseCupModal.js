import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

const ChooseCupModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      backdropColor="#383838"
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
            style={tw`flex-row justify-between border-2 rounded-xl border-white p-3 mt-3`}
          >
            <View>
              <Text style={tw`font-bold text-lg text-white`}>Name</Text>
            </View>
            <View style={tw`flex-row`}>
              <Text style={tw`font-bold text-lg text-white pr-2`}>300 ml</Text>
              <Ionicons name="add-circle" size={24} color="white" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChooseCupModal;
