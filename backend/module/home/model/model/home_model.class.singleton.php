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
        // return "holas";
        return $this->bll->obtain_carousel_BLL();
    }


    public function homeProducts($arrArgument){
        // return "hola";
        return $this->bll->obtain_homeProducts_BLL($arrArgument);
    }
    public function countClick($arrArgument){
        // return "hola";
        return $this->bll->update_countClick_BLL($arrArgument);
    }
    // public function obtain_data_details($arrArgument){
    //     return $this->bll->obtain_data_details_BLL($arrArgument);
    // }
    // public function best_breed_home($arrArgument){
    //     return $this->bll->best_breed_home_BLL($arrArgument);
    // }
    // public function load_name(){
    //     return $this->bll->load_name_BLL();
    // }
    // public function select_auto_name($arrArgument){
    //     return $this->bll->select_auto_name_BLL($arrArgument);
    // }
    // public function active_user($arrArgument){
    //     return $this->bll->active_user_BLL($arrArgument);
    // }

}