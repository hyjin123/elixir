import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import tw from "twrnc";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/solid";
import styled from "styled-components/native";
import Svg, { Path } from "react-native-svg";

const ProgressBar = () => {
  return (
    <View style={tw`flex-row justify-between items-center h-30% mt-5`}>
      <TouchableOpacity style={tw`ml-5`}>
        <ChevronLeftIcon color="white" />
      </TouchableOpacity>
      <ProgressContainer>
        <Text style={tw`text-white text-5xl`}>60%</Text>
        <Text style={tw`text-white text-base`}>0.9 of 1.5l</Text>
        <Svg
          height="100%"
          width="100%"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ position: "absolute", top: 50 }}
        >
          <Path
            fill="#0099ff"
            d="M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,117.3C672,117,768,171,864,176C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </Svg>
      </ProgressContainer>
      <TouchableOpacity style={tw`mr-5`}>
        <ChevronRightIcon color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ProgressBar;

const ProgressContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 3px solid white;
  height: 260px;
  width: 260px;
  border-radius: 130px;
  overflow: hidden;
`;

const styles = StyleSheet.create({
  // rest of the styles
  svgCurve: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },
});
