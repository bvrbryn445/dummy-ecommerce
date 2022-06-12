import { useState, useCallback } from 'react';
import { Header } from 'semantic-ui-react';
import { StyledProductDetails } from './product-details-styling';

import TopContent from './TopContent';
import Description from './Description';
import Price from './Price';
import QtySelection from './QtySelection';
import QtyCounter from './QtyCounter';

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
	const totalQtyFromCart = getItemQty(id);
	const [qtyAmount, setQtyAmount] = useState(1);
	const handleQtyAmountChange = useCallback((_, data) => {
		setQtyAmount(Number(data.value));
	}, []);

	return (
		<StyledProductDetails>
			<TopContent
				title={title}
				brand={brand}
				category={category}
				rating={rating}
			/>
			<Description description={description} />
			<Price
				price={price}
				discountPercentage={discountPercentage}
			/>
			<Header>Stock Available: {stock} </Header>
			<QtySelection
				stock={stock}
				totalQtyFromCart={totalQtyFromCart}
				handleQtyAmountChange={handleQtyAmountChange}
			/>
			<QtyCounter
				setCartItemQty={setCartItemQty}
				resetCart={resetCart}
				totalQtyFromCart={totalQtyFromCart}
				qtyAmount={qtyAmount}
				stock={stock}
				id={id}
			/>
		</StyledProductDetails >
	)
}