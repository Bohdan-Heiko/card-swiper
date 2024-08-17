import { data } from "@/utils/data";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Main = () => {
  const [newData, setNewData] = React.useState([...data, ...data]);
  return <SafeAreaView></SafeAreaView>;
};

const styles = StyleSheet.create({});

export default Main;
