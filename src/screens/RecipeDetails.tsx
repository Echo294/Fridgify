import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { getRecipeDetails } from "../lib/recipes";

export default function RecipeDetails({ route }: { route: any }) {
  const { id } = route.params;

  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getRecipeDetails(id);
        setRecipe(data);
      } catch (err) {
        console.log("DETAIL ERROR:", JSON.stringify(err, null, 2));
        setError("Could not load recipe. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Loading UI
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>Loading recipe...</Text>
      </View>
    );
  }

  // Error UI
  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 18, color: "red", textAlign: "center" }}>
          {error}
        </Text>
      </View>
    );
  }

  // Main UI
  if (!recipe) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "red", textAlign: "center" }}>
          Recipe not found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Image
        source={{ uri: recipe.image }}
        style={{
          width: "100%",
          height: 220,
          borderRadius: 12,
          marginBottom: 20,
        }}
      />

      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 10 }}>
        {recipe.title}
      </Text>

      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>
        Ingredients
      </Text>
      {recipe.extendedIngredients?.map((ing: any) => (
        <Text key={ing.id} style={{ marginVertical: 2 }}>
          • {ing.original}
        </Text>
      ))}

      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>
        Instructions
      </Text>
      <Text style={{ marginTop: 10, lineHeight: 22 }}>
        {recipe.instructions?.replace(/<\/?[^>]+(>|$)/g, "") ||
          "No instructions available."}
      </Text>
    </ScrollView>
  );
}
