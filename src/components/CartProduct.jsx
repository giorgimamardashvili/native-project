import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { removeItem, decreaseCart, addItem } from "../redux/reducers/cartItems";

export default function CartProduct({ item }) {
  console.log(item);
  const dispatch = useDispatch();

  const removeProductHandler = (data) => {
    dispatch(removeItem(data));
  };
  const decreaseItemHandler = (data) => {
    dispatch(decreaseCart(data));
  };
  const increaseItemHandler = (data) => {
    dispatch(addItem(data));
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemTop}>
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
          <Text style={styles.textPrice}>{item.original_price}₾</Text>
        </View>
      </View>
      <View style={styles.itemBottom}>
        <TouchableOpacity
          style={styles.remove}
          onPress={() => removeProductHandler(item)}
        >
          <Ionicons name={"trash"} size={16} color={"tomato"} />
          <Text style={styles.removeText}>წაშლა</Text>
        </TouchableOpacity>
        <View style={styles.qtyChange}>
          <TouchableOpacity
            style={styles.plus}
            onPress={() => decreaseItemHandler(item)}
          >
            <Ionicons name={"remove"} size={16} color={"#122545"} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={item.cartQty}
          />
          <TouchableOpacity
            style={styles.plus}
            onPress={() => increaseItemHandler(item)}
          >
            <Ionicons name={"add"} size={16} color={"#122545"} />
          </TouchableOpacity>
        </View>
      </View>
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
    padding: "15px",
    flexDirection: "column",
    backgroundColor: "white",
    overflow: "hidden",
  },
  itemTop: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  itemBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "15px",
  },
  image: {
    width: "30%",
    aspectRatio: "1 / 1",
    objectFit: "contain",
  },
  remove: {
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  removeText: {
    color: "tomato",
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
  qtyChange: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: "1px",
    borderColor: "grey",
    borderRadius: "8px",
    overflow: "hidden",
  },
  textInput: {
    height: "28px",
    width: "35px",
    textAlign: "center",
  },
  plus: {
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
});
