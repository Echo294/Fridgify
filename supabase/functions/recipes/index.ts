// Declare Deno for TypeScript so checks like `typeof Deno !== "undefined"` don't error
declare const Deno:
  | { env?: { get(key: string): string | undefined } }
  | undefined;

import { serve } from "https://deno.land/std@0.214.0/http/server.ts";

serve(async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const ingredients = url.searchParams.get("ingredients");

  if (!ingredients) {
    return new Response(JSON.stringify({ error: "Missing ingredients" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Support both Deno (Supabase Edge Functions) and Node environments.
  const apiKey =
    (typeof Deno !== "undefined"
      ? Deno.env?.get("spoonacular_key")
      : typeof process !== "undefined"
        ? process.env.SPOONACULAR_KEY
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

  const spoonacularUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${apiKey}`;

  const response = await fetch(spoonacularUrl);

  // TypeScript needs a type here
  const data = (await response.json()) as unknown;

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});
