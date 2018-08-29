
// 容器组件
import React from 'react';
import { hashHistory } from 'react-router';
import api from '../util/api.js';
import post from '../util/request.js';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div style={{ position: 'relative', height: '100%' }} id="realcontainer">
          {/* 克隆函数 React.cloneElement , 给子组件传递一个统一的函数 */}
          {/* {this.props && this.props.children && React.cloneElement(this.props.children, {
              changeTitle: title => this.setState({ title })
            }) || 'no content'} */}
          {this.props && this.props.children || 'no content'}
        </div>
      </div>
    );
  }
}
