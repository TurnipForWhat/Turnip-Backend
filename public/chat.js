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

/* @ngInject */
function MessageController($scope) {
	var vm = this;
	vm.title = 'MessageController';
	vm.chatMessages = [
	  { text: "butts", user: PRINCE },
	  { text: "whocares", user: EMILY },
	];
	vm.getPictureUrl = function(id) {
	  return "http://databaseproject.jaxbot.me/" + id + ".jpg";
	};
	vm.handleKeyup = function($event) {
	  if ($event.keyCode === 13) {
	    vm.chatMessages.push(
	      { text: vm.message, user: PRINCE }
	    );
	    vm.message = '';
	  }
	}
}
