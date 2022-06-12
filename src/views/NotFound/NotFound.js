import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';

const StyledNotFound = styled(Container)`
	display: flex!important;
	flex-direction: column;
	align-items: center;
	& > p {
		text-align: center;
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		font-weight: 400;
	}
	& > a { 
		display: flex;
		color: #c54d59;
	}
	& > a:hover { text-decoration: underline; }
`;

export default function NotFound() {
	let location = useLocation();
	return (
		<StyledNotFound>
			<p>
				The page you navigated into; does not exist.
			</p>
			<Link to={{ pathname: '/', state: { prevPath: location.pathname } }}>
				Return back to previous/home page
			</Link>
		</StyledNotFound>
	)
}