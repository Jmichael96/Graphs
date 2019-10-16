import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { fetchWater } from '../../Store/actions/actions';

const metricStyles = theme => ({

});

class Metrics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        console.log('the class component water!');
       console.log( this.props.water)
       const { value, unit, metric } = this.props.water;
       let updatedObject = {
           value,
           unit,
           metric
       }
       this.props.fetchWater(updatedObject)
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <h2>Data!</h2>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    water: state.water,
});

const mapDispatchToProps = (dispatch) => ({
    fetchWater: () => dispatch(fetchWater())
});

const metrics = withStyles(metricStyles)(Metrics);
export default connect(mapStateToProps, mapDispatchToProps)(metrics);