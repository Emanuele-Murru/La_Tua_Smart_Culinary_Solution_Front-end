import { Ingredient } from "./ingredient.interface";

export interface Recipe {
  "id"?: number;
  "title": string;
  "category": string;
  "instructions": string;
  "prepTime": string;
  "cookTime": string;
  "servings": number;
  "imageUrl": string;
  "ingredients": Ingredient[];
}
