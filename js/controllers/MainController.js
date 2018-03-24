app.controller('MainController', function($scope, _users, _notify, $mdSidenav, $mdDialog){

	$scope.selectedMode = 'md-scale';

	$scope.createUserDilaog = function(ev) {
	    $mdDialog.show({
	      controller: function($scope){

	      	$scope.user = {};

	      	$scope.cancel = function(){
	      		$mdDialog.cancel();
	      	};

	      	$scope.save = function(){
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
	      fullscreen: false // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	  };

	$scope.toggleNav = function(){
		$mdSidenav('menubar').toggle();
	};

	$scope.closeNav = function(){
		$mdSidenav('menubar').close();
	};

	$scope.selectUser = function(id){
		_users.getUser(id).then(response=>{
			$scope.selected = response.data.success[0];
			$mdSidenav('menubar').close();
		}, err=>{
			console.log(err);
		});
	};

	$scope.deleteUserDilaog = function(id) {
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

	function refresh(){
		_users.fetchAll().then(response=>{
			$scope.users = response.data;
		}, err=>{
			console.log(err);
		});
	}

	refresh();

});