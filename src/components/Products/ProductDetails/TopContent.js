import { StyledTopContent } from './product-details-styling';
import { capitalizeFirstLetter } from '../../../js/reusableFuncs';
import DecimalPrecision from '../../../js/decimalPrecision';

export default function TopContent(props) {
	const { category, brand, title, rating } = props;
	return (
		<StyledTopContent>
			<h1 className='product-title'>
				{title}
			</h1>
			<h4>
				{`${capitalizeFirstLetter(category)} by ${brand}`}
			</h4>
			<p className='product-rating'>
				This product has a rating of
				<strong>
					{` ${DecimalPrecision.round(rating, 1)}/5`}
				</strong>
			</p>
		</StyledTopContent>
	)
}