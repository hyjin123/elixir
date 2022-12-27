import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { auth, db } from "../firebase";
import { useNavigation } from "@react-navigation/core";

const RegisterTab = ({ setLoggedInUserEmail }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("HomeScreen");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {};

  return (
    <SafeAreaView>
      <View style={tw`w-75`}>
        <TextInput
          style={tw`border-b-2 border-gray-400 text-lg bg-transparent py-2 mt-2`}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={tw`border-b-2 border-gray-400 text-lg bg-transparent py-2 mt-2`}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={tw`border-b-2 border-gray-400 text-lg bg-transparent py-2 mt-2`}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={tw`border-b-2 border-gray-400 text-lg bg-transparent py-2 mt-2`}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={tw`justify-center items-center mt-5`}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={tw`w-70 bg-[#fff9bb] p-4 m-1 rounded-full`}
        >
          <Text style={tw`text-center font-bold`}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterTab;
