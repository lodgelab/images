import React from 'react';
import ReactDOM from 'react-dom';
import Images from './components/App.jsx';

ReactDOM.hydrate(<Images images={window.__INITIAL__DATA__.result} />, document.getElementById('images'));
