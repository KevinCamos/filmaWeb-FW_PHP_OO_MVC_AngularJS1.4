<?php
class home_bll
{
	private $dao;
	private $db;
	static $_instance;

	private function __construct()
	{
		$this->dao = home_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	public function obtain_carousel_BLL()
	{
		// return "holas";
		return $this->dao->select_data_carousel($this->db);
	}

	public function obtain_homeProducts_BLL($arrArgument)
	{
		// return "hola";
		return $this->dao->select_data_homeProducts($this->db, $arrArgument);
	}
	public function update_countClick_BLL($arrArgument)
	{
		return $this->dao->update_countClick($this->db, $arrArgument);
	}
	// public function obtain_data_details_BLL($arrArgument){
	//   return $this->dao->select_data_details($this->db,$arrArgument);
	// }
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
