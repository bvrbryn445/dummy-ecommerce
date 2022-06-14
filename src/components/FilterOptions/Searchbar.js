import { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { SearchKeywordForm } from './filter-options-styling';

export default function Searchbar(props) {
	const { searchKeyword, handleItemsArranger } = props;
	const [state, setState] = useState({ value: searchKeyword });
	const handleChange = (event) => {
		event.preventDefault();
		const { value } = event.target;
		setState({ value });
	}

	useEffect(() => {
		setState({ value: searchKeyword });
	}, [searchKeyword]);

	const handleFormSubmit = (event) => {
		event.preventDefault();
		handleItemsArranger({
			value: state.value,
			type: 'search',
		});
	}

	return (
		<SearchKeywordForm
			onSubmit={(e) => handleFormSubmit(e)}
		>
			<input
				placeholder={'Search for keyword'}
				value={state.value}
				onChange={(e) => handleChange(e)}
			/>
			<button type='submit'>
				<Icon name='search' />
			</button>
		</SearchKeywordForm>
	)
}