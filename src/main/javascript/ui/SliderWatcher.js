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
