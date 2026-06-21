import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddItemScreen from "../screens/AddItemScreen";
import EditItemScreen from "../screens/EditItem";
import HomeScreen from "../screens/HomeScreen";
import ItemsScreen from "../screens/ItemsScreen";
import LoginScreen from "../screens/LoginScreen";
import RecipesScreen from "../screens/RecipesScreen";
import SignupScreen from "../screens/SignupScreen";

type RootStackParamList = {
  ViewItems: undefined;
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  AddItem: undefined;
  EditItem: undefined;
  Recipes: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
