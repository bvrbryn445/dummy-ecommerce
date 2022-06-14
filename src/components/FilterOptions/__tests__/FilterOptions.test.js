/* eslint-disable max-lines-per-function */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import FilterOptions from '../FilterOptions';

jest.mock('../SortByDropdown', () => ({ sortBy }) => (
	<div data-testid='sort-by'>{sortBy}</div>
));
jest.mock('../OrderByDropdown', () => ({ orderBy }) => (
	<div data-testid='order-by'>{orderBy}</div>
));
jest.mock('../Searchbar', () => ({ searchKeyword, handleItemsArranger }) => (
	<form onSubmit={handleItemsArranger}>
		<input
			value={searchKeyword}
			data-testid='search-input'
			type='submit'
			onChange={jest.fn()}
		/>
		<button type='submit' data-testid='search-btn' />
	</form>
));
jest.mock('../ItemCategory', () => ({ category, handleItemsArranger }) => (
	<select
		onChange={handleItemsArranger}
		value={category}
		data-testid='category-select'
	>
		<option value='foo'>foo</option>
		<option value='bar'>bar</option>
		<option value='baz'>baz</option>
	</select>
));
jest.mock('../PriceRange', () => ({ priceRange, handleItemsArranger }) => (
	<form onSubmit={handleItemsArranger} data-testid='price-range-form'>
		<input
			onChange={jest.fn()}
			value={priceRange.min}
			data-testid='min-input'
		/>
		<input
			onChange={jest.fn()}
			value={priceRange.max}
			data-testid='max-input'
		/>
		<input type='submit'></input>
	</form>
));

//setup props
const itemsArrangerMethods = {
	search: 'foo',
	category: 'bar',
	priceRange: { min: '0', max: '50' },
	orderBy: 'baz',
	sortBy: 'hey',
}
const products = [{ category: 'a' }];

describe('Filter options', () => {
	describe('searchbar', () => {
		it('receives the correct prop value', () => {
			render(<FilterOptions
				products={products}
				itemsArrangerMethods={itemsArrangerMethods}
				handleItemsArranger={jest.fn(e => e.preventDefault())}
			/>);

			expect(screen.getByTestId('search-input')).toHaveValue('foo');
		});
		it('emits the event a correct number of times', () => {
			const handleItemsArranger = jest.fn(e => e.preventDefault());
			render(<FilterOptions
				products={products}
				itemsArrangerMethods={itemsArrangerMethods}
				handleItemsArranger={handleItemsArranger}
			/>);
			const submitBtn = screen.getByTestId('search-btn');

			for (let i = 0; i < 3; i++) { userEvent.click(submitBtn); }

			expect(handleItemsArranger).toHaveBeenCalledTimes(3);
		});
		it('submits the form after hitting enter while the input is focused', () => {
			const handleItemsArranger = jest.fn(e => e.preventDefault());
			render(<FilterOptions
				products={products}
				itemsArrangerMethods={itemsArrangerMethods}
				handleItemsArranger={handleItemsArranger}
			/>);

			userEvent.type(screen.getByTestId('search-input'), 'foobar{Enter}');

			// make sure it calls the mock fn once
			expect(handleItemsArranger).toHaveBeenCalled();
		});
	});

	describe('price range options', () => {
		it('receives the correct prop value', () => {
			render(<FilterOptions
				products={products}
				itemsArrangerMethods={itemsArrangerMethods}
				handleItemsArranger={jest.fn(e => e.preventDefault())}
			/>);

			expect(screen.getByTestId('min-input')).toHaveValue('0');
			expect(screen.getByTestId('max-input')).toHaveValue('50');
		});
		it('submits the form after hitting enter on text inputs', () => {
			const handleItemsArranger = jest.fn(e => e.preventDefault());
			render(<FilterOptions
				products={products}
				itemsArrangerMethods={itemsArrangerMethods}
				handleItemsArranger={handleItemsArranger}
			/>);
			const minInput = screen.getByTestId('min-input');
			const maxInput = screen.getByTestId('max-input');

			userEvent.type(minInput, '0', { skipClick: true });
			minInput.focus();
			userEvent.keyboard('[Enter]');
			userEvent.type(maxInput, '100', { skipClick: true });
			maxInput.focus();
			userEvent.keyboard('[Enter]');

			expect(handleItemsArranger).toHaveBeenCalledTimes(2);
		});
	});

	describe('category dropdown options', () => {
		it('receives the correct prop value', () => {
			render(<FilterOptions
				products={products}
				itemsArrangerMethods={itemsArrangerMethods}
				handleItemsArranger={jest.fn()}
			/>);

			expect(screen.getByRole('option', { name: 'foo' }).selected).toBe(false);
			expect(screen.getByRole('option', { name: 'bar' }).selected).toBe(true);
			expect(screen.getByRole('option', { name: 'baz' }).selected).toBe(false);
		});
		it('should emit the event from the select element', () => {
			const handleItemsArranger = jest.fn();
			render(<FilterOptions
				products={products}
				itemsArrangerMethods={itemsArrangerMethods}
				handleItemsArranger={handleItemsArranger}
			/>);
			const categorySelect = screen.getByTestId('category-select');
			userEvent.selectOptions(categorySelect, ['baz']);

			expect(handleItemsArranger).toHaveBeenCalled();
		});
	});
	describe('sort by dropdown', () => {
		it('must receive the expected prop', () => {
			render(<FilterOptions products={products} itemsArrangerMethods={itemsArrangerMethods} />);
			expect(screen.getByTestId('sort-by')).toHaveTextContent('hey');
		})
	})
	describe('order by dropdown', () => {
		it('must receive the expected prop', () => {
			render(<FilterOptions products={products} itemsArrangerMethods={itemsArrangerMethods} />);
			expect(screen.getByTestId('order-by')).toHaveTextContent('baz');
		})
	})
	describe('reset filter button', () => {
		it('reset the filter keywords', () => {
			const handleItemsArranger = jest.fn();
			render(<FilterOptions products={products} itemsArrangerMethods={itemsArrangerMethods} handleItemsArranger={handleItemsArranger} />);

			userEvent.click(screen.getByText(/reset/i));

			expect(handleItemsArranger).toHaveBeenCalled();
		})
	})
})