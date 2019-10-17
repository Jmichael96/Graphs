import React from "react";
import Plot from "react-plotly.js";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const chartStyles = theme => ({
  chart: {
    border: "2px solid black",
    borderRadius: "4px"
  }
});

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tubingVal: null,
      flareVal: null,
      injVal: null,
      oilVal: null,
      waterVal: null,
      casingVal: null,
      gettingData: false,
    }
  }

  componentWillReceiveProps() {
    // if there is data from the store... update state
    if (this.props) {
      this.updateState();
    }
  }

  updateState = () => {
    this.setState({
      tubingVal: this.props.tubing.value,
      waterVal: this.props.water.value,
      oilVal: this.props.oil.value,
      injVal: this.props.injValve.value,
      flareVal: this.props.flare.value,
      casingVal: this.props.casing.value,
      gettingData: true
    });
  }

  updateHandler = () => {
    // console.log("Chart has been initialized");
  }

  render() {
    const windowSize = window.innerWidth - 150;
    const { tubingVal, oilVal, casingVal, injVal, waterVal, flareVal } = this.state;
    const tubing = {
      type: 'scatter',
      y: tubingVal,
      x: this.props.tubing.fullDate,
      mode: 'lines',
      name: this.props.tubing.metric,
      hovertemplate: `${this.props.tubing.at} <br> ${this.props.tubing.metric}: %{y:.2f}<extra></extra>`,
      line: {
        color: 'red',
        width: 2
      }
    };

    const casing = {
      type: 'scatter',
      x: this.props.casing.fullDate,
      y: casingVal,
      mode: 'lines',
      name: this.props.casing.metric,
      hovertemplate: `${this.props.casing.at} <br> ${this.props.casing.metric}: %{y:.2f}<extra></extra>`,
      line: {
        color: 'orange',
        width: 2
      },
    };

    const oil = {
      type: 'scatter',
      y: oilVal,
      x: this.props.oil.fullDate,
      mode: 'lines',
      name: this.props.oil.metric,
      hovertemplate: `${this.props.oil.at} <br> ${this.props.oil.metric}: %{y:.2f}<extra></extra>`,
      yaxis: 'y3',
      line: {
        color: 'black',
        width: 2
      }
    };
    const water = {
      type: 'scatter',
      y: waterVal,
      x: this.props.water.fullDate,
      yaxis: 'y3',
      mode: 'lines',
      name: this.props.water.metric,
      hovertemplate: `${this.props.water.at} <br> ${this.props.water.metric}: %{y:.2f}<extra></extra>`,
      line: {
        color: 'blue',
        width: 2
      }
    };
    const flare = {
      type: 'scatter',
      x: this.props.flare.fullDate,
      y: flareVal,
      mode: 'lines',
      name: this.props.flare.metric,
      hovertemplate: `${this.props.flare.at} <br> ${this.props.flare.metric}: %{y:.2f}<extra></extra>`,
      yaxis: 'y3',
      line: {
        color: 'pink',
        width: 2
      }
    };
    const injValve = {
      type: 'scatter',
      x: this.props.injValve.fullDate,
      y: injVal,
      yaxis: 'y2',
      mode: 'lines',
      name: this.props.injValve.metric,
      hovertemplate: `${this.props.injValve.at} <br> ${this.props.injValve.metric}: %{y:.2f}<extra></extra>`,
      line: {
        color: 'green',
        width: 2
      }
    };

    const newData = [tubing, oil, injValve, flare, water, casing];
    const { classes } = this.props;
    return (
      <Plot
        data={newData}
        useResizeHandler={true}
        onInitialized={this.updateHandler}
        layout={{
          width: windowSize,
          height: 650,
          title: 'Metric Data Chart',
          showlegend: true,
          autosize: false,
          dragmode: true,
          xaxis: {
            domain: [0.18, 1],
            type: 'date',
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            tickformat: '%-I:%M:%S'
          },
          yaxis: {
            title: 'PSI',
            titlefont: { color: '#1f77b4' },
            tickfont: { color: '#1f77b4' },
            showgrid: false,
            range: [0, 2000],
            showline: true,
            tickwidth: 1,
            position: 0.14,
            type: 'linear',
          },
          yaxis2: {
            title: 'Percent',
            titlefont: { color: '#ff7f0e' },
            tickfont: { color: '#ff7f0e' },
            anchor: 'free',
            overlaying: 'y',
            side: 'left',
            showgrid: false,
            showline: true,
            position: 0.07,
            tickwidth: 1,
            range: [0, 100],
            type: 'linear',
          },
          yaxis3: {
            title: 'Degrees',
            titlefont: { color: 'red' },
            tickfont: { color: 'red' },
            anchor: 'free',
            overlaying: 'y',
            side: 'left',
            showgrid: false,
            showline: true,
            position: 0,
            tickwidth: 1,
            range: [0, 500],
            autorange: true,
            zeroline: false,
            type: 'linear',
          },
        }}
        className={classes.chart}
      />
    );
  }

}

const mapStateToProps = (state) => ({
  tubing: state.tubing,
  water: state.water,
  casing: state.casing,
  flare: state.flare,
  oil: state.oil,
  injValve: state.injValve
})
const chart = withStyles(chartStyles)(Chart);
export default connect(mapStateToProps, null)(chart);