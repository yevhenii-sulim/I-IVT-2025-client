import {Outlet} from 'react-router-dom';
import {privateRoutes, publicRoutes} from '~/routes';
import NawLinkComponent from '~/components/nawLink';

export default function Root() {
  function guestOnlyLoader() {
    const token = localStorage.getItem('token');
    if (token) return true;
    return null;
  }
  const isExistToken = guestOnlyLoader();

  return (
    <div className=' flex flex-col min-h-screen min-w-full py-15'>
      <nav className='flex shrink-0 justify-center gap-20 mb-4'>
        {isExistToken &&
          privateRoutes.map((route) => (
            <NawLinkComponent key={route.name} route={route} />
          ))}
        {!isExistToken &&
          publicRoutes.map((route) => (
            <NawLinkComponent key={route.name} route={route} />
          ))}
      </nav>
      <main className='flex-1 flex'>
        <Outlet />
      </main>
    </div>
  );
}
