import { StyledDescription } from './product-details-styling';

export default function Description({ description }) {
	return (
		<StyledDescription>
			<h3 className='product-desc__header'>
				<strong>Product Description</strong>
			</h3>
			<p>{description}</p>
		</StyledDescription>
	)
}

