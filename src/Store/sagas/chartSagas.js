import * as actions from '../actions/actionTypes';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchWater } from '../actions/actions';

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

export const fetchWaterSaga = () => (dispatch) => {
    const metricName = 'waterTemp';
    const { loading, error, data, startPolling, stopPolling } = useQuery(DATA_QUERY, {
        variables: { metricName },
        pollInterval: 0
    });
    // catching error
    if (error) {
        dispatch({ type: actions.API_ERROR, error: error.message });
        return;
    }

    const { getLastKnownMeasurement } = data;

    let updatedObject = {
        metric: getLastKnownMeasurement.metric,
        value: getLastKnownMeasurement.value,
        unit: getLastKnownMeasurement.unit,
    }
    console.log(updatedObject);
    dispatch({ type: actions.RECIEVED_WATER, updatedObject });
}