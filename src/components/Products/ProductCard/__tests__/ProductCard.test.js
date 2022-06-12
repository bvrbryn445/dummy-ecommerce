import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductCard from '../index';

const product = {
	discountPercentage: 40,
	id: 1,
	category: 'phone',
	price: 99.99,
	rating: 4.69,
	stock: 4,
	thumbnail: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
	title: 'iPhone 9',
	quantity: 0,
}

const addItemToCart = () => {
	product.quantity += 1;
}

const getItemQty = () => {
	return product.quantity;
}

it('should render elements with written output', () => {
	const { container } = render(
		<Router>
			<ProductCard
				product={product}
				addItemToCart={addItemToCart}
				getItemQty={getItemQty}
			/>
		</Router>
	);

	expect(container).toMatchSnapshot();
});

it('disable button and replace text with not enough stock', () => {
	const RenderProductCard = () => (
		<Router>
			<ProductCard
				product={product}
				addItemToCart={addItemToCart}
				getItemQty={getItemQty}
			/>
		</Router>
	)
	const { rerender } = render(<RenderProductCard />);
	const button = screen.getByRole('button');

	act(() => {
		for (let i = 0; i < product.stock; i++) {
			userEvent.click(button);
		}
	});

	rerender(<RenderProductCard />)
	expect(button).toHaveTextContent('Not enough stock');
	expect(button).toBeDisabled();
});