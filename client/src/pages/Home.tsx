import { useQuery } from '@apollo/client';

import { QUERY_RECIPES } from '../utils/queries.ts';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  console.log(data) // Remove this eventually
  const recipes = data?.thoughts || [];
  console.log(recipes);

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <p>Component Here</p>
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <p>Component Here</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
