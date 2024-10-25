import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // const { url }: { url: string } = await req.json();
  const { url }: { url: string } = {
    url: "https://www.bbc.co.uk/food/recipes/easy_spaghetti_bolognese_93639",
  };

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extracting recipe details from BBC Food (customize as needed)
    const ingredients: string[] = [];
    $("ul.recipe-ingredients__list > li").each((_, el) => {
      ingredients.push($(el).text().trim());
    });
    const instructions: string[] = [];
    $(".recipe-method__list-item").each((_, el) => {
      instructions.push($(el).text().trim());
    });

    const prepTime = $(".recipe-metadata__prep-time").first().text().trim();
    const cookTime = $(".recipe-metadata__cook-time").first().text().trim();
    const servings = $(".recipe-metadata__serving").first().text().trim();
    const imageUrl = $(".recipe-media__image img").attr("src") || "";

    return NextResponse.json({
      ingredients,
      instructions,
      prepTime,
      servings,
      imageUrl,
      cookTime,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch recipe" });
  }
}
