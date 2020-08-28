import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import './loading.scss';

export default class Loading extends Component {
    static propTypes: { tip: PropTypes.Requireable<string>; };
    static newInstance: (properties: any) => { destroy(): void; };
    render() {
        let { tip } = this.props;
        return (
            <div id="loading">
                <Spin size="large" tip={tip} />
            </div>
        );
    }
}

Loading.propTypes = {
    tip: PropTypes.string,
};

Loading.newInstance = function newNotificationInstance(properties) {
    let props = properties || {};
    let div = document.createElement('div');
    document.body.appendChild(div);
    document.body.setAttribute('style', 'overflow: hidden');
    ReactDOM.render(React.createElement(Loading, props), div);
    return {
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeAttribute('style');
            document.body.removeChild(div);
        },
    };
};