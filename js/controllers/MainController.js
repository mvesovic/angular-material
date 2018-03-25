app.controller('MainController', ($scope, _users, _notify, $mdSidenav, $mdDialog, $filter) => {

	$scope.selectedMode = 'md-scale';

	$scope.createUserDilaog = (ev) => {
	    $mdDialog.show({
	      controller: ($scope) => {

	      	$scope.user = {};

	      	$scope.cancel = () => {
	      		$mdDialog.cancel();
	      	};

	      	$scope.save = () => {
	      		_users.save($scope.user).then(response=>{
	      			let msg = response.data;

	      			if (msg.error.length === 0) {
	      				_notify.success(msg.success[0]);
	      				$mdDialog.cancel();
	      				refresh();
	      			} else {
	      				_notify.error(msg.error[0]);
	      			}
	      		}, err=>{
	      			console.log(err);
	      		});
	      	};

	      },
	      templateUrl: 'templates/create-user-dialog.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      fullscreen: false
	    });
	  };

	  $scope.editUserDilaog = (user) => {
	      $mdDialog.show({
	        controller: ($scope) => {

	        	$scope.user = user;
	        	$scope.userEdit = true;

	        	$scope.save = (user) => {
	        		_users.editUser(user).then(response => {
	        			let msg = response.data;

	        			if (msg.error.length === 0) {
	        				_notify.success(msg.success[0]);
	        				$mdDialog.cancel();
	        				refresh();
	        			} else {
	        				_notify.error(msg.error[0]);
	        			}
	        		}, err => {
	        			console.log(err);
	        		});
	        	};

	        	$scope.cancel = () => {
	        		$mdDialog.cancel();
	        	};

	        },
	        templateUrl: 'templates/create-user-dialog.html',
	        parent: angular.element(document.body),
	        targetEvent: user,
	        clickOutsideToClose:true,
	        fullscreen: false
	      });
	    };

	$scope.toggleNav = () => {
		$mdSidenav('menubar').toggle();
	};

	$scope.closeNav = () => {
		$mdSidenav('menubar').close();
	};

	$scope.selectUser = (id) => {
		_users.getUser(id).then(response=>{
			$scope.selected = response.data.success[0];
			$mdSidenav('menubar').close();
		}, err=>{
			console.log(err);
		});
	};

	$scope.deleteUserDilaog = (id) => {
		var confirm = $mdDialog.confirm()
		.title('Delete')
		.textContent('Would you like to delete user?')
		.ariaLabel('Delete user')
		.targetEvent(id)
		.ok('Delete')
		.cancel('Cancel');

		$mdDialog.show(confirm).then(res=> {
			_users.removeUser(id).then(response=>{
				let msg = response.data;
				if (msg.error.length === 0) {
	      			_notify.success(msg.success[0]);
	      			$scope.selected = false;
	      			refresh();
	      		} else {
	      			_notify.error(msg.error[0]);
	      		}
			}, err=>{
				console.log(err);
			});
		},cls=>{});
	};

	refresh = () => {
		_users.fetchAll().then(response=>{
			$scope.users = response.data;
		}, err=>{
			console.log(err);
		});
	}

	refresh();

});