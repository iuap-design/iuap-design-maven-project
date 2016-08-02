define([], function(){
	var Event = {
		fire: function(eventName){
			eventName = eventName.toLowerCase()
			if (!window._events || !window._events[eventName]) return
			var args =  Array.prototype.slice.call(arguments, 1);
			var events = window._events[eventName];
			var ctx = {stop:false, returnValues:{}}
			args.unshift(ctx)
			for (var i = 0, count = events.length; i < count; i++) {
				var callback = events[i].callback
				ctx.nameSpace = callback.nameSpace
				callback.apply(this, args);
				if (args[0].stop == true)
					break;
			}
			return args[0].returnValues;
		},
		on: function(eventName, nameSpace, callback){
			if (typeof nameSpace == 'function'){
				callback = nameSpace
				nameSpace = ''
			}	
			callback.nameSpace = nameSpace
			eventName = eventName.toLowerCase()
			window._events = window._events || {}
			var events = window._events[eventName] || (window._events[eventName] = [])
			events.push({
				callback: callback
			})
		},
		remove: function(eventName, nameSpace){
			window._events = window._events || {}
			var events = window._events[eventName]
			if (!events) return
			if (!nameSpace)
				window._events[eventName] = []
			else	
				for (var i = 0, count = events.length; i < count; i++) {
					if (events[i].callback.nameSpace == nameSpace)
						events.splice(i,1)
				}		
		}
	}
	
	return Event
	
})
