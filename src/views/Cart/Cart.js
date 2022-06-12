import { useState, useEffect, useCallback } from 'react';
import { Grid, Loader } from 'semantic-ui-react';

import ProductsTable from '../../components/Cart/ProductsTable';
import Checkout from '../../components/Cart/Checkout';
import Placeholder from '../../components/Cart/Placeholder';

import { discountedPrice } from '../../js/reusableFuncs';
import DecimalPrecision from '../../js/decimalPrecision';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
	positon: relative;
	& .right-col--sticky{
		width: 300px!important;
		& > div {
			margin-top: 30px;
			position: sticky!important;
			top: 0;
			right: 0;
		}
	}
`
export default function Cart(props) {
	const { cart } = props;
	const [isLoading, setIsLoading] = useState(true);
	const [totalCost, setTotalCost] = useState(0);

	const getTotalItems = useCallback(() => {
		return cart.reduce((total, { quantity }) => {
			return total + quantity;
		}, 0);
	}, [cart]);

	useEffect(() => {
		const calculatedTotalCost = (cart) => {
			const rawTotalCost = [...cart].reduce((totalCost, product) => {
				const { price, discountPercentage, quantity } = product;
				const newPrice = discountedPrice(price, discountPercentage);
				return totalCost + (newPrice * quantity);
			}, 0);
			return DecimalPrecision.round(rawTotalCost, 2);
		}
		const newTotalCost = calculatedTotalCost(cart);

		setTotalCost(prevTotalCost =>
			prevTotalCost + (newTotalCost - prevTotalCost));
	}, [cart]);

	// only display loader if cart is empty
	useEffect(() => {
		setIsLoading(false);
	}, [totalCost]);

	return (
		<StyledGrid container stackable>
			{isLoading && <Loader active></Loader>}
			{
				!isLoading && (cart.length && totalCost) ?
					<>
						<Grid.Row columns={2}>
							<Grid.Column width={12} only='computer'>
								<ProductsTable
									{...props}
									totalCost={totalCost}
									getTotalItems={getTotalItems}
								/>
							</Grid.Column>
							<Grid.Column width={10} only='tablet'>
								<ProductsTable
									{...props}
									totalCost={totalCost}
									getTotalItems={getTotalItems}
								/>
							</Grid.Column>
							<Grid.Column only='mobile'>
								<ProductsTable
									{...props}
									totalCost={totalCost}
									getTotalItems={getTotalItems}
								/>
							</Grid.Column>
							<Grid.Column width={4} only='computer' className='right-col--sticky'>
								<Checkout
									totalCost={totalCost}
									getTotalItems={getTotalItems}
								/>
							</Grid.Column>
							<Grid.Column
								width={6}
								only='tablet mobile'
								className='right-col--sticky'
								floated='right'
							>
								<Checkout
									totalCost={totalCost}
									getTotalItems={getTotalItems}
								/>
							</Grid.Column>
						</Grid.Row>
					</>
					: <Placeholder />
			}
		</StyledGrid>
	)
}