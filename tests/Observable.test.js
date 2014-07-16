define(['Gwa.Data.Observable'], function( DataObservable ) {

	describe("An observable", function() {

		it("can be constructed", function() {
			var data = new DataObservable();
			expect(data).toBeDefined();
		});

		it("can have data set", function() {
			var data = new DataObservable();
			expect(typeof data.get('foo')).toEqual('undefined');
			data.set('foo', 'bar');
			expect(data.get('foo')).toEqual('bar');
		});

		it("can have data unset", function() {
			var data = new DataObservable();
			data.set('foo', 'bar');
			expect(data.get('foo')).toEqual('bar');
			data.unset('foo');
			expect(typeof data.get('foo')).toEqual('undefined');
			expect(data.keys().length).toEqual(0);
		});

		it("can have a setting listener set", function() {
			var data = new DataObservable();
			var myvar = null;
			data.on('FOO_CHANGE', function( val ) {
				myvar = val;
			});
			data.set('foo', 'bar');
			expect(myvar).toEqual('bar');
		});

		it("can have a listener set for all settings", function() {
			var data = new DataObservable();
			var myvar = null;
			data.on('SETTINGS_CHANGE', function( setting, val ) {
				if (setting === 'foo') {
					myvar = val;
				}
			});
			data.set('foo', 'bar');
			data.set('baz', 'qux');
			expect(myvar).toEqual('bar');
		});

		it("can have a listener removed", function() {
			var data = new DataObservable();
			var myvar = null;
			var id = data.on('FOO_CHANGE', function( val ) {
				myvar = val;
			});
			data.set('foo', 'bar');
			expect(myvar).toEqual('bar');
			data.off('FOO_CHANGE', id);
			data.set('foo', 'baz');
			expect(myvar).toEqual('bar');
		});

		it("can return all data", function() {
			var data = new DataObservable();
			data.set('foo', 'bar');
			data.set('baz', 'qux');
			var settings = data.get();
			expect(settings.foo).toEqual('bar');
			expect(settings.baz).toEqual('qux');
		});

		it("can return all keys", function() {
			var data = new DataObservable();
			data.set('foo', 'bar');
			data.set('baz', 'qux');
			var keys = data.keys();
			expect(keys.length).toEqual(2);
		});

	});

});
