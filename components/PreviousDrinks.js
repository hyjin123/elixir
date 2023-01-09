import {
  View,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import tw from "twrnc";
import {
  ChevronDownIcon,
  ChevronDoubleDownIcon,
} from "react-native-heroicons/solid";
import TimeAgo from "react-native-timeago";

const PreviousDrinks = ({ drinkList }) => {
  const [toggle, setToggle] = useState(null);
  const spinValue = useState(new Animated.Value(0))[0]; // Makes animated value

  const scrollFlash = useRef(null);

  // when a user clicks on the down scroll icon
  const handleDownScroll = () => {
    scrollFlash.current.scrollToEnd();
    // flash the scroll bar to let user know you can scroll up and down
    scrollFlash.current.flashScrollIndicators();
  };

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

  const mappedData = () => {
    if (toggle) {
      return drinkList?.map((item, index) => (
        <TouchableOpacity key={index} style={tw`justify-between w-full pt-6`}>
          <Text style={tw`font-medium text-base text-white`}>
            {item.name} of {item.type}
          </Text>
          <Text style={tw`text-[#696868] text-xs`}>
            <TimeAgo time={item.timestamp.toDate()} />
          </Text>
        </TouchableOpacity>
      ));
    }
  };

  return (
    <SafeAreaView style={tw`h-24% mt-8 mx-5`}>
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
      <ScrollView ref={scrollFlash} indicatorStyle="white">
        {mappedData()}
      </ScrollView>
      {drinkList?.length > 3 && toggle ? (
        <TouchableOpacity onPress={handleDownScroll} style={tw`items-center`}>
          <ChevronDoubleDownIcon size={20} color="gray" />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default PreviousDrinks;
