import { useState, useEffect } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { discountedPrice, mutationFilter } from '../../../js/reusableFuncs';
import DecimalPrecision from '../../../js/decimalPrecision';

import ProductCard from '../ProductCard';
import ProductListContainer from './ProductListContainer';

export default function ProductList(props) {
	const { products, addItemToCart, getItemQty, filterKeywords } = props;

	const [filteredProducts, setFilteredProducts] = useState(products);
	const [isLoading, setIsLoading] = useState(true);

	// render iterated product card elements
	const IteratedProducts = filteredProducts.map((product, productIndex) => (
		<Grid.Column key={`product-card${productIndex}`}>
			<ProductCard
				product={product}
				addItemToCart={addItemToCart}
				getItemQty={getItemQty}
			/>
		</Grid.Column>
	))

	// filter products when user emitted events from filter options
	useEffect(() => {
		if (!products) return;
		const copiedProducts = [...products];
		const { priceRange } = filterKeywords;

		// filter products array by search keyword
		if (filterKeywords.search) {
			const findKeywordMatch = (object) => {
				const productPropKeys = ['title', 'brand', 'category'];
				const lowerCaseKeyword = filterKeywords.search.toLowerCase();
				const strMatch = (str) => str.includes(lowerCaseKeyword);
				return productPropKeys.some(key => strMatch(object[key].toLowerCase()));
			}
			mutationFilter(copiedProducts, findKeywordMatch);
		}

		// filter products array by category
		if (filterKeywords.category) {
			const findCategoryMatch = ({ category }) => {
				return filterKeywords.category === category;
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
		setFilteredProducts(([...copiedProducts]));
	}, [filterKeywords, products]);

	useEffect(() => {
		if (!filteredProducts.length) {
			setIsLoading(true);
			return;
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 100);
	}, [products, filteredProducts, IteratedProducts.length]);

	return (
		isLoading ? <Loader active>Loading</Loader>
			: <>
				<ProductListContainer columns={4} only='computer'>
					{IteratedProducts}
				</ProductListContainer>
				<ProductListContainer columns={3} only='tablet'>
					{IteratedProducts}
				</ProductListContainer>
				<ProductListContainer columns={1} only='mobile'>
					{IteratedProducts}
				</ProductListContainer>
			</>
	)
}