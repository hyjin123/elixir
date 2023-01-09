import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
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

const ProgressBar = ({ userId, drinkList }) => {
  const [target, setTarget] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getSettings(userId).then((data) => {
      // save the initial/current size settings size options (from the database) for this user
      setTarget(data.targetAmount);
    });

    let totalAmount = 0;
    for (const item of drinkList) {
      totalAmount += item.value;
    }

    // set the total
    setTotal(totalAmount);
  }, [drinkList]);

  return (
    <View style={tw`flex-row justify-between items-center h-30% mt-1`}>
      <TouchableOpacity style={tw`ml-5`}>
        <ChevronLeftIcon color="white" />
      </TouchableOpacity>
      <ProgressContainer>
        <Progress>
          <Text style={tw`text-white text-5xl z-10`}>
            {/* Show the percentage of your drink total out of your daily target */}
            {Math.round((total / target) * 100)} %
          </Text>
          <Text style={tw`text-white text-base z-10`}>
            {total / 1000} of {target / 1000} L
          </Text>
          <Svg
            height="25%"
            width="100%"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            // the absolute position of the wavey svg is 1% lower than the rect svg so that it overlaps
            style={{ position: "absolute", bottom: "39%" }}
          >
            <Path
              fill="#0099ff"
              d="M0,160L48,149.3C96,139,192,117,288,117.3C384,117,480,139,576,165.3C672,192,768,224,864,208C960,192,1056,128,1152,106.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </Svg>
          <Svg
            width="100%"
            height="40%"
            style={{ position: "absolute", bottom: 0 }}
          >
            <Rect x="0" y="0" width="100%" height="100%" fill="#0099ff" />
          </Svg>
        </Progress>
      </ProgressContainer>

      <TouchableOpacity style={tw`mr-5`}>
        <ChevronRightIcon color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ProgressBar;

const Progress = styled.View`
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

const ProgressContainer = styled.View`
  border: 3px solid white;
  border-radius: 130px;
`;

const styles = StyleSheet.create({
  // rest of the styles
  svgCurve: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },
});
