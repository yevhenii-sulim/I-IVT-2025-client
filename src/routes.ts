import {redirect} from 'react-router-dom';
import GalleryListPage from '~/pages/galleryListPage';
import GalleryPage from '~/pages/galleryPage';
import LoginPage from '~/pages/loginPage';
import ProfilePage from '~/pages/profilePage';
import RegisterPage from '~/pages/registerPage';

export const BASE_URL = 'http://localhost:3000/api/';

export interface AppRoute {
  name: string;
  route: string;
  component: React.ComponentType;
  children?: AppRoute[];
}

export function guestOnlyLoader() {
  const token = localStorage.getItem('token');
  if (token) return redirect('/');
  return null;
}

export async function protectedLoader() {
  const token = localStorage.getItem('token');
  if (!token) return redirect('/login');
  return null;
}

export const privateRoutes: AppRoute[] = [
  {
    name: 'gallery',
    route: '/',
    component: GalleryListPage,
  },
  {name: 'images', route: '/images', component: GalleryPage},
  {name: 'profile', route: '/profile', component: ProfilePage},
];

export const publicRoutes: AppRoute[] = [
  {name: 'login', route: '/login', component: LoginPage},
  {
    name: 'register',
    route: '/register',
    component: RegisterPage,
  },
];
