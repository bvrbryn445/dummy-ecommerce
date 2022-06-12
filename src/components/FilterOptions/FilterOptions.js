import { StyledMenu } from './filter-options-styling';
import { capitalizeFirstLetter, removeDuplicates } from '../../js/reusableFuncs';

import ItemCategory from './ItemCategory';
import Searchbar from './Searchbar';
import PriceRange from './PriceRange';

export default function FilterOptions({ products, filterKeywords, handleFilterKeyword }) {
	const { priceRange, category, search } = filterKeywords;

	const resetFilterKeywords = () => {
		const defaultFilterKeywords = {
			...filterKeywords,
			search: '', category: '', priceRange: { min: '', max: '' },
		}
		handleFilterKeyword({ value: defaultFilterKeywords, type: '' });
	}

	const areFilterKeywordsEmpty = () => {
		const { min, max } = priceRange;
		return !category && !search && !min && !max;
	}

	// array of unique product categories
	const productCategories = removeDuplicates(
		products.map(product => product.category)
	);

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
				handleFilterKeyword={handleFilterKeyword}
			/>
			<ItemCategory
				category={category}
				categoryOptions={categoryOptions}
				handleFilterKeyword={handleFilterKeyword}
			/>
			<PriceRange
				priceRange={priceRange}
				handleFilterKeyword={handleFilterKeyword}
			/>
			{!areFilterKeywordsEmpty() &&
				<button
					className='reset-filter'
					onClick={resetFilterKeywords}
				>
					Reset filter
				</button>
			}
		</StyledMenu>
	)
}