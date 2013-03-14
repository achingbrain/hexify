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
