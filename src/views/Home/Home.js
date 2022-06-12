import { Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import BGImage from '../../assets/images/homepage__illustration.png';
import {
	HeroImage,
	StyledHeroButton,
	Hero,
	MainHeader,
	SecondaryHeader,
	HeroTextsContainer,
} from './home-styling';

function HeroButton() {
	const navigate = useNavigate();
	return (
		<StyledHeroButton
			onClick={() => navigate('/shop')}
			size='large'>
			<Icon name='shopping bag' />
			Shop Now
		</StyledHeroButton>
	)
}

const HeroTexts = () => (
	<HeroTextsContainer>
		<MainHeader>
			Welcome to 
			<strong> THEMERC</strong>
		</MainHeader>
		<SecondaryHeader>A platform built for Random<strong> DUMMY</strong> products</SecondaryHeader>
	</HeroTextsContainer>
)

export default function Home() {
	return (
		<Hero>
			<HeroTextsContainer>
				<HeroTexts></HeroTexts>
				<HeroButton></HeroButton>
			</HeroTextsContainer>
			<HeroImage src={BGImage} />
		</Hero>
	)
}