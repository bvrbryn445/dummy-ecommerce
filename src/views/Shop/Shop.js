import { Container } from 'semantic-ui-react';

import ProductList from '../../components/Products/ProductList';
import FilterOptions from '../../components/FilterOptions';

export default function Shop(props) {
	const {
		products,
		addItemToCart,
		getItemQty,
		filterKeywords,
		handleFilterKeyword,
	} = props;

	return (
		<Container>
			<FilterOptions
				products={products}
				filterKeywords={filterKeywords}
				handleFilterKeyword={handleFilterKeyword}
			/> {
				<ProductList
					products={products}
					filterKeywords={filterKeywords}
					addItemToCart={addItemToCart}
					getItemQty={getItemQty}
				/>
			}
		</Container>
	)
}