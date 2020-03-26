import React from "react";
import { View } from "react-native";
import Loader from "./Loader";

const LoadingState = ({ children }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Loader />
      {children}
    </View>
  );
};

export default LoadingState;
