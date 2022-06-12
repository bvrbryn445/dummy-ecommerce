import ImagePlaceholderSrc from '../../../assets/images/image-placeholder.png';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { StyledThumbnail } from './product-card-styling';

export default function Thumbnail({ src, category, id }) {
	return (
		<div>
			<Link to={`product/${id}`}>
				<StyledThumbnail
					alt={`${category}${id}`}
					src={src}
					effect='opacity'
					height={'auto'}
					placeholder={
						<Image
							src={ImagePlaceholderSrc}
							className='ui medium image'
						/>
					}
				/>
			</Link>
		</div>
	);
}