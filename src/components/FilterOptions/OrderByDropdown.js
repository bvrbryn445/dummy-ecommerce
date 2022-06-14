import { Dropdown } from 'semantic-ui-react';

export default function OrderByDropdown({ orderBy, handleItemsArranger }) {
	const orderByOptions = [
		{ text: 'Price', value: 'price' },
		{ text: 'Discount Rate', value: 'discountPercentage' },
		{ text: 'Item Title', value: 'title' },
		{ text: 'Rating', value: 'rating' },
	];

	const handleChange = (_, { value }) => {
		handleItemsArranger({ value, type: 'orderBy' });
	}

	const indexByOrderValue = orderByOptions.findIndex(option => {
		return option.value === orderBy;
	});

	const dropdownText = indexByOrderValue > -1 ?
		orderByOptions[indexByOrderValue].text : '';
		
	return (
		<Dropdown
			text={`Order by: ${dropdownText}`}
			onChange={handleChange}
			value={orderBy}
			options={orderByOptions}
		/>
	)
}