import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
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
  const [drinkAddedAnimation, setDrinkAddedAnimation] = useState(0);
  const [drinkList, setDrinkList] = useState([]);
  // set the initial date to today so it initially displays today's data
  const [date, setDate] = useState(new Date());

  // const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useState(new Animated.Value(0))[0]; // Makes animated value
  const waterAnim = useState(new Animated.Value(0))[0]; // Makes animated value

  // the blue circle popping animation when user adds a drink
  const animateElement = () => {
    fadeAnim.setValue(0);
    waterAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => fadeAnim.setValue(0));

    Animated.timing(waterAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  // determine the start and end value for the scale css
  const spinDeg = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 6],
  });

  // determine the start and end value for the opacity css
  const opacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const opacityStyle = { transform: [{ scale: spinDeg }], opacity: opacity };

  const userId = auth.currentUser.uid;

  const confetti = useRef(null);

  // get all the drink data from today
  useEffect(() => {
    let totalAmount = 0;

    const dateString = date.toISOString().slice(0, 10);

    getDateData(userId, dateString).then((data) => {
      // if there are drinks in the drink list
      if (data !== undefined) {
        setDrinkList(data.drinks);
        console.log(data.drinks);
        for (const item of data.drinks) {
          totalAmount += item.value;
        }
      } else {
        // if there are NO drinks in the drink list for that date, set it to empty
        setDrinkList([]);
      }

      // get the target amount, if total amount exceeds the target amount, release the confetti
      getSettings(userId).then((data) => {
        if (totalAmount >= data.targetAmount) {
          confetti.current.start();
        }
      });
    });
  }, [date]);

  return (
    <SafeAreaView style={tw`bg-[#121212] flex-1`}>
      <View
        style={{
          zIndex: 9999,
          position: "absolute",
          bottom: 0,
        }}
      >
        <ConfettiCannon
          ref={confetti}
          explosionSpeed={500}
          autoStart={false}
          fadeOut={true}
          count={300}
          origin={{ x: -10, y: 0 }}
        />
      </View>

      <Header setDrinkAdded={setDrinkAdded} />
      <ProgressBar
        userId={userId}
        drinkList={drinkList}
        waterAnim={waterAnim}
        opacityStyle={opacityStyle}
        animateElement={animateElement}
        drinkAdded={drinkAdded}
        drinkAddedAnimation={drinkAddedAnimation}
        date={date}
        setDate={setDate}
      />
      <AddDrink
        userId={userId}
        setDrinkList={setDrinkList}
        drinkList={drinkList}
        setDrinkAdded={setDrinkAdded}
        setDrinkAddedAnimation={setDrinkAddedAnimation}
        date={date}
      />
      <PreviousDrinks
        userId={userId}
        setDrinkList={setDrinkList}
        drinkList={drinkList}
        setDrinkAdded={setDrinkAdded}
        date={date}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
