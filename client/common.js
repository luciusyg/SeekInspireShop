Meteor.subscribe("allUsers");
Meteor.subscribe("UserData");

$.cloudinary.config({
  cloud_name: "lyg"
});

Meteor.startup(function () {
  AccountsEntry.config({
      homeRoute: '/',                            // mandatory - path to redirect to after sign-out
      dashboardRoute: '/',              // mandatory - path to redirect to after successful sign-in
      passwordSignupFields: 'USERNAME_AND_EMAIL',        // One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
      showSignupCode: false,                      // when true you need to set the 'signupCode' setting in the server (see below)
      showOtherLoginServices: false,              // Set to false to hide oauth login buttons on the signin/signup pages. Useful if you are using something like accounts-meld or want to oauth for api access
      passwordminLength: 6,                      // Password minimun lenght
      requireOneAlpha: false,                     // enforce the use of at least 1 char [a-z] while building the password
      requireOneDigit: false,                     // enforce the use of at least 1 digit while building the password
      requirePasswordConfirmation: false,         // enforce user to confirm password on signUp and resetPassword templates
      waitEmailVerification: false                // Set to true to wait until newly created user's email has been verified. 
  });

  Accounts.ui.config ({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });


});


Template.registerHelper('getProfileImg', function(userId){
  var UserDataId = UserData.findOne({userId: userId });
  var imgUrl = UserDataId && UserDataId.cropImage; 
  return "http://res.cloudinary.com/lyg/"+imgUrl;
});

Template.registerHelper('getUserDesc', function(userId){
  var UserDataId = UserData.findOne({userId: userId });
  var UserDescTxt = UserDataId && UserDataId.userDesc;  
  return UserDescTxt;

});


// Template.testshit.helpers({
//  userEmail: function(username1) {
//     return Meteor.users.findOne({username: username1 }).emails[0].address;
//   }
// });