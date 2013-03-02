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
				output += "\r\n\t";
				numberProcessed = 0;
			}
		}

		var header = $("<h2>" + file.name + "</h2>");
		$(outputElement).append(header);
		$(outputElement).append("<pre>var file = [ \r\n\t" + output + "\r\n ];</pre>");
		$(outputElement).animate({
			scrollTop: $(header).offset().top
		}, 500);
	};

	hexify.core.NotificationCentre.register("onHexified", this.onHexified);
};
