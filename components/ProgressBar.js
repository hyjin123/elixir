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
import WavyHeader from "./WavyHeader";

const ProgressBar = () => {
  const value = 2;

  return (
    <View style={tw`flex-row justify-between items-center h-30% mt-5`}>
      <TouchableOpacity style={tw`ml-5`}>
        <ChevronLeftIcon color="white" />
      </TouchableOpacity>
      <ProgressContainer>
        <WavyHeader customStyles={styles.svgCurve} />
        <Text style={tw`text-white text-5xl`}>60%</Text>
        <Text style={tw`text-white text-base`}>0.9 of 1.5l</Text>
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
`;

const styles = StyleSheet.create({
  // rest of the styles
  svgCurve: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },
});
