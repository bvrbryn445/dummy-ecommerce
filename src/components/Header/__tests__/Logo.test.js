import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import DiffSizedLogos from '../Logo';
import { removeDuplicates } from '../../../js/reusableFuncs';

it('should render the dynamically imported logos', async () => {
	render(
		<Router>
			<DiffSizedLogos />
		</Router>
	);
	const logo = await screen.findAllByAltText(/(\w+ logo)/i);
	const filteredLogoAlts = logo.map(l => l.alt);
	const areLogoAltsString = filteredLogoAlts.every(alt => typeof alt === 'string');
	const uniqueLogos = removeDuplicates(filteredLogoAlts);

	// assert the valid type of logo alt texts
	expect(areLogoAltsString).toBeTruthy();

	// no duplicated logos assertion
	// and return all expected logos
	expect(uniqueLogos).toHaveLength(3);
});