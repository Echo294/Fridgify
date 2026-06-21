import { supabase } from "../../supabase/supabase";

export async function getRecipesByIngredients(ingredients: string[]) {
  const { data, error } = await supabase.functions.invoke("recipes", {
    body: { ingredients: ingredients.join(",") },
  });

  if (error) {
    console.log("ERROR FROM EDGE FUNCTION:", error);
    throw error;
  }

  return data;
}
