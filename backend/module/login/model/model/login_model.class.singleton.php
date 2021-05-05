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
            $tokenMail = jwt_process::encode_tokmail(SECRET,  $nameUser);
            // return $this->bll->insert_register_BLL($email, $nameUser, $hashed_pass,  $avatar,  $tokenMail);
            $this->bll->insert_register_BLL($email, $nameUser, $hashed_pass,  $avatar,  $tokenMail);

            $arrArgument = [
                'type' => 'alta',
                'token' => $tokenMail,
                'inputName' => $nameUser,
                'inputEmail' =>  $email,
            ];
            return mail::send_email($arrArgument);
        }
        return $validateReg;
    }
    public function login($userArray) //0 order, 1 offset, 2 IdUser
    {
        $nameUser =  strtolower($userArray[0]['value']);
        $psswordUser =  strtolower($userArray[1]['value']);
        $userSQL =  $this->bll->obtain_validateUserLogin_BLL($nameUser);
        if ($userSQL == true) { //El usuari existeix
            if (password_verify($psswordUser, $userSQL[0]['pssword']) == true) {
                // $token = encodeToken($nameUser);
                return jwt_process::encode(SECRET,  $nameUser);
            } else {
                return 'falsePssword';
            }
        } else {
            return false;
        }
    }
    public function getUser($token) //0 order, 1 offset, 2 IdUser
    {
        $token = json_decode(jwt_process::decode(SECRET,  $token), true);

        if (time() < $token["exp"]) {
            return  $this->bll->obtain_getUser_BLL($token["name"])[0];
        } else {
            return false;
        }
        // 
    }
    public function token_mail($token) //0 order, 1 offset, 2 IdUser
    {
        $token = json_decode(jwt_process::decode(SECRET,  $token), true);

        if (time() < $token["exp"]) {
            $this->bll->update_token_mail_BLL($token["name"]);
            return jwt_process::encode(SECRET, $token["name"]);
        } else {
            return false;
        }
        // 
    }


    public function socialLogin($dataUser) //0 order, 1 offset, 2 IdUser
    {
        $validateReg = $this->bll->obtain_validateSocialLogin_BLL($dataUser[0]);
        if ($validateReg != true) { //El usuari existeix
            $this->bll->obtain_registerSocialLogin_BLL($dataUser);
        }
        return  jwt_process::encode(SECRET, $dataUser[2]);


        // 
    }

    public function recoveredMail($nameUser) //0 order, 1 offset, 2 IdUser
    {
        $userSQL =  $this->bll->obtain_validateUserLogin_BLL($nameUser);
        if ($userSQL == false) { //El usuari existeix
            return false;
        }
        // return true;

        $tokenMail = jwt_process::encode_tokmail(SECRET,  $userSQL[0]['email']);

        // return $this->bll->insert_register_BLL($email, $nameUser, $hashed_pass,  $avatar,  $tokenMail);

        $arrArgument = [
            'type' => 'recovered',
            'token' => $tokenMail,
            'inputName' => $userSQL[0]['username'],
            'inputEmail' =>  $userSQL[0]['email'],
        ];
        return mail::send_email($arrArgument);        // return  jwt_process::encode(SECRET, $dataUser[2]);


        // 
    }

    public function recoveredPassword($token) //0 order, 1 offset, 2 IdUser
    {
        $token = json_decode(jwt_process::decode(SECRET,  $token), true);

        if (time() < $token["exp"]) {
            // $this->bll->update_token_mail_BLL($token["name"]);
            return jwt_process::encode(SECRET, $token["name"]);
        } else {
            return false;
        }
        // 
    }

    public function changePassword($password, $token)
    {
        $token = json_decode(jwt_process::decode(SECRET,  $token), true);

        if (time() < $token["exp"]) {

            // return $token["name"];
            $hashed_pass = password_hash(strtolower($password), PASSWORD_DEFAULT);
            $this->bll->update_changePassword_BLL($token["name"], $hashed_pass);
            return  jwt_process::encode(SECRET, $token["name"]);
        } else {
            return false;
        }
    }
    public function updateToken($token)
    {

        $token = json_decode(jwt_process::decode(SECRET,  $token), true);

        if (time() < $token["exp"]) {
            return jwt_process::encode(SECRET, $token["name"]);
        } else {
            return false;
        }
    }
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
