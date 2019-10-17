import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../Store/actions/actionTypes';
import LinearProgress from "@material-ui/core/LinearProgress";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Moment from "moment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  // outer style of container
  paper: {
    width: "210px",
    height: "110px",
    margin: "55px 5px 0 5px",
    border: "1px solid black",
  },
  // style of checkbox
  root: {
    color: "black",
    "&$checked": {
      color: "black"
    },
    marginLeft: "5px"
  },
  checked: {},
  // style of data text
  data: {
    fontSize: "32px",
    fontWeight: 500,
    margin: "0 0 0 5px"
  }
});
const GET_OIL = gql`
query($metricName: String!) {
getLastKnownMeasurement(metricName: $metricName){
  metric
  value
  unit
  at
}
}
`;

const getOilData = state => {
  const { metric, value, unit, at, fullDate } = state.oil;
  return {
    metric,
    value,
    unit,
    at,
    fullDate
  };
};

export default ({ metricName = "oilTemp" }) => {
  const classes = useStyles();
  // checkbox state
  const [isChecked, setState] = useState({
    checked: false,
  });
  // handling the change for the checkbox
  const handleChange = name => event => {
    setState({ ...isChecked, [name]: event.target.checked });
  };

  const dispatch = useDispatch();

  const { metric, value } = useSelector(
    getOilData
  );

  const { loading, error, data, startPolling, stopPolling } = useQuery(GET_OIL, {
    variables: { metricName },
    pollInterval: 0,
  });

  useEffect(
    () => {
      if (error) {
        dispatch({ type: actions.API_ERROR, error: error.message });
        return;
      }
      if (!data) return;

      const { getLastKnownMeasurement } = data;
      // formatting dates before dispatching
      let formattedDate = new Date(getLastKnownMeasurement.at);
      let newDateForm = Moment(formattedDate).format('ll hh:mm:ss a')
      let fullDate = Moment(formattedDate).format('YYYY-MM-DD hh:mm:ss')
      let updatedObject = {
        metric: getLastKnownMeasurement.metric,
        value: getLastKnownMeasurement.value,
        at: newDateForm,
        unit: getLastKnownMeasurement.unit,
        fullDate: fullDate
      }
      dispatch({ type: actions.RECIEVED_OIL, updatedObject });
    },
    [dispatch, error, data]

  );

  // fetching function turning on or off the polling
  function isFetching() {
    if (isChecked.checked) {
      startPolling(1300);
    }
    else if (isChecked) {
      stopPolling();
    }
  }
  isFetching();
  // getting the last value of the state value array
  let lastValue = value[value.length - 1];
  
  if (loading) return <LinearProgress />;

  return (
    <div>
      <Paper className={classes.paper}>
        <FormControlLabel
          control={<Checkbox
            checked={isChecked.checked}
            onChange={handleChange('checked')}
            value="checkedA"
            color="default"
            classes={{
              root: classes.root,
              checked: classes.checked
            }}
          />
          }
          label={metric}
          labelPlacement="end"
        />
        {isChecked.checked ? <p className={classes.data}>{lastValue} F</p> : ""}
      </Paper>
    </div>
  );
};

