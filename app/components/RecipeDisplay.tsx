import Image from "next/image";
import { Recipe } from "../models/Recipe";

interface RecipeProps {
  recipe: Recipe;
}

// Separate display components for each website
const RecipeDisplay = ({ recipe }: RecipeProps) => {
  console.log(recipe);
  return (
    <div className=" w-full">
      <div className="flex justify-between gap-4">
        <div className="flex-1 w-full">
          {recipe.imageUrl && (
            <Image
              src={recipe.imageUrl}
              alt="Recipe Image"
              width={400}
              height={400}
            />
          )}
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Ingredients
          </h2>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
            {recipe.ingredients.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Instructions
          </h2>
          <ul className="list-decimal list-inside text-gray-600 space-y-2">
            {recipe.instructions.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ul>

          <div className="mt-6 text-gray-700">
            <p>
              <strong>Prep Time:</strong> {recipe.prepTime}
            </p>
            <p>
              <strong>Cook Time:</strong> {recipe.cookTime}
            </p>
            <p>
              <strong>Servings:</strong> {recipe.servings}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
