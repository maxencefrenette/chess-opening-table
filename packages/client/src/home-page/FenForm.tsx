import * as React from 'react';
import { Button, Card, Container, Input, InputGroup, InputGroupButton } from 'reactstrap';

export interface FenFormProps {
    fen: string;
    fenChange: (fen: string) => void;
}

interface FenFormState {
    fenInputState: string;
}

export default class FenForm extends React.Component<FenFormProps, FenFormState> {
    constructor(props: FenFormProps) {
        super(props);
        this.state = {
            fenInputState: props.fen,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(newProps: FenFormProps) {
        if (newProps.fen !== this.props.fen) {
            this.setState({
                fenInputState: newProps.fen,
            });
        }
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            fenInputState: event.target.value,
        });
    }

    handleClick() {
        this.props.fenChange(this.state.fenInputState);
    }

    render() {
        return (
            <InputGroup>
                <Input value={this.state.fenInputState} onChange={this.handleChange} />
                <InputGroupButton>
                    <Button color="primary" onClick={this.handleClick}>
                        Change Fen
                    </Button>
                </InputGroupButton>
            </InputGroup>
        );
    }
}
