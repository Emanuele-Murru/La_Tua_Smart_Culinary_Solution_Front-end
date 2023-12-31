import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Recipe } from '../models/recipe.interface';
import { Ingredient } from '../models/ingredient.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private urlRecipes: string = 'http://localhost:3001/recipes';
  private urlIngredients: string = 'http://localhost:3001/ingredients';

  constructor(private http: HttpClient) {}

  getRecipes(page: number, order: string): Observable<Recipe[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('order', order);
    const headers = new HttpHeaders({
      Autorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(this.urlRecipes, { params, headers})
    .pipe(map(response => response.content));
  }

  getIngredients(page: number, order: string): Observable<Ingredient[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('order', order);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(this.urlIngredients, { params, headers})
    .pipe(map(response => response.content));
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<Recipe>(this.urlRecipes, recipe, { headers });
  }

  createIngredient(ingredient: Ingredient): Observable<Ingredient> {
    const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<Ingredient>(this.urlIngredients, ingredient, { headers });
  }

  updateRecipe(id:number, recipe: Recipe): Observable<Recipe> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const url = `${this.urlRecipes}/${id}`;
    return this.http.put<Recipe>(url, recipe, { headers });
  }

  deleteRecipe(recipeId: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const url = `${this.urlRecipes}/${recipeId}`;
    return this.http.delete<void>(url, { headers });
  }

  getRecipeById(recipeId: number) {
    return this.http.get<Recipe>(`${this.urlRecipes}/${recipeId}`);
  }

  getRecipesByCategory(category: string | null, page: number, order: string): Observable<Recipe[]> {
    const params = new HttpParams()
      .set('category', category || '')
      .set('page', page.toString())
      .set('order', order);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<any>(`${this.urlRecipes}/byCategory`, { params, headers })
      .pipe(map(response => response.content));
  }

  searchRecipesByIngredients(ingredients: string[]): Observable<Recipe[]> {
    const params = new HttpParams().set('ingredients', ingredients.join(','));
    return this.http.get<Recipe[]>(`${this.urlRecipes}/search`, { params });
  }
}
