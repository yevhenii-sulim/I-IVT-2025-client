import {NavLink} from 'react-router-dom';
import clsx from 'clsx';
import {AppRoute} from '~/routes';

const activeLinkStyle =
  'text-[#191930] border-b-2 border-[#193027] text-bold text-xl';
const notActiveLinkStyle =
  'text-[#000000] hover:text-[#000000] text-bold text-xl';

export default function NawLinkComponent({route}: {route: AppRoute}) {
  return (
    <NavLink
      key={route.route}
      to={route.route}
      className={({isActive}) =>
        clsx(isActive ? activeLinkStyle : notActiveLinkStyle)
      }
    >
      <span className='capitalize'>{route.name}</span>
    </NavLink>
  );
}
