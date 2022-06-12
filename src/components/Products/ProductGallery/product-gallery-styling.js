import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import breakpoints from '../../../util/breakpoints';

const { device } = breakpoints; 

export const StyledProductGallery = styled(Segment)`
	background: transparent!important;
	border: none!important;
	width: 100%;
	height: auto!important;
	box-shadow: none!important;
	& > * {
		margin: 1rem 0!important;
	}
	& > .gallery__bottom-grid {
		display: flex;
		overflow-x: auto;
		max-height: 300px;
		flex-wrap: wrap;
		height: auto;
		width: 100%;
		gap: 1rem;
		@media only screen and ${device.sm} {
			flex-wrap: nowrap;
		}
		& > .gallery__bottom-grid__card {
			position: relative;
			height: auto;
			margin: 8px 0;
			& img {
				height: auto;
				width: fit-content;
				max-height: 90px;
			}
			& img:hover {
				cursor: pointer;
			}
		}
	}
	& > .gallery__center-grid, .gallery__bottom-grid__card {
		display: flex;
		justify-content: center;
		border: 1px solid rgba(0, 0, 0, 0.1)!important;
		border-radius: 4px;
		padding: 1rem;
		background-color: hsla(0,0%,20%,.1);
	}
	& > .gallery__center-grid {
		align-items: center;
		position: relative;
		height: auto;
		max-width: 100%;
		& img {
			height: auto;
			width: fit-content;
			max-width: 100%;
			max-height: 350px;
		}
	}
`