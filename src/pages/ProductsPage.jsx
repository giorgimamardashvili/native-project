import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import Product from "../components/Product";
import styled from "styled-components/native";

export default function ProductsPage() {
  const [products, setProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  async function getProducts() {
    setIsLoading(true);
    const response = await axios.get(
      `https://cms.vendoo.ge/api/beta/catalog?url=technics&page=${currentPage}`
    );
    console.log(response.data);
    setProducts((prev) => [...prev, ...response.data.products]);
    setIsLoading(false);
  }
  const renderLoader = () => {
    return isLoading ? (
      <LoaderStyle>
        <ActivityIndicator size="large" color="#aaa" />
      </LoaderStyle>
    ) : null;
  };
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };
  React.useEffect(() => {
    getProducts();
  }, [currentPage]);
  return (
    <Container
      data={products}
      renderItem={({ item }) => <Product item={item} />}
      keyExtractor={(item) => item.id}
      ListFooterComponent={renderLoader}
      onEndReached={loadMoreItem}
      onEndReachedThreshold={0}
    />
  );
}

const Container = styled.FlatList`
display: flex;
flex-direction: "column;
background-color: white;
`;
const LoaderStyle = styled.View`
  margin: 16px 0;
  align-items: center;
`;
