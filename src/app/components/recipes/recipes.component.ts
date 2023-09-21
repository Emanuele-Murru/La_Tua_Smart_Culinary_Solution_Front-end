import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.interface';
import { Ingredient } from 'src/app/models/ingredient.interface';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  showForms: boolean = false;
  selectedIngredients: Ingredient[] = [];

  recipes: Recipe[] = [];
  newRecipe: Recipe = {
    title: '',
    category: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: null!,
    ingredients: [],
  };

  ingredients: Ingredient[] = [];
  newIngredient: Ingredient = {
    name: '',
    quantity: '',
  };

  constructor(
    private RecipeService: RecipeService,
    private AuthSrv: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
    this.loadIngredients();
    if (this.AuthSrv.getRoleFromToken() === 'ADMIN') {
      this.showForms = true;
    } else {
      this.showForms = false;
    }
  }

  loadRecipes() {
    this.RecipeService.getRecipes(0, 'title').subscribe(
      (recipes: Recipe[]) => {
        console.log(recipes);
        this.recipes = recipes;
      },
      (error) => {
        console.error('Error fetching recipes', error);
      }
    );
  }

  loadIngredients() {
    this.RecipeService.getIngredients(0, 'name').subscribe(
      (ingredients: Ingredient[]) => {
        console.log(ingredients);
        this.ingredients = ingredients;
      },
      (error) => {
        console.error('Error fetching ingredients', error);
      }
    );
  }

  addIngredientToList() {
    if (this.newIngredient.name) {
      // Verifico se il nome dell'ingrediente è stato fornito
      const newIngredient: Ingredient = {
        name: this.newIngredient.name,
        quantity: this.newIngredient.quantity,
      };

      // Aggiungo l'ingrediente alla lista degli ingredienti selezionati
      this.selectedIngredients.push(newIngredient);

      // Pulisci i campi dell'ingrediente appena aggiunto
      this.newIngredient = {
        name: '',
        quantity: '',
      };
    } else {
      console.error('Nome ingrediente obbligatorio.');
    }
  }

  createRecipe() {
    // Creazione di una nuova ricetta con ingredienti esistenti
    const recipeToAdd: Recipe = {
      title: this.newRecipe.title,
      category: this.newRecipe.category,
      instructions: this.newRecipe.instructions,
      prepTime: this.newRecipe.prepTime,
      cookTime: this.newRecipe.cookTime,
      servings: this.newRecipe.servings,
      ingredients: this.selectedIngredients,
    };

    this.RecipeService.createRecipe(recipeToAdd).subscribe(
      (recipeCreated: Recipe) => {
        console.log('Ricetta creata:', recipeCreated);
        // Resetta i campi della nuova ricetta
        this.newRecipe = {
          title: '',
          category: '',
          instructions: '',
          prepTime: '',
          cookTime: '',
          servings: null!,
          ingredients: [],
        };
        this.selectedIngredients = [];
        this.loadRecipes();
      },
      (error) => {
        console.error('Errore durante la creazione della ricetta:', error);
      }
    );
  }

  createIngredient() {
    this.RecipeService.createIngredient(this.newIngredient).subscribe(
      (ingredientCreated: Ingredient) => {
        console.log('Ingredient created:', ingredientCreated);
        // Aggiungo l'ingrediente creato all'elenco degli ingredienti selezionati
        this.selectedIngredients.push(ingredientCreated);
        this.newIngredient = {
          name: '',
          quantity: '',
        };
      },
      (error) => {
        console.error("Errore durante la creazione dell'ingrediente:", error);
      }
    );
  }

  updateRecipe(id:number, recipe: Recipe) {
    const updatedRecipe: Recipe = {
      title: this.newRecipe.title,
      category: this.newRecipe.category,
      instructions: this.newRecipe.instructions,
      prepTime: this.newRecipe.prepTime,
      cookTime: this.newRecipe.cookTime,
      servings: this.newRecipe.servings,
      ingredients: this.selectedIngredients,
    };

    this.RecipeService.updateRecipe(id, updatedRecipe).subscribe(
      (updatedRecipeResponse: Recipe) => {
        console.log('Ricetta aggiornata:', updatedRecipeResponse);
      },
      (error) => {
        console.error("Errore durante l'aggiornamento della ricetta:", error);
      }
    );
  }

  deleteRecipe(recipeId: number) {
    this.RecipeService.deleteRecipe(recipeId).subscribe(
      () => {
        console.log(`Ricetta con ID ${recipeId} cancellata con successo`);
        this.loadRecipes();
      },
      (error) => {
        console.error('Errore durante la cancellazione della ricetta:', error);
      }
    );
  }

  removeIngredient(ingredient: Ingredient) {
    const index = this.selectedIngredients.indexOf(ingredient);
    if (index !== -1) {
      this.selectedIngredients.splice(index, 1);
    }
  }

  // Metodo per uppercase prima lettera
  formatInput(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
