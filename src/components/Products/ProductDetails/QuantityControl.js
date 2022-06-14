import { useState, useCallback } from 'react';
import useTimedEvent from '../../../hooks/useTimedEvent';

import { Button, Icon, Dropdown } from 'semantic-ui-react';
import { StyledQtyCounter, RemoveProductsButton } from './product-details-styling';

export default function QuantityControl(props) {
	const { id, stock, getItemQty, setCartItemQty, resetCart } = props;

	const [qtyAmount, setQtyAmount] = useState(1);
	const [isTimerRunning, dispatch] = useTimedEvent(1600);

	const totalQtyFromCart = getItemQty(id);

	// this is the future amount of specific item
	// after dispatching the event from add to cart button
	const futureQtyFromCart = qtyAmount + totalQtyFromCart;
	const isFutureQtyAmountValid = stock >= futureQtyFromCart;

	const availableItemsToBeAdded = stock - totalQtyFromCart;

	// create list of objects with the length of available items
	const qtyOptions = Array.from(
		{ length: availableItemsToBeAdded },
		(_, i) => ({ value: i + 1, text: i + 1 }));

	const headerSelection = () => {
		if (!totalQtyFromCart) {
			return 'Choose amount of items adding to cart'
		} else if (totalQtyFromCart === 1) {
			return 'You currently have this item in the cart';
		}
		return `You currently have ${totalQtyFromCart} of these items from the cart`;
	}

	const setCartItemQtyIfAvailable = ({ id, qtyAmount }) => {
		if (!isFutureQtyAmountValid) return;
		dispatch({
			type: 'setup_event',
			payload: () => setCartItemQty({ targetId: id, quantity: qtyAmount }),
		});
}

const handleQtyAmountChange = useCallback((_, data) => {
	setQtyAmount(Number(data.value));
}, []);

const handleResetCart = () => {
	if (isTimerRunning) {
		dispatch({ type: 'reset' });
	}
	resetCart();
}

return (
	<>
		<div>
			<p>
				<i>
					{headerSelection()}
				</i>
			</p>
			<span>
				Qty: <Dropdown
					defaultValue={1}
					scrolling options={qtyOptions}
					onChange={handleQtyAmountChange}
				/>
			</span>
		</div>
		<StyledQtyCounter>
			<Button
				loading={isTimerRunning}
				onClick={() => setCartItemQtyIfAvailable({ id, qtyAmount })}
				size='large'
				disabled={isTimerRunning || !isFutureQtyAmountValid}
			>
				<Icon name='shopping cart' />
				{isFutureQtyAmountValid ? 'Add to cart' : 'Not enough stock'}
			</Button>
			{
				(!!totalQtyFromCart) &&
				<RemoveProductsButton
					onClick={handleResetCart}
					size='large'
				>
					{`Remove added item${totalQtyFromCart ? 's' : ''} from cart`}
				</RemoveProductsButton>
			}
		</StyledQtyCounter>
	</>
)
}