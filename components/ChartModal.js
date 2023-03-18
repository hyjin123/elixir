import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import tw from "twrnc";
import { getSettings } from "../utils/getSettings";
import { XMarkIcon } from "react-native-heroicons/solid";
import { getProgressData } from "../utils/getProgressData";
// import { BarChart, LineChart } from "react-native-chart-kit";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

const ChartModal = ({
  chartsModalVisible,
  setChartsModalVisible,
  userId,
  drinkList,
}) => {
  const [days, setDays] = useState([]);
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
      setDays(yLabel);
      setProgressData(data.progressArray);
      setHighestValue(data.highestValue);
      setAverageValue(data.averageValue);
    });
  }, [drinkList]);

  const handleClose = () => {
    setChartsModalVisible(false);
  };

  return (
    <Modal
      isVisible={chartsModalVisible}
      onBackdropPress={handleClose}
      backdropColor="#383838"
    >
      <View style={tw`bg-black py-6 rounded-xl`}>
        <TouchableOpacity
          onPress={handleClose}
          style={tw`absolute -top-8 right-2`}
        >
          <XMarkIcon color="#D3D3D3" size={23} />
        </TouchableOpacity>
        <View style={tw`w-full pl-2`}>
          <Text style={tw`text-2xl font-bold text-white text-center pb-4`}>
            Last 7 days
          </Text>
          <View style={tw`w-100`}>
            <BarChart
              data={progressData}
              backgroundColor="black"
              frontColor="#55b8fa"
              xAxisLabelTextStyle={{ color: "lightgray", textAlign: "center" }}
              yAxisTextStyle={{ color: "lightgray" }}
              xAxisLabelTexts={days}
              rulesColor="#363636"
              showReferenceLine1
              referenceLine1Position={target}
              referenceLine1Config={{
                type: "dotted",
                color: "#1d8233",
                thickness: 2,
                dashWidth: 6,
                dashGap: 8,
                labelText: "hey",
              }}
              barBorderRadius={4}
              isAnimated
              noOfSections={5}
              maxValue={
                highestValue > target ? highestValue + 500 : target + 500
              }
              minValue={0}
              initialSpacing={25}
              barWidth={20}
              spacing={18}
            />
          </View>
        </View>
        <View style={tw`justify-between mb-3 mt-10 pt-2`}>
          <Text style={tw`font-bold text-lg text-white text-center`}>
            Your Average for this week:
          </Text>
          <Text
            style={tw`font-bold text-3xl text-white text-center text-[#55b8fa] mt-2`}
          >
            {averageValue.toFixed(0)} ml
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ChartModal;
