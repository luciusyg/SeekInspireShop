Meteor.publish("allUsers", function() {
    return Meteor.users.find();
});

Meteor.publish("UserData", function() {
    return UserData.find();
});

Meteor.publish("ProfileImages", function() {
    return ProfileImages.find();
});


Accounts.validateNewUser(function (user){
	UserData.insert({
						userId: user._id,
						username: user.username,
						image: "/imgs/profile.jpg",
						userDesc: "hello you can place your desc here"
						});
	return true;
});