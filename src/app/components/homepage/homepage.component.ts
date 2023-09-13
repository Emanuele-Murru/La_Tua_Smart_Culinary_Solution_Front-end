import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.interface';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  selectedIngredients: string[] = [];
  ingredientInput: string = '';
  recipes: Recipe[] = [];
  allRecipes: Recipe[] = [];
  recipesWithExactIngredients: Recipe[] = [];
  recipesWithAnyIngredients: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // All'avvio del componente, carica le ricette dal backend
    this.loadRecipes();
  }

  // Metodo per caricare le ricette dal backend
  loadRecipes() {
    this.recipeService.getRecipes(0, 'title').subscribe(
      (recipes: Recipe[]) => {
        console.log(recipes);
        this.allRecipes = recipes;
      },
      (error) => {
        console.error('Error fetching recipes', error);
      }
    );
  }
  // Metodo per cercare ricette in base agli ingredienti inseriti dall'utente
  searchRecipes() {
    const ingredients = this.ingredientInput
      .split(/[,;]/)
      .map((ingredient) => ingredient.trim());

    this.recipeService
      .searchRecipesByIngredients(ingredients)
      .subscribe((recipes) => {
        // Filtra le ricette con esattamente quegli ingredienti specificati
        console.log(`Risposta dal db:${recipes}`);

        this.recipesWithExactIngredients = recipes.filter((recipe) =>
          ingredients.every((ingredient) =>
            recipe.ingredients.some(
              (rIngredient) =>
                rIngredient.name.toLowerCase() === ingredient.toLowerCase()
            )
          )
        );
        console.log(this.recipesWithExactIngredients);

        // Filtra le ricette che includono almeno uno degli ingredienti specificati
        this.recipesWithAnyIngredients = recipes.filter((recipe) =>
          ingredients.some((ingredient) =>
            recipe.ingredients.some(
              (rIngredient) =>
                rIngredient.name.toLowerCase() === ingredient.toLowerCase()
            )
          )
        );
      });
  }
}
