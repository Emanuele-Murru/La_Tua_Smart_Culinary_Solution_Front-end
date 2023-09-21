import { APP_BOOTSTRAP_LISTENER, Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Recipe } from 'src/app/models/recipe.interface';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})

export class HomepageComponent implements OnInit {
  recipes: Recipe[] = [];
  allRecipes: Recipe[] = [];
  recipesWithExactIngredients: Recipe[] = [];
  recipesWithAnyIngredients: Recipe[] = [];

  currentIngredient: string = '';
  ingredientsList: string[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

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

  searchRecipes() {
    const ingredients = this.ingredientsList.map((ingredient) => ingredient.trim());
    console.log('Mapped and trimmed ingredients: ', ingredients);

    this.recipeService
      .searchRecipesByIngredients(ingredients)
      .subscribe((recipes) => {

        this.recipesWithExactIngredients = recipes.filter(
          (recipe) =>
            ingredients.every((ingredient) =>
              recipe.ingredients.some(
                (rIngredient) =>
                  rIngredient.name.toLowerCase() === ingredient.toLowerCase()
              )
            ) && ingredients.length === recipe.ingredients.length
        );

        this.recipesWithAnyIngredients = recipes.filter((recipe) =>
          ingredients.some((ingredient) =>
            recipe.ingredients.some(
              (rIngredient) =>
                rIngredient.name.toLowerCase() === ingredient.toLowerCase()
            )
          )
        );
      });
      this.ingredientsList = [];
  }

  addIngredient(event: Event) {
    event?.preventDefault();
    if (this.currentIngredient.trim() !== "") {
      this.ingredientsList.push(this.currentIngredient);
      this.currentIngredient = "";
    }
  }
  removeIngredient(index: number) {
    if (index >= 0 && index < this.ingredientsList.length) {
      this.ingredientsList.splice(index, 1);
    }
  }

  // Metodo per uppercase prima lettera
  formatInput(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

}
