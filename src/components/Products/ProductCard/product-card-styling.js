import styled from 'styled-components';
import { Segment, Header } from 'semantic-ui-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const productCardStyles = `
	display: flex!important;
	flex-direction: column!important;
	width: 100%;
	padding: 10px 0;
`;

const ThumbnailStyles = `
	height: auto;
	max-height: 350px;
	width: fit-content;
	max-width: 100%;
`

export const StyledProductCard = styled(Segment)`
	${productCardStyles}
	justify-content: space-between;
	height: 100%;
	& h3 {
		font-size: 14px;
	}
	& > div:first-child {
		display: flex;
		justify-content: center;
	}
`

export const Details = styled(StyledProductCard)`
	background-color: hsla(0,0%,40%,.08)!important;
	font-weight: 700!important;
	gap: 5px;
	width: 100%;
	align-items: center!important;
	height: max-content;
	& > a:hover {
		text-decoration: underline;
		& > div {
			color: #4183C4!important;
		}
	}
	& > .product-card__discount {
		padding: 4px 8px;
		border: 2px solid #141348;
		border-radius: 12px;
		font-size: 1rem;
		width: fit-content;
		font-weight: 500;
		background: linear-gradient(45deg, gold, GreenYellow);
	}
`;

export const StyledThumbnail = styled(LazyLoadImage)`
	${ThumbnailStyles}
`
export const Title = styled(Header)`
	display: inline!important;
	font-size: clamp(1rem 3vw 3rem)!important;
	color: #4D0000;
	font-weight: 700!important;
`

export const Price = styled.p`
	display: inline-block;
	font-size: 20px;
	color: #3F3F3F;
`

export const PrevPrice = styled.p`
	display: inline-block;
	padding-left: 13px;
	font-weight: 400;
	color: #919191;
	text-decoration: line-through;
`