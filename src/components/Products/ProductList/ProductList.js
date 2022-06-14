import { useState, useEffect, memo } from 'react';
import { Loader } from 'semantic-ui-react';
import { discountedPrice, mutationFilter } from '../../../js/reusableFuncs';
import DecimalPrecision from '../../../js/decimalPrecision';

import { StyledFlipMove } from './product-list-styling';
import ProductCard from '../ProductCard';

const ProductList = (props) => {
	const { products, addItemToCart, getItemQty, itemsArrangerMethods } = props;

	const [filteredProducts, setFilteredProducts] = useState(products);
	const [isLoading, setIsLoading] = useState({
		active: false,
		matchFound: false,
		duration: 3000,
	});

	// render iterated product card elements
	const IteratedProducts = filteredProducts.map(product => (
		<ProductCard
			key={`card-${product.id}`}
			product={product}
			addItemToCart={addItemToCart}
			getItemQty={getItemQty}
		/>
	))

	// filter products when user emitted events from filter options
	useEffect(() => {
		if (!products) return;
		const copiedProducts = [...products];
		const { search, category, priceRange, sortBy, orderBy } = itemsArrangerMethods;

		// filter products array by search keyword
		if (search) {
			const findKeywordMatch = (object) => {
				const productPropKeys = ['title', 'brand', 'category'];
				const lowerCaseKeyword = search.toLowerCase();
				const strMatch = (str) => str.includes(lowerCaseKeyword);
				return productPropKeys.some(key => strMatch(object[key].toLowerCase()));
			}
			mutationFilter(copiedProducts, findKeywordMatch);
		}

		// filter products array by category
		if (category) {
			const findCategoryMatch = ({ category }) => {
				return itemsArrangerMethods.category === category;
			}
			mutationFilter(copiedProducts, findCategoryMatch);
		}

		// filter products array by price range
		if (priceRange && (priceRange.min || priceRange.max)) {
			const { min, max } = priceRange;
			const findPriceRangeMatch = ({ price, discountPercentage }) => {
				const newPrice = discountedPrice(price, discountPercentage);
				const roundedPrice = DecimalPrecision.round(newPrice, 2);
				if (!min && max) {
					return 0 < roundedPrice && max > roundedPrice;
				} else if (min && !max) {
					return roundedPrice > min;
				}
				return min < roundedPrice && max > roundedPrice;
			}
			mutationFilter(copiedProducts, findPriceRangeMatch);
		}

		if (sortBy) {
			if (orderBy) {
				if (sortBy === 'asc') {
					copiedProducts.sort((a, b) => {
						//allow to sort props that may have different types (string or numeric)
						if (typeof a[orderBy] === 'string') {
							return a[orderBy].localeCompare(b[orderBy], undefined, {
								sensitivity: 'base',
							})
						} else {
							return a[orderBy] - b[orderBy];
						}
					});
				} else if (sortBy === 'desc') {
					copiedProducts.sort((a, b) => {
						//allow to sort props that may have different types (string or numeric)
						if (typeof a[orderBy] === 'string') {
							return b[orderBy].localeCompare(a[orderBy], undefined, {
								sensitivity: 'base',
							})
						} else {
							return b[orderBy] - a[orderBy];
						}
					});
				}
			} else {
				sortBy === 'asc' ? copiedProducts.sort() : copiedProducts.reverse();
			}
		}

		setFilteredProducts(([...copiedProducts]));
	}, [itemsArrangerMethods, products]);

	useEffect(() => {
		if (!filteredProducts.length) {
			setIsLoading(true);
			return;
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}, [products, filteredProducts, IteratedProducts.length]);

	return (
		isLoading
			? <Loader active>Loading</Loader>
			: <StyledFlipMove
				duration={400}
				enterAnimation='fade'
				leaveAnimation='fade'
			>
				{IteratedProducts}
			</StyledFlipMove>
	)
};

export default ProductList;