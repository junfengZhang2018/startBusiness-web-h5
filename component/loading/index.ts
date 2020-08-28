import Loading from './loading';

let loadingInstance = null;
let getLoadingInstance = (tip) => {
    loadingInstance = loadingInstance || Loading.newInstance({
        tip,
    });
    return loadingInstance;
};
export default {
    open(tip = '加载中...') {
        getLoadingInstance(tip);
    },
    close() {
        if (loadingInstance) {
            loadingInstance.destroy();
            loadingInstance = null;
        }
    },
};