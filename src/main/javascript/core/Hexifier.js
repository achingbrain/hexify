hexify.core.Hexifier = function() {
	
	this.hexify = function(file) {
		var reader = new FileReader();
 
		// init the reader event handlers
		reader.onload = _.bind(this._onLoad, this, file);

		// tell the world
		hexify.core.NotificationCentre.dispatch(this, "onHexifyStart");

		// begin the read operation
		reader.readAsArrayBuffer(file);
	};

	this._onLoad = function(file, event) {
		try {
			var buffer = event.target.result;
			var iterator = new hexify.core.Iterator(new Uint8Array(buffer));
			var bytes = [];

			while(iterator.hasNext()) {
				var string = iterator.next().toString(16);

				if(string.length == 1) {
					string = "0" + string;
				}

				bytes.push("0x" + string);
			}

			hexify.core.NotificationCentre.dispatch(this, "onHexified", [file, bytes]);
		} catch(error) {
			hexify.core.NotificationCentre.dispatch(this, "onHexifyError", [error]);
		}
	};
};
