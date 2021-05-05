<?php
class shop_bll
{
	private $dao;
	private $db;
	static $_instance;

	private function __construct()
	{
		$this->dao = shop_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	public function obtain_openProduct_BLL($idProduct, $idUser)
	{
		// return "hola";
		return $this->dao->select_data_openProduct($this->db, $idProduct, $idUser);
	}
	public function obtain_listShop_BLL($sendDatArray)
	{
		// return "holas";
		return $this->dao->select_data_listShop($this->db, $sendDatArray);
	}
	public function obtain_categoryDecade_BLL($sendDatArray)
	{
		// return "holas";
		return $this->dao->select_data_categoryDecade($this->db, $sendDatArray);
	}

	public function obtain_categoryFormate_BLL($sendDatArray)
	{
		// return "holas";
		return $this->dao->select_data_categoryFormate($this->db, $sendDatArray);
	}
	public function obtain_categoryGenere_BLL($sendDatArray)
	{
		// return "holas";
		return $this->dao->select_data_categoryGenere($this->db, $sendDatArray);
	}

	public function obtain_filter_BLL($sendDatArray)
	{
		// return "holas";
		return $this->dao->select_data_filter($this->db, $sendDatArray);
	}
	public function obtain_pagination_BLL($type)
	{
		// return "holas";
		return $this->dao->select_data_pagination($this->db, $type);
	}
	public function obtain_filterType_BLL($type)
	{
		// return "holas";
		return $this->dao->select_data_filterType($this->db, $type);
	}
	
	public function insert_like_BLL($get)
	{
		return $this->dao->insert_data_like($this->db, $get);
	}
	public function remove_like_BLL($get)
	{
		return $this->dao->remove_data_like($this->db, $get);
	}
	// public function update_countClick_BLL($arrArgument)
	// {
	// 	return $this->dao->update_countClick($this->db, $arrArgument);
	// }
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
