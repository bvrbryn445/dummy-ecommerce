import { Button, Icon } from 'semantic-ui-react';
import { MediaGrid } from './footer-styling';

export default function SocialLinks() {
	return (
		<MediaGrid>
			<Button color='facebook'>
				<Icon name='facebook' /> Facebook
			</Button>
			<Button color='twitter'>
				<Icon name='twitter' /> Twitter
			</Button>
			<Button color='instagram'>
				<Icon name='instagram' /> Instagram
			</Button>
		</MediaGrid>
	)
};