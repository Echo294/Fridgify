import type { NavigationProp } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../lib/supabase";

interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
  expiration: string;
  location: string;
}

type RootStackParamList = {
  Items: undefined;
  EditItem: { item: Item };
};

export default function ItemsScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState("all");
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Items">>();

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("items")
      .select("id, name, quantity, category, expiration, location");

    if (error) {
      console.log("Error fetching items:", error);
    } else {
      setItems(data as Item[]);
      console.log("Fetched items:", data);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("items").delete().eq("id", id);

    if (error) {
      console.log("Error deleting item:", error);
    } else {
      console.log("Item deleted");
      fetchItems();
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, []),
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Items</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 15,
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => setFilter("all")}>
          <Text style={{ fontWeight: filter === "all" ? "bold" : "normal" }}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFilter("fridge")}>
          <Text style={{ fontWeight: filter === "fridge" ? "bold" : "normal" }}>
            Fridge
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFilter("freezer")}>
          <Text
            style={{ fontWeight: filter === "freezer" ? "bold" : "normal" }}
          >
            Freezer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFilter("pantry")}>
          <Text style={{ fontWeight: filter === "pantry" ? "bold" : "normal" }}>
            Pantry
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={
          filter === "all"
            ? items
            : items.filter((item) => item.location === filter)
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 15,
              padding: 15,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              backgroundColor: "#fafafa",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 6 }}>
              {item.name}
            </Text>

            <Text style={{ color: "#555" }}>Quantity: {item.quantity}</Text>
            <Text style={{ color: "#555" }}>Expiration: {item.expiration}</Text>
            <Text style={{ color: "#555" }}>
              Location:{" "}
              {item.location.charAt(0).toUpperCase() + item.location.slice(1)}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 12,
                gap: 20,
              }}
            >
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={{ color: "red", fontWeight: "600" }}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("EditItem", { item })}
              >
                <Text style={{ color: "blue", fontWeight: "600" }}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
