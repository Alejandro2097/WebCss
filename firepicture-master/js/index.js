angular
  .module('myApp', ["firebase"])
  .run(function () {
	var config = {
		apiKey: "AIzaSyBxJ5w5qS4S4Kr9aRwJcXZp7lRhI3Ftox4",
		authDomain: "firepicture2.firebaseapp.com",
		databaseURL: "https://firepicture2.firebaseio.com",
		storageBucket: "firepicture2.appspot.com",
		messagingSenderId: "1312317519"
	};
	firebase.initializeApp(config);
  })
  .controller('imagesController', imagesController)
  .directive('customOnChange', customOnChange)

function imagesController ($firebaseArray) {
 
	var vm = this;
	var storageService = firebase.storage();
	var ref = firebase.database().ref();
	var list = $firebaseArray(ref);
	vm.images = list;
	vm.deleteImg = deleteImg;
	vm.downloadImg = downloadImg;
  
	vm.image = function(event){
		event.preventDefault();
    	var file = event.target.files[0];
		uploadImage(file);
    };
  
	function uploadImage(file) {
		var random = parseInt(Math.random() * 1000000);
		var refStorage = storageService.ref('uploads').child(random.toString()).child(file.name);
		var uploadTask = refStorage.put(file);

		uploadTask.on('state_changed', null, function(error){
			console.log('upload error', error);
		}, function() {
			var imageData = {
				url: uploadTask.snapshot.downloadURL,
				bytes: uploadTask.snapshot.totalBytes,
				name: uploadTask.h.name,
				path: uploadTask.h.fullPath,
				date: uploadTask.h.timeCreated
			}

			list.$add(imageData).then(function(ref) {
        swal("Success", "Your image has been upload", "success")
			});
		}
	);
  }

  function downloadImg(id) {
  	var image = list.$getRecord(id);
  	window.open(image.url, 'Download');
  }

  function deleteImg(id) {
  	var image = list.$getRecord(id);
    
    swal({
      title: "Are you sure?",
      text: "Do you want to remove this image?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
    function(){
      var imgRef = storageService.ref(image.path);

      imgRef.delete().then(function() {
        list.$remove(image).then(function(ref) {
          swal("Deleted!", "Your image has been deleted.", "success");
        });
      }).catch(function(error) {
        console.log('an error occurred!', error);
      });
    });
  	
  }
}

function customOnChange() {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var onChangeHandler = scope.$eval(attrs.customOnChange);
			element.bind('change', onChangeHandler);
		}
	};
}