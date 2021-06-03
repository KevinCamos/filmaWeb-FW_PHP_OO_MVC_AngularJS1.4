<?php
class cart_bll
{
	private $dao;
	private $db;
	static $_instance;

	private function __construct()
	{
		$this->dao = cart_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	public function obtain_countCart_BLL($idAlbaran)
	{
		return $this->dao->select_data_countCart($this->db, $idAlbaran);
	}
	public function obtain_getAlbaran_BLL($idUser)
	{
		return $this->dao->select_data_getAlbaran($this->db, $idUser);
	}
	public function insert_albaran_BLL($idUser)
	{
		return $this->dao->insert_data_albaran($this->db, $idUser);
	}
	public function obtain_getLine_BLL($idAlbaran, $idProduct)
	{
		return $this->dao->select_data_getLine($this->db, $idAlbaran, $idProduct);
	}
	public function insert_line_BLL($idAlbaran, $idProduct)
	{
		return $this->dao->insert_data_line($this->db, $idAlbaran, $idProduct);
	}
	public function update_addToLine_BLL($idAlbaran, $idLinea)
	{
		return $this->dao->update_data_addToLine($this->db, $idAlbaran, $idLinea);
	}
	public function update_removeToLine_BLL($idAlbaran, $idProduct)
	{
		return $this->dao->update_data_removeToLine($this->db, $idAlbaran, $idProduct);
	}
	public function delete_dropToLine_BLL($idAlbaran, $idProduct)
	{
		return $this->dao->delete_data_dropToLine($this->db, $idAlbaran, $idProduct);
	}
	public function obtain_getCart_BLL($idAlbaran)
	{
		return $this->dao->select_data_getCart($this->db, $idAlbaran);
	}
	public function obtain_totalPrice_BLL($idAlbaran, $idProduct)
	{
		return $this->dao->select_data_totalPrice($this->db, $idAlbaran, $idProduct);
	}
	public function obtain_getTotalCart_BLL($idAlbaran)
	{
		return $this->dao->select_data_getTotalCart($this->db, $idAlbaran);
	}public function update_endCart_BLL($idAlbaran)
	{
		return $this->dao->update_data_endCart($this->db, $idAlbaran);
	}
    public function obtain_getUser_BLL($nameUser)
	{
		return $this->dao->select_data_getUser($this->db, $nameUser);
	}
 
public function obtain_getFactura_BLL($idAlbaran)
	{
		return $this->dao->select_data_getFactura($this->db, $idAlbaran);
	}
}
