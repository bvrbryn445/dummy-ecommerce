import { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';

import {
	PriceRangeForm,
	StyledPriceRange,
} from './filter-options-styling';

export default function PriceRange(props) {
	const { priceRange, handleFilterKeyword } = props;
	const [priceInputValue, setPriceInputValue] = useState(priceRange);
	const formRef = useRef();

	useEffect(() => {
		setPriceInputValue(priceInputValue => ({
			...priceInputValue,
			min: priceRange.min,
			max: priceRange.max,
		}))
	}, [priceRange]);

	const priceRangeOptions = [
		{ min: '', max: 50 },
		{ min: 50, max: 200 },
		{ min: 200, max: 500 },
		{ min: 500, max: 1000 },
		{ min: 1000, max: '' },
	];

	const dropdownOptions = [
		{ text: '< $50', value: '0' },
		{ text: '$50 - $200', value: '1' },
		{ text: '$200 - $500', value: '2' },
		{ text: '$500 - $1000', value: '3' },
		{ text: '$1000 <', value: '4' },
	];

	const handleDropdownChange = (_, data) => {
		const priceRangeObj = priceRangeOptions[Number(data.value)];
		handleFilterKeyword({ value: priceRangeObj, type: 'priceRange' });
	}

	const handleInputChange = (event, type) => {
		const { value } = event.target;
		setPriceInputValue({priceInputValue, [type]: value});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const minInputValue = formRef.current[0].value;
		const maxInputValue = formRef.current[1].value;
		handleFilterKeyword({
			value: { min: minInputValue, max: maxInputValue },
			type: 'priceRange',
		});
	}

	return (
		<StyledPriceRange>
			<Dropdown
				text={'Price Range: '}
				defaultValue={'1'}
				onChange={handleDropdownChange}
				options={dropdownOptions}
			/>
			<PriceRangeForm
				ref={formRef}
				onSubmit={handleSubmit}
			>
				<input
					onChange={(e) => handleInputChange(e, 'min')}
					value={priceInputValue.min}
					placeholder={'Min Price'}
				/>
				<input
					onChange={(e) => handleInputChange(e, 'max')}
					value={priceInputValue.max}
					placeholder={'Max Price'}
				/>
				<input type='submit' style={{display: 'none' }} />
			</PriceRangeForm>
		</StyledPriceRange>
	)
}