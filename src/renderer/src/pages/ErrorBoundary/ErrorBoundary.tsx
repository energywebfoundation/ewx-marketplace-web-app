import { Link } from 'react-router-dom';
import { routerConst } from '@ewf/lib/router';

export const ErrorBoundary = (): React.ReactNode => {
  return (
    <main>
      <h1>Something went wrong.</h1>
      <Link to={routerConst.Discover}>Go back to home page</Link>
    </main>
  );
};
