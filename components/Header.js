import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Cog6ToothIcon } from "react-native-heroicons/outline";
import SettingsModal from "./SettingsModal";

const Header = ({ setDrinkAdded }) => {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  return (
    <View style={tw`relative flex-row justify-center items-center w-full`}>
      {/* Modal - Settings*/}
      <SettingsModal
        modalVisible={settingsModalVisible}
        setModalVisible={setSettingsModalVisible}
        setDrinkAdded={setDrinkAdded}
      />
      <View style={tw`py-8`}>
        <Text
          style={tw`text-white text-3xl italic font-extrabold tracking-wide`}
        >
          Elixir!
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setSettingsModalVisible(true)}
        style={tw`absolute right-0 top-0 py-9 pr-6`}
      >
        <Cog6ToothIcon color="white" size={26} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
