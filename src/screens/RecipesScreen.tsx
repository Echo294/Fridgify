import { useNavigation } from "@react-navigation/native";
import type { FC } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

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
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Recipes</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("RecipeDetail", { id: item.id })}
          >
            <View
              style={{
                marginBottom: 20,
                padding: 15,
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 10,
                backgroundColor: "#fafafa",
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: "100%",
                  height: 150,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />

              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {item.title}
              </Text>

              <Text style={{ color: "#555", marginTop: 5 }}>
                Used Ingredients: {item.usedIngredientCount}
              </Text>

              <Text style={{ color: "#555" }}>
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
