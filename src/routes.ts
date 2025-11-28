import {fetchUser} from './api/fetchUser';
import {queryClient} from './constants/queryClient';
import GalleryPage from './pages/galleryPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import ProfilePage from './pages/profilePage';
import RegisterPage from './pages/registerPage';
import {redirect} from 'react-router-dom';

export const BASE_URL = 'http://localhost:3000/api/';

export interface AppRoute {
  name: string;
  route: string;
  component: React.ComponentType;
}

export function guestOnlyLoader() {
  const token = localStorage.getItem('token');
  if (token) return redirect('/gallery');
  return null;
}

export async function protectedLoader() {
  const token = localStorage.getItem('token');
  if (!token) return redirect('/login');

  try {
    return await queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: () => fetchUser(token),
    });
  } catch {
    localStorage.removeItem('token');
    return redirect('/login');
  }
}

export const privateRoutes: AppRoute[] = [
  {name: 'home', route: '/', component: HomePage},
  {name: 'gallery', route: '/gallery', component: GalleryPage},
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
