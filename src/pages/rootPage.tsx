import {NavLink, Outlet} from 'react-router-dom';
import {privateRoutes, publicRoutes} from '../routes';

export default function Root() {
  function guestOnlyLoader() {
    const token = localStorage.getItem('token');
    if (token) return true;
    return null;
  }
  const isExistToken = guestOnlyLoader();

  return (
    <div>
      <nav className='flex justify-center gap-20 my-4'>
        {isExistToken &&
          privateRoutes.map((route) => (
            <NavLink
              key={route.route}
              to={route.route}
              className={({isActive}) =>
                isActive
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-blue-300 hover:text-blue-500'
              }
            >
              <span className='capitalize'>{route.name}</span>
            </NavLink>
          ))}
        {!isExistToken &&
          publicRoutes.map((route) => (
            <NavLink
              key={route.route}
              to={route.route}
              className={({isActive}) =>
                isActive
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-blue-300 hover:text-blue-500'
              }
            >
              <span className='capitalize'>{route.name}</span>
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
