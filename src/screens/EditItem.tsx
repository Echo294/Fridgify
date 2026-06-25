import { Picker } from "@react-native-picker/picker";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { supabase } from "../../supabase/supabase";
import AppTextInput from "../components/AppTextInput";

type Item = {
  id: number;
  name: string;
  quantity: number;
  category: string;
  expiration: string;
  location: string;
};

export default function EditItem() {
  const route = useRoute<RouteProp<{ params: { item: Item } }, "params">>();
  const navigation = useNavigation();
  const { item } = route.params as { item: Item };

  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(String(item.quantity));
  const [category, setCategory] = useState(item.category);
  const [expiration, setExpiration] = useState(item.expiration);
  const [location, setLocation] = useState(item.location || "fridge");

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("items")
      .update({
        name,
        quantity,
        category,
        expiration,
        location,
      })
      .eq("id", item.id)
      .select();

    if (error) {
      console.log("Error updating item:", error);
    } else {
      console.log("Item updated");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Item</Text>

      <AppTextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <AppTextInput
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Quantity"
        keyboardType="numeric"
        style={styles.input}
      />

      <AppTextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Category"
        style={styles.input}
      />

      <AppTextInput
        value={expiration}
        onChangeText={setExpiration}
        placeholder="Expiration (YYYY-MM-DD)"
        style={styles.input}
      />

      <Picker
        selectedValue={location}
        onValueChange={setLocation}
        style={styles.picker}
      >
        <Picker.Item label="Fridge" value="fridge" />
        <Picker.Item label="Freezer" value="freezer" />
        <Picker.Item label="Pantry" value="pantry" />
      </Picker>

      <Button title="Save Changes" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, color: "black" },
  input: {
    marginBottom: 12,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
});
