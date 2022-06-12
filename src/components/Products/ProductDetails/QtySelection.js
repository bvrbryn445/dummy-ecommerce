import { Dropdown } from 'semantic-ui-react';

export default function QtySelection(props) {
	const { stock, totalQtyFromCart, handleQtyAmountChange } = props;
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

	return (
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
	)
}