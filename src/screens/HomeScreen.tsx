import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  //this is just the styling of the home screen, also includes the navigation buttons
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      <Button title="Add Item" onPress={() => navigation.navigate("AddItem")} />

      <Button
        title="View Items"
        onPress={() => navigation.navigate("ViewItems")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: { fontSize: 24, marginBottom: 20 },
});
