import styled from 'styled-components';
import FlipMove from 'react-flip-move';
import breakpoints from '../../../util/breakpoints';

const { device } = breakpoints;

export const StyledFlipMove = styled(FlipMove)`
	display: grid;
	grid-auto-flow: dense;
	gap: 2rem;
	height: max-content;
	width: 100%;

	@media only screen and ${device.xs}{
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}
	@media only screen and ${device.sm}{
		grid-template-columns: repeat(3, 1fr);
	}
	@media only screen and ${device.lg}{
		grid-template-columns: repeat(4, 1fr);
	}
`
