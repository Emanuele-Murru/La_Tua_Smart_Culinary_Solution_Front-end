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
    ingredients: undefined,
  };

  ingredients: Ingredient[] = [];
  newIngredient: Ingredient = {
    name: '',
    quantity: undefined,
  }

  constructor(private RecipeService: RecipeService, private AuthSrv: AuthService) {}

  ngOnInit(): void {
    this.loadRecipes();
    this.loadIngredients();
    if(this.AuthSrv.getRoleFromToken() === "ADMIN") {
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
          console.error("Error fetching recipes", error);
        }
    )
  }

  loadIngredients() {
    this.RecipeService.getIngredients(0, 'name').subscribe(
      (ingredients: Ingredient[]) => {
        console.log(ingredients);
        this.ingredients = ingredients;
      },
      (error) => {
        console.error("Error fetching ingredients", error);
      }
      )
  }

    showAdminMode() {
      this.showForms = true;
    }

  // createRecipe() {
  //   this.RecipeService.createRecipe(this.newRecipe).subscribe(
  //     (recipeCreated: Recipe) => {
  //       console.log("Ricetta creata:", recipeCreated);
  //       // Resetta i campi della nuova fattura
  //       this.newRecipe = {
  //         "title":"",
  //         "category":"",
  //         "instructions":"",
  //         "prepTime":"",
  //         "cookTime": "",
  //         "servings": null!,
  //         "ingredients": undefined
  //     };
  //       // Ricarica la lista delle ricette dopo la creazione
  //       this.loadRecipes();
  //     },
  //     (error) => {
  //       console.error('Errore durante la creazione della ricetta:', error);
  //     }
  //   );
  // }

  // createRecipe() {
  //   // Crea un oggetto Recipe con i campi forniti
  //   const recipeToAdd: Recipe = {
  //     title: this.newRecipe.title,
  //     category: this.newRecipe.category,
  //     instructions: this.newRecipe.instructions,
  //     prepTime: this.newRecipe.prepTime,
  //     cookTime: this.newRecipe.cookTime,
  //     servings: this.newRecipe.servings,
  //     ingredients: [
  //       {
  //         name: this.selectedIngredient, // Nome dell'ingrediente selezionato
  //         quantity: this.newIngredient.quantity // Quantità dell'ingrediente
  //       }
  //     ]
  //   };

  //   this.RecipeService.createRecipe(recipeToAdd).subscribe(
  //     (recipeCreated: Recipe) => {
  //       console.log("Ricetta creata:", recipeCreated);
  //       // Resetta i campi della nuova ricetta
  //       this.newRecipe = {
  //         title: '',
  //         category: '',
  //         instructions: '',
  //         prepTime: '',
  //         cookTime: '',
  //         servings: null!,
  //         ingredients: undefined
  //       };
  //       // Ricarica la lista delle ricette dopo la creazione
  //       this.loadRecipes();
  //     },
  //     (error) => {
  //       console.error('Errore durante la creazione della ricetta:', error);
  //     }
  //   );
  // }

  // createRecipe() {
  //   // Crea un oggetto Recipe con i campi forniti
  //   const recipeToAdd: Recipe = {
  //     title: this.newRecipe.title,
  //     category: this.newRecipe.category,
  //     instructions: this.newRecipe.instructions,
  //     prepTime: this.newRecipe.prepTime,
  //     cookTime: this.newRecipe.cookTime,
  //     servings: this.newRecipe.servings,
  //     ingredients: []
  //   };

  //   if (this.selectedIngredient) {
  //     // L'utente ha selezionato un ingrediente esistente
  //     const selectedIngredient = this.ingredients.find(ingredient => ingredient.name === this.selectedIngredient);
  //     if (selectedIngredient) {
  //       // Aggiungi l'ingrediente selezionato alla ricetta
  //       recipeToAdd.ingredients.push(selectedIngredient);
  //     }
  //   } else {
  //     // L'utente sta creando un nuovo ingrediente
  //     const newIngredient: Ingredient = {
  //       name: this.newIngredient.name,
  //       quantity: this.newIngredient.quantity
  //     };

  //     this.RecipeService.createIngredient(newIngredient).subscribe(
  //       (ingredientCreated: Ingredient) => {
  //         console.log("Ingrediente creato:", ingredientCreated);
  //         // Aggiungi il nuovo ingrediente alla ricetta
  //         recipeToAdd.ingredients.push(ingredientCreated);
  //         this.createNewRecipe(recipeToAdd);
  //       },
  //       (error) => {
  //         console.error("Errore durante la creazione dell'ingrediente:", error);
  //       }
  //     );
  //   }
  // }

  // createNewRecipe(recipeToAdd: Recipe) {
  //   this.RecipeService.createRecipe(recipeToAdd).subscribe(
  //     (recipeCreated: Recipe) => {
  //       console.log("Ricetta creata:", recipeCreated);
  //       // Resetta i campi della nuova ricetta
  //       this.newRecipe = {
  //         title: '',
  //         category: '',
  //         instructions: '',
  //         prepTime: '',
  //         cookTime: '',
  //         servings: null!,
  //         ingredients: []
  //       };
  //       // Ricarica la lista delle ricette dopo la creazione
  //       this.loadRecipes();
  //     },
  //     (error) => {
  //       console.error('Errore durante la creazione della ricetta:', error);
  //     }
  //   );
  // }

  addIngredientToList() {
    if (this.newIngredient.name && this.newIngredient.quantity) {
      // Verifica se il nome e la quantità dell'ingrediente sono stati forniti
      const newIngredient: Ingredient = {
        name: this.newIngredient.name,
        quantity: this.newIngredient.quantity
      };

      // Aggiungi l'ingrediente alla lista degli ingredienti selezionati
      this.selectedIngredients.push(newIngredient);

      // Pulisci i campi dell'ingrediente appena aggiunto
      this.newIngredient = {
        name: '',
        quantity: undefined
      };
    }
  }

  createRecipe() {
    // Crea un oggetto Recipe con i campi forniti
    const recipeToAdd: Recipe = {
      title: this.newRecipe.title,
      category: this.newRecipe.category,
      instructions: this.newRecipe.instructions,
      prepTime: this.newRecipe.prepTime,
      cookTime: this.newRecipe.cookTime,
      servings: this.newRecipe.servings,
      ingredients: this.selectedIngredients // Utilizza gli ingredienti selezionati
    };

    this.RecipeService.createRecipe(recipeToAdd).subscribe(
      (recipeCreated: Recipe) => {
        console.log("Ricetta creata:", recipeCreated);
        // Resetta i campi della nuova ricetta
        this.newRecipe = {
          title: '',
          category: '',
          instructions: '',
          prepTime: '',
          cookTime: '',
          servings: null!,
          ingredients: undefined
        };
        // Resetta l'elenco degli ingredienti selezionati
        this.selectedIngredients = [];
        // Ricarica la lista delle ricette dopo la creazione
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
        console.log("Ingredient created:", ingredientCreated);
        this.newIngredient = {
          "name": "",
          "quantity": ""
        };
        this.loadIngredients();
      },
      (error) => {
        console.error("Errore durante la creazione dell'ingredient:", error);
      }
    )
  }
}
