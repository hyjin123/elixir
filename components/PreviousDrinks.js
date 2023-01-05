import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { ChevronDownIcon } from "react-native-heroicons/solid";

const PreviousDrinks = () => {
  const [toggle, setToggle] = useState(false);
  const spinValue = useState(new Animated.Value(0))[0]; // Makes animated value

  const onPressIn = () => {
    Animated.spring(spinValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    // spinValue.setValue(0);
    setToggle((current) => !current);
  };

  let spinDeg;
  // spinDeg will be between '0deg' and '360deg' based on what spinValue is
  if (toggle === false) {
    spinDeg = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });
  } else {
    spinDeg = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["180deg", "0deg"],
    });
  }

  const animatedScaleStyle = {
    transform: [{ rotate: spinDeg }],
  };

  return (
    <View style={tw`mt-10 flex-row justify-between items-start mx-5`}>
      <View>
        <Text style={tw`text-white font-bold text-lg`}>
          Drinks you had today
        </Text>
      </View>
      <TouchableOpacity onPress={onPressIn}>
        <Animated.View style={animatedScaleStyle}>
          <ChevronDownIcon color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default PreviousDrinks;
