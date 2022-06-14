import { useState, useCallback, memo } from 'react';
import { Image } from 'semantic-ui-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { StyledProductGallery } from './product-gallery-styling';

function WideImageWrapper({ imageSrc }) {
	return (
		<div className='gallery__center-grid'>
			<LazyLoadImage
				alt={'wide-image'}
				src={imageSrc}
				effect='opacity'
				height={350}
				visibleByDefault
			/>
		</div>
	)
}

function BottomGrid({ images, handleImageChange }) {
	const ImageGrids = images.map((src, i) => {
		return (
			<div
				key={`image-wrapper${i + 1}`}
				className='gallery__bottom-grid__card'
			>
				<LazyLoadImage
					src={src}
					onClick={() => handleImageChange(i + 1, src)}
					alt={`image${i + 1}`}
					height={90}
					effect='opacity'
					visibleByDefault
				/>;
			</div>
		);
	});

	return (
		<Image.Group size='small' className='gallery__bottom-grid'>
			{ImageGrids}
		</Image.Group>
	)
}

const MemoizedBottomGrid = memo(BottomGrid);

function ProductGallery({ images }) {
	const totalImages = images.length;
	const initialState = {
		id: totalImages,
		src: images[images.length - 1],
	};
	const [wideImage, setWideImage] = useState(initialState);

	// replace the wide image with the clicked image
	const handleImageChange = useCallback((id, src) => {
		setWideImage(wideImage => ({ ...wideImage, id, src }));
	}, []);

	return (
		<StyledProductGallery>
				<WideImageWrapper imageSrc={wideImage.src} />
				<MemoizedBottomGrid images={images} handleImageChange={handleImageChange} />
		</StyledProductGallery>
	)
}
const MemoizedProductGallery = memo(ProductGallery);
export default MemoizedProductGallery;