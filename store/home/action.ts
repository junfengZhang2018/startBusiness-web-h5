import * as home from "./action-type";

// 改变颜色
export const changeColor = (color) => {
    return {
        type: home.CHANGE_COLOR,
        color
    };
};
