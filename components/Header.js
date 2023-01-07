import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Cog6ToothIcon } from "react-native-heroicons/outline";
import SettingsModal from "./SettingsModal";

const Header = () => {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  return (
    <View style={tw`relative flex-row justify-center items-center w-full`}>
      {/* Modal - Settings*/}
      <SettingsModal
        modalVisible={settingsModalVisible}
        setModalVisible={setSettingsModalVisible}
      />
      <View style={tw`p-8`}>
        <Text style={tw`text-white text-xl`}>Elixir!</Text>
      </View>
      <TouchableOpacity
        onPress={() => setSettingsModalVisible(true)}
        style={tw`p-8 absolute right-0 top-0`}
      >
        <Cog6ToothIcon color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
