import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
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
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation addRecipe($input: RecipeInput!) {
    addRecipe(input: $input) {
      recipes {
        recipeName
        recipeAuthor
        recipeDescription
        servingSize
        ingredients
        instructions
        tags
      }
    }
  }
`;

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: ID!) {
    removeRecipe(recipeId: $recipeId) {
      recipes
    }
  }
`;

// export const REMOVE_COMMENT = gql`
//   mutation RemoveComment($recipeId: ID!, $commentId: ID!) {
//     removeComment(recipeId: $recipeId, commentId: $commentId) {
//       _id
//       recipes {
//         recipeComments {
//           _idRecipe
//           commentText
//         }
//       }
//     }
//   }
// `;

// export const ADD_COMMENT = gql`
//   mutation AddComment($recipeId: ID!, $commentText: String!) {
//     addComment(recipeId: $recipeId, commentText: $commentText) {
//       _id
//       recipes {
//         recipeName
//         recipeComments {
//           _idRecipe
//           commentText
//           createdAt
//         }
//       }
//     }
//   }
// `;