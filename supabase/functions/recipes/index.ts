// Declare Deno for TypeScript so checks like `typeof Deno !== "undefined"` don't error
console.log("🔥 EDGE FUNCTION REACHED");

declare const Deno:
  | { env?: { get(key: string): string | undefined } }
  | undefined;

import { serve } from "https://deno.land/std@0.214.0/http/server.ts";

serve(async (req: Request): Promise<Response> => {
  console.log("FUNCTION STARTED");

  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {
    console.log("JSON PARSE ERROR:", e);
  }

  const ingredients = body.ingredients;
  const page = body.page ?? 0;
  const pageSize = body.pageSize ?? 20;

  console.log("RAW BODY:", body);

  if (!ingredients) {
    return new Response(JSON.stringify({ error: "Missing ingredients" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey =
    (typeof Deno !== "undefined"
      ? Deno.env?.get("spoonacular_key")
      : undefined) ?? "";

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Missing Spoonacular API key" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const offset = page * pageSize;

  const spoonacularUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
    ingredients,
  )}&number=${pageSize}&offset=${offset}&apiKey=${apiKey}`;

  console.log("INGREDIENTS:", ingredients);
  console.log("PAGE:", page);
  console.log("PAGE SIZE:", pageSize);
  console.log("OFFSET:", offset);

  const response = await fetch(spoonacularUrl);
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});
