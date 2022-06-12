import {
	useState, useEffect, useReducer, useCallback, memo,
} from 'react';
import './App.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { stateReducer } from './js/reducers/stateReducer';

import Footer from './components/Footer';
import Header from './components/Header/Header';
import Page from './components/Page';

const MemoizedFooter = memo(Footer);

const DUMMY_JSON_ARGS = { limit: 60, skip: 0 };
const { limit, skip } = DUMMY_JSON_ARGS;
const jsonURL = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

export default function App() {
	const initialState = { products: [], cart: [] };
	const [state, dispatch] = useReducer(stateReducer, initialState);
	const [filterKeywords, setFilterKeywords] = useState({
		search: '',
		category: '',
		priceRange: {
			min: '', max: '',
		},
	});

	// fetch api data and initialize
	useEffect(() => {
		fetch(jsonURL)
			.then(res => res.json())
			.then(data => dispatch({
				type: 'INIT_PRODUCTS',
				payload: data.products,
			}));
	}, []);

	const handleFilterKeyword = useCallback(({ value, type }) => {
		if (type) {
			setFilterKeywords(filterKeywords => ({
				...filterKeywords, [type]: value,
			}));
		} else {
			setFilterKeywords(filterKeywords => ({
				...filterKeywords, ...value,
			}))
		}
	}, []);

	// getters
	const getTotalItemsInCart = useCallback(() => {
		const { cart } = state;
		return cart.reduce((total, item) => {
			return total += item.quantity;
		}, 0);
	}, [state]);

	const getItemQty = (id) => {
		const { cart } = state;
		const cartItemByIdArr = cart.filter(item => id === item.id);
		return cartItemByIdArr.length ? cartItemByIdArr[0].quantity : 0;
	}

	// passing dispatched actions as props
	const mapDispatchToProps = (dispatch) => {
		return {
			// dispatching actions
			addItemToCart: (payload) => dispatch({ type: 'ADD_ITEM_TO_CART', payload }),
			setCartItemQty: (payload) => dispatch({ type: 'SET_ITEM_QTY', payload }),
			decrementItemQty: (payload) => dispatch({ type: 'DECREMENT_ITEM_QTY', payload }),
			removeItemFromCart: (payload) => dispatch({ type: 'REMOVE_ITEM', payload }),
			resetCart: () => dispatch({ type: 'RESET_CART' }),
		}
	}

	// compile props to pass to page components
	const propsForViews = {
		products: state.products,
		cart: state.cart,
		filterKeywords,
		getTotalItemsInCart,
		getItemQty,
		handleFilterKeyword,
		mapDispatchToProps: mapDispatchToProps(dispatch),
	};

	return (
		<div className="App">
			<Header getTotalItemsInCart={getTotalItemsInCart} />
			<Page {...propsForViews} />
			<MemoizedFooter />
		</div>
	);
}