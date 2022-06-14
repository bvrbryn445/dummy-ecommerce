import { memo } from 'react';

import { Grid, Image } from 'semantic-ui-react';
import { ImageLink } from './header-styling';
import SmallLogo from '../../assets/logo/xsmall-themerc-logo.png';
import MediumLogo from '../../assets/logo/medium-themerc-logo.png';
import LargeLogo from '../../assets/logo/large-themerc-logo.png';

const logoImports = [
	{ device: 'mobile', size: 'xsmall', src: SmallLogo },
	{ device: 'tablet', size: 'medium', src: MediumLogo },
	{ device: 'computer', size: 'large', src: LargeLogo },
];

const DiffSizedLogos = memo(() => {
	return logoImports.map(logo => {
		const { device, size, src } = logo;
		return (
			<Grid.Column
				only={device}
				key={size}
				width={5}
			>
				<ImageLink to='/'>
					<span>
						<Image
							className='logo'
							src={src}
							alt={`${size} logo`}
						/>
					</span>
				</ImageLink>
			</Grid.Column>
		)
	});
})

export default DiffSizedLogos;