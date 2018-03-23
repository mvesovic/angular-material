app.factory('_notify', function($mdToast){
	let service = {};

	service.success = function(msg){
		$mdToast.show(
			$mdToast.simple()
		    .content(msg)
		    .position('top right')
		    .hideDelay(3000)
		    .toastClass('success')
		);
	};

	service.error = function(msg){
		$mdToast.show(
			$mdToast.simple()
		    .content(msg)
		    .position('top right')
		    .hideDelay(3000)
		    .toastClass('error')
		);
	};

	return service;
});