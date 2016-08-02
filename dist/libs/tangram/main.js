define(['knockout','compevent'], function(ko,compevent) {
	return function(params) {
		var oThis = this;
		this.data = ko.observable('');
		
		compevent.on('main.query', function(ctx, param1){
			oThis.data(param1)
			//alert('main.query execting...')
		});
	}
});