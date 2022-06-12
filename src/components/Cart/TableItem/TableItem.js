import { useCallback } from 'react';
import { Table } from 'semantic-ui-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { discountedPrice } from '../../../js/reusableFuncs';
import DecimalPrecision from '../../../js/decimalPrecision';

import {
	CartItemImage,
	CartItemTitle,
	ItemQuantityCounter,
	ItemQuantityInputs,
} from './table-item-styling';

export default function TableItem(props) {
	const {
		product,
		indexId,
		addItemToCart,
		removeItemFromCart,
		decrementItemQty,
	} = props;
	const {
		thumbnail,
		title,
		price,
		discountPercentage,
		stock,
		id,
		quantity,
	} = product;

	const newPrice = discountedPrice(price, discountPercentage);
	const roundedPrice = DecimalPrecision.round(newPrice * quantity, 2);

	const isQtyMoreThanStock = quantity >= stock;
	const conditionalItemRemove = useCallback((id) => {
		if (quantity === 1) {
			removeItemFromCart({ targetId: id });
		} else {
			decrementItemQty({ targetId: id });
		}
	}, [quantity, removeItemFromCart, decrementItemQty]);

	return (
		<Table.Body>
			<Table.Row>
				<Table.Cell colSpan='1'>{indexId}</Table.Cell>
				<Table.Cell colSpan='3'>
					<CartItemImage>
						<LazyLoadImage src={thumbnail} />
					</CartItemImage>
				</Table.Cell>
				<Table.Cell colSpan='4'>
					<Link to={`/shop/product/${id}`}>
						<CartItemTitle>{title}</CartItemTitle>
					</Link>
				</Table.Cell>
				<Table.Cell colSpan='5'>
					<ItemQuantityInputs>
						<ItemQuantityCounter>
							<button
								className='decrement'
								onClick={() => conditionalItemRemove(id)}
							>
								-
							</button>
							<span>
								{`${quantity}`}
							</span>
							<button
								className='increment'
								disabled={isQtyMoreThanStock}
								onClick={() => addItemToCart({ targetId: id })}
							>
								+
							</button>
						</ItemQuantityCounter>
						<button
							className='simple-link'
							onClick={() => removeItemFromCart({ targetId: id })}
						>
							Remove item
						</button>
					</ItemQuantityInputs>
				</Table.Cell>
				<Table.Cell colSpan='5' textAlign='center'>
					{`$${roundedPrice}`}
				</Table.Cell>
			</Table.Row>
		</Table.Body >
	)
}