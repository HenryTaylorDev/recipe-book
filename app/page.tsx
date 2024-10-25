"use client";
import { useState } from "react";
import RecipeDisplay from "./components/RecipeDisplay";
import { Recipe } from "./models/Recipe";

export default function Home() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("good-food"); // Default source
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const fetchRecipe = async () => {
    const response = await fetch(`/api/scrape/${source}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setRecipe(data);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Recipe Scraper</h1>

      {/* Dropdown for selecting website */}
      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded"
      >
        <option value="good-food">BBC Good Food</option>
        <option value="bbc">BBC Food</option>
      </select>

      <input
        type="text"
        placeholder="Enter recipe URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded w-full max-w-md mb-4 shadow-sm"
      />
      <button
        onClick={fetchRecipe}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition mb-8"
      >
        Fetch Recipe
      </button>

      {recipe && (
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-xxl">
          <RecipeDisplay recipe={recipe} />
        </div>
      )}
    </div>
  );
}
