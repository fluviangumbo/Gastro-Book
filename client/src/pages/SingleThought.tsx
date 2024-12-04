import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_RECIPE } from '../utils/queries.ts';

const SingleRecipe = () => {
  const { recipeId } = useParams();

  const { loading, data } = useQuery(QUERY_RECIPE, {
    variables: { recipeId: recipeId },
  });

  const recipe = data?.recipe || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {recipe.recipeAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this recipe on {new Date(Number(recipe.createdAt)).toLocaleString()}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {recipe.recipeText}
        </blockquote>
      </div>

      <div className="my-5">
        <p>Component Here</p>
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <p>Component Here</p>
      </div>
    </div>
  );
};

export default SingleRecipe;
