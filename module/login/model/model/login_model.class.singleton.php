<?php

class login_model
{
    private $bll;
    static $_instance;

    private function __construct()
    {
        $this->bll = login_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function register($userArray)
    {
        // return $userArray;
        $nameUser =  strtolower($userArray[0]['value']);
        $email = strtolower($userArray[3]['value']);
        $validateReg = $this->bll->obtain_validateRegister_BLL($nameUser, $email);
        if ($validateReg == true) { //El usuari existeix
            return false;
        } else {
            $nameUser =  strtolower($userArray[0]['value']);
            // $password =  strtolower($userArray[1]['value']);
            $email = strtolower($userArray[3]['value']);
            $hashavatar = md5(strtolower(trim($email)));
            $hashed_pass = password_hash(strtolower($userArray[1]['value']), PASSWORD_DEFAULT);
            $avatar = "https://www.gravatar.com/avatar/$hashavatar?s=40&d=robohash";
            return $this->bll->insert_register_BLL($email, $nameUser, $hashed_pass,  $avatar);
        }
        return $validateReg;
    }
    public function login($userArray) //0 order, 1 offset, 2 IdUser
    {
        // return  $order;
        $nameUser =  strtolower($userArray[0]['value']);
        $psswordUser =  strtolower($userArray[1]['value']);
        $userSQL =  $this->bll->obtain_validateUserLogin_BLL($nameUser);
        if ($userSQL == true) { //El usuari existeix
            if (password_verify($psswordUser, $userSQL[0]['pssword']) == true) {
                // $token = encodeToken($nameUser);
                $token = jwt_process::encode(SECRET,  $nameUser);
                return $token;
            } else {
                return 'falsePssword';
            }
        } else {
            return false;
        }
    }
    // public function categoryDecade($sendDatArray) //0 order, 1 offset, 2 IdUser
    // {
    //     // return  $order;
    //     return $this->bll->obtain_categoryDecade_BLL($sendDatArray);
    // }

    // public function categoryFormate($sendDatArray) //0 order, 1 offset, 2 IdUser
    // {
    //     // return  $order;
    //     return $this->bll->obtain_categoryFormate_BLL($sendDatArray);
    // }
    // public function categoryGenere($sendDatArray) //0 order, 1 offset, 2 IdUser
    // {
    //     // return  $order;
    //     return $this->bll->obtain_categoryGenere_BLL($sendDatArray);
    // }
    // public function filter($sendDatArray) //0 order, 1 offset, 2 IdUser
    // {
    //     // return  $order;
    //     return $this->bll->obtain_filter_BLL($sendDatArray);
    // }
    // public function pagination($type) //0 order, 1 offset, 2 IdUser
    // {
    //     // return  $type;
    //     return $this->bll->obtain_pagination_BLL($type);
    // }
    // public function filterType($type) //0 order, 1 offset, 2 IdUser
    // {
    //     // return  $type;
    //     return $this->bll->obtain_filterType_BLL($type);
    // }
    // public function countClick($arrArgument){
    //     // return "hola";
    //     return $this->bll->update_countClick_BLL($arrArgument);
    // }
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
