export interface Recipe {
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime?: string; // Optional if cookTime may not be present
  servings: string;
  imageUrl: string;
}
