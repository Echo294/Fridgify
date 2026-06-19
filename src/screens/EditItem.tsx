import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { supabase } from "../lib/supabase";

type Item = {
  id: number;
  name: string;
  quantity: number;
  category: string;
  expiration: string;
};

export default function EditItem() {
  const route = useRoute<RouteProp<{ params: { item: Item } }, "params">>();
  const navigation = useNavigation();
  const { item } = route.params as { item: Item };

  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(String(item.quantity));
  const [category, setCategory] = useState(item.category);
  const [expiration, setExpiration] = useState(item.expiration);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("items")
      .update({
        name,
        quantity: Number(quantity),
        category,
        expiration,
      })
      .eq("id", item.id);

    if (error) {
      console.log("Error updating item:", error);
    } else {
      console.log("Item updated");
      navigation.goBack();
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Edit Item</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Quantity"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Category"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        value={expiration}
        onChangeText={setExpiration}
        placeholder="Expiration"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Button title="Save Changes" onPress={handleUpdate} />
    </View>
  );
}
