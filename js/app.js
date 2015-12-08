angular
	.module("chitterChatterApp", ["firebase"])
	.factory("chatMessages", chatMessages)
	.controller("ChatCtrl", ChatCtrl);

ChatCtrl.$inject = ['chatMessages'];
chatMessages.$inject = ["$firebaseArray"];

function chatMessages($firebaseArray) {

  var ref = new Firebase("https://wdi-firebase-lab.firebaseio.com/");

  return $firebaseArray(ref);
}

function ChatCtrl(chatMessages) {

	var self = this;

  this.username = "";
  this.image = "";

  this.addUsername = function() {
    self.user = self.username;
    self.profileImage = self.image;
  }

  this.messages = chatMessages;

  this.addMessage = function() {

    self.messages.$add({
	    image: self.profileImage,
	    from: self.user,
	    content: self.message
	  });
    $(".table-wrapper").animate({ scrollTop: $(document).height() }, "slow");
    this.message = "";
  };

  this.messages.$loaded(function() {

    if (self.messages.length === 0) {
      self.messages.$add({
      	image: "http://mirrors.creativecommons.org/presskit/icons/cc.large.png",
        from: "Chitter Chatter",
        content: "Welcome!"
      });
    }
    
    $(".table-wrapper").animate({ scrollTop: $(document).height() }, "slow");
  });
}