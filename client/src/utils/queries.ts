import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      Recipe {
        _id
        username
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
`;

export const QUERY_RECIPE = gql`
  query getRecipe {
    re {
      _id
      recipeName
      recipeAuthor {
        _id
        username
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
`;

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
    }
  }
`;
