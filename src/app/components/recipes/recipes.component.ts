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

  // addIngredientToList() {
  //   if (this.newIngredient.name && this.newIngredient.quantity) {
  //     // Verifica se il nome e la quantità dell'ingrediente sono stati forniti
  //     const newIngredient: Ingredient = {
  //       name: this.newIngredient.name,
  //       quantity: this.newIngredient.quantity
  //     };

  //     // Aggiungi l'ingrediente alla lista degli ingredienti selezionati
  //     this.selectedIngredients.push(newIngredient);

  //     // Pulisci i campi dell'ingrediente appena aggiunto
  //     this.newIngredient = {
  //       name: '',
  //       quantity: ''
  //     };
  //   }
  // }

  addIngredientToList() {
    if (this.newIngredient.name) {
      // Verifico se il nome dell'ingrediente è stato fornito
      const newIngredient: Ingredient = {
        name: this.newIngredient.name,
        quantity: this.newIngredient.quantity,
      };

      // Aggiungi l'ingrediente alla lista degli ingredienti selezionati
      this.selectedIngredients.push(newIngredient);

      // Pulisci i campi dell'ingrediente appena aggiunto
      this.newIngredient = {
        name: '',
        quantity: '',
      };
    } else {
      // Messaggio di errore o gestione degli errori se il nome dell'ingrediente è mancante
      console.error('Nome ingrediente obbligatorio.');
    }
  }

  // createRecipe() {
  //   const recipeToAdd: Recipe = {
  //     title: this.newRecipe.title,
  //     category: this.newRecipe.category,
  //     instructions: this.newRecipe.instructions,
  //     prepTime: this.newRecipe.prepTime,
  //     cookTime: this.newRecipe.cookTime,
  //     servings: this.newRecipe.servings,
  //     ingredients: this.selectedIngredients,
  //   };

  //   this.RecipeService.createRecipe(recipeToAdd).subscribe(
  //     (recipeCreated: Recipe) => {
  //       console.log('Ricetta creata:', recipeCreated);
  //       // Resetta i campi della nuova ricetta
  //       this.newRecipe = {
  //         title: '',
  //         category: '',
  //         instructions: '',
  //         prepTime: '',
  //         cookTime: '',
  //         servings: null!,
  //         ingredients: undefined,
  //       };
  //       // Resetta l'elenco degli ingredienti selezionati
  //       this.selectedIngredients = [];
  //       // Ricarica la lista delle ricette dopo la creazione
  //       this.loadRecipes();
  //     },
  //     (error) => {
  //       console.error('Errore durante la creazione della ricetta:', error);
  //     }
  //   );
  // }

  // createIngredient() {
  //   this.RecipeService.createIngredient(this.newIngredient).subscribe(
  //     (ingredientCreated: Ingredient) => {
  //       console.log('Ingredient created:', ingredientCreated);
  //       // Aggiungi l'ingrediente creato all'elenco degli ingredienti solo dopo la conferma dal server
  //       this.ingredients.push(ingredientCreated);
  //       // Resetta i campi dell'ingrediente appena creato
  //       this.selectedIngredients;
  //       this.newIngredient = {
  //         name: '',
  //         quantity: '',
  //       };
  //     },
  //     (error) => {
  //       console.error("Errore durante la creazione dell'ingrediente:", error);
  //     }
  //   );
  // }

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
    // Creazione di un nuovo ingrediente
    this.RecipeService.createIngredient(this.newIngredient).subscribe(
      (ingredientCreated: Ingredient) => {
        console.log('Ingredient created:', ingredientCreated);
        // Aggiungi l'ingrediente creato all'elenco degli ingredienti selezionati
        this.selectedIngredients.push(ingredientCreated);
        // Resetta i campi dell'ingrediente appena creato
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

  updateRecipe(recipe: Recipe) {
    const updatedRecipe: Recipe = {
      title: this.newRecipe.title,
      category: this.newRecipe.category,
      instructions: this.newRecipe.instructions,
      prepTime: this.newRecipe.prepTime,
      cookTime: this.newRecipe.cookTime,
      servings: this.newRecipe.servings,
      ingredients: this.selectedIngredients,
    };

    this.RecipeService.updateRecipe(updatedRecipe).subscribe(
      (updatedRecipeResponse: Recipe) => {
        console.log('Ricetta aggiornata:', updatedRecipeResponse);
        // Esegui qualsiasi azione aggiuntiva necessaria dopo l'aggiornamento
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
        // Puoi aggiornare la lista delle ricette dopo la cancellazione
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
}
