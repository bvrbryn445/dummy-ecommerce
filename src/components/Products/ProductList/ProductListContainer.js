import { Grid } from 'semantic-ui-react';
import FlipMove from 'react-flip-move';
import styled from 'styled-components';

const StyledProductList = styled(Grid)`
	background: transparent!
`

export default function ProductListContainer({ columns, only, children }) {
	return (
		<StyledProductList container centered doubling padded>
			<Grid.Row columns={columns} only={only} stretched>
				{/* <FlipMove> */}
					{children}
				{/* </FlipMove> */}
			</Grid.Row>
		</StyledProductList>
	)
}