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
      difficulty: recipe.difficulty
    };
    recipes.push(newRecipe);
    await this.store.setValue(recipes);
    return newRecipe;
  }

  async updateName(id: Number, newName: string){
    const recipes = await this.store.getValue();
    const recipeToUpdate = recipes.find(recipe => recipe.id === id);
    if (!recipeToUpdate) {
      console.error(`no ${id} found`);
      return null
    }
    recipeToUpdate.name = newName;
    await this.store.setValue(recipes);
    return recipeToUpdate;
  }
}


