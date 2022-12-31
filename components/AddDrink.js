import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/solid";
import tw from "twrnc";

const AddDrink = () => {
  return (
    <View>
      <View>
        <Text style={tw`text-white`}>AddDrink</Text>
      </View>
      <View>
        <View>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddDrink;
