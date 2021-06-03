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
		return $this->dao->select_data_carousel($this->db);
	}

	public function obtain_homeProducts_BLL($arrArgument)
	{
		
		return $this->dao->select_data_homeProducts($this->db, $arrArgument);
	}
	public function update_countClick_BLL($arrArgument)
	{
		return $this->dao->update_countClick($this->db, $arrArgument);
	}
	
}
