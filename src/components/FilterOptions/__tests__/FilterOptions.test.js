import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import FilterOptions from '../FilterOptions';

beforeEach(() => {
	jest.resetModules();
});

jest.mock('../Searchbar', () => ({ searchKeyword, handleFilterKeyword }) => (
	<form onSubmit={handleFilterKeyword}>
		<input
			value={searchKeyword}
			data-testid='search-input'
			type='submit'
		/>
		<button type='submit' data-testid='search-btn' />
	</form>
));
jest.mock('../ItemCategory', () => ({ category, handleFilterKeyword }) => (
	<select
		onChange={handleFilterKeyword}
		value={category}
		data-testid='category-select'
	>
		<option value='foo'>foo</option>
		<option value='bar'>bar</option>
		<option value='baz'>baz</option>
	</select>
));
jest.mock('../PriceRange', () => ({ priceRange, handleFilterKeyword }) => (
	<form onSubmit={handleFilterKeyword} data-testid='price-range-form'>
		<input
			onChange={jest.fn()}
			value={priceRange.min}
			type='submit'
			data-testid='min-input'
		/>
		<input
			onChange={jest.fn()}
			value={priceRange.max}
			type='submit'
			data-testid='max-input'
		/>
	</form>
));

//setup props
const filterKeywords = {
	search: 'foo',
	category: 'bar',
	priceRange: { min: '0', max: '50' },
}
const products = [{ category: 'a' }];

describe('Filter options', () => {
	describe('searchbar', () => {
		it('receives the correct prop value', () => {
			const handleFilterKeyword = jest.fn(e => e.preventDefault());
			render(<FilterOptions
				products={products}
				filterKeywords={filterKeywords}
				handleFilterKeyword={handleFilterKeyword}
			/>);

			expect(screen.getByTestId('search-input')).toHaveValue('foo');
		});
		it('emits the event a correct number of times', () => {
			const handleFilterKeyword = jest.fn(e => e.preventDefault());
			render(<FilterOptions
				products={products}
				filterKeywords={filterKeywords}
				handleFilterKeyword={handleFilterKeyword}
			/>);
			const submitBtn = screen.getByTestId('search-btn');

			userEvent.click(submitBtn);
			userEvent.click(submitBtn);
			userEvent.click(submitBtn);

			expect(handleFilterKeyword).toHaveBeenCalledTimes(3);
		});
		it('submits the form after hitting enter while the input is focused', () => {
			const handleFilterKeyword = jest.fn(e => e.preventDefault());
			render(<FilterOptions
				products={products}
				filterKeywords={filterKeywords}
				handleFilterKeyword={handleFilterKeyword}
			/>);
			const input = screen.getByTestId('search-input');

			userEvent.type(input, 'foobar{Enter}');

			// make sure it calls the mock fn once
			expect(handleFilterKeyword).toHaveBeenCalled();
		});
	});

	describe('price range options', () => {
		it('receives the correct prop value', () => {
			const handleFilterKeyword = jest.fn(e => e.preventDefault());
			render(<FilterOptions
				products={products}
				filterKeywords={filterKeywords}
				handleFilterKeyword={handleFilterKeyword}
			/>);

			expect(screen.getByTestId('min-input')).toHaveValue('0');
			expect(screen.getByTestId('max-input')).toHaveValue('50');
		});
		it('submits the form after hitting enter on text inputs', () => {
			const handleFilterKeyword = jest.fn(e => e.preventDefault());
			render(<FilterOptions
				products={products}
				filterKeywords={filterKeywords}
				handleFilterKeyword={handleFilterKeyword}
			/>);
			const minInput = screen.getByTestId('min-input');
			const maxInput = screen.getByTestId('max-input');

			userEvent.type(minInput, '0', { skipClick: true });
			minInput.focus();
			userEvent.keyboard('[Enter]');
			userEvent.type(maxInput, '100', { skipClick: true });
			maxInput.focus();
			userEvent.keyboard('[Enter]');

			expect(handleFilterKeyword).toHaveBeenCalledTimes(2);
		});
	});

	describe('category dropdown options', () => {
		it('receives the correct prop value', () => {
			const handleFilterKeyword = jest.fn();
			render(<FilterOptions
				products={products}
				filterKeywords={filterKeywords}
				handleFilterKeyword={handleFilterKeyword}
			/>);

			expect(screen.getByRole('option', { name: 'foo' }).selected).toBe(false);
			expect(screen.getByRole('option', { name: 'bar' }).selected).toBe(true);
			expect(screen.getByRole('option', { name: 'baz' }).selected).toBe(false);
		});
		it('should emit the event from the select element', () => {
			const handleFilterKeyword = jest.fn();
			render(<FilterOptions
				products={products}
				filterKeywords={filterKeywords}
				handleFilterKeyword={handleFilterKeyword}
			/>);
			const categorySelect = screen.getByTestId('category-select');
			userEvent.selectOptions(categorySelect, ['baz']);

			expect(handleFilterKeyword).toHaveBeenCalled();
		});
	});

	describe('reset filter button', () => {
		it('reset the filter keywords', () => {
			const handleFilterKeyword = jest.fn();
			render(<FilterOptions
				products={products}
				filterKeywords={filterKeywords}
				handleFilterKeyword={handleFilterKeyword}
			/>);

			userEvent.click(screen.getByText(/reset/i));

			expect(handleFilterKeyword).toHaveBeenCalled();
		})
	})
})