Data-Observable
===============

A simple observable "parameter bag”.

~~~~~~~~.js
var data = new Observable();
data.on('SETTINGS_CHANGE', function( key, newval ) {
	// handle all settings changes
});
data.on('FOO_CHANGE', function( newval ) {
	// handle onyl foo changes
});
data.set('foo', 'bar');
data.get('foo'); // 'bar'
~~~~~~~~

Data can be any observable object with `get()` and `set( $val )` methods, that dispatches an `SETTINGS_CHANGE` event with the new value when the value is changed.
