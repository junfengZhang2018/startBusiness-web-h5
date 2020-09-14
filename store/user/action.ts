import * as user from "./action-type";

export const saveUserInfo = (userInfo) => {
    return {
        type: user.SAVE_USER_INFO,
        userInfo
    };
};

export const clearUserInfo = () => {
    return {
        type: user.CLEAR_USER_INFO
    };
};
