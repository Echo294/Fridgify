import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { supabase } from "../lib/supabase";

// Define the structure of an item, keeps all of these variables saved in the database
interface Item {
  id: number;
  name: string;
  quantity: number;
  category: string;
  expiration: string;
}

// This part fetches and displays a list of items from the database.
export default function ItemsScreen() {
  const [items, setItems] = useState<Item[]>([]);

  // This effect runs when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, []),
  );

  const fetchItems = async () => {
    const { data, error } = await supabase.from("items").select("*");

    if (error) {
      console.log("Error fetching items:", error);
    } else {
      setItems(data);
    }
  };
  // This part displays the list of items.
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Expiration: {item.expiration}</Text>
          </View>
        )}
      />
    </View>
  );
}
