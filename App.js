import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { LogBox } from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator();

  LogBox.ignoreAllLogs();

  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
      >
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" options={{ headerShown: false }}>
            {(props) => <LoginScreen {...props} />}
          </Stack.Screen>

          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}
