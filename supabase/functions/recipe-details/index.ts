// Use a newer std version to ensure the server module and types are available
import { serve } from "https://deno.land/std@0.201.0/http/server.ts";

serve(async (req: Request): Promise<Response> => {
  try {
    const { id } = await req.json().catch(() => ({}));

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing recipe ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("spoonacular_key") ?? "";

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing Spoonacular API key" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error", details: err }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});
