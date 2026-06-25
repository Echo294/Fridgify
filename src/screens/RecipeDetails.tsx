import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { getRecipeDetails } from "../lib/recipes";

type Props = {
  route: {
    params: {
      id: string | number;
    };
  };
};

export default function RecipeDetailScreen({ route }: Props) {
  const { id } = route.params;
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getRecipeDetails(Number(id));
      setRecipe(data);
    })();
  }, [id]);

  if (!recipe) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading recipe...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Image
        source={{ uri: recipe.image }}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 10 }}>
        {recipe.title}
      </Text>

      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>
        Ingredients
      </Text>
      {recipe.extendedIngredients.map((ing: any) => (
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
