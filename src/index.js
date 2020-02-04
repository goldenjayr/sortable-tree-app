import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// eslint-disable-next-line import/no-unresolved
import 'react-sortable-tree/style.css';
import './styles.css';
import 'semantic-ui-css/semantic.min.css'

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);