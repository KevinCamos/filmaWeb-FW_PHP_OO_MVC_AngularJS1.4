<?php
class search_bll
{
	private $dao;
	private $db;
	static $_instance;

	private function __construct()
	{
		$this->dao = search_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	public function obtain_autoComplete_BLL()
	{
		return $this->dao->select_data_autoComplete($this->db);
	}
		public function obtain_searchList_BLL($data)
	{
		// return "hola";
		return $this->dao->select_data_searchList($this->db,$data);
	}
	
	
}
