import { Link } from 'react-router-dom';
import { Header, Image } from 'semantic-ui-react';
import styled from 'styled-components';

import CartImage from '../../../assets/images/cart-img-placeholder.png';

const PlaceholderImage = styled(Image)`
	max-width: 280px!important;
	height: auto;
	width: 100%;
`

const PlaceholderWrapper = styled.div`
position: relative;
display: flex;
align-items: center;
flex-direction: column;
justify-content: flex-start;
width: 100%;
`

export default function Placeholder() {
	return (
		<PlaceholderWrapper>
			<PlaceholderImage src={CartImage} />
			<Header>
				Your cart is empty
			</Header>
			<Link to='/shop'>
				Go shopping
			</Link>
		</PlaceholderWrapper>
	)
}