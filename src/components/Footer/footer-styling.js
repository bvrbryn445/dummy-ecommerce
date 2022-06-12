import styled from 'styled-components';
import { Segment, Grid, Button } from 'semantic-ui-react';
import breakpoints from '../../util/breakpoints';

const { size, device } = breakpoints;

export const StyledFooter = styled(Segment)`
	background-color: #4dc5ac!important;
	color: #4D0000!important;
	padding: 2rem 1rem!important;
	box-shadow: none!important;
	border: none!important;
`;

export const MediaGrid = styled(Grid)`
	gap: .8rem 1rem;
	justify-content: flex-end;
	@media only screen and (max-width: ${size.sm}){
		justify-content: center;
	}
`

export const FooterLink = styled(Button)`
	color: #4D0000!important;
	font-weight: 400;
	font-size: 1.5rem;
	display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
	text-transform: uppercase;
	@media only screen and ${device.sm}{
		text-align: left;
		justify-content: flex-start;
	}
	:hover{ text-decoration: underline; }
`