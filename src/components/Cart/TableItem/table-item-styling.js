import styled from 'styled-components';

export const CartItemQtyBtn = styled.button`
border: none;
& > .increment {
	background-color: green;
}
& > .decrement {
	background-color: red;
}
color: white;
padding: 4px 2px;
`

export const CartItemImage = styled.div`
width: 100%;
height: auto;
& img {
	width: 100%;
	height: auto;
}
`

export const ItemQuantityInputs = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const ItemQuantityCounter = styled.div`
display: flex;
padding: 4px 0;
justify-content: center;
gap: .5rem;
`

export const CartItemTitle = styled.h2`
	font-size: clamp(1rem, 1vw, 2rem);
`