import React from "react";
import AnimatedItem from "./AnimatedItem";
import { View, Platform } from "react-native";

function Loader() {
  return (
    <View>
      <AnimatedItem
        animation={Platform.OS === 'ios' ? require("../assets/animations/spinner") : require("../assets/animations/spinner-android.json")}
        style={{ width: 100, height: 100 }}/>
    </View>
  );
}

export default Loader;
