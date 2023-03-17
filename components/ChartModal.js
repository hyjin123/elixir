import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import tw from "twrnc";
import { getSettings } from "../utils/getSettings";
import { XMarkIcon } from "react-native-heroicons/solid";
import { getProgressData } from "../utils/getProgressData";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const ChartModal = ({ chartsModalVisible, setChartsModalVisible, userId }) => {
  const [days, setDays] = useState([]);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const today = new Date();

    getProgressData(userId, today).then((data) => {
      // console.log("this is the progress data", data);
      setDays(data.daysArray);
      setProgressData(data.progressArray);
    });
  }, []);

  const handleClose = () => {
    setChartsModalVisible(false);
  };

  const data = { labels: days, datasets: [{ data: progressData }] };
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <Modal
      isVisible={chartsModalVisible}
      onBackdropPress={handleClose}
      backdropColor="#383838"
    >
      <View style={tw`bg-black my-10 mx-1 px-6 py-3 rounded-xl`}>
        <TouchableOpacity
          onPress={handleClose}
          style={tw`absolute -top-8 right-2`}
        >
          <XMarkIcon color="#D3D3D3" size={23} />
        </TouchableOpacity>

        <View style={tw`mt-6`}>
          <Text style={tw`text-white text-3xl font-bold`}>Settings</Text>
        </View>
        <View>
          <BarChart
            data={data}
            height={220}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
          />
        </View>
        <View style={tw`justify-between mb-6 mt-6 pt-2`}>
          <Text style={tw`font-bold text-lg text-white`}>
            Daily Target Amount (ml)
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ChartModal;
