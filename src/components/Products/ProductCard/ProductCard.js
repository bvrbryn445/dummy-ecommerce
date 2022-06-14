import { forwardRef } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { StyledProductCard, Details } from './product-card-styling';
import TitleRating from './TitleRating';
import Prices from './Prices';
import MemoizedThumbnail from './Thumbnail';
import useTimedEvent from '../../../hooks/useTimedEvent';

const ProductCard = forwardRef((props, ref) => {
	const { product, addItemToCart, getItemQty } = props;
	const [isTimerRunning, dispatch] = useTimedEvent(500);
	const {
		id,
		title,
		thumbnail,
		price,
		rating,
		stock,
		category,
		discountPercentage,
	} = product;
	const isStockMoreThanQty = stock > getItemQty(id);

	// disallow to add item if quantity is more than the stock
	const addItemToCartIfAvailable = (id) => {
		if (!isStockMoreThanQty) return;
		dispatch({
			type: 'setup_event',
			payload: () => addItemToCart({ targetId: id }),
		});
	}
	return (
		<div ref={ref} style={{ height: '100%' }}>
			<StyledProductCard>
				<MemoizedThumbnail
					src={thumbnail}
					category={category}
					id={id}
				/>
				<Details>
					<TitleRating
						title={title}
						id={id}
						rating={rating}
					/>
					<h3 className='product-card__discount'>{`SAVE ${discountPercentage}%`}</h3>
					<Prices price={price} discount={discountPercentage} />
					<Button
						onClick={() => addItemToCartIfAvailable(id)}
						size='large'
						disabled={isTimerRunning || !isStockMoreThanQty}
						loading={isTimerRunning}
					>
						<Icon name='shopping cart' />
						{isStockMoreThanQty ? 'Add to cart' : 'Not enough stock'}
					</Button>
				</Details>
			</StyledProductCard>
		</div>
	)
})

export default ProductCard;