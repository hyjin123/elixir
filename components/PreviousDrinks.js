import {
  View,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import { getDateData } from "../utils/getDateData";

const PreviousDrinks = ({ userId }) => {
  const [toggle, setToggle] = useState(null);
  const spinValue = useState(new Animated.Value(0))[0]; // Makes animated value
  const [drinkList, setDrinkList] = useState([]);

  // toggle animation
  const onPressIn = () => {
    // this sets the spin value to 0 always before starting animation
    spinValue.setValue(0);

    Animated.timing(spinValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
    }).start();

    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  let spinDeg;
  // spinDeg will be between '0deg' and '360deg' based on what spinValue is
  if (toggle === false) {
    spinDeg = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["180deg", "0deg"],
    });
  } else if (toggle) {
    spinDeg = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });
  }

  const animatedScaleStyle = {
    transform: [{ rotate: spinDeg }],
  };

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    getDateData(userId, today).then((data) => {
      console.log("this is data", data);
      setDrinkList(data.drinks);
    });
  }, []);

  // dummy data for previous drinks
  const data = [{ value: "Small Cup of Water" }];

  const mappedData = () => {
    if (toggle) {
      return drinkList?.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={tw`flex-row justify-between w-full pt-6`}
        >
          <Text style={tw`font-medium text-base text-white`}>
            {item.name} of {item.type}
          </Text>
        </TouchableOpacity>
      ));
    }
  };

  return (
    <SafeAreaView style={tw`h-22% mt-8 mx-5`}>
      <View style={tw`flex-row justify-between`}>
        <View>
          <Text style={tw`text-white font-bold text-lg`}>
            Drinks you had today
          </Text>
        </View>
        <TouchableOpacity onPress={onPressIn}>
          {toggle === null ? (
            <View>
              <ChevronDownIcon color="white" />
            </View>
          ) : (
            <Animated.View style={animatedScaleStyle}>
              <ChevronDownIcon color="white" />
            </Animated.View>
          )}
        </TouchableOpacity>
      </View>
      <ScrollView>{mappedData()}</ScrollView>
    </SafeAreaView>
  );
};

export default PreviousDrinks;
