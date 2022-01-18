import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import {
  removeItem,
  decreaseCart,
  addItem,
  getTotals,
} from "../redux/reducers/cartItems";
import styled from "styled-components/native";

export default function CartProduct({ item }) {
  const dispatch = useDispatch();

  const removeProductHandler = (data) => {
    dispatch(removeItem(data));
    dispatch(getTotals());
  };
  const decreaseItemHandler = (data) => {
    dispatch(decreaseCart(data));
    dispatch(getTotals());
  };
  const increaseItemHandler = (data) => {
    dispatch(addItem(data));
    dispatch(getTotals());
  };

  return (
    <Container>
      <ItemTop>
        <Img
          style={{ resizeMode: "contain" }}
          source={
            item?.thumb_img
              ? { uri: `${item.thumb_img.files.file}` }
              : require("../../assets/images/notfound.jpg")
          }
        />
        <TextContainer>
          <TextTitle numberOfLines={2} ellipsizeMode="tail">
            {item.name}
          </TextTitle>
          <TextPrice>{item.original_price}₾</TextPrice>
        </TextContainer>
      </ItemTop>
      <ItemBottom>
        <Remove onPress={() => removeProductHandler(item)}>
          <Ionicons name={"trash"} size={16} color={"tomato"} />
          <RemoveText>წაშლა</RemoveText>
        </Remove>
        <QtyChange>
          <Plus onPress={() => decreaseItemHandler(item)}>
            <Ionicons name={"remove"} size={16} color={"#122545"} />
          </Plus>
          <TxtInput keyboardType={"numeric"} value={String(item.cartQty)} />
          <Plus onPress={() => increaseItemHandler(item)}>
            <Ionicons name={"add"} size={16} color={"#122545"} />
          </Plus>
        </QtyChange>
      </ItemBottom>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  border-bottom-width: 1px;
  border-bottom-color: #d5d5d5;
  color: #092b43;
  position: relative;
  flex-direction: column;
  background-color: white;
  overflow: hidden;
  padding: 15px;
`;
const ItemTop = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const ItemBottom = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 15px;
`;
const Img = styled.Image`
  width: 100px;
  height: 100px;
`;
const Remove = styled.TouchableOpacity`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const RemoveText = styled.Text`
  color: tomato;
`;
const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 70%;
`;
const TextTitle = styled.Text`
  font-size: 12px;
`;
const TextPrice = styled.Text`
  font-size: 12px;
  font-weight: bold;
`;
const QtyChange = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  border-width: 1px;
  border-color: grey;
  border-radius: 8px;
  overflow: hidden;
`;
const TxtInput = styled.TextInput`
  height: 28px;
  width: 35px;
  text-align: center;
`;
const Plus = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: grey;
`;
