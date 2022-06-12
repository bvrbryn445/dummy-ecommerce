import { Menu } from 'semantic-ui-react'
import styled from 'styled-components'

export const StyledMenu = styled(Menu)`
display: flex;
gap: 1rem!important;
background: transparent!important;
padding: .5rem 1rem!important;
flex-wrap: wrap;
position: sticky!important;
z-index: 10000;
align-items: center;
box-shadow: none!important;
background-color: hsla(0,0%,20%,.1)!important;
& .reset-filter {
	background-color: transparent;
	border: 1px solid rgba(34, 36, 38, 0.15);
	padding: 4px 8px;
	cursor: pointer;
}
& .reset-filter:hover {
	background-color: #4dc5ac;
}
`

export const SearchKeywordForm = styled.form`
display: flex;
align-items: center;
position: relative;
& > input {
	background-color: transparent;
	color: black;
	border: none;
	border-bottom: 1px solid #4D0000;
	width: 200px;
	::placeholder {
  color: #4D0000;
  opacity: .6;
	}
}
& > button {
	background-color: transparent;
	border: none;
	cursor: pointer;
}
`
export const StyledPriceRange = styled.div`
	width: 190px;
`

export const PriceRangeForm = styled.form`
display: flex;
width: 100%;
gap: .5rem 1rem;
& > input {
	flex: 1;
	width: 50%;
	border: none;
}
`