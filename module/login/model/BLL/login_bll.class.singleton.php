<?php
class login_bll
{
	private $dao;
	private $db;
	static $_instance;

	private function __construct()
	{
		$this->dao = login_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	public function obtain_validateRegister_BLL($nameUser, $email)
	{
		// return "hola";
		return $this->dao->select_data_validateRegister($this->db, $nameUser, $email);
	}
	public function insert_register_BLL($email, $nameUser, $hashed_pass,  $avatar)
	{
		// return "holas";
		return $this->dao->insert_data_register($this->db, $email, $nameUser, $hashed_pass,  $avatar);
	}

	public function obtain_validateUserLogin_BLL($nameUser)
	{
		return $this->dao->select_data_validateUserLogin($this->db, $nameUser);
	}
	public function obtain_getUser_BLL($nameUser){
	  return $this->dao->select_data_getUser($this->db,$nameUser);
	}
	// public function best_breed_home_BLL($arrArgument){
	//   return $this->dao->select_best_breed($this->db,$arrArgument);
	// }
	// public function load_name_BLL(){
	//   return $this->dao->select_load_name($this->db);
	// }
	// public function select_auto_name_BLL($arrArgument){
	//   return $this->dao->select_auto_name($this->db,$arrArgument);
	// }
	// public function active_user_BLL($arrArgument){
	//   return $this->dao->update_active_user($this->db,$arrArgument);
	// }
}
