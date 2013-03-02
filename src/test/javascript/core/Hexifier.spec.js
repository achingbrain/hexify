describe("hexify.core.Hexifier test", function () {
	var hexifier = new hexify.core.Hexifier();

	it("should hexify", function () {
		var bytes = [0x00, 0x01, 0x02];
		var file = null;
		var event = {
			target: {
				result: bytes
			}
		};

		var dispatchSpy = spyOn(hexify.core.NotificationCentre, "dispatch");

		hexifier._onLoad(file, event);

		expect(dispatchSpy).toHaveBeenCalledWith(hexifier, "onHexified", [file, ["0x00", "0x01", "0x02"]]);
	});
});
