import { Container } from 'semantic-ui-react';

import ProductList from '../../components/Products/ProductList';
import FilterOptions from '../../components/FilterOptions';

export default function Shop(props) {
	const {
		products,
		addItemToCart,
		getItemQty,
		itemsArrangerMethods,
		handleItemsArranger,
	} = props;

	return (
		<Container>
			<FilterOptions
				products={products}
				itemsArrangerMethods={itemsArrangerMethods}
				handleItemsArranger={handleItemsArranger}
			/> {
				<ProductList
					products={products}
					itemsArrangerMethods={itemsArrangerMethods}
					addItemToCart={addItemToCart}
					getItemQty={getItemQty}
				/>
			}
		</Container>
	)
}