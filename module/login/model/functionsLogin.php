
                <?php


                function validateLogin($nameUser)
                {


                    try {
                        $daologin = new DAOLogin();
                        $resultado = $daologin->queryLogin($nameUser); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!
                    } catch (Exception $e) {
                        die('<script>window.location.href=index.php?page=503;</script>');
                    }
                    count($resultado) === 0 ? $resultado = false : $resultado = $resultado;
                    return $resultado;
                }




                function validateRegister($formulario)
                {

                    $nameUser =  strtolower($formulario[0]['value']);
                    $email = strtolower($formulario[3]['value']);

                    try {
                        $daologin = new DAOLogin();
                        $resultado = $daologin->queryValidateRegister($nameUser, $email); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!
                    } catch (Exception $e) {
                        die('<script>window.location.href=index.php?page=503;</script>');
                    }
                    count($resultado) === 0 ? $resultado = true : $resultado = false;
                    return $resultado;
                }
