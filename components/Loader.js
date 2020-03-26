import React from "react";
import AnimatedItem from "./AnimatedItem";
import { View } from "react-native";

function Loader() {
  return (
    <View>
      <AnimatedItem animation={require("../assets/animations/spinner")} style={{ width: 100, height: 100 }}/>
    </View>
  );
}

export default Loader;
