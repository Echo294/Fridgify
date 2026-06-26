import { useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FadeIn from "../components/FadeIn";
import RecipeCard from "../components/RecipeCard";
import { getRecipesByIngredients } from "../lib/recipes";

export default function RecipeScreen() {
  // Read params from navigation
  const route = useRoute();
  const { userIngredients } = route.params as { userIngredients: string[] };

  const [recipes, setRecipes] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    loadInitialRecipes();
  }, []);

  const loadInitialRecipes = async () => {
    try {
      if (!userIngredients || userIngredients.length === 0) {
        console.log("❌ No ingredients passed to RecipeScreen");
        setRecipes([]);
        setLoading(false);
        return;
      }

      const firstPage = await getRecipesByIngredients(userIngredients, 0, 20);
      setRecipes(firstPage);
      setPage(1);
    } catch (err) {
      console.log("Error loading recipes:", err);
    }
    setLoading(false);
  };

  const refreshRecipes = async () => {
    setRefreshing(true);

    try {
      const randomPage = Math.floor(Math.random() * 5); // 0–4
      const newPage = await getRecipesByIngredients(
        userIngredients,
        randomPage,
        20,
      );

      setRecipes(newPage);
      setPage(randomPage + 1);

      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    } catch (err) {
      console.log("Error refreshing recipes:", err);
    }

    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      ref={listRef}
      data={recipes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <FadeIn>
          <RecipeCard recipe={item} />
        </FadeIn>
      )}
      ListFooterComponent={
        <View style={{ padding: 20 }}>
          {refreshing ? (
            <ActivityIndicator size="large" />
          ) : (
            <TouchableOpacity
              onPress={refreshRecipes}
              style={{
                backgroundColor: "#4CAF50",
                padding: 15,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                Refresh Recipes
              </Text>
            </TouchableOpacity>
          )}
        </View>
      }
    />
  );
}
