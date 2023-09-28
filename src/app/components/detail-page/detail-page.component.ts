import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.interface';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  recipe: Recipe | undefined;
  recipeId!:number;

  instructions: string = "";
  istruzioniFormattate = this.formattaTesto(this.instructions);

  constructor(private recipeSrv: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
      this.recipeSrv.getRecipeById(this.recipeId).subscribe((recipe: any) => {
        this.recipe = recipe

        this.recipe!.instructions = this.formattaTesto(recipe.instructions);
      })
    })
  }

  formattaTesto(testo: string): string {
    const testoFormattato = testo.replace(/(\d\))/g, '\n$1');
    return testoFormattato;
  }

}
