import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import tubingReducer from './reducers/TubingPressure';
import casingReducer from './reducers/CasingPressure';
import flareReducer from './reducers/FlareTemp';
import injValveReducer from './reducers/InjValveOpen';
import oilTempReducer from './reducers/OilTemp';
import waterTempReducer from './reducers/WaterTemp';

export default () => {
    const rootReducer = combineReducers({
        tubing: tubingReducer,
        casing: casingReducer,
        flare: flareReducer,
        injValve: injValveReducer,
        oil: oilTempReducer,
        water: waterTempReducer
    });
    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = applyMiddleware(sagaMiddleware);
    const store = createStore(rootReducer, composeEnhancers(middlewares));

    sagas.forEach(sagaMiddleware.run);

    return store
}
