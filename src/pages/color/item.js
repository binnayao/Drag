import React, { Component } from 'react';
const data = ['A', 'B', 'C', 'D'];
const number = [1, 2, 3, 4];
const max = window.innerWidth > 414 ? 414 : window.innerWidth;
const x = (window.innerWidth - max) / 2;
const half = max / 2;
const start = 0;
const end = max;
const initData = [{ left: '23.6%', top: 322 }, { left: '41.2%', top: 322 }, { left: '58.8%', top: 322 }, { left: '76.4%', top: 322 }];
const lastData = [{ left: '20%', top: 100 }, { left: '64.5%', top: 100 }, { left: '20%', top: 200 }, { left: '64.5%', top: 200 }];
const range = [[start, half, 72, 182], [half, end, 72, 182], [start, half, 182, 292], [half, end, 182, 292]];


export default class componentName extends Component {
  state = {
    place: JSON.parse(JSON.stringify(initData)),
    sort: [0, 0, 0, 0],
    move: [0, 0, 0, 0]
  }

  componentDidMount = () => {
    document.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, { passive: false });
    document.title = '性格测试';
  }

  end = (e, i) => {
    // place 用 i
    // sort 用 k
    let nowX = this.state.place[i].left;
    let nowY = this.state.place[i].top;
    let { place, sort, move } = this.state;
    document.getElementById('colorItem' + i + this.props.index).setAttribute('class', 'flex1 row mainCenter subCenter absolute transition')
    for (let k = 0; k < 4; k++) {
      if (nowX >= range[k][0] && nowX <= range[k][1] && nowY >= range[k][2] && nowY <= range[k][3]) {
        if (sort.includes(i + 1)) {
          let temp = sort[k];
          let index = sort.indexOf(i + 1);
          place[sort[k] - 1] = JSON.parse(JSON.stringify(lastData[sort.indexOf(i + 1)]));
          sort[index] = temp;
        } else if (sort[k]) {
          place[sort[k] - 1] = JSON.parse(JSON.stringify(initData[sort[k] - 1]))
        }
        place[i] = JSON.parse(JSON.stringify(lastData[k]));
        sort[k] = i + 1;
        this.setState({
          place,
          sort
        })
      }
    }

    if (nowY < 72 || nowY > 292 || nowX < 0) {
      if (sort.includes(i + 1)) {
        sort[sort.indexOf(i + 1)] = 0;
      }
      place[i] = JSON.parse(JSON.stringify(initData[i]));
      this.setState({
        place,
        sort
      })
    }

    move = [0, 0, 0, 0];
    this.setState({
      move
    })
  }

  move = (e, i) => {
    document.getElementById('colorItem' + i + this.props.index).setAttribute('class', 'flex1 row mainCenter subCenter absolute')
    let nowX = e.pageX || e.touches[0].pageX;
    let nowY = e.pageY || e.touches[0].pageY;
    // 移上去的时候, 选框背景色开始
    let { move } = this.state;
    for (let k = 0; k < 4; k++) {
      if (nowX - x >= range[k][0] && nowX - x <= range[k][1] && nowY - 56 >= range[k][2] && nowY - 56 <= range[k][3]) {
        move = [0, 0, 0, 0];
        move[k] = 1;
        this.setState({
          move
        })
      }
    }
    if (nowY - 56 < 72 || nowY - 56 > 292 || nowX - x < 0) {
      move = [0, 0, 0, 0];
      this.setState({
        move
      })
    }
    // 移上去的时候, 选框背景色结束

    let { place } = this.state;
    place[i].left = nowX - x;
    place[i].top = nowY - 56;
    this.setState({
      place
    })
  }
  again = () => {
    let { place, sort } = this.state;
    sort = [0, 0, 0, 0];
    place = JSON.parse(JSON.stringify(initData))
    this.setState({
      sort,
      place
    })
  }
  get = () => {
    return this.state.sort;
  }

  render() {
    return (
      <div className="relative flex1" style={{ width: max }}>
        <div style={{ background: '#fff', height: 60, padding: '0 40px', textAlign: 'center', color: '#666666', fontSize: 16, lineHeight: '22px' }}>将以下四个选项从最符合你自身到最不符合进行排序</div>
        {/* 选项 */}
        <div style={{ background: '#fff', marginTop: 12, color: '#333333' }} className="row flexWrap subCenter">
          {this.props.source.map((e, i) =>
            <div className="row subCenter transition2" style={{
              boxSizing: 'border-box', height: 110, width: '50%',
              padding: (i === 0 || i === 1) ? "10px 0 0 " : '0 0 10px',
              background: !this.state.move[i] ? '#fff' : 'rgba(0,0,0,0.05)',
              paddingLeft: i % 2 === 0 ? 20 : 0,
              paddingRight: i % 2 === 0 ? 0 : 20
            }}>
              <div key={i} className="row mainCenter" style={{ width: '100%' }}>
                <div style={{ width: 80 }}>
                  <div className="row subCenter" style={{ marginBottom: 5 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1px solid #333' }} />
                    <div style={{ margin: "0 12px" }}>{data[i]}</div>
                  </div>
                  <div style={{ lineHeight: '18px' }}>
                    {e.map((el, il) =>
                      <div key={il} style={{ fontSize: 12 }}>{el}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* 答案 */}
        <div className="row" style={{ background: '#fff', height: 60, borderTop: '2px dotted #C9C9C9' }}>
          {number.map((e, i) =>
            <div
              id={"colorItem" + i + this.props.index}
              onTouchEnd={(target) => this.end(target, i)}
              onTouchMove={(target) => this.move(target, i)}
              className="flex1 row mainCenter subCenter absolute"
              style={{
                left: this.state.place[i].left,
                top: this.state.place[i].top,
                transform: 'translate(-50%,-50%)',
                padding: 25
              }}>
              <div style={{ height: 30, width: 30, borderRadius: '50%', background: '#75ca86', color: '#fff', textAlign: 'center', lineHeight: '30px' }}>{e}</div>
            </div>
          )}
        </div>
        {/* 重新排序 */}
        <div style={{ textAlign: 'center', color: '#75ca86', marginTop: 8 }}><span onClick={this.again}>重新排序</span></div>
      </div>
    )
  }
}
