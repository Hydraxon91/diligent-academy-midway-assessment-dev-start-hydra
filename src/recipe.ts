import { Store } from "./stores/store.type"

export type RecipeType = {
  id: number
  name: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export type CreateRecipeType = Omit<RecipeType, 'id'>

export class Recipe {
  private store;

  constructor(store: Store<RecipeType[]>) {
    this.store = store;
  }

  async readAll() {
    return await this.store.getValue();
  }

  async addRecipe(recipe: CreateRecipeType){
    const recipes = await this.store.getValue();
    const newId = recipes.length > 0 ? Math.max(...recipes.map(recipe => recipe.id)) + 1 : 1;
    const newRecipe: RecipeType = {
      id: newId,
      name: recipe.name,
    };
    recipes.push(newRecipe);
    await this.store.setValue(recipes);
    return newRecipe;
  }
}


