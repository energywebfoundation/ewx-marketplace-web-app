import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import { StoreInitializer } from '@ewf/components/StoreInitializer';
import { ExperimentalModeBanner } from './components/ExperimentalModeBanner';
import { routerConst } from './lib/router';
import { WelcomePage } from './pages/Welcome';
import { DiscoverPage } from './pages/Discover';
import { WorkerDetailsLitePage } from './pages/WorkerDetailsLite';
import { DashboardPage } from './pages/Dashboard';
import { DashboardDetails } from './pages/DashboardDetails';
import { ErrorBoundary } from './pages/ErrorBoundary';
import { NewReleaseBanner } from './components/NewReleaseBanner';
import { ElectronApi } from './lib/providers/electron';
import { isElectron } from '@main/helpers/is-electron';
import type { PreloadWindow } from '../../preload/index';
import '@ewf/styles/globals.css';
import { Api } from '@ewf/types/api';

export const router = createHashRouter([
  {
    path: routerConst.Home,
    element: isElectron() ? <WelcomePage /> : <Navigate to={routerConst.Discover} />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: routerConst.Discover,
    element: <DiscoverPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: `${routerConst.SolutionDetail}/:workerId`,
    element: <WorkerDetailsLitePage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: routerConst.Dashboard,
    element: <DashboardPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: `${routerConst.Dashboard}/:workerId`,
    element: <DashboardDetails />,
    errorElement: <ErrorBoundary />,
  },
]);

export const main = (injectedApiService: Api) =>
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <StoreInitializer injectedApiService={injectedApiService}>
      <RouterProvider router={router} />
      <ExperimentalModeBanner />
      <NewReleaseBanner />
    </StoreInitializer>,
    // </React.StrictMode>,
  );

isElectron() ? main(new ElectronApi()) : undefined;

// Declar window exposed types implemented on the preload/index.ts
declare global {
  interface Window extends PreloadWindow {}
}
