<?php
//////
class jwt_process {
    private static $header = '{"typ": "JWT", "alg": "HS256"}';
    //////
    public static function encode($secret, $user) {
        $payload = json_encode(['iat' => time(), 'exp' => time() + (60 * 60), 'name' => $user]);
        $JWT = new jwt();
        return $JWT -> encode(self::$header, $payload, $secret);
    }// end_encode

    public static function decode($secret, $token ) {
        $JWT = new jwt();
        return $JWT -> decode($token, $secret);
    }
    public static function encode_tokmail($secret, $user) {
        $payload = json_encode(['iat' => time(), 'exp' => time() + (60 * 60*24), 'name' => $user]);
        $JWT = new jwt();
        return $JWT -> encode(self::$header, $payload, $secret);
    }// end_encode

    
    // end_decode
}// end_jwt_process