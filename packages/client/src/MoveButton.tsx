import * as React from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import WinRateBar from './WinRateBar';

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
    moveName: string;
    whiteWin: number;
    draw: number;
    blackWin: number;
    numGames: number;
}

function MoveButton(props: MoveButtonProps) {
    return (
        <Button block color="light">
            <FlexContainer>
                <FlexFixed>{props.moveName}</FlexFixed>
                <FlexFill />
                <FlexFixed>{props.numGames}</FlexFixed>
            </FlexContainer>
            <WinRateBar white={props.whiteWin} draw={props.draw} black={props.blackWin} />
        </Button>
    );
}

export default MoveButton;
