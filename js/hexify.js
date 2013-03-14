hexify = {
	core: {

	},
	ui: {

	}
};
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

hexify.core.Iterator = function(iterable) {
	var index = 0;

	this.next = function() {
		var output = iterable[index];
		index++;

		return output;
	};

	this.hasNext = function() {
		return index < iterable.length;
	};

	this.peek = function() {
		return iterable[index];
	};

	this.skip = function() {
		index++;
	};

	this.rewind = function() {
		index--;
	};

	this.reset = function() {
		index = 0;
	};

	this.jump = function(location) {
		index = location;
	};

	this.getLocation = function() {
		return index;
	};

	this.getIterable = function() {
		return iterable;
	};
};
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

hexify.ui.FileDropWatcher = function(dropElement, bytesPerLineElement) {
	var hexifier = new hexify.core.Hexifier();

	this.onDragEnter = function(event) {
		event.preventDefault();

		$(dropElement).addClass("dragging");
	};

	this.onDragExit = function(event) {
		event.preventDefault();	

		$(dropElement).removeClass("dragging");
	};

	this.onDragOver = function(event) {
		event.preventDefault();
	};

	this.onDrop = function(event) {
		event.preventDefault();

		$(dropElement).removeClass("dragging");

		var files = event.originalEvent.dataTransfer.files;

		for(var i = 0; i < files.length; i++) {
			hexifier.hexify(files[i]);
		}
	};

	$(dropElement).on("dragenter", this.onDragEnter);
	$(dropElement).on("dragexit", this.onDragExit);
	$(dropElement).on("dragover", this.onDragOver);
	$(dropElement).on("drop", this.onDrop);
};

hexify.ui.Hexify = {
	_fileDropWatcher: null,
	_sliderWatcher: null,
	_hexifyListener: null,

	init: function() {
		hexify.ui.Hexify._fileDropWatcher = new hexify.ui.FileDropWatcher("body", "input");
		hexify.ui.Hexify._sliderWatcher = new hexify.ui.SliderWatcher("input", "label span");
		hexify.ui.Hexify._hexifyListener = new hexify.ui.HexifyListener("input", "body");
	}
};

hexify.ui.HexifyListener = function(bytesPerLineElement, outputElement) {
	
	this.onHexified = function(hexifier, file, bytes) {
		var bytesPerLine = $(bytesPerLineElement).val();
		var iterator = new hexify.core.Iterator(bytes);
		var output = "";
		var numberProcessed = 0;

		while(iterator.hasNext()) {
			output += iterator.next();

			if(iterator.hasNext()) {
				output += ", ";
			}

			numberProcessed++;

			if(numberProcessed == bytesPerLine) {
				output = _.str.trim(output) + "\r\n\t";
				numberProcessed = 0;
			}
		}

		var div = $("<div></div>");

		var remove = $("<small><a><i class=\"icon-remove-sign icon-white\"></i> Remove</a></small>");
		$(remove).click(function() {
			div.remove();
		});

		var textarea= $("<textarea class=\"pre\">[\r\n\t" + output + "\r\n]</textarea>");
		$(textarea).click(function() {
			textarea.select();
		});

		var header = $("<h2></h2>");
		header.append(file.name);
		header.append(remove);

		//$(div).append(remove);
		$(div).append(header);
		$(div).append(textarea);
		$(outputElement).append(div);
		$(outputElement).animate({
			scrollTop: $(header).offset().top
		}, 500);
	};

	hexify.core.NotificationCentre.register("onHexified", this.onHexified);
};

hexify.ui.SliderWatcher = function(sliderElement, outputElement) {
	
	this.onChange = function(event) {
		if(event) {
			event.preventDefault();
		}

		$(outputElement).empty();
		$(outputElement).append($(sliderElement).val());
	};

	$(sliderElement).on("change", this.onChange);

	this.onChange();
};
