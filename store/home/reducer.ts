// reducer本质上是一个函数，此函数接收两个参数
/**
 *   参数1：state ：全局的对象，将来可以被store中的dispatch修改，同时会触发依赖于此对象
 * 中的属性的组件中的内容的相关业务改变
 *    参数2：action：当store的dispatch被调用的时候，会传入此action，来告诉store应该做什么操作
 *  */
import * as home from "./action-type";

let defaultState = {
    color: 'red'
};

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
