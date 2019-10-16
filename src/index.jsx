import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
const urlClient = new ApolloClient({
    uri: "https://react.eogresources.com/graphql"
});
ReactDOM.render(
    <ApolloProvider client={urlClient}>
        <App />
    </ApolloProvider>, 
document.getElementById('root'));

serviceWorker.unregister();
