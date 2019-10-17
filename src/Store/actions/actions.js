import * as action from './actionTypes';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const GET_WATER = gql`
query($metricName: String!) {
getLastKnownMeasurement(metricName: $metricName){
  metric
  value
  unit
  at
}
}
`;
export const fetchWaterAction = (value, metric, unit) => (dispatch) => {
    const metricName = 'waterTemp';
    const { loading, error, data, startPolling, stopPolling } = useQuery(GET_WATER, {
        variables: { metricName },
        pollInterval: 0,
    });

    if (error) {
        dispatch({ type: action.API_ERROR, message: error.message });
        return;
    }
    const { getLastKnownMeasurement } = data;
    let updatedObject = {
        metric: getLastKnownMeasurement.metric,
        value: getLastKnownMeasurement.value,
        unit: getLastKnownMeasurement.unit,
    }
    console.log(updatedObject);
    dispatch({ type: action.RECIEVED_WATER, updatedObject });
};
export const getWater = (value, metric, unit) => {
    return {
        type: action.FETCHING_WATER,
        value,
        metric,
        unit
    }
}