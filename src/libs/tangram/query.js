define(['knockout','compevent'], function(ko,compevent) {
	/**
	 * 模拟查询模板功能.因为是component,所以不能像之前那样返回viewmodel.应该返回viewmodel的构造方法.
	 */
	return function(params) {

		var oThis = this
		this.data = ko.observable(params.funcode)
		
		this.triggerQuery = function(){
			compevent.fire('main.query', oThis.data());
		}
		
	}
});