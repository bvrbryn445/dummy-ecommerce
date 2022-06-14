import { memo } from 'react';
import { Header } from 'semantic-ui-react';
import { StyledProductDetails } from './product-details-styling';

import TopContent from './TopContent';
import Description from './Description';
import Price from './Price';
import QuantityControl from './QuantityControl'

const MemoizedTopContent = memo(TopContent);
const MemoizedDescription = memo(Description);
const MemoizedPrice = memo(Price);

export default function ProductDetails(props) {
	const { product, getItemQty, setCartItemQty, resetCart } = props;
	const {
		id,
		brand,
		category,
		description,
		discountPercentage,
		price,
		rating,
		stock,
		title,
	} = product;

	return (
		<StyledProductDetails>
			<MemoizedTopContent
				title={title}
				brand={brand}
				category={category}
				rating={rating}
			/>
			<MemoizedDescription description={description} />
			<MemoizedPrice
				price={price}
				discountPercentage={discountPercentage}
			/>
			<Header>Stock Available: {stock} </Header>
			<QuantityControl
				id={id}
				stock={stock}
				getItemQty={getItemQty}
				setCartItemQty={setCartItemQty}
				resetCart={resetCart}
			/>
		</StyledProductDetails >
	)
}