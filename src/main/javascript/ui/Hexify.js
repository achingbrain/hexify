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
