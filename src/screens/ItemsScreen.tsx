import type { NavigationProp } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../lib/supabase";

interface Item {
  id: string; // IMPORTANT FIX
  name: string;
  quantity: number;
  category: string;
  expiration: string;
}

type RootStackParamList = {
  Items: undefined;
  EditItem: { item: Item };
};

export default function ItemsScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Items">>();

  const fetchItems = async () => {
    const { data, error } = await supabase.from("items").select("*");

    if (error) {
      console.log("Error fetching items:", error);
    } else {
      setItems(data as Item[]);
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

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 15,
              padding: 10,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Expiration: {item.expiration}</Text>

            <TouchableOpacity
              onPress={() => {
                console.log("Attempting to delete:", item.id);
                handleDelete(item.id);
              }}
            >
              <Text style={{ color: "red", marginTop: 10 }}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("EditItem", { item })}
            >
              <Text style={{ color: "blue", marginTop: 10 }}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
