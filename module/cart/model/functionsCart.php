                <?php


                function addLineShop($idUser, $idProduct)
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
                            $daologin->updateLineIncreaseLine($idAlbaran, $idLinea);
                            return "ha aumentat la quantitat";
                        }
                    } catch (Exception $e) {
                        return "error";
                    }
                }

                function countCart($idUser)
                {


                    try {
                        $daologin = new DAOCart();
                        $idAlbaran = $daologin->getAlbaran($idUser); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!

                        // return $idAlbaran[0]['idalbaran'];
                        if (!isset($idAlbaran)) {

                            return -1;
                            // $idAlbaran = $idAlbaran->idalbaran;
                            // return $idAlbaran;
                        }
                        $idAlbaran = $idAlbaran->idalbaran;

                        $countCart = $daologin->countCart($idAlbaran);
                        // return $idLinea;
                        if (!isset($countCart)) {
                            return -1;
                        } else {
                            return $countCart;
                        }
                    } catch (Exception $e) {
                        return "error";
                    }
                }
                function getCart($idUser)
                {


                    try {
                        $daologin = new DAOCart();
                        $idAlbaran = $daologin->getAlbaran($idUser); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!

                        if (!isset($idAlbaran)) {

                            return -1;
                            // $idAlbaran = $idAlbaran->idalbaran;
                            // return $idAlbaran;
                        }
                        $idAlbaran = $idAlbaran->idalbaran;

                        $countCart = $daologin->getCart($idAlbaran);
                        if (!isset($countCart)) {
                            return -1;
                        } else {
                            return $countCart;
                        }
                    } catch (Exception $e) {
                        return "error";
                    }
                }
                function updateAmount($type, $idAlbaran, $idProduct)
                {

                    // return "entra";
                    try {
                        $daologin = new DAOCart();

                        switch ($type) {
                            case 'rest':

                                $daologin->updateLineIncreaseRest($idAlbaran, $idProduct);
                                return "Cantidad disminuida";
                            case 'sum':

                                $daologin->updateLineIncreaseSum($idAlbaran, $idProduct);
                                return "Cantidad aumentada";

                                break;

                            case 'delete':
                                $daologin->DeleteLineIncrease($idAlbaran, $idProduct);
                                return "Cantidad eliminada";

                                break;
                        }
                    } catch (Exception $e) {
                        return "error";
                    }
                }
                function totalPrice($idAlbaran, $idProduct)
                {

                    // return "entra";
                    try {
                        // return "entra";

                        $daologin = new DAOCart();
                        $countCart = $daologin->getTotalPrice($idAlbaran, $idProduct);
                        return $countCart;
                    } catch (Exception $e) {
                        return "error";
                    }
                }

                function getAlbaran($idUser)
                {

                    // return "entra";
                    try {
                        // return "entra";

                        $daologin = new DAOCart();
                        $idAlbaran = $daologin->getAlbaran($idUser);
                        return $idAlbaran;
                    } catch (Exception $e) {
                        return "error";
                    }
                }

                function getTotal($idAlbaran)
                {

                    // return "entra";
                    try {
                        // return "entra";

                        $daologin = new DAOCart();
                        $countCart = $daologin->getTotal($idAlbaran);
                        return $countCart;
                    } catch (Exception $e) {
                        return "error";
                    }
                }
                function endCart($idAlbaran)
                {

                    // return "entra";
                    try {
                        // return "entra";

                        $daologin = new DAOCart();
                        $countCart = $daologin->endCart($idAlbaran);
                        return $countCart;
                    } catch (Exception $e) {
                        return "error";
                    }
                }
