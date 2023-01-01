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
        <Text style={tw`text-white font-semibold text-xl`}>
          What did you drink today?
        </Text>
      </View>
      <View style={tw`flex-row justify-center mt-3`}>
        <View style={tw`flex-1`}>
          <TouchableOpacity
            style={tw`flex-row justify-between border-2 border-white mb-3 px-2 py-3 rounded-xl`}
          >
            <View style={tw`flex-row`}>
              <MaterialCommunityIcons
                name="cup-outline"
                size={24}
                color="white"
              />
              <Text style={tw`text-white`}>Normal Cup</Text>
            </View>
            <View>
              <ChevronDownIcon color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row justify-between border-2 border-white px-2 py-3 rounded-xl`}
          >
            <View style={tw`flex-row`}>
              <Ionicons name="water-outline" size={32} color="white" />
              <Text style={tw`text-white`}>Water</Text>
            </View>
            <View>
              <ChevronDownIcon color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tw`border-2 border-white ml-3 justify-center px-2 py-3 rounded-xl`}
        >
          <Entypo name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddDrink;
