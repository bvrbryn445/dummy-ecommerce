import { Button, Header, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledCheckout = styled(Segment)`
	display: flex;
	flex-direction: column;
	& > .header {
		margin: 0!important;
	}
	& dt {
		text-align: right;
		width: max-content;
	}
	& dl {
		display: flex;
		justify-content: space-between;
		gap: 2px 4px;
		border-top: 1px solid rgba(0, 0, 0, 0.2);
		padding: 3px 0;
	}
	& dd {
		width: max-content;
	}
`

export const ItemCount = styled.div`
color: gray;
font-weight: 300;
`
export default function Checkout({ totalCost, getTotalItems }) {
	return (
		<StyledCheckout>
			<Header>Estimated Costs</Header>
			<dl>
				<dt>SubTotal:
					<ItemCount>
						{`(${getTotalItems()} items)`}
					</ItemCount>
				</dt>
				<dd>{` $${totalCost}`}</dd>
			</dl>
			<p>No tax included</p>
			<dl>
				<dt>Estimated Total:</dt>
				<dd>
					<strong>
						{` $${totalCost}`}
					</strong>
				</dd>
			</dl>
			<Button>
				Continue to checkout
			</Button>
		</StyledCheckout>
	)
}