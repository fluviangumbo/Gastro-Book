import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation AddRecipe($input: [RecipeInput]!) {
    addRecipe(input: $input) {
      _id
      recipes {
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
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($recipeId: ID!, $commentText: String!) {
    addComment(recipeId: $recipeId, commentText: $commentText) {
      _id
      recipes {
        recipeName
        recipeComments {
          _idRecipe
          commentText
          createdAt
        }
      }
    }
  }
`;

export const REMOVE_RECIPE = gql`
  mutation RemoveRecipe($RecipeId: ID!) {
    removeRecipe(RecipeId: $RecipeId) {
      _id
      recipes {
        recipeName
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($recipeId: ID!, $commentId: ID!) {
    removeComment(recipeId: $recipeId, commentId: $commentId) {
      _id
      recipes {
        recipeComments {
          _idRecipe
          commentText
        }
      }
    }
  }
`;
