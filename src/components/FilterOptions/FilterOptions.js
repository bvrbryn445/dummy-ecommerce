import { memo } from 'react';

import { capitalizeFirstLetter, removeDuplicates } from '../../js/reusableFuncs';

import { StyledMenu } from './filter-options-styling';
import ItemCategory from './ItemCategory';
import Searchbar from './Searchbar';
import PriceRange from './PriceRange';
import SortByDropdown from './SortByDropdown';
import OrderByDropdown from './OrderByDropdown';

const FilterOptions = memo((props) => {
	const { products, itemsArrangerMethods, handleItemsArranger } = props;
	const { priceRange, category, search, orderBy, sortBy } = itemsArrangerMethods;

	const resetItemsArrangerMethods = () => {
		const defaultItemsArrangerMethods = {
			search: '',
			category: '',
			priceRange: { min: '', max: '' },
			orderBy: '',
		}
		handleItemsArranger({
			value: defaultItemsArrangerMethods,
			type: '',
		});
	}

	const areItemsArrangerMethodsEmpty = () => {
		const { min, max } = priceRange;
		return !category && !search && !min && !max && !orderBy;
	}

	// array of unique product categories
	const productCategories = removeDuplicates(products.map(product => product.category));

	const categoryOptions = productCategories.map(category => {
		const optionText = category.includes('-')
			? category.split('-')
				.map(capitalizeFirstLetter)
				.join(' ')
			: capitalizeFirstLetter(category)
		return {
			value: category,
			text: optionText,
		}
	});

	return (
		<StyledMenu>
			<Searchbar
				searchKeyword={search}
				handleItemsArranger={handleItemsArranger}
			/>
			<ItemCategory
				category={category}
				categoryOptions={categoryOptions}
				handleItemsArranger={handleItemsArranger}
			/>
			<PriceRange
				priceRange={priceRange}
				handleItemsArranger={handleItemsArranger}
			/>
			<OrderByDropdown
				orderBy={orderBy}
				handleItemsArranger={handleItemsArranger}
			/>
			<SortByDropdown
				sortBy={sortBy}
				handleItemsArranger={handleItemsArranger}
			/>
			{!areItemsArrangerMethodsEmpty() &&
				<button
					className='reset-filter'
					onClick={resetItemsArrangerMethods}
				>
					Reset filter
				</button>
			}
		</StyledMenu>
	)
});

export default FilterOptions;