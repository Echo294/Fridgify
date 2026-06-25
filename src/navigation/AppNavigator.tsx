import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FeedbackScreen from "@/screens/FeedbackScreen";
import AddItemScreen from "../screens/AddItemScreen";
import EditItemScreen from "../screens/EditItem";
import HomeScreen from "../screens/HomeScreen";
import ItemsScreen from "../screens/ItemsScreen";
import LoginScreen from "../screens/LoginScreen";
import RecipeDetails from "../screens/RecipeDetails";
import RecipesScreen from "../screens/RecipesScreen";
import SignupScreen from "../screens/SignupScreen";

type Recipe = {
  id: number | string;
  image: string;
  title: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
};

type RootStackParamList = {
  ViewItems: undefined;
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  AddItem: undefined;
  EditItem: { item: any };
  Recipes: { recipes: Recipe[] };
  RecipeDetail: { id: number | string };
  Feedback: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="ViewItems" component={ItemsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
        <Stack.Screen name="EditItem" component={EditItemScreen} />
        <Stack.Screen name="Recipes" component={RecipesScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetails} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
