/*global MT, jQuery
*/
var MT = MT || {};

(function () {
	MT.ajax_service = {
		contact_server: function (url, params){
			jQuery.getJSON(url, params);
		},
		save_preferences:function (key, value) {
			this.contact_server("/save_preferences.php",{key: key, value: value});
		}
	};
	
}(jQuery));



myapp = {};

myapp.Greeter = function() { };

myapp.Greeter.prototype.greet = function(name) {
  return "Hello " + name + "!";
};

