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
    recipeAuthor: User
    servingSize: String
    ingredients: [String]
    instructions: [String]
    tags: [String]
  }

  input RecipeInput {
    recipeName: String
    recipeAuthor: User
    servingSize: String
    ingredients: [String]
    instructions: [String]
    tags: [Sting]
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
    getUsers: [User]
    getUser(username: String!): User
    me: User
    getRecipe(recipeId: ID!): Recipe
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(input: [Recipe]!): Recipe
    removeRecipe(RecipeId: ID!): Recipe
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