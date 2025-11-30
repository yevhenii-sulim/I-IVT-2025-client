import {createBrowserRouter, RouterProvider} from 'react-router';
import Root from './pages/rootPage';
import {
  guestOnlyLoader,
  privateRoutes,
  protectedLoader,
  publicRoutes,
} from './routes';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './constants/queryClient';
import LoggerPage from './components/loggerPage';

const privateRoute = privateRoutes.map(({route, component}) => ({
  path: route,
  Component: component,
  loader: protectedLoader,
  HydrateFallback: LoggerPage,
}));

const publicRoute = publicRoutes.map(({route, component}) => ({
  path: route,
  Component: component,
  loader: guestOnlyLoader,
  HydrateFallback: LoggerPage,
}));

let router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [...privateRoute, ...publicRoute],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
