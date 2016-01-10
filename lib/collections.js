UserData = new Mongo.Collection("UserData");

UserData.attachSchema(new SimpleSchema({
	userId: {
		type: String
	},
	username: {
		type: String
	},
	cropImage: {
		type: String
	},
	imageCloudId: {
		type: String
	},
	userDesc: {
		type: String,
		max: 400
	}
})); 


UserData.allow({
	    insert: function(userId,doc){
	    return true;
	},
	    update: function(userId, doc, fields, modifier){
	    return true;
	}
});