import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import createStore from './Store';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore();

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Provider store={store}>
        <ToastContainer />
        <h1>Well Hello!!!</h1>
      </Provider>
    </div>
  );
}

export default App;
