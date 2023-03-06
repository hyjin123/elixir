import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "twrnc";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/solid";
import styled from "styled-components/native";
import Svg, { Path, Rect } from "react-native-svg";
import { getSettings } from "../utils/getSettings";
import { getDateData } from "../utils/getDateData";
import { animated, useSpring } from "@react-spring/web";

const ProgressBar = ({
  userId,
  drinkList,
  waterAnim,
  opacityStyle,
  animateElement,
  drinkAdded,
  drinkAddedAnimation,
  date,
  setDate,
}) => {
  const [target, setTarget] = useState(0);
  const [previousTotal, setPreviousTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [inputRange, setInputRange] = useState([0, 1]);
  const [outputRange, setOutputRange] = useState([0, 1]);
  const [outputRange2, setOutputRange2] = useState([0, 1]);
  const [numberCounter, setNumberCounter] = useState([0, 0]);
  const AnimatedSVG = Animated.createAnimatedComponent(Svg);
  // the number counter is using react-spring library and not react native animation
  const AnimatedText = animated(Text);

  useEffect(() => {
    getSettings(userId).then((data) => {
      // save the initial/current size settings size options (from the database) for this user
      const targetAmount = data.targetAmount;
      setTarget(targetAmount);
    });

    let totalAmount = 0;
    for (const item of drinkList) {
      totalAmount += item.value;
    }

    // set the total and previous total
    setPreviousTotal(total);
    setTotal(totalAmount);

    setNumberCounter([
      Math.round((total / target) * 100),
      Math.round((totalAmount / target) * 100),
    ]);
  }, [drinkList, drinkAdded, drinkAddedAnimation]);

  let percentageString = 0;
  let previousPercentageString = 0;
  let percentageString2 = 0;
  let previousPercentageString2 = 0;

  // whenever the total amount changes (when a user adds a drink), change the output of the animation
  useEffect(() => {
    if (total === 0 && previousTotal === 0) {
      // used to set the positioning of the SVGs so that the water is at a correct height
      percentageString = "-5%";
      percentageString2 = "-6%";
      previousPercentageString = "-6%";
      previousPercentageString2 = "-7%";
    } else {
      // used to set the positioning of the SVGs so that the water is at a correct height when user starts adding drinks
      percentageString =
        Math.round((total / target) * 100 - 5).toString() + "%";
      percentageString2 =
        Math.round((total / target) * 100 - 6).toString() + "%";

      previousPercentageString =
        Math.round((previousTotal / target) * 100 - 5).toString() + "%";
      previousPercentageString2 =
        Math.round((previousTotal / target) * 100 - 6).toString() + "%";
    }

    // console.log("ok", previousPercentageString2, percentageString2);
    // console.log(previousPercentageString, percentageString);

    setOutputRange([previousPercentageString, percentageString]);
    setOutputRange2([previousPercentageString2, percentageString2]);

    // animate the popping and water animation
    animateElement();
  }, [total, target]);

  // determine the start and end value for the opacity css
  const water = waterAnim.interpolate({
    inputRange,
    outputRange,
  });

  const waters = waterAnim.interpolate({
    inputRange,
    outputRange: outputRange2,
  });

  const waterStyle = { bottom: waters };

  console.log(
    "this is total",
    total,
    "this is previous",
    previousTotal,
    "this is target",
    target
  );

  // having this useEffect separately prevents some lag?
  // useEffect(() => {
  //   // animate the popping and water animation
  //   animateElement();
  // }, [total]);

  // react- spring for the number counter animation
  function Number({ from, to }) {
    const { number } = useSpring({
      from: { number: from },
      number: to,
      config: { mass: 1, tension: 185, friction: 30 },
    });
    return <AnimatedText>{number.to((to) => to.toFixed(0))}</AnimatedText>;
  }

  const animation = () => {
    return <Number from={numberCounter[0]} to={numberCounter[1]} />;
    // if (
    //   numberCounter[1] === Math.round((total / target) * 100) &&
    //   numberCounter[0] === Math.round((previousTotal / target) * 100)
    // ) {
    //   return <Number from={numberCounter[0]} to={numberCounter[1]} />;
    // } else {
    //   return <></>;
    // }
  };

  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // runs when a user clicks on the right awrrow to go forward a day
  const handleRight = () => {
    const newDate = date.setDate(date.getDate() + 1);
    const newDateFormatted = new Date(newDate);
    setDate(newDateFormatted);
  };

  // runs when a user clicks on the left arrow to go back a day
  const handleLeft = () => {
    const newDate = date.setDate(date.getDate() - 1);
    const newDateFormatted = new Date(newDate);
    setDate(newDateFormatted);
  };

  return (
    <View style={tw`flex-row justify-between items-center h-30% mt-1 z-10`}>
      <TouchableOpacity onPress={handleLeft} style={tw`ml-5`}>
        <ChevronLeftIcon color="white" size={34} />
      </TouchableOpacity>
      <ProgressContainer>
        <Animated.View style={[styles.circle, opacityStyle]} />
        <View style={tw`absolute -top-3 z-30 bg-white px-3 py-1 rounded-xl `}>
          <Text style={tw`text-black text-sm`}>
            {new Date().toISOString().slice(0, 10) ===
            date.toISOString().slice(0, 10)
              ? "Today"
              : days[date.getDay()] +
                ", " +
                months[date.getMonth()] +
                " " +
                date.getDate()}
          </Text>
        </View>
        <Progress>
          <Text style={tw`text-white text-6xl font-extrabold z-10`}>
            {/* Show the percentage of your drink total out of your daily target */}
            {/* if the total amount of fluid is 0, display 0% or else it will show NaN% */}
            {/* {total === 0 ? <Text>0</Text> : animation()} */}
            {animation()}
            <Text>%</Text>
          </Text>
          <Text style={tw`text-white text-base z-10`}>
            {total / 1000} of {target / 1000} L
          </Text>
          <AnimatedSVG
            height="25%"
            width="100%"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            // the absolute position of the wavey svg is 1% lower than the rect svg so that it overlaps
            // style={{ position: "absolute", bottom: `${percentageString2}` }}
            style={[{ position: "absolute" }, waterStyle]}
          >
            <Path
              fill="#0099ff"
              d="M0,160L48,149.3C96,139,192,117,288,117.3C384,117,480,139,576,165.3C672,192,768,224,864,208C960,192,1056,128,1152,106.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </AnimatedSVG>
          <AnimatedSVG
            width="100%"
            height={water}
            // height={`${percentageString}`}
            style={{ position: "absolute", bottom: 0 }}
          >
            <Rect x="0" y="2" width="100%" height="600px" fill="#0099ff" />
          </AnimatedSVG>
        </Progress>
      </ProgressContainer>
      {new Date().toISOString().slice(0, 10) ===
      date.toISOString().slice(0, 10) ? (
        <TouchableOpacity style={tw`mr-5`} disabled={true}>
          <ChevronRightIcon color="#4f4f4f" size={34} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleRight} style={tw`mr-5`}>
          <ChevronRightIcon color="white" size={34} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProgressBar;

const Progress = styled(Animated.View)`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: white;
  border: 6px solid #121212;
  outline: 5px solid blue;
  height: 260px;
  width: 260px;
  border-radius: 130px;
  overflow: hidden;
`;

const ProgressContainer = styled(Animated.View)`
  display: flex;
  align-items: center;
  border: 3px solid white;
  border-radius: 130px;
`;

const styles = StyleSheet.create({
  circle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 150,
    height: 100,
    position: "absolute",
    top: 78,
    left: 78,
    backgroundColor: "#0099ff",
    opacity: 0.4,
  },
});
