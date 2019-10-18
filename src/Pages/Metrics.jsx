import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Tubing from '../Components/TubingPressure/TubingPressure';
import Casing from '../Components/CasingPressure/Index';
import Flare from '../Components/FlareTemp/Index';
import InjValve from '../Components/InjValve/Index';
import Oil from '../Components/OilTemp/Index';
import Water from '../Components/WaterTemp/Index';
import Wrapper from '../Components/Utils/Wrapper';

const metricStyles = theme => ({

});


class Metrics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Wrapper>
                    <Tubing />
                    <Casing />
                    <Flare />
                    <InjValve />
                    <Oil />
                    <Water />
                </Wrapper>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    water: state.water,
});

const mapDispatchToProps = (dispatch) => ({

});

const metrics = withStyles(metricStyles)(Metrics);
export default connect(mapStateToProps, mapDispatchToProps)(metrics);