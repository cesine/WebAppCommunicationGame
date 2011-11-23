GreeterTest = TestCase("GreeterTest");

GreeterTest.prototype.testGreet = function() {
  var greeter = new myapp.Greeter();
  assertEquals("Hello World!", greeter.greet("World"));
};

TestCase("ExampleTest", sinon.testCase({
	"test should do stuff": function (stub, mock){
		//stub(jQuery, "getJSON");
		MT.ajax_service.contact_server("url", {param: 123});
		//assert(jQuery.getJSON.called);
	},
	"test should save preferences": function(stub, mock) {
		stub(MT.ajax_service, "contact_server");
		MT.ajax_service.save_preferences("help","off");
		assert(MT.ajax_service.contact_server.calledWith("/save_preferences.php", {key: "help", value: "off"}));
	}
	
}));