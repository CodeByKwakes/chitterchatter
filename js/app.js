angular
	.module('chitterChatterApp', ['firebase'])
	.factory('chatMessages', chatMessages)
	.controller('ChatCtrl', ChatCtrl);

ChatCtrl.$inject = ['chatMessages'];
chatMessages.$inject = ['$firebaseArray'];

function chatMessages($firebaseArray) {

  var ref = new Firebase('https://wdi-firebase-lab.firebaseio.com/');

  return $firebaseArray(ref);
}

function ChatCtrl(chatMessages) {

  var _this = this;

  this.username = '';
  this.image = '';

  this.addUsername = function() {
    _this.user = _this.username;
    _this.profileImage = _this.image;
  };

  this.messages = chatMessages;

  this.addMessage = function() {

    _this.messages.$add({
      image: _this.profileImage,
      from: _this.user,
      content: _this.message,
    });
    $('.table-wrapper').animate({ scrollTop: $(document).height() }, 'slow');
    this.message = '';
  };

  this.messages.$loaded(function() {

    if (_this.messages.length === 0) {
      _this.messages.$add({
        image: 'http://mirrors.creativecommons.org/presskit/icons/cc.large.png',
        from: 'Chitter Chatter',
        content: 'Welcome!',
      });
    }

    $('.table-wrapper').animate({ scrollTop: $(document).height() }, 'slow');
  });
}
