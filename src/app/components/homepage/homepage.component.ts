import { Component, OnInit } from '@angular/core';
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

  isFirstLoad!: boolean;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
    const isFirstLoad = sessionStorage.getItem('isFirstLoad') === 'true';
    this.isFirstLoad = isFirstLoad;

    if (this.isFirstLoad) {
      const container = document.getElementById('contenitore');
      container!.style.display = 'none';

      setTimeout(() => {
        const video = document.getElementById('myVideo');
        video!.style.display = 'none';
        container!.style.display = 'block';
      }, 3500);

      this.isFirstLoad = true;
    }
    sessionStorage.setItem('isFirstLoad', 'false')

    window.addEventListener('scroll', () => {
      const button = document.getElementById('back-to-top');
      if (window.scrollY > 100) {
        button!.style.display = 'block';
      } else {
        button!.style.display = 'none';
      }
    });
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
    const ingredients = this.ingredientsList.map((ingredient) =>
      ingredient.trim()
    );
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
        if (
          !this.recipesWithExactIngredients.length &&
          !this.recipesWithAnyIngredients.length
        ) {
          const modale = document.getElementById('noIngredientModal');
          modale!.classList.add('show');
          modale!.style.display = 'block';
        }
      });
    this.ingredientsList = [];
  }

  addIngredient(event: Event) {
    event?.preventDefault();
    if (this.currentIngredient.trim() !== '') {
      this.ingredientsList.push(this.currentIngredient);
      this.currentIngredient = '';
    }
  }

  removeIngredient(index: number) {
    if (index >= 0 && index < this.ingredientsList.length) {
      this.ingredientsList.splice(index, 1);
    }
  }

  closeModal() {
    const noIngredientModal = document.getElementById('noIngredientModal');
    noIngredientModal!.classList.remove('show');
    noIngredientModal!.style.display = 'none';
  }

  formatInput(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
