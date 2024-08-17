import { DataType } from "@/utils/data";
import React from "react";
import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  // newData: DataType[];
  // setNewData: React.Dispatch<React.SetStateAction<DataType[]>>;
  item: DataType;
  index: number;
  dataLength: number;
  currentIndex: number;
  maxVisibleItems: number;
  // animatedValue: SharedValue<number>;
  // setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Card = ({ item, index, dataLength, maxVisibleItems, currentIndex }: Props) => {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      const isSwipeRight = e.translationX > 0;
      direction.value = isSwipeRight ? 1 : -1;

      if (currentIndex === index) {
        translateX.value = e.translationX;
      }
    })
    .onEnd((e) => {
      if (currentIndex === index) {
        if (Math.abs(e.translationX) > 150) {
          translateX.value = withTiming(width * direction.value, { duration: 500 });
        } else {
          translateX.value = withTiming(0, { duration: 500 });
        }
      }
    });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const currentItem = index === currentIndex;

    const rotateZ = interpolate(Math.abs(translateX.value), [0, width], [0, 20]);

    return {
      transform: [
        { translateX: translateX.value },
        { scale: 1 - index * 0.05 },
        { translateY: index * -30 },
        { rotateZ: currentItem ? `${direction.value * rotateZ}deg` : "0deg" },
      ],
      opacity: index < maxVisibleItems ? 1 : 0,
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
