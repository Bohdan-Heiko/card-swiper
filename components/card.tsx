import { DataType } from "@/utils/data";
import React from "react";
import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  item: DataType;
  index: number;
  dataLength: number;
  newData: DataType[];
  currentIndex: number;
  maxVisibleItems: number;
  animatedValue: SharedValue<number>;
  setNewData: React.Dispatch<React.SetStateAction<DataType[]>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Card = ({
  item,
  index,
  newData,
  dataLength,
  currentIndex,
  animatedValue,
  maxVisibleItems,
  setNewData,
  setCurrentIndex,
}: Props) => {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      const isSwipeRight = e.translationX > 0;
      direction.value = isSwipeRight ? 1 : -1;

      if (currentIndex === index) {
        translateX.value = e.translationX;

        animatedValue.value = interpolate(Math.abs(e.translationX), [0, width], [index, index + 1]);
      }
    })
    .onEnd((e) => {
      if (currentIndex === index) {
        if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
          translateX.value = withTiming(width * direction.value, { duration: 500 }, () => {
            runOnJS(setCurrentIndex)(currentIndex + 1);
            runOnJS(setNewData)([...newData, newData[currentIndex]]);
          });
          animatedValue.value = withTiming(currentIndex + 1, { duration: 500 });
        } else {
          translateX.value = withTiming(0, { duration: 500 });
          animatedValue.value = withTiming(currentIndex, { duration: 500 });
        }
      }
    });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const currentItem = index === currentIndex;

    const rotateZ = interpolate(Math.abs(translateX.value), [0, width], [0, 20]);

    const translateY = interpolate(animatedValue.value, [index - 1, index], [-30, 0]);
    const scale = interpolate(animatedValue.value, [index - 1, index], [0.9, 1]);
    const opacity = interpolate(animatedValue.value + maxVisibleItems, [index, index + 1], [0, 1]);

    return {
      transform: [
        { translateX: translateX.value },
        { scale: currentItem ? 1 : scale },
        { translateY: currentItem ? 0 : translateY },
        { rotateZ: currentItem ? `${direction.value * rotateZ}deg` : "0deg" },
      ],
      opacity: index < maxVisibleItems + currentIndex ? 1 : opacity,
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
