describe("NotificationCentre test", function () {
	it("should register listener", function () {
		var array = [];

		hexify.core.NotificationCentre.register("onFoo", function() {
			array.push("bar");
		});

		expect(array.length).toEqual(0);

		hexify.core.NotificationCentre.dispatch(this, "onFoo");

		expect(array.length).toEqual(1);
	});

	it("should deregister listener", function () {
		var array = [];
		var listener =  function() {
			array.push("bar");
		};

		hexify.core.NotificationCentre.register("onFoo", listener);

		expect(array.length).toEqual(0);

		hexify.core.NotificationCentre.dispatch(this, "onFoo");

		expect(array.length).toEqual(1);

		hexify.core.NotificationCentre.deRegister("onFoo", listener);

		hexify.core.NotificationCentre.dispatch(this, "onFoo");

		expect(array.length).toEqual(1);
	});
});
