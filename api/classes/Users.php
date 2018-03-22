<?php
	class Users{
		private $db;

		function __construct($db){
			$this->db = $db;
		}

		public function fetchAll(){
			$users = [];
			$users = $this->db->get('users');
			return json_encode($users);

		}
	}
?>