import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import PreviousDrinks from "../components/PreviousDrinks";
import AddDrink from "../components/AddDrink";
import tw from "twrnc";

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-[#121212] flex-1`}>
      <Header />
      <ProgressBar />
      <AddDrink />
    </SafeAreaView>
  );
};

export default HomeScreen;
