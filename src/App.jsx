import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import createStore from './Store';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from './Components/Utils/Wrapper';
import Chart from './Components/Chart/Chart';
import Header from './Components/Header/Header';
import Metrics from './Pages/Metrics';

const store = createStore();

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Provider store={store}>
        <Header />
        <ToastContainer />
        <Metrics />
        <Wrapper>
          <Chart />
        </Wrapper>
      </Provider>
    </div>
  );
}

export default App;
