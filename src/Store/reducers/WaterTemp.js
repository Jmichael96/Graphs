import * as actions from '../actions/actionTypes';

const initialState = {
    metric: "",
    value: [],
    unit: "",
    at: "",
    fullDate: []
};

export default (state = initialState, action) => {
    const { updatedObject } = action;
    // console.log(updatedObject)
    switch (action.type) {
        case actions.RECIEVED_WATER:
            return {
                ...state,
                metric: updatedObject.metric,
                value: [...state.value, updatedObject.value],
                unit: updatedObject.unit,
                at: updatedObject.at,
                fullDate: [...state.fullDate, updatedObject.fullDate],
            };
        default:
            return state;
    }
}