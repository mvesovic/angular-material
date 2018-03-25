<?php
//autoload classes from register
spl_autoload_register(function($className){
	require('classes/' . $className . '.php');
});

$db = new MysqliDb (Array (
        'host' 		=> 'localhost',
        'username' 	=> 'root',
        'password' 	=> '',
        'db'		=> 'material-test',
        'port' 		=> 3306,
        'prefix'	=> '',
        'charset' 	=> 'utf8')
);

$result = [];

if (isset($_GET['path'])) {
	switch ($_GET['path']) {
		case 'users_list':
				$users = new Users($db);
				$result = $users->fetchAll();
			break;

		case 'user_save':
				$users = new Users($db);
				$result = $users->insertUser();
			break;
		case 'get_user':
				$users = new Users($db);
				$result = $users->getUser($_GET['id']);
			break;
		case 'remove_user':
			$users = new Users($db);
			$result = $users->removeUser($_GET['id']);
			break;
		case 'edit_user':
			$users = new Users($db);
			$result = $users->editUser();
			break;

		default:
			die('Funkcija nije pronadjena');
			break;
	}
} else {
	die('Funkcija nije pronadjena');
}

echo $result;

?>
