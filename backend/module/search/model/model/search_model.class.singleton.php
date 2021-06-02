<?php
class search_model
{
    private $bll;
    static $_instance;

    private function __construct()
    {
        $this->bll = search_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function autoComplete()
    {
        // return "hola";
        return $this->bll->obtain_autoComplete_BLL();
    }
    public function searchList($data)
    {
        // return "hola";
        return $this->bll->obtain_searchList_BLL($data);
    }
 

}
