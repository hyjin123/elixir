import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {
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
    <SafeAreaView>
      <View>
        <Text>HomeScreen</Text>
      </View>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign-out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
