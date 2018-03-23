app.factory('_users', function($http){
	let service = {};

	service.fetchAll = function(){
		return $http({
			method: 'GET',
			url: 'api/users_list'
		});
	};

	service.save = function(data){
		return $http({
			method: 'POST',
			url: 'api/user_save',
			data: data
		});
	};

	service.getUser = function(id){
		return $http({
			method: 'GET',
			url: 'api/get_user',
			params: {
				id: id
			}
		});
	};

	service.removeUser = function(id){
		return $http({
			method: 'DELETE',
			url: 'api/remove_user',
			params: {
				id: id
			}
		});
	};

	return service;
});