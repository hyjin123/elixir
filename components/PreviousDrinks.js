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
import { TrashIcon } from "react-native-heroicons/outline";
import TimeAgo from "react-native-timeago";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const PreviousDrinks = ({
  setDrinkList,
  drinkList,
  userId,
  setDrinkAdded,
  date,
}) => {
  const [toggle, setToggle] = useState(null);
  const [selectedDrinkIndex, setSelectedDrinkIndex] = useState("");

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

  // handle if a user selects one of the previous drinks from the list
  const handleSelect = (selectedItem) => {
    setSelectedDrinkIndex(selectedItem);
  };

  // handle if a user deletes one of the previous drinks from the list
  const handleDelete = async (item) => {
    const dateString = date
      .toString("en-US", {
        timeZone: "America/New_York",
      })
      .slice(0, 15);

    const docRef = doc(db, "users", userId, "dates", dateString);

    // console.log("this is item", item);
    // console.log("this is data", drinkList);
    // console.log(item === drinkList[2]);

    // remove item that matches in the drinks array in firebase
    // await updateDoc(docRef, {
    //   drinks: arrayRemove({
    //     name: item.name,
    //     timestamp: item.timestamp,
    //     type: item.type,
    //     value: item.value,
    //   }),
    // });

    // create a copy of the drink list
    const copyDrinkList = [...drinkList];

    // filter out the deleted drink
    const newDrinkList = copyDrinkList.filter(
      (drink) => drink.timestamp.seconds !== item.timestamp.seconds
    );

    // set the drinks array with the new filtered array as "arrayRemove" did not work
    await setDoc(
      docRef,
      {
        drinks: newDrinkList,
      },
      { merge: true }
    );

    // delete the drink from the drinklist state
    setDrinkList((current) => {
      const newState = [...current];
      const updatedState = newState.filter(
        (drink) => drink.timestamp.seconds !== item.timestamp.seconds
      );
      return updatedState;
    });

    // re-render after user deletes a drink
    // setDrinkAdded((current) => current + 1);

    // set the selected drink to nothing since it was deleted
    setSelectedDrinkIndex("");
  };

  // map all the drinks and display them in a list
  const mappedData = () => {
    if (toggle) {
      return drinkList?.map((item, index) => (
        <View key={index} style={tw`flex flex-row justify-between`}>
          <TouchableOpacity
            onPress={() => handleSelect(index)}
            style={tw`pt-6`}
          >
            <Text
              style={tw`font-medium text-base ${
                selectedDrinkIndex === index ? "text-[#0099ff]" : "text-white"
              }`}
            >
              {item.name} of {item.type}
              <Text style={tw`text-xs`}> ({item.value} ml)</Text>
            </Text>
            <Text style={tw`text-[#696868] text-xs`}>
              <TimeAgo time={new Date(item.timestamp.seconds * 1000)} />
              {/* <TimeAgo time={item.timestamp.toDate()} /> */}
            </Text>
          </TouchableOpacity>
          {selectedDrinkIndex === index ? (
            <TouchableOpacity
              onPress={() => handleDelete(item)}
              style={tw`pt-6 pr-4 self-end`}
            >
              <TrashIcon size={22} color="white" />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
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
      {drinkList?.length > 2 && toggle ? (
        <TouchableOpacity
          onPress={handleDownScroll}
          style={tw`items-center mt-5`}
        >
          <ChevronDoubleDownIcon size={20} color="gray" />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default PreviousDrinks;
