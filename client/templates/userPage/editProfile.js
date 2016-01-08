//Template.editProfile.onCreated(function(){
  TempImageLocVar = new ReactiveVar();
//});

Template.editProfile.events({
    // Submit signup form event
    'submit .edit-profile': function(e, t){
	        // Prevent default actions
	        e.preventDefault();
	    var files = []
		  var file = $('#profileImage')[0].files[0];
	   	files.push(file)

	    Cloudinary._upload_file(file,{tags:"profileImagesTemp",folder:"profileImagesTemp"}, function(err, res){
           console.log("Upload Error: " + err);
            $('form :input').attr('value', '');
           //console.log("Upload Result: " + res);
           TempImageLocVar.set(res.public_id);
              var $image = $('#cropImg > img'), cropBoxData, canvasData;
              $('#cropEditProfile').modal({backdrop:'static',keyboard: false});
              $('#cropEditProfile').modal('show');

              $('#cropEditProfile').on('shown.bs.modal', function () {
                backdrop: 'static'
                  $image.cropper({
                      aspectRatio: 1/1,
                      autoCropArea: 0.5,
                      viewMode: 3,
                      guides: false,
                      dragMode:'move',
                      zoomable: true,
                      cropBoxMovable: true,
                      cropBoxResizable: true,
                      built: function () {
                          // Strict mode: set crop box data first
                          $image.cropper('setCropBoxData', cropBoxData);
                          $image.cropper('setCanvasData', canvasData);
                      }
                  });
              }).on('hidden.bs.modal', function () {
                          cropBoxData = $image.cropper('getData');
                          canvasData = $image.cropper('getCanvasData');
                          var profileId = UserData.findOne({username: Meteor.user().username})._id;
                          var croppedSpecs = "x_"+Math.round(cropBoxData.x)
                                             +",y_"+Math.round(cropBoxData.y)
                                             +",w_"+Math.round(cropBoxData.width)
                                             +",h_"+Math.round(cropBoxData.height)
                                             +",c_crop/"
                          UserData.update(profileId,{
                            $set: {image: croppedSpecs+TempImageLocVar.get()}
                          });
                          $image.cropper('destroy');
                });
              document.getElementById("edit-profile").reset();
	    });
    }       
});

Template.editProfile.helpers({
    TempImageLoc: function() {
    return TempImageLocVar.get();
    },
    'showModal': function(){
      return Session.get('showModal');
    }
});

Template.cropEditProfile.helpers({
    TempImageLoc: function() {
    return TempImageLocVar.get();
    }
});

AutoForm.addHooks(['userDescUpdate'], {
  onSuccess: function(operation, result, template) {
   FlashMessages.sendSuccess('Success!');
   //Router.go("/"+Meteor.user().username);
  }
});