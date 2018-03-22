app.factory('_users', function($http){
	let service = {};

	service.fetchAll = function(){
		return $http({
			method: 'GET',
			url: 'api/users_list'
		});
	};

	service.save = function(name, address, avatar, about){
		return $http({
			method: 'POST',
			url: 'api/user_save',
			data: {
				name: 		name,
				address: 	address,
				avatar: 	avatar,
				about: 		about
			}
		});
	};

	return service;
});