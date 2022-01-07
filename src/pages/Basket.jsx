import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";

export default function Basket() {
  const { cartItems, cartTotalAmount, cartTotalQty } = useSelector(
    (state) => state.cart
  );
  console.log(cartItems);

  return (
    <ScrollView style={styles.main}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartProduct item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.container}
      />
      <View style={styles.cartInfo}>
        <View>
          <Text style={styles.price}>{cartTotalAmount}₾</Text>
          <Text style={styles.qty}> {cartTotalQty} პროდუქტი</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ყიდვა</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    position: "relative",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    maxHeight: "calc(100vh - 80px - 124px)",
    overflow: "auto",
  },
  cartInfo: {
    position: "fixed",
    bottom: "0",
    right: "0",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px",
    backgroundColor: "white",
    height: "85px",
    borderTopWidth: "1px",
    borderTopColor: "#d5d5d5",
  },
  button: {
    height: "40px",
    width: "195px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7ca039",
    borderRadius: "8px",
  },
  buttonText: {
    color: "white",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  qty: {
    fontSize: "16px",
  },
});
