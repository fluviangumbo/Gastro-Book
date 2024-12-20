import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      recipes {
        _id
        recipeName
        servingSize
        tags
      }
    }
  }
`;

export const QUERY_RECIPES = gql`
  query recipes {
    recipes {
      _id
      recipeName
      recipeAuthor {
        _id
        username
      }
      servingSize
    }
  }
`;

export const QUERY_RECIPE = gql`
  query recipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      recipeName
      recipeAuthor {
        _id
        username
      }
      recipeDescription
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
        tags
      }
    }
  }
`;
