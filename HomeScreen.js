import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [metalData, setMetalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMetalPrices = async () => {
      try {
        const endpoints = [
          { name: "Gold", url: "https://www.goldapi.io/api/XAU/USD" },
          { name: "Silver", url: "https://www.goldapi.io/api/XAG/USD" },
          { name: "Platinum", url: "https://www.goldapi.io/api/XPT/USD" },
        ];

        const results = await Promise.all(
          endpoints.map((m) =>
            axios.get(m.url, {
              headers: {
                "x-access-token": "goldapi-a4tosmevatfrw-io", 
                "Content-Type": "application/json",
              },
            })
          )
        );

        const formatted = results.map((res, i) => ({
          name: endpoints[i].name,
          symbol: res.data.metal,
          price: res.data.price,
          currency: res.data.currency,
          open_price: res.data.open_price,
          prev_close_price: res.data.prev_close_price,
          time: res.data.timestamp,
        }));

        setMetalData(formatted);
      } catch (error) {
        console.error("Error fetching metal prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetalPrices();
  }, []);

  const filteredData = metalData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading prices...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* 🔍 Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search metal (Gold, Silver, Platinum)..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detail", { item })}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>
              {item.price} {item.currency}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  card: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  price: { fontSize: 18, marginTop: 5 },
});

export default HomeScreen;
