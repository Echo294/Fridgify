import { useNavigation } from "@react-navigation/native";
import type { FC } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Recipe = {
  id: number | string;
  image: string;
  title: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
};

type Props = {
  route: {
    params: {
      recipes: Recipe[];
    };
  };
};

const RecipesScreen: FC<Props> = ({ route }) => {
  const { recipes } = route.params;
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }} // prevents cutoff
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("RecipeDetail", { id: item.id })}
          >
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />

              <Text style={styles.recipeTitle}>{item.title}</Text>

              <Text style={styles.detail}>
                Used Ingredients: {item.usedIngredientCount}
              </Text>

              <Text style={styles.detail}>
                Missing Ingredients: {item.missedIngredientCount}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RecipesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, color: "black" },

  card: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fafafa",
  },

  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },

  recipeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: 6,
  },

  detail: {
    color: "#555",
  },
});
