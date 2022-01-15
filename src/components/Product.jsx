import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { addItem, getTotals, removeItem } from "../redux/reducers/cartItems";
import styled from "styled-components/native";

export default function Product({ item }) {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addProductHandler = (data) => {
    dispatch(addItem(data));
    dispatch(getTotals());
  };
  return (
    <Container>
      <Img
        source={
          item?.thumb_img
            ? item.thumb_img.files.file
            : require("../../assets/images/notfound.jpg")
        }
      />
      <TextContainer>
        <TextTitle numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </TextTitle>
        <TextPrice>
          {item.original_price}
          <TextPrice>₾</TextPrice>
        </TextPrice>
      </TextContainer>
      <Cart onPress={() => addProductHandler(item)}>
        <Ionicons name={"cart"} size={16} color={"grey"} />
      </Cart>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  border-bottom-width: 1px;
  border-bottom-color: #d5d5d5;
  color: #092b43;
  position: relative;
  flex-direction: row;
  background-color: white;
  overflow: hidden;
  padding: 15px;
`;
const Img = styled.Image`
  width: 30%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
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
const Cart = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #dcdfe6;
  position: absolute;
  right: 15px;
  bottom: 15px;
`;
