import React, { Component } from 'react';
import cookie from 'js-cookie';
const max = window.innerWidth > 414 ? 414 : window.innerWidth;
const x = (window.innerWidth - max) / 2;

export default class componentName extends Component {
  state = {
    left: '23.6%',
    top: 378,
    visible: true
  }
  componentDidMount = () => {
    if (cookie.get('colorFirstEnter') === '1')
      return;
    let nihao = setTimeout(() => {
      this.move();
      clearTimeout(nihao)
    }, 500)
    setInterval(() => {
      this.move();
    }, 8000)
  }

  move = () => {
    this.setState({
      left: '35%',
      top: 250
    }, () => {
      setTimeout(() => {
        this.setState({
          left: '23.6%',
          top: 378
        })
      }, 4000)
    })
  }

  ok = () => {

    this.setState({
      visible: false
    }, (params) => {
      setTimeout(() => {
        cookie.set('colorFirstEnter', '1')
      }, 500)
    })
  }

  render() {
    if (cookie.get('colorFirstEnter') === '1')
      return <div></div>
    else
      return (
        <div style={{ position: 'fixed', top: this.state.visible ? 0 : window.innerHeight, left: 0, right: 0, bottom: 0, zIndex: 999, background: 'rgba(0,0,0,0.5)' }} className="transition">
          <div style={{ position: 'absolute', height: '100%', width: max, zIndex: 2,left:x }}>
            {/* 方块 */}
            <div className="col subCenter mainStart absolute" style={{ background: '#fff', width: 120, padding: '15px 0', boxShadow: '0 0 5px rgba(0,0,0,0.5)', top: 134, left: '11.733333%' }}>
              <div className="row subCenter" style={{ marginBottom: 5 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1px solid #333' }} />
                <div style={{ margin: "0 12px" }}>A</div>
              </div>
              <div style={{ lineHeight: '18px' }}>
                {["active", "opportunistic", "spontaneous"].map((el, il) =>
                  <div key={il} style={{ fontSize: 12 }}>{el}</div>
                )}
              </div>
            </div>
            {/* 按钮 */}
            <div
              className="flex1 row mainCenter subCenter absolute"
              style={{
                left: '23.6%',
                top: 378,
                transform: 'translate(-50%,-50%)',
                padding: 25
              }}>
              <div style={{ height: 30, width: 30, borderRadius: '50%', background: '#75ca86', color: '#fff', textAlign: 'center', lineHeight: '30px' }}>1</div>
            </div>
            {/* 手指 */}
            <img src={require('./img/click.png')} alt="" width="26" style={{
              transition: 'all 2s', position: 'absolute',
              top: this.state.top, left: this.state.left, zIndex: 3
            }} />
            {/* 提示文字 */}
            <div style={{ position: 'absolute', left: '23.6%', top: 415, color: '#fff' }}>
              <div>拖动序号进行排序</div>
              <div style={{ border: '1px solid #fff', borderRadius: 8, marginTop: 10, padding: '3px 8px', display: 'inline-block' }} onClick={this.ok}>我知道了</div>
            </div>
          </div>
        </div>
      )
  }
}