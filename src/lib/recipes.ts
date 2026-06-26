import { supabase } from "../../supabase/supabase";

export async function getRecipeDetails(id: number) {
  const { data, error } = await supabase.functions.invoke("recipe-details", {
    body: { id },
  });

  if (error) throw error;
  return data;
}

export async function getRecipesByIngredients(
  ingredients: string[] | string,
  page = 0,
  pageSize = 20,
) {
  console.log("USING CORRECT FILE");

  const normalizedIngredients = Array.isArray(ingredients)
    ? ingredients
    : ingredients.split(",");

  const result = await supabase.functions.invoke("recipes", {
    body: {
      userIngredients: normalizedIngredients,
      page,
      pageSize,
    },
  });

  console.log("RAW RESULT:", result);

  const { data, error } = result;

  if (error) {
    console.log("REAL ERROR:", error);
    return [];
  }

  return data ?? [];
}
