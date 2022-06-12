import { useRoutes } from 'react-router-dom';

import Home from '../../views/Home';
import Cart from '../../views/Cart';
import Shop from '../../views/Shop';
import NotFound from '../../views/NotFound';
import Product from '../../views/Product';

export default function Page(props) {

	const {
		products,
		cart,
		filterKeywords,
		handleFilterKeyword,
		mapDispatchToProps,
		getItemQty,
	} = props;

	const {
		addItemToCart,
		setCartItemQty,
		decrementItemQty,
		removeItemFromCart,
		resetCart,
	} = mapDispatchToProps;

	return useRoutes([
		{
			path: '*',
			element: <NotFound />,
		},
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/shop',
			element: <Shop
				products={products}
				filterKeywords={filterKeywords}
				handleFilterKeyword={handleFilterKeyword}
				addItemToCart={addItemToCart}
				getItemQty={getItemQty}
			/>,
		},
		{
			path: '/cart',
			element: <Cart
				addItemToCart={addItemToCart}
				resetCart={resetCart}
				removeItemFromCart={removeItemFromCart}
				decrementItemQty={decrementItemQty}
				cart={cart}
			/>,
		},
		{
			path: '/shop/product/:id',
			element: <Product
				resetCart={resetCart}
				setCartItemQty={setCartItemQty}
				products={products}
				getItemQty={getItemQty}
			/>,
		},
	])
}