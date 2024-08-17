import { ImageSourcePropType } from "react-native";

export interface ActivityType {
  name: string;
  date: string;
  price: string;
  image: ImageSourcePropType;
  cardId: number;
}

export interface DataType {
  cardId: number;
  name: string;
  number: string;
  exp: string;
  cvv: string;
  type: string;
  image: ImageSourcePropType;
  backgroundColor: string;
  activity: ActivityType[];
}

const data: DataType[] = [
  {
    cardId: 1,
    name: "Jony Doe",
    number: "1234 5678 9101 1121",
    exp: "12/29",
    cvv: "123",
    type: "mastercard",
    image: require("../../assets/images/Mastercard.png"),
    backgroundColor: "#abe9ff",
    activity: [
      {
        name: "Netflix",
        date: "20 Min agp",
        price: "-$22.99",
        image: require("../../assets/images/Netflix.png"),
        cardId: 1,
      },
      {
        name: "Spotify",
        date: "1 Hour ago",
        price: "-$10.99",
        image: require("../../assets/images/Spotify.png"),
        cardId: 1,
      },
      {
        name: "Apple Music",
        date: "6 Hour ago",
        price: "-$10.99",
        image: require("../../assets/images/AppleMusic.png"),
        cardId: 1,
      },
      {
        name: "Paypal",
        date: "1 Day ago",
        price: "+$1200",
        image: require("../../assets/images/Paypal.png"),
        cardId: 1,
      },
      {
        name: "Youtube Premium",
        date: "1 Day ago",
        price: "-$10.99",
        image: require("../../assets/images/Youtube.png"),
        cardId: 1,
      },
      {
        name: "Apple TV",
        date: "2 Day ago",
        price: "-$50.99",
        image: require("../../assets/images/AppleTV.png"),
        cardId: 1,
      },
      {
        name: "Steam",
        date: "2 Day ago",
        price: "-$50.99",
        image: require("../../assets/images/Steam.png"),
        cardId: 1,
      },
    ],
  },
  {
    cardId: 2,
    name: "Nick Smith",
    number: "1234 5678 9101 1121",
    exp: "12/29",
    cvv: "123",
    type: "visa",
    image: require("../../assets/images/Visa.png"),
    backgroundColor: "#3f51b5",
    activity: [
      {
        name: "Paypal",
        date: "5 Min agp",
        price: "+$700",
        image: require("../../assets/images/Paypal.png"),
        cardId: 2,
      },
      {
        name: "Steam",
        date: "40 min ago",
        price: "-$50.99",
        image: require("../../assets/images/Steam.png"),
        cardId: 2,
      },
    ],
  },
  {
    cardId: 3,
    name: "Rhonaldo Cristiano",
    number: "1234 5678 9101 1121",
    exp: "12/29",
    cvv: "123",
    type: "visa",
    image: require("../../assets/images/Visa.png"),
    backgroundColor: "#86b4ee",
    activity: [
      {
        name: "Apple TV",
        date: "25 Min ago",
        price: "-$50.99",
        image: require("../../assets/images/AppleTV.png"),
        cardId: 3,
      },
      {
        name: "Paypal",
        date: "3 Hour agp",
        price: "+$900",
        image: require("../../assets/images/Paypal.png"),
        cardId: 3,
      },
      {
        name: "Spotify",
        date: "10 Hour ago",
        price: "-$10.99",
        image: require("../../assets/images/Spotify.png"),
        cardId: 3,
      },
    ],
  },
];

export { data };
