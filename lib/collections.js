ProfileImages = new FS.Collection("ProfileImages", {
	stores: [new FS.Store.GridFS("ProfileImages")]
});

UserData = new Mongo.Collection("UserData");

UserData.attachSchema(new SimpleSchema({
	userId: {
		type: String
	},
	username: {
		type: String
	},
	image: {
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


//Profile Imaged Collection

ProfileImages.allow({
  insert:function(userId,doc){
    return true;
  },
  update:function(userId,doc,fields,modifier){
   return true;
  },
  remove:function(userId, doc){
    return true;
  },
  download:function(){
    return true;
  }
});



