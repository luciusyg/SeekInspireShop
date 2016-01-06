Template.frontpage.helpers({
	userList: function(){
		return Meteor.users.find();
	}

});