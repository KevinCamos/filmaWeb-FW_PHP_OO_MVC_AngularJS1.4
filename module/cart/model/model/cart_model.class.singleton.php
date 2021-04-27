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

        $idAlbaran = $this->bll->obtain_getAlbaran_BLL($idUser);
        if (!isset($idAlbaran[0])) {
            return -1;
        }
        // $idAlbaran = $idAlbaran->idalbaran;
        $idAlbaran = $idAlbaran->$idAlbaran[0];
        $countCart =  $this->bll->obtain_countCart_BLL($idAlbaran);
        if (!isset($countCart[0])) {
            return -1;
        } else {
            return $countCart;
        }
    }



    // public function active_user($arrArgument){
    //     return $this->bll->active_user_BLL($arrArgument);
    // }


}
