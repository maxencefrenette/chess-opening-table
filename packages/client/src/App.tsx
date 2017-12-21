import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home-page/Home';

const startPos = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const App = () => (
    <Switch>
        <Route path="/:fen?" render={(props) => (
            <Home fen={decodeURIComponent(props.match.params.fen || startPos)} />
        )} />
    </Switch>
);

export default App;
