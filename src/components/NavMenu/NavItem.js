import { NavLink } from 'react-router-dom';
import { MenuItem, IconBtn, TotalCartItems } from './nav-menu-styling';

export default function NavItem(props) {
	const {
		icon,
		linkTxt,
		to,
		childType,
		getTotalItemsInCart,
	} = props;
	const { standard, active } = icon;
	const isTotalItemsValid =
		getTotalItemsInCart === null ? 0 : getTotalItemsInCart() > 0;
	return (
		<MenuItem as='li' childType={childType} >

			<NavLink to={to} className={({ isActive }) =>
				isActive ? 'nav-item--active' : undefined
			}>
				{({ isActive }) => (
					<>
						{isTotalItemsValid
							? <TotalCartItems>{getTotalItemsInCart()}</TotalCartItems>
							: null
						}
						<IconBtn
							src={isActive ? active : standard}
							alt={linkTxt}
						/>
						{linkTxt}
					</>
				)}
			</NavLink>
		</MenuItem>
	)
}