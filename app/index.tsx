import Card from "@/components/card";
import { data, DataType } from "@/utils/data";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MAX_CARD_ITEMS = 3;
const Main = () => {
  const [newData, setNewData] = React.useState<DataType[]>([...data, ...data]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        {newData.map((item, index) => {
          if (index > MAX_CARD_ITEMS) return null;
          return (
            <Card
              key={index}
              item={item}
              index={index}
              dataLength={newData.length}
              maxVisibleItems={MAX_CARD_ITEMS}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Main;
