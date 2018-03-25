app.factory('_users', ($http) => {
	let service = {};

	service.fetchAll = () => {
		return $http({
			method: 'GET',
			url: 'api/users_list'
		});
	};

	service.save = (data) => {
		return $http({
			method: 'POST',
			url: 'api/user_save',
			data: data
		});
	};

	service.getUser = (id) => {
		return $http({
			method: 'GET',
			url: 'api/get_user',
			params: {
				id: id
			}
		});
	};

	service.removeUser = (id) => {
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