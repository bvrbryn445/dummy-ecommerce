import styled from 'styled-components';
import breakpoints from '../../../util/breakpoints';

const { device } = breakpoints;

export const RelatedProductBlock = styled.div`
	& > * {
		margin: 0!important;
		padding: 0!important;
	}
	position: relative;
	border: 1px solid rgba(0,0,0,0.1)!important;
  border-radius: 4px;
  padding: 1rem;
	height: max-content;
  background-color: hsla(0,0%,20%,.1);
	&:hover {
		background-color: hsla(0,0%,20%,.2);
	}
	& > .rp-image-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100px;
		& > img {
			width: fit-content;
			max-width: 100%;
			height: auto;
			max-height: 100%;
		}
	}
	& > .rp-title {
		padding: .5rem 0!important;
		font-size: clamp(1rem, 1vw, 2rem)!important;
	}
	& .rp-price {
		color: #4D0000;
		font-weight: 500;
		font-size: 1.2rem;
	}
	& .rp-price--former {
		color: #74767c;
		text-decoration: line-through;
	}
	@media only screen and ${device.xs} {
		& > .rp-image-wrapper {
			height: 170px;
		}
	}
	@media only screen and ${device.sm}{
		& > .rp-image-wrapper {
			height: 200px;
		}
	}
	@media only screen and ${device.lg}{
		& > .rp-image-wrapper {
\			height: 240px;
		}
	}
`