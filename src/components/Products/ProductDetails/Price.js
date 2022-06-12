import { StyledPrice } from './product-details-styling';
import DecimalPrecision from '../../../js/decimalPrecision';
import { discountedPrice } from '../../../js/reusableFuncs';

export default function Price({ price, discountPercentage }) {
	const moneySaved = DecimalPrecision.round(
		price - discountedPrice(price, discountPercentage),
		2
	);

	return (
		<StyledPrice>
			<div className='product-discount-percentage'>
				{`The item has a discount of ${discountPercentage}%`}
			</div>
			<h5 className='product-saved-money'>
				<i>
					Saving you ${moneySaved}
				</i>
			</h5>
			<span className='product-price'>
				{`$${DecimalPrecision.round(discountedPrice(price, discountPercentage), 2)} `}
			</span>
		</StyledPrice>
	)
}