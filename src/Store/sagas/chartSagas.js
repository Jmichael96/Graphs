import * as actions from '../actions/actionTypes';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchWater, fetchWaterAction } from '../actions/actions';

const DATA_QUERY = gql`
query($metricName: String!) {
getLastKnownMeasurement(metricName: $metricName){
  metric
  value
  unit
  at
}
}
`;
export function* fetchWaterSaga(action) {
    const fetchWater = ({ metricName = 'waterTemp' }) => {
        const { loading, error, data, startPolling, stopPolling } = useQuery(DATA_QUERY, {
            variables: { metricName },
            pollInterval: 0
        });
        return {
            loading,
            error,
            data,
            startPolling,
            stopPolling
        }
    };
    try {
        const response = yield call(fetchWater);
        const waterTemps = yield response.json();
        yield put({ type: actions.RECIEVED_WATER, water: waterTemps});
    }
    catch (error){
        yield put({ type: actions.API_ERROR, message: error.message })
    }
}

// export const fetchWaterSaga = () => (dispatch) => {
//     const metricName = 'waterTemp';
    // const { loading, error, data, startPolling, stopPolling } = useQuery(DATA_QUERY, {
    //     variables: { metricName },
    //     pollInterval: 0
    // });
//     // catching error
//     if (error) {
//         dispatch({ type: actions.API_ERROR, error: error.message });
//         return;
//     }

//     const { getLastKnownMeasurement } = data;

//     let updatedObject = {
//         metric: getLastKnownMeasurement.metric,
//         value: getLastKnownMeasurement.value,
//         unit: getLastKnownMeasurement.unit,
//     }
//     console.log(updatedObject);
//     dispatch({ type: actions.RECIEVED_WATER, updatedObject });
// }

export default function* chartsWatcher() {
    yield takeEvery(actions.FETCHING_WATER, fetchWaterSaga);
}