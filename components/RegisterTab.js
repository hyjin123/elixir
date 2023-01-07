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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const RegisterTab = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("HomeScreen");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // set the display name and the picture of the user that registers into the firestore database
        await setDoc(
          doc(db, "users", user.uid),
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            sizeSetting: "Medium Cup",
            typeSetting: "Water",
            targetAmount: 2000,
            sizeOptions: [
              { name: "Small Cup", value: "200" },
              { name: "Medium Cup", value: "300" },
              { name: "Large Cup", value: "400" },
              { name: "Small Bottle", value: "500" },
              { name: "Medium Bottle", value: "1000" },
              { name: "Large Bottle", value: "1500" },
            ],
            typeOptions: [
              { value: "Water" },
              { value: "Tea" },
              { value: "Coffee" },
              { value: "Soft Drink" },
              { value: "Beer" },
              { value: "Cocktail" },
              { value: "Wine" },
            ],
          },
          { merge: true }
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

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
