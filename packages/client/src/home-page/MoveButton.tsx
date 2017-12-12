import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import WinRateBar from './WinRateBar';

const PlainLink = styled(Link)`
    all: unset;

    &:hover {
        all: unset;
    }
`;

const FlexContainer = styled.div`
    display: flex;
`;

const FlexFixed = styled.div`
    flex: 0 0 auto;
`;

const FlexFill = styled.div`
    flex: 1 0 auto;
`;

interface MoveButtonProps {
    move: string;
    fen: string;
    whiteWin: number;
    draw: number;
    blackWin: number;
    numGames: number;
}

const MoveButton = (props: MoveButtonProps) => (
    <Button block color="light">
        <PlainLink to={'/' + props.fen}>
            <FlexContainer>
                <FlexFixed>{props.move}</FlexFixed>
                <FlexFill />
                <FlexFixed>{props.numGames}</FlexFixed>
            </FlexContainer>
            <WinRateBar white={props.whiteWin} draw={props.draw} black={props.blackWin} />
        </PlainLink>
    </Button>
);

export default MoveButton;
