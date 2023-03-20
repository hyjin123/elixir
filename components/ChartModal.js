import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import tw from "twrnc";
import { getSettings } from "../utils/getSettings";
import { XMarkIcon } from "react-native-heroicons/solid";
import { getProgressData } from "../utils/getProgressData";
// import { BarChart, LineChart } from "react-native-chart-kit";
import { BarChart } from "react-native-gifted-charts";

const ChartModal = ({
  chartsModalVisible,
  setChartsModalVisible,
  userId,
  drinkList,
  drinkAdded,
}) => {
  const [days, setDays] = useState([]);
  const [fullDays, setFullDays] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [target, setTarget] = useState(0);
  const [highestValue, setHighestValue] = useState(0);
  const [averageValue, setAverageValue] = useState(0);

  useEffect(() => {
    getSettings(userId).then((data) => {
      // save the initial/current size settings size options (from the database) for this user
      const targetAmount = data.targetAmount;
      setTarget(targetAmount);
    });

    const today = new Date();

    getProgressData(userId, today).then((data) => {
      // console.log("this is the progress data", data);
      // the dates with the month and days is too long for the bar chart, just use the day of the week
      const yLabel = [];
      for (const day of data.daysArray) {
        yLabel.push(day.slice(0, 3));
      }
      setFullDays(data.daysArray);
      setDays(yLabel);
      setProgressData(data.progressArray);
      setHighestValue(data.highestValue);
      setAverageValue(data.averageValue);
    });
  }, [drinkList, drinkAdded]);

  const handleClose = () => {
    setChartsModalVisible(false);
  };

  return (
    <Modal
      isVisible={chartsModalVisible}
      onBackdropPress={handleClose}
      backdropColor="#383838"
    >
      <View style={tw`bg-black py-8 -mx-2 rounded-xl`}>
        <TouchableOpacity
          onPress={handleClose}
          style={tw`absolute -top-8 right-2`}
        >
          <XMarkIcon color="#D3D3D3" size={23} />
        </TouchableOpacity>
        <View style={tw`w-full pl-2`}>
          <Text style={tw`text-2xl font-bold text-white text-center pb-6`}>
            Last 7 days
          </Text>
          <View style={tw`w-100`}>
            <BarChart
              data={progressData}
              backgroundColor="black"
              gradientColor={"#FFEEFE"}
              frontColor="#55b8fa"
              xAxisLabelTextStyle={{ color: "lightgray", textAlign: "center" }}
              yAxisTextStyle={{ color: "lightgray" }}
              xAxisLabelTexts={days}
              yAxisLabelSuffix=" ml"
              yAxisLabelWidth={60}
              xAxisType={"dotted"}
              xAxisColor="#363636"
              rulesColor="#363636"
              showReferenceLine1
              referenceLine1Position={target}
              referenceLine1Config={{
                type: "dotted",
                color: "#1d8233",
                thickness: 1,
                dashWidth: 8,
                dashGap: 4,
              }}
              barBorderRadius={4}
              isAnimated
              noOfSections={5}
              maxValue={
                highestValue > target ? highestValue + 500 : target + 500
              }
              minValue={0}
              initialSpacing={22}
              barWidth={20}
              spacing={16}
              renderTooltip={(item, index) => {
                return (
                  <View style={tw`rounded-md bg-[#3d3d3d] p-2 z-50 mb-2 -mr-4`}>
                    <Text style={tw`text-left text-white`}>
                      {fullDays[index].slice(4).slice(0, 6)}
                    </Text>
                    <Text style={tw`mt-1 text-center text-white`}>
                      {progressData[index].value} ml
                    </Text>
                  </View>
                );
              }}
              leftShiftForLastIndexTooltip={40}
            />
          </View>
        </View>
        {/* this is a custom legend for the target line */}
        <View style={tw`mt-8 mb-10 flex-row items-center justify-center`}>
          <View style={tw`bg-[#1d8233] w-2 h-0.25 mr-1`}></View>
          <View style={tw`bg-[#1d8233] w-2 h-0.25 mr-1`}></View>
          <View style={tw`bg-[#1d8233] w-2 h-0.25 mr-1`}></View>
          <View style={tw`bg-[#1d8233] w-2 h-0.25 mr-1`}></View>
          <View style={tw`flex-row ml-2 justify-center items-center`}>
            <Text style={tw`text-white text-xs text-[#9c9c9c]`}>
              Target&nbsp;
            </Text>
            <Text style={tw`text-white text-xs text-[#9c9c9c]`}>
              ({target} ml)
            </Text>
          </View>
        </View>
        <View style={tw`justify-between pt-2`}>
          <Text style={tw`font-bold text-lg text-white text-center`}>
            Your Average for this week:
          </Text>
          <Text
            style={tw`font-bold text-4xl text-white text-center text-[#55b8fa] mt-4`}
          >
            {averageValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}{" "}
            ml
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ChartModal;
