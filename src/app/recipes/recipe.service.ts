import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';

@Injectable()
export class RecipeService {
    recipesChanged = new EventEmitter<Recipe[]>();
    
    private recipes: Recipe[] = [
        new Recipe('Schnitzel', 'Very tasty', 
        'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fhotellitlennotmatkat.fi%2Fkuvat%2Fitavaltalainen-keittio-wienin-leike-ruoka.jpg&f=1', []),
        new Recipe('Summer Salad', 'Okayish',
         'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [
             new Ingredient('Tomato', 2),
             new Ingredient('Kukumberg', 1),
             new Ingredient('Tofu', 1)
         ])
    ]

  constructor(private http: Http) { }
  
  getRecipes() {
      return this.recipes;
  }
  
  getRecipe(id: number) {
      return this.recipes[id];
  }
  
  deleteRecipe(recipe: Recipe) {
      this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }
  
  addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
  }
  
  editRecipe(oldRecipe: Recipe, newRepice: Recipe) {
      this.recipes[this.recipes.indexOf(oldRecipe)] = newRepice;
  }
  
  storeData() {
      const body = JSON.stringify(this.recipes);
      const headers = new Headers({
          'Content-Type': 'application/json'
      });
      return this.http.put('https://recipebook-254f1.firebaseio.com/recipes.json', body, {headers: headers});
  }
  
  fetchData() {
      return this.http.get('https://recipebook-254f1.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
          (data: Recipe[]) => {
              this.recipes = data;
              this.recipesChanged.emit(this.recipes);
          }
      );
  }

}
