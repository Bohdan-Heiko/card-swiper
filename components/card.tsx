import { DataType } from "@/utils/data";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

type Props = {
  // newData: DataType[];
  // setNewData: React.Dispatch<React.SetStateAction<DataType[]>>;
  item: DataType;
  index: number;
  dataLength: number;
  maxVisibleItems: number;
  // animatedValue: SharedValue<number>;
  // currentIndex: number;
  // setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Card = ({ item, index, dataLength, maxVisibleItems }: Props) => {
  const translateX = useSharedValue(0);
  const pan = Gesture.Pan().onUpdate((e) => {
    translateX.value = e.translationX;
  });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.container,
          {
            zIndex: dataLength - index,
            backgroundColor: item.backgroundColor,
            opacity: index < maxVisibleItems ? 1 : 0,
            transform: [{ scale: 1 - index * 0.05 }, { translateY: index * -30 }],
          },
          cardAnimatedStyle,
          // animatedStyle,
        ]}
      >
        <View style={styles.top}>
          <Text style={styles.textName}>{item.name}</Text>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
        </View>
        <View style={styles.middle}>
          <Text style={styles.textNumber}>{item.number}</Text>
        </View>
        <View style={styles.bottom}>
          <View>
            <Text style={styles.text}>Valid thru</Text>
            <Text style={styles.text}>{item.exp}</Text>
          </View>
          <View>
            <Text style={styles.text}>Cvv</Text>
            <Text style={styles.text}>{item.cvv}</Text>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 360,
    height: 200,
    borderRadius: 28,
    padding: 16,
  },
  top: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
  imageContainer: {
    width: 80,
    height: 40,
  },
  image: {
    width: 80,
    height: 40,
    resizeMode: "contain",
  },
  middle: {
    flex: 2,
    justifyContent: "center",
  },
  textNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  bottom: {
    flex: 1,
    flexDirection: "row",
    gap: 56,
  },
});

export default Card;
