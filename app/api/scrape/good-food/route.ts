import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  //   const { url }: { url: string } = await req.json();
  const { url }: { url: string } = {
    url: "https://www.bbcgoodfood.com/recipes/flourless-brownies",
  };

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extracting recipe details from BBC Food (customize as needed)
    const ingredients: string[] = [];
    $(".recipe__ingredients section .list > li").each((_, el) => {
      ingredients.push($(el).text().trim());
    });
    const instructions: string[] = [];
    $(".recipe__method-steps li").each((_, el) => {
      const stepText = $(el).text().trim();

      // Remove "STEP X" pattern from the start of the instruction
      const cleanedStep = stepText.replace(/^STEP\s*\d+(:|\.)?\s*/, "");
      instructions.push(cleanedStep);
    });

    const prepTime = $("li.body-copy-small.list-item span time")
      .first()
      .text()
      .trim();
    const cookTime = $(".recipe-metadata__cook-time").first().text().trim();
    const servings = $(".recipe-metadata__serving").first().text().trim();
    const imageSourceUrl =
      $(".post-header-image .image__container .image__picture .image__img")
        .attr("src")
        ?.trim() || "";
    const imageUrl = imageSourceUrl?.startsWith("http")
      ? imageSourceUrl
      : `${"https://images.immediate.co.uk"}${imageSourceUrl}`;

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
