import { Recipe } from '../models/index.js'; // REMOVED USER
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {
    await Recipe.deleteMany({});
    console.log('Recipe collection cleaned.');

    // NOT DELETING BECAUSE OF HOUSEUSER
    // await User.deleteMany({});
    // console.log('User collection cleaned.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
// UPDATE