import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { ChevronDownIcon } from "react-native-heroicons/solid";

const PreviousDrinks = () => {
  return (
    <View style={tw`mt-10 flex-row justify-between items-start mx-5`}>
      <View>
        <Text style={tw`text-white font-bold text-lg`}>
          Drinks you had today
        </Text>
      </View>
      <ChevronDownIcon color="white" />
    </View>
  );
};

export default PreviousDrinks;
