import * as home from "./action-type";

let defaultState = {
    color: 'red'
};
// color
export const homeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case home.CHANGE_COLOR:
            return {
                ...state,
                color: action.color,
            };
        default:
            return state;
    }
};
