import * as React from 'react';
import { Card, Container } from 'reactstrap';
import Chessdiagram from 'react-chessdiagram';
import MoveButton from './MoveButton';
import styled from 'styled-components';

const H1 = styled.h1`
	margin-top: 50px;
	margin-bottom: 30px;
	text-align: center;
`;

const H2 = styled.h2`
	margin-top: 35px;
`;

const ExplorerOuterContainer = styled.div`
	width: 900px;
	margin: 0 auto;
`;

const ExplorerInnerContainer = styled.div`
	display: flex;
`;

const Left = styled.div`
	padding: 40px 40px 5px 5px;
	border-right: 1px solid rgba(0, 0, 0, 0.125);
`;

const Right = styled.div`
	flex: 1 0 auto;
	height: 457px;
	padding: 10px;
	overflow: auto;
`;

class App extends React.Component {
	render() {
		return (
			<Container>
				<H1>Chess Opening Table</H1>
				<ExplorerOuterContainer>
					<Card>
						<ExplorerInnerContainer>
							<Left>
								<Chessdiagram
									fen='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
									squareSize={60}
								/>
							</Left>
							<Right>
								<MoveButton moveName='e4' whiteWin={0.4} draw={0.3} blackWin={0.4} numGames={234} />
								<MoveButton moveName='e4' whiteWin={0.4} draw={0.2} blackWin={0.4} numGames={234} />
								<MoveButton moveName='e4' whiteWin={0.4} draw={0.2} blackWin={0.4} numGames={234} />
							</Right>
						</ExplorerInnerContainer>
					</Card>
				</ExplorerOuterContainer>
				<H2>About</H2>
				<p>
					This opening table was build by playing many computer games. The opening table was used in subsequent computer games in order to improve their level of play. Thus, the level at which the engines played improved over time and this table should contain the best opening lines playable by computers.
				</p>
			</Container>
		);
	}
}

export default App;
