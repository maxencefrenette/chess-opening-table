import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home-page/Home';

const App = () => (
    <Switch>
        <Route path="/:fen?" component={Home} />
    </Switch>
);

export default App;
