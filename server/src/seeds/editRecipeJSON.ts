import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Types } from 'mongoose';

// THIS FILE IS FOR SEEDING PURPOSES ONLY, NEED TO REMOVE null and empty "" in ingredients if run again on starter file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface OriginalRecipe {
    Name: string;
    url: string;
    Description: string;
    Author: string;
    Ingredients: string[];
    Method: string[];
}

interface TransformedRecipe {
    recipeName: string;
    recipeAuthor: Types.ObjectId;
    recipeDescription: string;
    servingSize: string;
    ingredients: string[];
    instructions: string[];
}

async function editRecipeJSON(inFilePath: string, outFilePath: string) {
    try {
        const rawData = await fs.readFile(inFilePath, 'utf8');
        const recipes: OriginalRecipe[] = JSON.parse(rawData);

        const transformedRecipes: TransformedRecipe[] = recipes.map(recipe => ({
            recipeName: recipe.Name,
            recipeAuthor: new Types.ObjectId('675238440b3a3e8ce96ad049'),
            recipeDescription: recipe.Description ?? "No description available.",
            servingSize: '2-4',
            ingredients: recipe.Ingredients,
            instructions: recipe.Method,
        }));

        await fs.writeFile(outFilePath, JSON.stringify(transformedRecipes, null, 2), 'utf8');
        console.log(`Successfully transformed recipes and saved to ${outFilePath}`);

    } catch (err) {
        console.error('JSON Processing Error:', err);
        throw new Error('Failed to process recipes.');
    }
};

async function main() {
    const inFilePath = path.resolve(__dirname, '../../src/seeds/starterRecipes.json');
    const outFilePath = path.resolve(__dirname, '../../src/seeds/formattedRecipes.json');

    console.log('__dirname:', __dirname);
    console.log('inFilePath:', inFilePath);
    console.log('outFilePath:', outFilePath);


    await editRecipeJSON(inFilePath, outFilePath);
}

main();