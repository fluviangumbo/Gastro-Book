const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    recipes: [Recipe]!
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
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
    recipes: [Recipe]!
    recipe(RecipeId: ID!): Recipe
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(input: RecipeInput!): Recipe
    removeRecipe(recipeId: ID!): Recipe
  }
`;

export default typeDefs;
