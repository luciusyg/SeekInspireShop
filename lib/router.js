Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound'
});


Router.route('/', function () {
  this.render('frontpage');
});

Router.route('/submit', function () {
  this.render('submitPage');
});

Router.route('/notfound', {
	template: 'notFound', 
	name: 'notFound'
});

Router.route('editProfile', function(){
    var userDataDoc = UserData.findOne({userId: Meteor.userId()});
    this.render('editProfile', {data: userDataDoc}) 
});






//User public profiles
Router.route(':username', {
	template: 'userPage',

    data: function(){
    	var user = this.params.username;
        var usernameObj = UserData.findOne({ username: user });

    	if (typeof usernameObj === 'undefined') {
    		Router.go('notFound');
    	} else {
    		return usernameObj
    	}

    }
});

