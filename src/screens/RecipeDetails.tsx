import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading recipe...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Recipe not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }} // prevents cutoff
    >
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <Text style={styles.title}>{recipe.title}</Text>

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {recipe.extendedIngredients?.map((ing: any) => (
        <Text key={ing.id} style={styles.ingredient}>
          • {ing.original}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.instructions}>
        {recipe.instructions?.replace(/<\/?[^>]+(>|$)/g, "") ||
          "No instructions available."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: { marginTop: 10, color: "black" },
  errorText: { fontSize: 18, color: "red", textAlign: "center" },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    color: "black",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    color: "black",
  },

  ingredient: {
    marginVertical: 2,
    color: "black",
  },

  instructions: {
    marginTop: 10,
    lineHeight: 22,
    color: "black",
  },
});
