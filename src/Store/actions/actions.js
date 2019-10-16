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
export const fetchWater = (metric, value, unit) => (dispatch) => {
    const metricName = 'waterTemp';
    const { loading, error, data, startPolling, stopPolling } = useQuery(GET_WATER, {
        variables: { metricName },
        pollInterval: 0,
    })
        .then((res) => {
            const { getLastKnownMeasurement } = data;
            let updatedObject = {
                metric: getLastKnownMeasurement.metric,
                value: getLastKnownMeasurement.value,
                unit: getLastKnownMeasurement.unit,
            }
            console.log(updatedObject)
            dispatch({ type: action.RECIEVED_WATER, updatedObject });
        })
        .catch((error) => {
            dispatch({ type: action.API_ERROR, error });
        });
}