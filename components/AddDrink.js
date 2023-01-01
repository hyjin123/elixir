import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const AddDrink = () => {
  return (
    <View style={tw`mt-15 justify-center items-center mx-5`}>
      <View>
        <Text style={tw`text-white font-bold text-lg`}>
          What did you drink today?
        </Text>
      </View>
      <View style={tw`flex-row justify-center mt-3`}>
        <View style={tw`flex-1`}>
          <TouchableOpacity
            style={tw`flex-row justify-between bg-[#282929] mb-3 px-3 py-4 rounded-xl`}
          >
            <View style={tw`flex-row items-center`}>
              <MaterialCommunityIcons
                name="cup-outline"
                size={24}
                color="white"
              />
              <Text style={tw`text-white text-lg ml-2 font-semibold`}>
                Normal Cup
              </Text>
            </View>
            <View style={tw`justify-center`}>
              <ChevronDownIcon color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row justify-between bg-[#282929] px-3 py-4 rounded-xl`}
          >
            <View style={tw`flex-row items-center`}>
              <Ionicons name="water-outline" size={24} color="white" />
              <Text style={tw`text-white text-lg ml-2 font-semibold`}>
                Water
              </Text>
            </View>
            <View style={tw`justify-center`}>
              <ChevronDownIcon color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tw`bg-[#0099ff] ml-3 justify-center px-4 py-3 rounded-xl`}
        >
          <Entypo name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddDrink;
