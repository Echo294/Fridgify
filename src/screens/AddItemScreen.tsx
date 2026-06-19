import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function AddItemScreen() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expiration, setExpiration] = useState("");
  const [location, setLocation] = useState("fridge");

  //this bit of code handles saving the new item in the database
  //tells is what table to write to, what info it needs to insert
  //waits fot the request from supabase, than returns the result
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

    //throws up an error is something goes wrong, or saves the item and says it was successful

    if (error) {
      console.log("Error saving that item:", error);
      alert("Error saving that item. Please try again." + error.message);
    } else {
      console.log("Item saved successfully:", data);
      alert("Item saved successfully.");

      //clears form after successful save
      setName("");
      setQuantity("");
      setCategory("");
      setExpiration("");
    }
  };

  //this is just the styling of the form and all of the buttons
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Item name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Expiration date (YYYY-MM-DD)"
        value={expiration}
        onChangeText={setExpiration}
      />

      <Picker
        selectedValue={location}
        onValueChange={setLocation}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      >
        <Picker.Item label="Fridge" value="fridge" />
        <Picker.Item label="Freezer" value="freezer" />
        <Picker.Item label="Pantry" value="pantry" />
      </Picker>

      <Button title="Save Item" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});
