var app = angular.module("chatApp", []);
app.controller('MessageCtrl', MessageController);

var EMILY = {
  profile_picture_id: "emily",
  name: "Emily"
};
var PRINCE = {
  profile_picture_id: "prince",
  name: "Prince"
};

var CHAT_ID = window.location.href.split("/")[5];
var TOKEN = window.location.href.split("/")[4];
var STATIC_URL = "http://databaseproject.jaxbot.me";
console.log(CHAT_ID);
console.log(TOKEN);

/* @ngInject */
function MessageController($scope, $http) {
	var vm = this;
	vm.title = 'MessageController';
	vm.chatMessages = [
	];
	vm.getPictureUrl = function(id) {
	  return "http://databaseproject.jaxbot.me/" + id + ".jpg";
	};
	vm.handleKeyup = function($event) {
	  if ($event.keyCode === 13) {
	    var headers = {
	      headers: {'X-Access-Token': TOKEN}
	    };
	    $http.post(STATIC_URL + "/chat/" + CHAT_ID, { message: vm.message }, headers, function(){});
	    setTimeout(function() {
	      window.scrollTo(0xFFFFFF, 0xFFFFFF);
	    }, 0);
	    vm.message = '';
	  }
	}
	setInterval(function() {
	  var id = 0;
	  if (vm.chatMessages.length > 0)
	    id = vm.chatMessages[vm.chatMessages.length - 1].id;
	  var headers = {
	    headers: {'X-Access-Token': TOKEN}
	  };
	  $http.get(STATIC_URL + "/chat/" + CHAT_ID + "?last=" + id, headers).then(function(data) {
	    console.log(data);
	    data.data.messages.forEach(function(message) {
	      if (vm.chatMessages.some(function(msg) {
		  if (msg.id == message.id) return true;
		  return false;
		})) {
		  return;
	      }
	      vm.chatMessages.push(message);
	      setTimeout(function() {
		window.scrollTo(0xFFFFFF, 0xFFFFFF);
	      }, 0);
	    });
	  });
	}, 1000);
}
