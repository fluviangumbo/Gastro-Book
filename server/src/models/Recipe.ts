// Week18-Activity26-Solved - we didint think we needed itimport { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the User document
interface IRecipe extends Document {
  recipeName: string;
  recipeAuthor: string;
  servingSize: String;
  ingredients: string;
  instructions: string;
  
  recipe: Schema.Types.ObjectId[];
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define the schema for the Recipe document
const recipeSchema = new Schema<IRecipe>(
  {
    recipeName: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    recipeAuthor: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    servingSize: {
      type: String,
      required: true,
      unique: false,
    },
    ingredients: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    instructions: {
      type: String,
      required: true,
      unique: false,
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

recipeSchema.pre<IRecipe>('save', async function (next) {
  if (this.isNew || this.isModified('')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

recipeSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IRecipe>('Recipe', recipeSchema);

export default User;
