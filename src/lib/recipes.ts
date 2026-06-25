import { supabase } from "../../supabase/supabase";

export async function getRecipeDetails(id: number) {
  const { data, error } = await supabase.functions.invoke("recipe-details", {
    body: { id },
  });

  if (error) throw error;
  return data;
}

export async function getRecipesByIngredients(ingredients: string) {
  const { data, error } = await supabase.functions.invoke("recipes", {
    body: { ingredients },
  });

  if (error) {
    console.log("ERROR FROM EDGE FUNCTION:", error);
    throw error;
  }

  return data;
}
