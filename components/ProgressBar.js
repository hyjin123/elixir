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
import Svg, { Path, Rect } from "react-native-svg";

const ProgressBar = () => {
  return (
    <View style={tw`flex-row justify-between items-center h-30% mt-5`}>
      <TouchableOpacity style={tw`ml-5`}>
        <ChevronLeftIcon color="white" />
      </TouchableOpacity>
      <ProgressContainer>
        <Text style={tw`text-white text-5xl z-10`}>60%</Text>
        <Text style={tw`text-white text-base z-10`}>0.9 of 1.5l</Text>
        <Svg
          height="25%"
          width="100%"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          // the absolute position of the wavey svg is 1% lower than the rect svg so that it overlaps
          style={{ position: "absolute", bottom: "69%" }}
        >
          <Path
            fill="#0099ff"
            d="M0,288L60,266.7C120,245,240,203,360,208C480,213,600,267,720,288C840,309,960,299,1080,272C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </Svg>
        <Svg
          width="100%"
          height="70%"
          style={{ position: "absolute", bottom: 0 }}
        >
          <Rect x="0" y="0" width="100%" height="100%" fill="#0099ff" />
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
