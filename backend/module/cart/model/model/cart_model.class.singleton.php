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
            return 0;
        }
        $countCart =  $this->bll->obtain_countCart_BLL($idAlbaran[0]['idalbaran'])[0]['cantidad'];
        if (!isset($countCart)) {
            return 0;
        } else {
            return $countCart;
        }
    }


    public function addLine($get)
    {
        $idUser = $get['idUser'];
        $idProduct = $get['idProduct'];
        $idAlbaran = $this->bll->obtain_getAlbaran_BLL($idUser);
        if (!isset($idAlbaran[0]['idalbaran'])) {
            $idAlbaran = $this->bll->insert_albaran_BLL($idUser);
            $idAlbaran = $this->bll->obtain_getAlbaran_BLL($idUser);
        }
        $idAlbaran = $idAlbaran[0]['idalbaran'];
        $idLinea = $this->bll->obtain_getLine_BLL($idAlbaran, $idProduct);
        if (!isset($idLinea[0]['idlinea'])) {
            $this->bll->insert_line_BLL($idAlbaran, $idProduct);
            return "linea Creada";
        } else {
            $this->bll->update_addToLine_BLL($idAlbaran, $idLinea[0]['idlinea']);
            return "linea afegida";
        }
        return "error";
    }

    public function getCart($idUser)
    {
        $idAlbaran = $this->bll->obtain_getAlbaran_BLL($idUser)[0]['idalbaran'];
        if (!isset($idAlbaran)) {
            return -1;
        }
        return $this->bll->obtain_getCart_BLL($idAlbaran);
    }

    public function updateAmount($get)
    {

        $type = $get['type'];
        $idProduct = $get['idProduct'];
        $idAlbaran = $get['idAlbaran'];
        switch ($type) {
            case 'sum':

                $this->bll->update_addToLine_BLL($idAlbaran, $idProduct);
                return "Cantidad disminuida";
            case 'rest':

                $this->bll->update_removeToLine_BLL($idAlbaran, $idProduct);
                return "Cantidad aumentada";

                break;

            case 'delete':
                $this->bll->delete_dropToLine_BLL($idAlbaran, $idProduct);
                return "Cantidad eliminada";

                break;
        }
    }
    public function totalPrice($get)
    {

        $idProduct = $get['idProduct'];
        $idAlbaran = $get['idAlbaran'];
        return  $this->bll->obtain_totalPrice_BLL($idAlbaran, $idProduct)[0];
    }
    public function getAlbaran($idUser)
    {

        return $this->bll->obtain_getAlbaran_BLL($idUser)[0]['idalbaran'];
    }
    public function getTotalCart($idAlbaran)
    {

        return  $idAlbaran = $this->bll->obtain_getTotalCart_BLL($idAlbaran);
    }
    public function endCart($idAlbaran)
    {

        $this->bll->update_endCart_BLL($idAlbaran);
    }
    public function buyCart($token)
    {
        $token = explode('"', $token)[1];
        $token = json_decode(jwt_process::decode(SECRET,  $token), true);

        if (time() < $token["exp"]) {
            $user =  $this->bll->obtain_getUser_BLL($token["name"])[0];
            $idAlbaran = $this->bll->obtain_getAlbaran_BLL($user['idusers'])[0]['idalbaran'];
            $this->bll->update_endCart_BLL($idAlbaran);
            $factura = $this->bll->obtain_getFactura_BLL($idAlbaran);
            $totalCart = $this->bll->obtain_getCart_BLL($idAlbaran);


            $arrArgument = array('type'=>'factura','factura' => $factura[0], 'totalCart' => $totalCart,'dataUser' => $user);
            return mail::send_email($arrArgument);
        } else {
            return false;
        }       
    }
}
