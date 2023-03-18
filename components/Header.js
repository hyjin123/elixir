import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Cog6ToothIcon, ChartBarIcon } from "react-native-heroicons/outline";
import SettingsModal from "./SettingsModal";
import ChartModal from "./ChartModal";

const Header = ({ setDrinkAdded, userId, drinkList }) => {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [chartsModalVisible, setChartsModalVisible] = useState(false);

  return (
    <View style={tw`relative flex-row justify-center items-center w-full`}>
      {/* Modal - Settings*/}
      <SettingsModal
        modalVisible={settingsModalVisible}
        setModalVisible={setSettingsModalVisible}
        setDrinkAdded={setDrinkAdded}
      />
      {/* Modal - Charts */}
      <ChartModal
        chartsModalVisible={chartsModalVisible}
        setChartsModalVisible={setChartsModalVisible}
        userId={userId}
        drinkList={drinkList}
      />
      <TouchableOpacity
        onPress={() => setSettingsModalVisible(true)}
        style={tw`absolute left-0 top-0 py-9 pl-6`}
      >
        <Cog6ToothIcon color="white" size={26} />
      </TouchableOpacity>
      <View style={tw`pt-8 pb-10`}>
        <Text
          style={tw`text-white text-3xl italic font-extrabold tracking-wide`}
        >
          Elixir!
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setChartsModalVisible(true)}
        style={tw`absolute right-0 top-0 py-9 pr-6`}
      >
        <ChartBarIcon color="white" size={26} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
