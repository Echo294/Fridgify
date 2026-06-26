import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Recipe {
  id: string;
  image: string;
  title: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("RecipeDetails", { id: recipe.id })}
    >
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>

        <Text style={styles.subtitle}>
          Used ingredients: {recipe.usedIngredientCount}
        </Text>

        <Text style={styles.subtitle}>
          Missing ingredients: {recipe.missedIngredientCount}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
  },
});
