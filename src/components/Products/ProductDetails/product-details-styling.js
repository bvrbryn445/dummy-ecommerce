import styled from 'styled-components';
import { Button, Container } from 'semantic-ui-react';
import breakpoints from '../../../util/breakpoints';

const { device } = breakpoints;
export const StyledProductDetails = styled(Container)`
	background: transparent;
	padding: 0;
	display: flex!important;
	flex-direction: column!important;
	@media only screen and ${device.lg} {
	padding: .5rem 2rem;
	}
	& > div {
		margin: 1.2rem 0;
	}
`;

export const StyledTopContent = styled.div`
	& > * {
		padding: none;
		margin: .5rem 0;
	}
	& > .product-title {
		font-size: 3rem
	}
	& > .product-rating {
		margin-top: .8rem;
		font-size: 1rem;
	}
`

export const StyledDescription = styled.div`
& > .product-desc__header {
	font-size: 1.2rem;
	padding: none;
}
`

export const StyledPrice = styled.div`
& p {
	display: inline;
}
& > .product-discount-percentage {
	padding: 8px 15px;
	border: 2px solid #141348;
	border-radius: 12px;
	font-size: 1rem;
	width: fit-content;
	font-weight: 500;
	background: linear-gradient(45deg, gold, GreenYellow);
}
& > .product-price {
	font-size: 2rem;
	color: #4D0000;
	font-weight: 700;
}
`

export const StyledQtyCounter = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem 2.5rem;
	@media only screen and ${device.lg}{
		flex-direction: row;
	}
`

export const RemoveProductsButton = styled(Button)`
	background: #e8e8e8!important;
	color: #4D0000!important;
	&:hover {
		background: #f0f0f0!important;
	}
`