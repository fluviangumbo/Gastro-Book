import { useRouteError } from 'react-router-dom';

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oh No!!</h1>
      <p>It looks like there was a grease fire in the kitchen.</p>
      <p>Excuse me while we put this fire out!!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
