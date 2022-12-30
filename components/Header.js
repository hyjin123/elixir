import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase";
import { Cog6ToothIcon } from "react-native-heroicons/outline";

const Header = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("LoginScreen");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={tw`relative flex-row justify-center items-center w-full`}>
      <View style={tw`p-8`}>
        <Text style={tw`text-white text-xl`}>Elixir!</Text>
      </View>
      {/* <TouchableOpacity onPress={handleSignOut} style={tw`bg-[#303133] p-5`}>
        <Text style={tw`text-white font-semibold`}>Sign Out</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={handleSignOut}
        style={tw`p-8 absolute right-0 top-0`}
      >
        <Cog6ToothIcon color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
