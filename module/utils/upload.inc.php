<?php
function upload_files(){
	$error = "";
    $copyfile = false;
    $extension = array('jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg');
    if(!isset($_SESSION['nameFile'])) {
        $_SESSION['nameFile'] =  array();
    }

    if(!isset($_FILES)) {
        $error .=  'No existe $_FILES <br>';
    }
    if(!isset($_FILES['file'])) {
        $error .=  'No existe $_FILES[file] <br>';
    }

    if ($_FILES['file']['error']>0) { // El error 0 quiere decir que se subió el archivo correctamente
        switch ($_FILES['file']['error']){
            case 1: $error .=  'El fichero es muy pesado <br>'; break;//Fitxer major que upload_max_filesize
            case 2: $error .=  'El tamaño es mas grandre que el maximo a subir <br>';break;//Fitxer major que max_file_size
            case 3: $error .=  'Subida incompleta del fichero <br>';break;//Fitxer només parcialment pujat
            case 4: $error .=  'No se ha sibudo ningun fichero <br>';break; //assignarem a l'us default-avatar
        }
    }

    if ($_FILES['file']['size'] > 75000 ){
        $error .=  "Fichero demasiado grande <br>";
    }

    if ($_FILES['file']['name'] !== "") {
        ////////////////////////////////////////////////////////////////////////////
        @$extensionc = strtolower(end(explode('.', $_FILES['file']['name']))); // Obtenemos la extensión, en minúsculas para poder comparar
        if( ! in_array($extensionc, $extension)) {
            $error .=  'Sólo se permite subir archivos con estas extensiones: ' . implode(', ', $extension).' <br>';
        }

        //getimagesize falla si $_FILES['avatar']['name'] === ""
        if (!@getimagesize($_FILES['file']['tmp_name'])){
            $error .=  "Invalid Image File... <br>";
        }

        list($width, $height, $type, $attr) = @getimagesize($_FILES['file']['tmp_name']);
        if ($width > 1080 || $height > 1080){
            $error .=   "Maximum width and height exceeded. Please upload images below 100x100 px size <br>";
        }
    }

    $upfile = MEDIA_PATH . $_FILES['file']['name'];//Cambiado avatar por file
    if (is_uploaded_file($_FILES['file']['tmp_name'])){
        if (is_file($_FILES['file']['tmp_name'])) {
            //$idUnic = rand();
            //$nameFile = $idUnic."_".$_FILES['file']['name'];

            //$_SESSION['nameFile'] = $nameFile;
            $copyfile = true;
            // I use absolute route to move_uploaded_file because this happens when i run ajax
            $upfile = MEDIA_PATH . $_FILES['file']['name'];
        }else{
                $error .=   "Fichero invalido";
        }
    }

    $i=0;
    if ($error == "") {
        if ($copyfile) {
            if (!move_uploaded_file($_FILES['file']['tmp_name'], $upfile)) {
                $error .= "<p>Error al subir laa imagen.</p>";
                return $return=array('result'=>false,'error'=>$error,'data'=>"");
            }
            //We need edit $upfile because now i don't need absolute route.
            $upfile = '/1_Fw_PHP_OO_MVC_jQuery_AngularJS/Framework/9_adoptions_dogs/media/' . $_FILES['file']['name'];
            return $return=array('result'=>true , 'error'=>$error,'data'=>$upfile);
        }
        if($_FILES['file']['error'] !== 0) { //Assignarem a l'us default-avatar
            $upfile = MEDIA_PATH . '/default-pic.svg';
            return $return=array('result'=>true,'error'=>$error,'data'=>$upfile);
        }
    }else{
        return $return=array('result'=>false,'error'=>$error,'data'=>"");
    }

}

function remove_files(){
	$ncfile = $_POST['filename'];
	if(file_exists(MEDIA_PATH . $ncfile)){
		unlink(MEDIA_PATH. $ncfile);
		return true;
	}else{
		return false;
	}
}