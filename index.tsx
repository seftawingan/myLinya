import React from "react";
import { Text, View } from "react-native";

import { Link } from "./src/app/frontend/components";  
import MainPage from "./src/app/frontend/components/mainPage";

export default function Page() {
  return (
   
    <View className="flex-1">
      <MainPage />
    </View>
  );
}