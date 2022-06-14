import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Segment, Grid, Loader } from 'semantic-ui-react';
import styled from 'styled-components';

import ProductDetails from '../../components/Products/ProductDetails';
import MemoizedProductGallery from '../../components/Products/ProductGallery';
import MemoizedRelatedProductList from '../../components/Products/RelatedProductList';
import NotFound from '../NotFound';

const StyledSegment = styled(Segment)`
	background: transparent!important;
	border: none!important;
	box-shadow: none!important;
`
export default function Product(props) {
	const {
		setCartItemQty,
		getItemQty,
		resetCart,
	} = props;
	const { id } = useParams();

	const [products, setProducts] = useState(props.products || []);
	const [product, setProduct] = useState();
	const [isLoading, setIsLoading] = useState(true);

	// reset states if the router params changes 
	useEffect(() => {
		if ((!!product)) {
			setIsLoading(isLoading => !isLoading);
			setProduct(undefined);
		}
	}, [id])

	useEffect(() => {
		if (products.length) return;
		setProducts(products => [...products, ...props.products]);
	}, [props.products, products.length]);

	useEffect(() => {
		if (typeof product !== 'undefined') return;

		// ensuring the products are fetched
		const timer = setTimeout(() => {
			const productById = getProductById(Number(id));
			function getProductById(id) {
				return products.reduce((result, product) => {
					if (id === product.id) {
						result.push(product);
					}
					return result
				}, []);
			}

			// set product as null if id param does not match the product id
			// otherwise, initialize the product
			setProduct(productById.length ? productById[0] : null);
		}, products.length ? 0 : 1000);

		return () => clearTimeout(timer);
	}, [products, id, product]);

	useEffect(() => {
		// set loading to false if product has a value 
		if (typeof product !== 'undefined') {
			setIsLoading(false);
		}
	}, [product]);

	return (
		<StyledSegment>
			{(isLoading && !product) && <Loader active>Loading</Loader>}
			{(products.length < id && !isLoading) ? <NotFound /> : null}
			{(!isLoading && product) &&
				<>
					<Grid container stackable>
						<Grid.Row columns={2} only='tablet computer'>
							<Grid.Column>
								<MemoizedProductGallery images={product.images} />
							</Grid.Column>
							<Grid.Column>
								<ProductDetails
									product={product}
									setCartItemQty={setCartItemQty}
									getItemQty={getItemQty}
									resetCart={resetCart}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row only='mobile'>
							<Grid.Column>
								<ProductDetails
									product={product}
									setCartItemQty={setCartItemQty}
									getItemQty={getItemQty}
									resetCart={resetCart}
								/>
							</Grid.Column>
							<Grid.Column>
								<MemoizedProductGallery images={product.images} />
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<MemoizedRelatedProductList
						products={products}
						productCategory={product.category}
						productId={product.id}
					/>
				</>
			}
		</StyledSegment >
	)
}