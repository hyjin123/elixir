import { View, Text, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import PreviousDrinks from "../components/PreviousDrinks";
import AddDrink from "../components/AddDrink";
import tw from "twrnc";
import { auth } from "../firebase";
import { getDateData } from "../utils/getDateData";
import ConfettiCannon from "react-native-confetti-cannon";
import { getSettings } from "../utils/getSettings";

const HomeScreen = () => {
  // use this state to re-render previous drinks if a drink is added
  const [drinkAdded, setDrinkAdded] = useState(0);
  const [drinkList, setDrinkList] = useState([]);
  const spinValue = useState(new Animated.Value(0))[0]; // Makes animated value

  const confetti = useRef(null);
  const animate = useRef(null);

  const userId = auth.currentUser.uid;

  const animation = () => {
    animate.current.pulse();
  };

  // get all the drink data from today
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    getDateData(userId, today).then((data) => {
      setDrinkList(data.drinks);
      let totalAmount = 0;
      for (const item of data.drinks) {
        totalAmount += item.value;
      }

      // get the target amount, if total amount exceeds the target amount, release the confetti
      getSettings(userId).then((data) => {
        if (totalAmount >= data.targetAmount) {
          confetti.current.start();
        }
      });
    });
  }, [drinkAdded]);

  return (
    <SafeAreaView style={tw`bg-[#121212] flex-1`}>
      <View style={{ zIndex: 9999, position: "absolute", bottom: 0 }}>
        <ConfettiCannon
          ref={confetti}
          explosionSpeed={500}
          autoStart={false}
          fadeOut={true}
          count={300}
          origin={{ x: -10, y: 0 }}
        />
      </View>

      <Header />
      <ProgressBar userId={userId} drinkList={drinkList} animate={animate} />
      <AddDrink
        userId={userId}
        setDrinkAdded={setDrinkAdded}
        animation={animation}
      />
      <PreviousDrinks drinkList={drinkList} />
    </SafeAreaView>
  );
};

export default HomeScreen;
