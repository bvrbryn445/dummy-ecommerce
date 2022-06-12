import { Button, Icon } from 'semantic-ui-react';
import { StyledQtyCounter, RemoveProductsButton } from './product-details-styling';

function QtyCounter(props) {
	const {
		resetCart,
		qtyAmount,
		setCartItemQty,
		stock,
		id,
		totalQtyFromCart,
	} = props;

	// this is the future amount of specific item
	// after dispatching the event from add to cart button
	const futureQtyFromCart = qtyAmount + totalQtyFromCart;

	const isFutureQtyAmountValid = stock >= futureQtyFromCart;

	const setCartItemQtyIfAvailable = ({ id, qtyAmount }) => {
		if(!isFutureQtyAmountValid) return;
		setCartItemQty({ targetId: id, quantity: qtyAmount });
	}

	return (
		<StyledQtyCounter>
			<Button
				onClick={() => setCartItemQtyIfAvailable({ id, qtyAmount })}
				size='large'
				disabled={!isFutureQtyAmountValid}
			>
				<Icon name='shopping cart' />
				{isFutureQtyAmountValid  ? 'Add to cart' : 'Not enough stock'}
			</Button>
			{
				(!!totalQtyFromCart) &&
				<RemoveProductsButton
					onClick={resetCart}
					size='large'
				>
					{`Remove added item${totalQtyFromCart ? 's' : ''} from cart`}
				</RemoveProductsButton>
			}

		</StyledQtyCounter>
	)
}

// const memoizedQtyCounter = useCall
export default QtyCounter;