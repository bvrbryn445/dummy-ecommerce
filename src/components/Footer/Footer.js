import { memo } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { StyledFooter } from './footer-styling';
import SocialLinks from './SocialLinks';
import CopyrightLink from './CopyrightLink';

const Footer = memo(() => {
	return (
		<StyledFooter className='App__footer'>
			<Container>
				<Grid stackable doubling>
					<Grid.Row columns={2} verticalAlign='middle'>
						<Grid.Column>
							<CopyrightLink />
						</Grid.Column>
						<Grid.Column floated='right'>
							<SocialLinks />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</StyledFooter>
	)
});

export default Footer;