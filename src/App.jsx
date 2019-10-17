import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import createStore from './Store';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Water from './Components/WaterTemp/Index';
import Tester from './Components/Metrics/Metrics';
import Wrapper from './Components/Utils/Wrapper';
import Tubing from './Components/TubingPressure/TubingPressure';
import Casing from './Components/CasingPressure/Index';
import Flare from './Components/FlareTemp/Index';
import InjValve from './Components/InjValve/Index';
import Oil from './Components/OilTemp/Index';
import Chart from './Components/Chart/Chart';
import Header from './Components/Header/Header';

const store = createStore();

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Provider store={store}>
        <Header />
        <ToastContainer />
        <h1>Well Hello!!!</h1>
        <Wrapper>
          <Water />
          <Tubing />
          <Casing />
          <Flare />
          <InjValve />
          <Oil />
        </Wrapper>
        <Wrapper>
          <Chart />
        </Wrapper>
        {/* <Tester /> */}
      </Provider>
    </div>
  );
}

export default App;
