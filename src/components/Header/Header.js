import { Grid } from 'semantic-ui-react';

import { StyledHeader } from './header-styling';
import NavMenu from '../NavMenu';
import DiffSizedLogos from './Logo';

export default function Header({ getTotalItemsInCart }) {
	return (
		<StyledHeader className='App__header'>
			<Grid stackable container doubling>
				<Grid.Row columns={2} verticalAlign='middle'>
					<DiffSizedLogos />
					<Grid.Column>
						<NavMenu getTotalItemsInCart={getTotalItemsInCart} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</StyledHeader>
	)
}