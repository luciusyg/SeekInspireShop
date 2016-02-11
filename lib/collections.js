UserData = new Mongo.Collection("UserData");
itemData = new Mongo.Collection("itemData");

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

itemData.attachSchema(new SimpleSchema({
	createdby: {
		type: String,
		autoValue:function(){
			return Meteor.user().username
		}
	},
	// itemImage: {
	// 	type: String
	// },
	itemHeadline: {
		type: String,
		max: 140,
	},
	itemBodyText: {
		type: String,
		max: 400,
		autoform: {
		    rows: 5
		}
	},
	itemURL: {
		type: String
	},
	itemPrice: {
		type: Number,
		decimal: true
		//defaultValue: 0.00
	},
	itemCouponCode: {
		type: String,
		max: 140
	},
	itemLoves: {
		type: Number,
		defaultValue: 0,
		autoform: {
			type: "hidden"
		}
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

itemData.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId; 
  },
  update: function(userId, doc, fields, modifier) {
    // only allow updating if you are logged in
    return !! userId; 
  },
  remove: function(userID, doc) {
    //only allow deleting if you are owner
    return doc.submittedById === Meteor.userId();
  }
});
