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
    });
  }, [drinkList]);

  const handleClose = () => {
    setChartsModalVisible(false);
  };

  // const data = {
  //   labels: days,
  //   datasets: [{ data: progressData }],
  // };

  console.log(days);
  console.log(progressData);

  const data = [
    { label: "hello", value: 50 },
    { value: 80 },
    { value: 90 },
    { value: 70 },
  ];

  // const chartConfig = {
  //   fillShadowGradient: "#55b8fa",
  //   fillShadowGradientOpacity: 1,
  //   backgroundGradientFrom: "#1E2923",
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: "#08130D",
  //   backgroundGradientToOpacity: 0.5,
  //   color: (opacity = 1) => `rgba(85, 184, 250, ${opacity})`,
  //   strokeWidth: 4, // optional, default 3
  //   barPercentage: 0.6,
  //   useShadowColorFromDataset: false, // optional
  //   decimalPlaces: 0,
  //   propsForBackgroundLines: {
  //     translateX: 60,
  //   },
  //   labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  // };

  return (
    <Modal
      isVisible={chartsModalVisible}
      onBackdropPress={handleClose}
      backdropColor="#383838"
    >
      <View style={tw`bg-black py-10 rounded-xl`}>
        <TouchableOpacity
          onPress={handleClose}
          style={tw`absolute -top-8 right-2`}
        >
          <XMarkIcon color="#D3D3D3" size={23} />
        </TouchableOpacity>
        <View style={tw`w-full pl-2`}>
          <Text style={tw`text-lg text-white text-center pb-4`}>
            Last 7 days
          </Text>
          {/* <BarChart
            data={data}
            height={300}
            width={330}
            chartConfig={chartConfig}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            fromZero={true}
            yAxisSuffix=" ml"
          /> */}
          <BarChart
            data={data}
            backgroundColor="black"
            frontColor="#55b8fa"
            xAxisLabelTextStyle={{ color: "white" }}
            yAxisColor="gray"
            xAxisColor="gray"
            yAxisTextStyle={{ color: "white" }}
            rulesColor="black"
            showReferenceLine1
            referenceLine1Position={100}
            referenceLine1Config={{
              type: "dashed",
              color: "green",
              thickness: 2,
              dashWidth: 6,
              dashGap: 8,
            }}
          />
        </View>
        <View style={tw`justify-between mb-6 mt-6 pt-2`}>
          <Text style={tw`font-bold text-lg text-white`}>
            Your Average for this week
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ChartModal;
