import { Dropdown } from 'semantic-ui-react'

export default function ItemCategory(props) {
	const { category, categoryOptions, handleFilterKeyword } = props;
	const handleChange = (_, { value }) => {
		handleFilterKeyword({ value, type: 'category' });
	}

	return (
		<div>
			<Dropdown
				text={`Category: ${category}`}
				defaultValue={category}
				options={categoryOptions}
				onChange={handleChange}
			/>
		</div>
	)
}