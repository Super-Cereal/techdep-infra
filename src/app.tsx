import React from 'react';
import ReactDOM from 'react-dom';

import { Pages } from './pages/pages';

class App extends React.Component<any, any> {
    render() {
        return <Pages />;
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
