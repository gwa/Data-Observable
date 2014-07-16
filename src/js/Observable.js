/* global define */
define(['Gwa.Event.Dispatcher'], function( Dispatcher ) {

	return function() {

		var
		_dispatcher = new Dispatcher(),
		_settings = {},
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
			 * @param {String} value
			 */
			set: function( key, value ) {
				if (_settings[key] === value) {
					return;
				}
				_settings[key] = value;
				_dispatcher.dispatch(key.toUpperCase() + '_CHANGE', value, _instance);
				_dispatcher.dispatch('SETTINGS_CHANGE', key, value, _instance);
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
				return typeof key === 'undefined' ? _settings : _settings[key];
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
