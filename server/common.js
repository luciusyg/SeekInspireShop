Meteor.publish("allUsers", function() {
    return Meteor.users.find();
});

Meteor.publish("UserData", function() {
    return UserData.find();
});

Accounts.validateNewUser(function (user){
	UserData.insert({
						userId: user._id,
						username: user.username,
						cropImage: "/imgs/profile.jpg",
						imageCloudId: "",
						userDesc: "hello you can place your desc here"
						});
	return true;
});