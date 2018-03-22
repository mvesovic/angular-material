app.controller('MainController', function($scope, _users, $mdSidenav, $mdDialog){

	$scope.selectedMode = 'md-scale';

	$scope.createUserDilaog = function(ev) {
	    $mdDialog.show({
	      controller: function($scope, $mdDialog){
	      	$scope.user = {};
	      	$scope.cancel = function(){
	      		$mdDialog.cancel();
	      	};
	      	$scope.save = function(){
	      		console.log($scope.user);
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
	}

	$scope.closeNav = function(){
		$mdSidenav('menubar').close();
	}

	_users.fetchAll().then(response=>{
		$scope.users = response.data;
		console.log($scope.users);
	}, err=>{
		console.log(err);
	})
});