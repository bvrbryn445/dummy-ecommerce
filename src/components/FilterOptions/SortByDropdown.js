import { Dropdown } from 'semantic-ui-react';

export default function SortByDropdown({ sortBy, handleItemsArranger }) {
	const sortByOptions = [
		{ text: 'Ascending', value: 'asc' },
		{ text: 'Descending', value: 'desc' },
	];
	const handleChange = (_, { value }) => {
		handleItemsArranger({ value, type: 'sortBy' });
	}
	return (
		<Dropdown
			onChange={handleChange}
			value={sortBy}
			options={sortByOptions}
		/>
	)
}