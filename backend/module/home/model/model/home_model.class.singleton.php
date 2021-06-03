<?php
class home_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = home_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function carousel(){
        return $this->bll->obtain_carousel_BLL();
    }


    public function homeProducts($arrArgument){
        
        return $this->bll->obtain_homeProducts_BLL($arrArgument);
    }
    public function countClick($arrArgument){
        
        return $this->bll->update_countClick_BLL($arrArgument);
    }
  
}