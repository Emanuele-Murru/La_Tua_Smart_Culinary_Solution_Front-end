import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Ingredient } from 'src/app/models/ingredient.interface';
import { Recipe } from 'src/app/models/recipe.interface';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  recipe!: Recipe;
  recipeId!:number;
  showForms: boolean = false;
  page = 0;
  selectedIngredients: Ingredient[] = [];

  instructions: string = "";
  istruzioniFormattate = this.formattaTesto(this.instructions);

  recipes: Recipe[] = [];
  newRecipe: Recipe = {
    title: '',
    category: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: null!,
    imageUrl: '',
    ingredients: [],
  };

  ingredients: Ingredient[] = [];
  newIngredient: Ingredient = {
    name: '',
    quantity: '',
    imgUrl: ''
  };

  constructor(private recipeSrv: RecipeService, private route: ActivatedRoute, private AuthSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
      this.recipeSrv.getRecipeById(this.recipeId).subscribe((recipe: any) => {
        this.recipe = recipe

        this.recipe!.instructions = this.formattaTesto(recipe.instructions);
      })
    })

    if (this.AuthSrv.getRoleFromToken() === 'ADMIN') {
      this.showForms = true;
    } else {
      this.showForms = false;
    }
  }

  formattaTesto(testo: string): string {
    const testoFormattato = testo.replace(/(\d\))/g, '\n\n$1');
    return testoFormattato;
  }

  loadRecipes() {
    this.recipeSrv.getRecipes(this.page, 'title').subscribe(
      (recipes: Recipe[]) => {
        console.log(recipes);
        this.recipes = recipes;
      },
      (error) => {
        console.error('Error fetching recipes', error);
      }
    );
  }

  updateRecipe(id: number) {
    const updatedRecipe: Recipe = {
      title: this.recipe.title,
      category: this.recipe.category,
      instructions: this.recipe.instructions,
      prepTime: this.recipe.prepTime,
      cookTime: this.recipe.cookTime,
      servings: this.recipe.servings,
      imageUrl: this.recipe.imageUrl,
      ingredients: this.selectedIngredients
    };

    this.recipeSrv.updateRecipe(id, updatedRecipe).subscribe(
      (updatedRecipeResponse: Recipe) => {
        this.recipeSrv.getRecipeById(id).subscribe((recipe: Recipe) => {
          this.recipe = recipe;
        })
        console.log('Ricetta aggiornata:', updatedRecipeResponse);
      },
      (error) => {
        console.error("Errore durante l'aggiornamento della ricetta:", error);
      }
    );
  }

  deleteRecipe(recipeId: number) {
    this.recipeSrv.deleteRecipe(recipeId).subscribe(
      () => {
        console.log(`Ricetta con ID ${recipeId} cancellata con successo`);
        this.loadRecipes();
        this.router.navigate(['/recipes'])
      },
      (error) => {
        console.error('Errore durante la cancellazione della ricetta:', error);
      }
    );
  }

  addIngredientToList() {
    if (this.newIngredient.name) {
      // Verifico se il nome dell'ingrediente è stato fornito
      const newIngredient: Ingredient = {
        name: this.newIngredient.name,
        quantity: this.newIngredient.quantity,
        imgUrl: this.newIngredient.imgUrl,
      };

      // Aggiungo l'ingrediente alla lista degli ingredienti selezionati
      this.selectedIngredients.push(newIngredient);

      // Pulisci i campi dell'ingrediente appena aggiunto
      this.newIngredient = {
        name: '',
        quantity: '',
        imgUrl:''
      };
    } else {
      console.error('Nome ingrediente obbligatorio.');
    }
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
