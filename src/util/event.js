import Event from 'events';

const AppEvent = function () {
	var em = new Event.EventEmitter();

	this.emitEvent = function (event, data) {
		//提交事件
		em.emit(event, data);
	},
	this.addListener = function (event, callback) {
		//添加监听器
		em.on(event, callback);
	},
	this.removeListener = function (event, callback) {
		//移除监听器
		em.removeListener(event, callback);
	}
	return this;
}

export default new AppEvent();