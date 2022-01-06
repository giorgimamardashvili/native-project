import React from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import Product from "../components/Product";

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
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };
  React.useEffect(() => {
    getProducts();
  }, [currentPage]);
  return (
    <FlatList
      data={products}
      renderItem={Product}
      keyExtractor={(item) => item.id}
      style={styles.container}
      ListFooterComponent={renderLoader}
      onEndReached={loadMoreItem}
      onEndReachedThreshold={0}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});
