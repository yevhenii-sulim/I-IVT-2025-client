import {NavLink} from 'react-router-dom';
import clsx from 'clsx';
import {AppRoute} from '~/routes';

const activeLinkStyle = 'text-active border-b-2 border-active';
const notActiveLinkStyle = 'text-[#000000] hover:text-active text-bold text-xl';

export default function NawLinkComponent({route}: {route: AppRoute}) {
  return (
    <NavLink
      key={route.route}
      to={route.route}
      className={({isActive}) =>
        clsx(
          isActive && activeLinkStyle,
          notActiveLinkStyle,
          route.route === '/images' ? 'hidden' : ''
        )
      }
    >
      <span className='capitalize'>{route.name}</span>
    </NavLink>
  );
}
