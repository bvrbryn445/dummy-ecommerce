import { memo } from 'react';
import { Grid } from 'semantic-ui-react';
import { StyledHeader } from './header-styling';
import NavMenu from '../NavMenu';
import DiffSizedLogos from './Logo';

const MemoizedLogo = memo(DiffSizedLogos);

const Header = memo(({ getTotalItemsInCart }) => {
	return (
		<StyledHeader>
			<Grid container>
				<Grid.Row columns={2} verticalAlign='middle'>
					<MemoizedLogo />
					<Grid.Column width={11}>
						<NavMenu getTotalItemsInCart={getTotalItemsInCart} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</StyledHeader>
	)
});

export default Header;