<?php
class mail
{
    public static function send_email($arr)
    {

        // return "hola";
        $html = '';
        $subject = '';
        $body = '';
        $ruta = '';
        $return = '';
        $inputMessage = '';
        switch ($arr['type']) {
            case 'alta':
                $subject = '¡Tu Alta en FilmaWeb!';
                $ruta = "<a href='" . friendlyModFunc("login", "token_mail", $arr['token']) . "'>aqu&iacute;</a>";
                $body = 'Hola ' . $arr['inputName'] . ' <p>Gracias por unirte a nuestra aplicaci&oacute;n<br> Para finalizar el registro, pulsa ' . $ruta . ' antes de 24h! </p>';
                $from = 'filmawebdaw@gmail.com';
                $email = $arr['inputEmail'];
                break;

            case 'recovered':
                $subject = '¿De verdad te has olvidado tu contraseña en Filmaweb?';
                $ruta = "<a href='" . friendlyModFunc("login", "recoveredPassword", $arr['token']) . "'>aqu&iacute;</a>";
                $body = 'Hola ' . $arr['inputName'] . ' <p>Si no has sido tu, ignora este mensaje, sino pulsa ' . $ruta . ' antes de 24h! </p>';
                $from = 'filmawebdaw@gmail.com';
                $email = $arr['inputEmail'];
                break;

            // case 'contact':
            //     $subject = 'Tu Petición a Filmaweb ha sido enviada<br>';
            //     $ruta = '<a href=' . 'http://localhost/1_Fw_PHP_OO_MVC_jQuery_AngularJS/Framework/9_adoptions_dogs/' . '>aqu&iacute;</a>';
            //     $body = 'Para visitar nuestra web, pulsa ' . $ruta;
            //     $from = $arr['inputEmail'];
            //     $email = 'filmawebdaw@gmail.com';
            //     $inputMessage = $arr['inputMessage'];

                break;

            case 'admin':
                $subject = $arr['inputSubject'];
                $body = 'inputName: ' . $arr['inputName'] . '<br>' .
                    'inputEmail: ' . $arr['inputEmail'] . '<br>' .
                    'inputSubject: ' . $arr['inputSubject'] . '<br>' .
                    'inputMessage: ' . $arr['inputMessage'];
                $from = 'filmawebdaw@gmail.com';
                $email = $arr['inputEmail'];
                break;
        }

        $html .= "<html>";
        $html .= "<body>";
        $html .= "Asunto:";
        $html .= "<br><br>";
        $html .= "<h4>" . $subject . "</h4>";
        $html .= "<br><br>";
        $html .= "Mensaje:";
        $html .= "<br><br>";
        $html .=  $inputMessage;
        $html .= "<br><br>";
        $html .= $body;
        $html .= "<br><br>";
        $html .= "<p>Sent by FILMAWEB</p>";
        $html .= "</body>";
        $html .= "</html>";

        //set_error_handler('ErrorHandler');
        try {
            // if ($arr['type'] === 'admin') {
            //     $from = 'filmawebdaw@gmail.com';
            //     $email = $arr['inputEmail'];
            // } else {
            //     $from = $arr['inputEmail'];
            //     $email = 'filmawebdaw@gmail.com';
            // }
            // $result = ["from" => $from,  "email" => $email, "subject" => $subject, "html" => $html];
            // return $result;
            $result = self::send_mailgun($from,  $email, $subject, $html);
        } catch (Exception $e) {
            $return = 0;
        }
        //restore_error_handler();
        return $result;
    }

    private static function send_mailgun($from, $email, $subject, $html)
    {
        $config = array();
        $config['api_key'] = EMAIL_KEY; //API Key
        $config['api_url'] = EMAIL_URL; //API Base URL

        $message = array();
        $message['from'] = $from;
        $message['to'] =  $email;
        $message['h:Reply-To'] = "ruralshoponti@gmail.com";
        $message['subject'] = $subject;
        $message['html'] = $html;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $config['api_url']);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($ch, CURLOPT_USERPWD, "api:{$config['api_key']}");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $message);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }
}
