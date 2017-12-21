import gql from 'graphql-tag';
import * as React from 'react';
import { graphql, OperationOption, QueryProps } from 'react-apollo';
import Chessdiagram from 'react-chessdiagram';
import { match as Match, Route } from 'react-router';
import { Button, Card, Container, Input, InputGroup, InputGroupButton } from 'reactstrap';
import styled from 'styled-components';
import FenForm from './FenForm';
import MoveButton from './MoveButton';

const H1 = styled.h1`
    margin-top: 50px;
    margin-bottom: 30px;
    text-align: center;
`;

const H2 = styled.h2`
    margin-top: 35px;
`;

const FenSwitcherContainer = styled.div`
    width: 750px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 15px;
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

const Home = ({ data, fen }: WrappedProps) => (
    <Container>
        <H1>Chess Opening Table</H1>
        <FenSwitcherContainer>
            <Route render={({ history }) => (
                <FenForm fen={fen} fenChange={(newFen) => { history.push(`/${encodeURIComponent(newFen)}`); }} />
            )} />
        </FenSwitcherContainer>
        <ExplorerOuterContainer>
            <Card>
                <ExplorerInnerContainer>
                    <Left>
                        <Chessdiagram
                            fen={fen}
                            squareSize={60}
                        />
                    </Left>
                    <Right>
                        <MoveButton move="e4" fen={''} whiteWin={0.4} draw={0.3} blackWin={0.4} numGames={234} />
                        <MoveButton move="e4" fen={''} whiteWin={0.4} draw={0.3} blackWin={0.4} numGames={234} />
                        <MoveButton move="e4" fen={''} whiteWin={0.4} draw={0.3} blackWin={0.4} numGames={234} />
                        <MoveButton move="e4" fen={''} whiteWin={0.4} draw={0.3} blackWin={0.4} numGames={234} />
                    </Right>
                </ExplorerInnerContainer>
            </Card>
        </ExplorerOuterContainer>
        <H2>About</H2>
        <p>
            This opening table was build by playing many computer games. The opening table was used in
                subsequent computer games in order to improve their level of play. Thus, the level at which the
                engines played improved over time and this table should contain the best opening lines playable by
                computers.
            </p>
    </Container>
);

const CurrentPositionQuery = gql`
    query CurrentPosition {
        getPosition(fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
            fen
            whiteWin
            blackWin
            children
        }
    }
`;

interface Position {
    fen: string;
    whiteWin: number;
    blackWin: number;
    children: number;
}

interface Response {
    getPosition: Position;
}

interface InputProps {
    fen: string;
}

interface WrappedProps {
    data: Response & QueryProps;
    fen: string;
}

const withData = graphql<Response, InputProps, WrappedProps>(CurrentPositionQuery, {
    options: ({ fen }) => ({
        variables: { fen },
    }),
    props: ({ ownProps, data }) => ({
        data,
        fen: ownProps.fen,
    }),
});

export default withData(Home);
