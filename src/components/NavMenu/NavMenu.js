import NavItem from './NavItem';
import OutlineCartIcon from '../../assets/icons/outline-shopping-cart.svg';
import SolidCartIcon from '../../assets/icons/solid-shopping-cart.svg';
import OutlineBagIcon from '../../assets/icons/outline-shopping-bag.svg';
import SolidBagIcon from '../../assets/icons/solid-shopping-bag.svg';

import { HeaderMenu } from './nav-menu-styling';

const navProps = [
	{
		icon: {
			standard: OutlineBagIcon,
			active: SolidBagIcon,
		},
		linkTxt: 'Shop',
		to: '/shop',
		childType: 'link',
	},
	{
		icon: {
			standard: OutlineCartIcon,
			active: SolidCartIcon,
		},
		linkTxt: '',
		to: '/cart',
		childType: 'link',
	},
];

export default function NavMenu({ getTotalItemsInCart }) {
	const NavItems = navProps.map((item, i) => {
		const { icon, activeIcon, linkTxt, to, childType } = item;
		return <NavItem
			icon={icon}
			activeIcon={activeIcon}
			getTotalItemsInCart={to === '/cart' ? getTotalItemsInCart : null}
			linkTxt={linkTxt}
			to={to}
			childType={childType}
			key={`nav-item-${i}`}
		/>
	});

	return (
		<HeaderMenu as='ul'>
			{NavItems}
		</HeaderMenu>
	)
}