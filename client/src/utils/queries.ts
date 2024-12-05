import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const GET_USER = gql`
  query getUser($username: String!) {
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
      tags
    }
  }
`;

export const QUERY_RECIPE = gql`
  query getRecipe($recipeId: ID!) {
    recipe {
      _id
      recipeName
      recipeAuthor {
        _id
        username
      }
      servingSize
      ingredients
      instructions
      tags
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      recipes {
        _id
        recipeName
        servingSize
        ingredients
        instructions
        tags
      }
    }
  }
`;
