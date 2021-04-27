<?php

class cart_model
{
    private $bll;
    static $_instance;

    private function __construct()
    {
        $this->bll = cart_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }




    public function countCart($idUser)
    {

        $idAlbaran = $this->bll->obtain_getAlbaran_BLL($idUser)[0]['idalbaran'];
        if (!isset($idAlbaran)) {
            return -1;
        }
        // $idAlbaran = $idAlbaran->idalbaran;
        $countCart =  $this->bll->obtain_countCart_BLL($idAlbaran)[0]['cantidad'];
        // return $countCart;
        if (!isset($countCart)) {
            return -1;
        } else {
            return $countCart;
        }
    }


    public function addLine($get)
    {
        $idUser = $get['idUser'];
        $idProduct = $get['idProduct'];
        $idAlbaran = $this->bll->obtain_getAlbaran_BLL($idUser)[0]['idalbaran'];
        if (!isset($idAlbaran)) {
            $idAlbaran = $this->bll->insert_albaran_BLL($idUser);
            $idAlbaran = $this->bll->obtain_getAlbaran_BLL($idUser);
        }
        $idLinea = $this->bll->obtain_getLine_BLL($idAlbaran, $idProduct)[0]['idlinea'];
// return $idLinea;
        if (!isset($idLinea)) {
            $this->bll->insert_line_BLL($idAlbaran, $idProduct);
            return "linea Creada";
        } else {
            $this->bll->update_addToLine_BLL($idAlbaran, $idLinea);
            return "linea afegida";

        }
        return "error";
    }





    // public function active_user($arrArgument){
    //     return $this->bll->active_user_BLL($arrArgument);
    // }


}
