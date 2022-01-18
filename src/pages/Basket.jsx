import React from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getTotals } from "../redux/reducers/cartItems";
import CartProduct from "../components/CartProduct";
import styled from "styled-components/native";

const screenHeight = Dimensions.get("window").height;

export default function Basket() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTotals);
  }, []);
  console.log(cart.cartItems, cart.cartTotalAmount, cart.cartTotalQty);

  return (
    <Main>
      <Container
        data={cart.cartItems}
        renderItem={({ item }) => <CartProduct item={item} />}
        keyExtractor={(item) => item.id}
      />
      <CartInfo>
        <View>
          <Price>{cart.cartTotalAmount}₾</Price>
          <Qty>{cart.cartTotalQty} პროდუქტი</Qty>
        </View>
        <Button>
          <ButtonText>ყიდვა</ButtonText>
        </Button>
      </CartInfo>
    </Main>
  );
}

const Main = styled.View`
  position: relative;
`;
const Container = styled.FlatList`
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: scroll;
  max-height: ${screenHeight - 204}px;
`;

const CartInfo = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: white;
  height: 85px;
  border-top-width: 1px;
  border-top-color: #d5d5d5;
`;

const Button = styled.TouchableOpacity`
  height: 40px;
  width: 195px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7ca039;
  border-radius: 8px;
`;
const ButtonText = styled.Text`
  color: white;
`;
const Price = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const Qty = styled.Text`
  font-size: 20px;
`;
