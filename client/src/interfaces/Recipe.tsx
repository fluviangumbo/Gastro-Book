export interface Recipe { // Recipe in full detail
    id: string; // Unique identifier
    name: string;
    author: string;
    servingSize: string;
    ingredients: string[]; // Array of ingredient strings
    instructions: string[]; // Step-by-step instructions
    tags: string[]; // Array of tags (e.g., 'vegetarian', 'gluten-free')
    // comments?: string[]; // Optional comments
  }
  

export interface RecipeSummary {   // Recipe in summary form
    id: string; // Unique identifier
    name: string;
    author: string;
    servingSize: string;
    tags: string[]; // Array of tags (e.g., 'vegetarian', 'gluten-free')
}
  