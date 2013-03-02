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
