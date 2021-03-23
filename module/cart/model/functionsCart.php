                <?php


                function validateLogin($idUser, $idProduct)
                {


                    try {
                        $daologin = new DAOCart();
                        $idAlbaran = $daologin->getAlbaran($idUser); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!

                        // return $idAlbaran[0]['idalbaran'];
                        if (!isset($idAlbaran)) {

                            $daologin->setAlbaran($idUser);
                            $idAlbaran = $daologin->getAlbaran($idUser);
                            // $idAlbaran = $idAlbaran->idalbaran;
                            // return $idAlbaran;
                        }
                        $idAlbaran = $idAlbaran->idalbaran;
                        // return $idAlbaran;

                        // return $idAlbaran;
                        $idLinea = $daologin->getLine($idAlbaran, $idProduct);
                        // return $idLinea;
                        if (!isset($idLinea)) {
                            // return "weee";
                            $daologin->SetLine($idAlbaran, $idProduct);
                            return "ha afegit una linea";
                        } else {
                            $idLinea = $idLinea->idlinea;
                            $daologin->updateLineIncrease($idAlbaran, $idLinea);
                            return "ha aumentat la quantitat";
                        }
                    } catch (Exception $e) {
                        return "error";
                    }
                    // count($resultado) === 0 ? $resultado = false : $resultado = $resultado;






                    // return $idAlbaran;
                }
