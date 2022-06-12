import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Header, Image } from 'semantic-ui-react';
import { discountedPrice } from '../../../js/reusableFuncs';
import DecimalPrecision from '../../../js/decimalPrecision';
import { RelatedProductBlock } from './related-product-list-styling';

const MappedRelatedProducts = ({ relatedProducts }) => {
	return relatedProducts.map((product, productIndex) => {
		const {
			thumbnail,
			price,
			discountPercentage,
			title,
			id,
		} = product;
		return (
			<Grid.Column key={`related-product${productIndex}`}>
				<Link to={`/shop/product/${id}`}>
					<RelatedProductBlock>
						<div className='rp-image-wrapper'>
							<Image src={thumbnail} className='rp-image' />
						</div>
						<Header className='rp-title'>{title}</Header>
						<span>
							<span className='rp-price'>
								{`$${DecimalPrecision.round(
									discountedPrice(price, discountPercentage),
									2
								)} `}
							</span>
							<span className='rp-price--former'>
								{` $${price}`}
							</span>
						</span>
					</RelatedProductBlock>
				</Link>
			</Grid.Column>
		)
	})
}

function RelatedProductList(props) {
	const { products, productCategory, productId } = props;
	const [relatedProducts, setRelatedProducts] = useState();

	// filter out products by category excluding the current viewed product
	useEffect(() => {
		const getProductsByCategory = products.filter((product) => {
			const { category, id } = product;
			return productCategory === category && productId !== id;
		});
		setRelatedProducts(getProductsByCategory);
	}, [products, productId, productCategory]);

	return (
		(!!relatedProducts) &&
		<Container>
			<h1>Related Products</h1>
			<Grid doubling>
				<Grid.Row columns={3} only='computer'>
					<MappedRelatedProducts relatedProducts={relatedProducts} />
				</Grid.Row>
				<Grid.Row columns={3} only='tablet'>
					<MappedRelatedProducts relatedProducts={relatedProducts} />
				</Grid.Row>
				<Grid.Row columns={2} only='mobile'>
					<MappedRelatedProducts relatedProducts={relatedProducts} />
				</Grid.Row>
			</Grid>
		</Container>
	)
}

export default memo(RelatedProductList);