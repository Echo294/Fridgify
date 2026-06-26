import type { NavigationProp } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../supabase/supabase";
import { getRecipesByIngredients } from "../lib/recipes";

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
  Recipes: { recipes: any; userIngredients: string[] };
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
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("items").delete().eq("id", id);

    if (error) {
      console.log("Error deleting item:", error);
    } else {
      fetchItems();
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, []),
  );

  const findRecipes = async () => {
    try {
      const ingredientNames = items.map((i) => i.name);

      if (ingredientNames.length === 0) {
        console.log("No ingredients found");
        return;
      }

      console.log("🔥 SCREEN CALLING FUNCTION");

      const result = await getRecipesByIngredients(ingredientNames);

      if (!result || result.length === 0) {
        console.log("No recipes found");
        return;
      }

      navigation.navigate("Recipes", {
        recipes: result,
        userIngredients: ingredientNames,
      });
    } catch (error) {
      console.log("Error finding recipes:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Items</Text>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        {["all", "fridge", "freezer", "pantry"].map((loc) => (
          <TouchableOpacity key={loc} onPress={() => setFilter(loc)}>
            <Text
              style={[styles.filterText, filter === loc && styles.filterActive]}
            >
              {loc.charAt(0).toUpperCase() + loc.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Find Recipes" onPress={findRecipes} />

      <FlatList
        data={
          filter === "all"
            ? items
            : items.filter((item) => item.location === filter)
        }
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemName}>{item.name}</Text>

            <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemDetail}>Expiration: {item.expiration}</Text>
            <Text style={styles.itemDetail}>
              Location:{" "}
              {item.location.charAt(0).toUpperCase() + item.location.slice(1)}
            </Text>

            <View style={styles.actionsRow}>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("EditItem", { item })}
              >
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, color: "black" },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  filterText: {
    fontSize: 16,
    color: "black",
  },
  filterActive: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  card: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fafafa",
  },
  itemName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
    color: "black",
  },
  itemDetail: {
    color: "#555",
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 20,
  },
  delete: { color: "red", fontWeight: "600" },
  edit: { color: "blue", fontWeight: "600" },
});
