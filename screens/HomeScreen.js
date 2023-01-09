import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import PreviousDrinks from "../components/PreviousDrinks";
import AddDrink from "../components/AddDrink";
import tw from "twrnc";
import { auth } from "../firebase";
import { getDateData } from "../utils/getDateData";

const HomeScreen = () => {
  // use this state to re-render previous drinks if a drink is added
  const [drinkAdded, setDrinkAdded] = useState(0);
  const [drinkList, setDrinkList] = useState([]);

  const userId = auth.currentUser.uid;

  // get all the drink data from today
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    getDateData(userId, today).then((data) => {
      setDrinkList(data.drinks);
    });
  }, [drinkAdded]);

  return (
    <SafeAreaView style={tw`bg-[#121212] flex-1`}>
      <Header />
      <ProgressBar userId={userId} drinkList={drinkList} />
      <AddDrink userId={userId} setDrinkAdded={setDrinkAdded} />
      <PreviousDrinks drinkList={drinkList} />
    </SafeAreaView>
  );
};

export default HomeScreen;
