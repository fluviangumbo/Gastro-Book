import { gql } from '@apollo/client';

const MUTATIONS = {
  ADD_USER: gql`
    mutation AddUser($input: UserInput!) {
      addUser(input: $input) {
        token
        user {
          _id
          username
          email
          recipe
        }
      }
    }
  `,

  LOGIN: gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          _id
          username
          email
          recipe
        }
      }
    }
  `,

  ADD_RECIPE: gql`
    mutation AddRecipe($input: [RecipeInput]!) {
      addRecipe(input: $input) {
        _id
        recipeName
        recipeAuthor {
          _id
          username
          email
        }
        servingSize
        ingredients
        instructions
        recipeComments {
          _idRecipe
          commentText
          createdAt
        }
      }
    }
  `,

  ADD_COMMENT: gql`
    mutation AddComment($recipeId: ID!, $commentText: String!) {
      addComment(recipeId: $recipeId, commentText: $commentText) {
        _id
        recipeComments {
          _idRecipe
          commentText
          createdAt
        }
      }
    }
  `,

  REMOVE_RECIPE: gql`
    mutation RemoveRecipe($RecipeId: ID!) {
      removeRecipe(RecipeId: $RecipeId) {
        _id
        recipeName
      }
    }
  `,

  REMOVE_COMMENT: gql`
    mutation RemoveComment($recipeId: ID!, $commentId: ID!) {
      removeComment(recipeId: $recipeId, commentId: $commentId) {
        _id
        recipeComments {
          _idRecipe
          commentText
          createdAt
        }
      }
    }
  `,
};

export default MUTATIONS;
