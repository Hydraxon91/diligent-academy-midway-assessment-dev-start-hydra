import { Recipe, RecipeType } from "./recipe";
import { Store } from "./stores/store.type";

export async function list(store: Store<RecipeType[]>, args: string[]) {
  if (args.length>0) {
    console.error(`List shouldn't have any arguments`)
  }
  else{
    const recipe = new Recipe(store);
    const recipes = await recipe.readAll();
    const formatted = recipes
      .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
      .join('\n');
    console.log('Your recipes:');
    console.log(formatted);
  }
}

export async function details(store: Store<RecipeType[]>, args: string[]){
  if (args.length!==1) {
    console.error(`Details shouldn't have 1 argument which is a number`)
  }
  const arg = Number(args[0])
  if (isNaN(arg)) {
    console.error(`'${args[0]}' is not a number.`);
  }
  else{
    const recipe = new Recipe(store);
    const recipes = await recipe.readAll();
    const requestedRecipe = recipes.find(recipe => recipe.id === arg);
    console.log(`ID: ${requestedRecipe?.id}`);
    console.log(`Name:: ${requestedRecipe?.name}`);
  }
}