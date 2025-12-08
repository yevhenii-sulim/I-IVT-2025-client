import {createBrowserRouter, RouterProvider} from 'react-router';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './constants/queryClient';
import axios from 'axios';
import {
  BASE_URL,
  guestOnlyLoader,
  privateRoutes,
  protectedLoader,
  publicRoutes,
} from '~/routes';
import LoaderPage from '~/components/loaderPage';
import Root from '~/pages/rootPage';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const privateRoute = privateRoutes.map(({route, component}) => ({
  path: route,
  Component: component,
  loader: protectedLoader,
  HydrateFallback: LoaderPage,
}));

const publicRoute = publicRoutes.map(({route, component}) => ({
  path: route,
  Component: component,
  loader: guestOnlyLoader,
  HydrateFallback: LoaderPage,
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
