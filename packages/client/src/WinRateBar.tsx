import * as React from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { withProps } from './util';

const WinRateBarContainer = styled.div`
    height: 1rem;
    display: flex;
`;

interface SubBarProps {
    width: number;
}

const SubBar = withProps<SubBarProps>()(styled.div)`
    width: ${props => props.width * 100}%;
    height: 100%;
    display: inline-block;
    flex: 1 1 auto;
`;

const WhiteBar = SubBar.extend`
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background-color: lightgray;
`;

const DrawBar = SubBar.extend`
    background-color: gray;
`;

const BlackBar = SubBar.extend`
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: black;
`;

type Props = {
    white: number;
    draw: number;
    black: number;
}

function WinRateBar(props: Props) {
    return (
        <WinRateBarContainer>
            <WhiteBar width={props.white} />
            <DrawBar width={props.draw} />
            <BlackBar width={props.black} />
        </WinRateBarContainer>
    );
}

export default WinRateBar;
