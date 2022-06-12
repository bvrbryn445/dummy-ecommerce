import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const StyledHeader = styled(Segment)`
	width: 100%;
	background-color: #4dc5ac!important;
	color: #4D0000!important;
	padding: 2rem 1rem!important;
	box-shadow: none!important;
	border: none!important;
`;

export const ImageLink = styled(Link)`
 > span > img {
	 display: inline-block!important;
 }
`