hexify.core.NotificationCentre = {
	_listeners: {},

	register: function(eventType, listener) {
		if(hexify.core.NotificationCentre._listeners[eventType] === undefined) {
			hexify.core.NotificationCentre._listeners[eventType] = [];
		}

		hexify.core.NotificationCentre._listeners[eventType].push(listener);
	},

	deRegister: function(eventType, listener) {
		if(hexify.core.NotificationCentre._listeners[eventType] === undefined) {
			return;
		}

		for(var i = 0; i < hexify.core.NotificationCentre._listeners[eventType].length; i++) {
			if(hexify.core.NotificationCentre._listeners[eventType][i] == listener) {
				hexify.core.NotificationCentre._listeners[eventType].splice(i, 1);
				i--;
			}
		}
	},

	dispatch: function(sender, eventType, args) {
		if(hexify.core.NotificationCentre._listeners[eventType] === undefined) {
			return;
		}

		if(!args) {
			args = [];
		}

		if(!(args instanceof Array)) {
			args = [args];
		}

		args.unshift(sender);

		for(var i = 0; i < hexify.core.NotificationCentre._listeners[eventType].length; i++) {
			hexify.core.NotificationCentre._listeners[eventType][i].apply(this, args);
		}
	}
};
