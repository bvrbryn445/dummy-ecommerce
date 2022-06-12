import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductList from '../ProductList';

beforeEach(() => {
  jest.resetModules();
});

//setup mock components
jest.mock('../ProductList', () => {
	const originalModule = jest.requireActual('../ProductList');
	return {
		__esModule: true,
		...originalModule,
		default: ({ products }) => (
			products.map((product, i) => (
				<div key={i}>{product.title}</div>
			))
		),
	}
})

jest.mock('../ProductListContainer', () => ({ children }) => (
	<div data-testid='list-container'>
		{children}
	</div>
));

// setup props
const products = [
	{
		brand: 'foob',
		category: 'fooba',
		title: 'foobaz',
		price: '20',
		discountPercentage: 21.5,
	},
	{
		brand: 'barb',
		category: 'barba',
		title: 'barbaz',
		price: '200',
		discountPercentage: 21.5,
	},
	{
		brand: 'bazb',
		category: 'bazba',
		title: 'bazbar',
		price: '700',
		discountPercentage: 21.5,
	},
	{
		brand: 'foob',
		category: 'fooba',
		title: 'foobar',
		price: '2000',
		discountPercentage: 21.5,
	},
];

const filterKeywords = {
	search: 'fooba',
	category: 'bar',
	priceRange: { min: 0, max: 50 },
}

describe('ProductList', () => {
	it('must render list of items filtered by search keyword', () => {
		render(
			<Router>
				<ProductList
					products={products}
					filterKeywords={{ ...filterKeywords, category: '', priceRange: null }}
					handleFilterKeyword={jest.fn()}
					addItemToCart={jest.fn()}
					getItemQty={jest.fn()}
				/>
			</Router>
		);
		const listContainer = screen.getByTestId('list-container');

		expect(listContainer.childElementCount).toHaveLength(2);
	});
	it('must render list of items filtered by category keyword', () => {
		render(
			<Router>
				<ProductList
					products={products}
					filterKeywords={{ ...filterKeywords, search: '', priceRange: null }}
					handleFilterKeyword={jest.fn()}
					addItemToCart={jest.fn()}
					getItemQty={jest.fn()}
				/>
			</Router>
		);
		const listContainer = screen.getByTestId('list-container');

		expect(listContainer.childElementCount).toHaveLength(3);
	});
	it('must render list of items filtered by price range', () => {
		render(
			<Router>
				<ProductList
					products={products}
					filterKeywords={{ ...filterKeywords, category: '', search: '' }}
					handleFilterKeyword={jest.fn()}
					addItemToCart={jest.fn()}
					getItemQty={jest.fn()}
				/>
			</Router>
		);
		const listContainer = screen.getByTestId('list-container');

		expect(listContainer.childElementCount).toHaveLength(1);
	});
	it('must not render when the filter keywords do not match a value from the given item', () => {
		render(
			<Router>
				<ProductList
					products={products}
					filterKeywords={{ search: 'test', category: 'test', priceRange: null }}
					handleFilterKeyword={jest.fn()}
					addItemToCart={jest.fn()}
					getItemQty={jest.fn()}
				/>
			</Router>
		);

		expect(screen.queryByTestId('list-container')).not.toBeInTheDocument();
	});
})