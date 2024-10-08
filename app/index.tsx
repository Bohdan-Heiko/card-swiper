import Card from "@/components/card";
import { data, DataType } from "@/utils/data";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const MAX_CARD_ITEMS = 3;
const Main = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [newData, setNewData] = React.useState<DataType[]>([...data, ...data]);

  const animatedValue = useSharedValue(0);
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.cardContainer}>
          {newData.map((item, index) => {
            if (index > currentIndex + MAX_CARD_ITEMS || index < currentIndex) return null;
            return (
              <Card
                key={index}
                item={item}
                index={index}
                newData={newData}
                dataLength={newData.length}
                currentIndex={currentIndex}
                animatedValue={animatedValue}
                maxVisibleItems={MAX_CARD_ITEMS}
                setNewData={setNewData}
                setCurrentIndex={setCurrentIndex}
              />
            );
          })}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
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
