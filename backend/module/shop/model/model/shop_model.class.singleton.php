<?php
class shop_model
{
    private $bll;
    static $_instance;

    private function __construct()
    {
        $this->bll = shop_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function openProduct($idProduct, $idUser)
    {
        // return "hola";
        return $this->bll->obtain_openProduct_BLL($idProduct, $idUser);
    }
    public function listShop($sendDatArray) //0 order, 1 offset, 2 IdUser
    {
        // return  $order;
        return $this->bll->obtain_listShop_BLL($sendDatArray);
    }
    public function categoryDecade($sendDatArray) //0 order, 1 offset, 2 IdUser
    {
        // return  $order;
        return $this->bll->obtain_categoryDecade_BLL($sendDatArray);
    }

    public function categoryFormate($sendDatArray) //0 order, 1 offset, 2 IdUser
    {
        // return  $order;
        return $this->bll->obtain_categoryFormate_BLL($sendDatArray);
    }
    public function categoryGenere($sendDatArray) //0 order, 1 offset, 2 IdUser
    {
        // return  $order;
        return $this->bll->obtain_categoryGenere_BLL($sendDatArray);
    }
    public function filter($sendDatArray) //0 order, 1 offset, 2 IdUser
    {
        // return  $order;
        return $this->bll->obtain_filter_BLL($sendDatArray);
    }
    public function pagination($type) //0 order, 1 offset, 2 IdUser
    {
        // return  $type;
        return $this->bll->obtain_pagination_BLL($type);
    }
    public function filterType($type) //0 order, 1 offset, 2 IdUser
    {
        // return  $type;
        return $this->bll->obtain_filterType_BLL($type);
    }

    public function likeds($get) //0 order, 1 offset, 2 IdUser
    {
        // return $get['typeLike'];
        switch ($get['typeLike']) {

            case 'like':
             return   $this->bll->insert_like_BLL($get);
                break;
            case 'unlike':
                return  $this->bll->remove_like_BLL($get);

                break;
        }
    }

}
