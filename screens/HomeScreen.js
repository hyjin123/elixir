import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import PreviousDrinks from "../components/PreviousDrinks";
import AddDrink from "../components/AddDrink";
import tw from "twrnc";
import { auth } from "../firebase";

const HomeScreen = () => {
  const userId = auth.currentUser.uid;

  return (
    <SafeAreaView style={tw`bg-[#121212] flex-1`}>
      <Header />
      <ProgressBar />
      <AddDrink userId={userId} />
      <PreviousDrinks userId={userId} />
    </SafeAreaView>
  );
};

export default HomeScreen;
