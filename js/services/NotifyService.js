app.factory('_notify', ($mdToast) => {
	let service = {};

	service.success = (msg) => {
		$mdToast.show(
			$mdToast.simple()
		    .content(msg)
		    .position('top right')
		    .hideDelay(3000)
		    .toastClass('success')
		);
	};

	service.error = (msg) => {
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