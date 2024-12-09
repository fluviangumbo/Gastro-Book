import { User, Recipe } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// Define types for the arguments
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface RecipeArgs {
  recipeId: string;
}

interface AddRecipeArgs {
  input: {
    recipeName: string;
    recipeAuthor: string;
    recipeDescription: string;
    servingSize: string;
    ingredients: string[];
    instructions: string[];
    tags: string[];
  }
}

// interface RemoveRecipeArgs {
//   recipeName: string;
// }

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate('recipes');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return await User.findOne({ username }).populate('recipes');
    },
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return await User.findById(context.user._id).populate('recipes');
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
    recipes: async () => {
      return await Recipe.find().populate('recipeAuthor').limit(20);
      //Recipe.find({_id: {$ne:houseUser._id}}) -- This is for if we want to exclude house recipes down the road
    },
    recipe: async (_parent: any, { recipeId }: RecipeArgs) => {
      return await Recipe.findById(recipeId).populate('recipeAuthor');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user. User not found.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user. Incorrect password.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    addRecipe: async (_parent: any, { input }: AddRecipeArgs, context: any) => {
      const userId = context.user._id;

      const newRecipe = await Recipe.create({ ...input, recipeAuthor: userId });

      return await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { recipes: newRecipe._id },
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate('recipes');
    },
    removeRecipe: async (_parent: any, { recipeId }: RecipeArgs , context: any) => {
      console.log("server side recipeId: ", recipeId);
      if(!context.user) {
        throw new AuthenticationError('You need to be logged in to do that!');
      }
      const userId = context.user._id;

      let currentRecipe = await Recipe.findById(recipeId);
      console.log("Current Recipe: ", currentRecipe);

      let currentId = currentRecipe?._id;

      let user = await User.findOneAndUpdate(
          { _id: userId }, 
          { $pull: { recipes: currentId } },
          { new: true }
        ).populate('recipes');

      console.log("Updated User: ", user);
      return user;
    },
  },
};

export default resolvers;
