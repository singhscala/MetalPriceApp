import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{item.name} Details</Text>
      <Text>Symbol: {item.symbol}</Text>
      <Text>Price: {item.price} {item.currency}</Text>
      <Text>Open Price: {item.open_price}</Text>
      <Text>Previous Close: {item.prev_close_price}</Text>
      <Text>Time: {new Date(item.time * 1000).toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default DetailScreen;
