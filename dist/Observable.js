/* global define */
define(['Gwa.Event.Dispatcher'], function( Dispatcher ) {

	return function() {

		var
		_dispatcher = new Dispatcher(),

		_settings = {},

		_dodispatch = function( key, val ) {
			_dispatcher.dispatch(key.toUpperCase() + '_CHANGE', val, _instance);
			_dispatcher.dispatch('SETTINGS_CHANGE', key, val, _instance);
		},

		_instance = {

			/**
			 * @method  on
			 * @param {String} ev
			 * @param {Function} func
			 * @return {Number}
			 */
			on: function( ev, func ) {
				return _dispatcher.on(ev, func);
			},

			/**
			 * @method  off
			 * @param {String} ev
			 * @param {Function} func
			 */
			off: function( ev, func ) {
				_dispatcher.off(ev, func);
			},

			/**
			 * @method  set
			 * @param {String} key
			 * @param {String} val
			 */
			set: function( key, val ) {
				// setting is already set, and is an object with a `set` function
				if (typeof _settings[key] === 'object' && typeof _settings[key].set === 'function') {
					_settings[key].set(val);
					return;
				}
				// val is an object with a `set` function
				if (typeof val === 'object' && typeof val.get === 'function') {
					_settings[key] = val;
					val.on('SETTINGS_CHANGE', function( newval ) {
						_dodispatch(key, newval);
					});
					_dodispatch(key, val.get());
					return;
				}
				if (_settings[key] === val) {
					return;
				}
				_settings[key] = val;
				_dodispatch(key, val);
			},

			/**
			 * @method  unset
			 * @param {String} key
			 */
			unset: function( key ) {
				delete _settings[key];
				_dispatcher.dispatch(key.toUpperCase() + '_CHANGE', undefined, _instance);
				_dispatcher.dispatch('SETTINGS_CHANGE', key, undefined, _instance);
			},

			/**
			 * @method  get
			 * @param {String} key
			 * @return {String}
			 */
			get: function( key ) {
				if (typeof key === 'undefined') {
					return _settings;
				}
				if (typeof _settings[key] === 'object' && typeof _settings[key].get === 'function') {
					return _settings[key].get();
				}
				return _settings[key];
			},

			/**
			 * @method  keys
			 * @return {Array}
			 */
			keys: function() {
				var a, k = [];
				for (a in _settings) {
					k.push(a);
				}
				return k;
			}

		};

		return _instance;

	};

});
