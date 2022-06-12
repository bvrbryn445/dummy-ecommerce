import { FooterLink } from './footer-styling';

const currentYear = new Date().getFullYear();
export default function CopyrightLink() {
	return (
		<FooterLink
			primary
			animated='vertical'
			as='a'
			href='https://github.com/bvrbryn445'
			target='_blank'
		>
			{`©Themerc ${currentYear}`}
		</FooterLink>
	)
}