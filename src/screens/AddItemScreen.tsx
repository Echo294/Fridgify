import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { supabase } from "../../supabase/supabase";
import AppTextInput from "../components/AppTextInput";

export default function AddItemScreen() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expiration, setExpiration] = useState("");
  const [location, setLocation] = useState("fridge");

  const handleSave = async () => {
    const { data, error } = await supabase
      .from("items")
      .insert([
        {
          name,
          quantity,
          category,
          expiration,
          location,
        },
      ])
      .select();

    if (error) {
      console.log("Error saving that item:", error);
      alert("Error saving that item. Please try again." + error.message);
    } else {
      console.log("Item saved successfully:", data);
      alert("Item saved successfully.");

      setName("");
      setQuantity("");
      setCategory("");
      setExpiration("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Item</Text>

      <AppTextInput
        placeholder="Item name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <AppTextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />

      <AppTextInput
        placeholder="Expiration date (YYYY-MM-DD)"
        value={expiration}
        onChangeText={setExpiration}
        style={styles.input}
      />

      <Picker
        selectedValue={location}
        onValueChange={setLocation}
        style={styles.picker}
      >
        <Picker.Item label="Fridge" value="fridge" color="black" />
        <Picker.Item label="Freezer" value="freezer" color="black" />
        <Picker.Item label="Pantry" value="pantry" color="black" />
      </Picker>

      <Button title="Save Item" onPress={handleSave} />
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
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    color: "black", // helps some Android versions
  },
});
