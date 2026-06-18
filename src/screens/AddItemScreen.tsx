import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddItemScreen() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expiration, setExpiration] = useState("");

  const handleSave = () => {
    console.log({
      name,
      quantity,
      category,
      expiration,
    });
  };

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
        placeholder="Category (fridge, freezer, pantry)"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Expiration date (YYYY-MM-DD)"
        value={expiration}
        onChangeText={setExpiration}
      />

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
