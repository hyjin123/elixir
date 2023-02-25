import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/solid";
import styled from "styled-components/native";
import Svg, { Path, Rect } from "react-native-svg";
import { getSettings } from "../utils/getSettings";
import { animated, useSpring } from "@react-spring/web";

const ProgressBar = ({
  userId,
  drinkList,
  waterAnim,
  opacityStyle,
  animateElement,
  drinkAdded,
  drinkAddedAnimation,
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

  // react- spring for the number counter animation
  function Number({ from, to }) {
    const { number } = useSpring({
      from: { number: from },
      number: to,
      config: { mass: 1, tension: 120, friction: 14 },
    });
    return <AnimatedText>{number.to((to) => to.toFixed(0))}</AnimatedText>;
  }

  useEffect(() => {
    getSettings(userId).then((data) => {
      // save the initial/current size settings size options (from the database) for this user
      setTarget(data.targetAmount);
    });

    // calculate the total fluid intake/amount for the day
    let totalAmount = 0;
    for (const item of drinkList) {
      totalAmount += item.value;
    }

    // console.log("this is the total amount", totalAmount);
    // set the total
    if (total === 0) {
      setPreviousTotal(totalAmount);
    } else {
      setPreviousTotal(total);
    }
    setTotal(totalAmount);

    setNumberCounter([
      Math.round((total / target) * 100),
      Math.round((totalAmount / target) * 100),
    ]);
  }, [drinkList, drinkAddedAnimation]);

  let percentageString = 0;
  let previousPercentageString = 0;

  // whenever the total amount changes (when a user adds a drink), change the output of the animation
  useEffect(() => {
    // used to set the positioning of the SVGs so that the water is at a correct height
    percentageString = Math.round((total / target) * 100).toString() + "%";
    const percentageString2 =
      Math.round((total / target) * 100 - 1).toString() + "%";

    previousPercentageString =
      Math.round((previousTotal / target) * 100).toString() + "%";
    const previousPercentageString2 =
      Math.round((previousTotal / target) * 100 - 1).toString() + "%";

    console.log("ok", previousPercentageString2, percentageString2);
    console.log(previousPercentageString, percentageString);

    if (previousTotal && total && target) {
      // const outputRange = [previousPercentageString, percentageString];
      // const outputRange2 = [previousPercentageString2, percentageString2];
      setOutputRange([previousPercentageString, percentageString]);
      setOutputRange2([previousPercentageString2, percentageString2]);
    }
  }, [total, previousTotal, drinkAddedAnimation]);

  // this solved the percentage sign bug, where the percentage was dipping before raising to the initial and final fluid amount
  useEffect(() => {
    // animate the popping motion
    animateElement();
  }, [drinkAddedAnimation]);

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

  return (
    <View style={tw`flex-row justify-between items-center h-30% mt-1 z-10`}>
      <TouchableOpacity style={tw`ml-5`}>
        <ChevronLeftIcon color="white" />
      </TouchableOpacity>
      <ProgressContainer>
        <Animated.View style={[styles.circle, opacityStyle]} />
        <Progress>
          <Text style={tw`text-white text-5xl z-10`}>
            {/* Show the percentage of your drink total out of your daily target */}
            {/* if the total amount of fluid is 0, display 0% or else it will show NaN% */}
            {total === 0 ? (
              <Text>0</Text>
            ) : (
              <Number from={numberCounter[0]} to={numberCounter[1]} />
            )}
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
      <TouchableOpacity style={tw`mr-5`}>
        <ChevronRightIcon color="white" />
      </TouchableOpacity>
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
