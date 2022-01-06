import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../redux/reducers/cartItems";

export default function Product({ item }) {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addProductHandler = (data) => {
    dispatch(addItem(data));
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          item?.thumb_img
            ? item.thumb_img.files.file
            : require("../../assets/images/notfound.jpg")
        }
      />
      <View style={styles.textContainer}>
        <Text style={styles.textTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={styles.textPrice}>
          {item.original_price}
          <Text style={styles.textPrice}>₾</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.cart}
        onPress={() => addProductHandler(item)}
      >
        <Ionicons name={"cart"} size={16} color={"grey"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderBottomWidth: "1px",
    borderBottomColor: "#d5d5d5",
    color: "#092b43",
    position: "relative",
    margin: "15px",
    flexDirection: "row",
    backgroundColor: "white",
    overflow: "hidden",
  },
  image: {
    width: "30%",
    aspectRatio: "1 / 1",
    objectFit: "contain",
  },
  cart: {
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: "white",
    border: "1px solid #dcdfe6",
    position: "absolute",
    right: "15px",
    bottom: "15px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    width: "70%",
  },
  textTitle: {
    fontSize: "12px",
  },
  textPrice: {
    fontSize: "16px",
    fontWeight: "bold",
  },
});
