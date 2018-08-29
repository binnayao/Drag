import React, { Component } from 'react'
import './app.less';
import { Toast, Modal } from 'antd-mobile';
import Item from './item.js';
import Example from './example.js';
import source from './source.js';
const max = window.innerWidth > 414 ? 414 : window.innerWidth;

export default class componentName extends Component {
  state = {
    index: 0,
    source: source,
    left: 0,
  }
  componentDidMount = () => {
    document.title = "性格测试";
  }

  back = () => {
    this.setState({
      left: -max * (this.state.index - 1),
      index: this.state.index - 1
    })
  }
  next = () => {
    if (!this.judge()) {
      Toast.info('请先完善当前题目', 1);
      return;
    }
    if (this.state.index === 4) {
      this.save();
    } else
      this.setState({
        left: -max * (this.state.index + 1),
        index: this.state.index + 1
      })
  }
  judge = (i) => {
    let temp = this.refs['colorItem' + this.state.index].get();
    if (temp.includes(0))
      return false
    else
      return true
  }
  save = () => {
    Modal.alert('确认', '是否确认生成测试结果', [
      { text: '取消', onPress: async () => console.log('cancel') },
      {
        text: '确定', onPress: async () => {
          let temp = [];
          for (let i = 0; i < 5; i++) {
            let res = this.refs['colorItem' + i].get();
            temp = temp.concat(res);
          }
          let res = await post(api.test, { data: JSON.stringify(temp) })
          if (res) {
            document.addEventListener('touchmove', function (e) {
              e.returnValue = true;
            }, { passive: false });
            location.replace(location.origin + location.pathname + '?' + res.score + '#/detail');
          }
        }
      },
    ])
  }
  render() {
    let temp = (this.state.index + 1) / 5 * 100;
    return (
      <div style={{ width: max, margin: '0 auto',height:'100%' }} className="col">
        <Example />
        <div className="huoProgressBox row mainCenter subCenter">
          <span className="title">进度</span>
          <div style={{ width: '70%', background: '#ddd', height: 16, borderRadius: 8, overflow: 'hidden' }}>
            <div className="transition" style={{ width: temp + '%', background: '#75ca86', height: 16, borderRadius: 8 }}></div>
          </div>
          <div className="name">{this.state.index + 1}/5</div>
        </div>

        <div style={{ width: max, overflow: "hidden" }} className="flex1">
          <div style={{ width: max * 5, marginLeft: this.state.left }} className="row transition">
            {this.state.source.map((e, i) =>
              <Item key={i} index={i} source={e} ref={"colorItem" + i} />
            )}
          </div>
        </div>

        {/* 底栏 */}
        <div className="row" style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          textAlign: 'center',
          color: '#fff',
          height: 50,
          lineHeight: '50px',
          fontSize: 16
        }}>
          {this.state.index !== 0 &&
            <div onClick={this.back} style={{ background: "#c9c9c9" }} className="flex1 huobutton">上一题</div>
          }
          <div onClick={this.next} style={{ background: "#75ca86" }} className="flex2 huobutton">{this.state.index === 4 ? '生成测试结果' : '下一题'}</div>
        </div>
      </div >
    )
  }
}
