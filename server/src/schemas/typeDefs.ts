const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    recipes: [Recipe]
  }

  type Recipe {
    _id: ID!
    recipeName: String!
    recipeAuthor: User!
    recipeDescription: String!
    servingSize: String!
    ingredients: [String]!
    instructions: [String]!
    tags: [String]
  }

  input RecipeInput {
    recipeName: String
    recipeAuthor: ID
    recipeDescription: String
    servingSize: String
    ingredients: [String]
    instructions: [String]
    tags: [String]
  }

  input UserInput {
    username: String
    email: String
    password: String
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    recipes: [Recipe]
    recipe(recipeId: ID!): Recipe
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(input: RecipeInput!): User
    removeRecipe(recipeID: ID!): User
  }
`;

export default typeDefs;

  // type Comment {
  //   _idRecipe: ID
  //   commentText: String
  //   createdAt: String
  // }

  // Mutation: addComment(recipeId: ID!, commentText: String!): Recipe
  // Mutation: removeComment(recipeId: ID!, commentId: ID!): Recipe