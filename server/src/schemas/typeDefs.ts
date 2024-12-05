const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    recipes: [Recipe]
  }

  type Recipe {
    _id: ID
    recipeName: String
    recipeAuthor: [User!]
    servingSize: String
    ingredients: String
    instructions: String
    recipeComments: [Comment]!
  }

  type Comment {
    _idRecipe: ID
    commentText: String
    createdAt: String
  }

  input RecipeInput {
    recipeName: String!
    recipeAuthor: String!
    servingSize: String
    ingredients: String!
    instructions: String! 
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    recipe: [Recipe]!
    recipeName: [Recipe]!
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(input: [Recipe]!): Recipe
    addComment(recipeId: ID!, commentText: String!): Recipe
    removeRecipe(RecipeId: ID!): Recipe
    removeComment(recipeId: ID!, commentId: ID!): Recipe
  }
`;

export default typeDefs;
