
                <?php
                function validate($formulario)
                {
                    try {
                        $daomovies = new DAOMovie();
                        $resultado = $daomovies->select_all_movie(); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!
                    } catch (Exception $e) {
                        $callback = 'index.php?page=503';
                        die('<script>window.location.href="' . $callback . '";</script>');
                    }
                    // echo $resultado->num_rows;
                    // echo "IEEEEEEEEEEEEE";

                    if ($resultado->num_rows === 0) {
                        return $validate = true;
                    } else {
                        foreach ($resultado as $row) { //Row = Fila, sería cada fila, amb els seus atributs per columna 
                      
                            if ($formulario["ref"] === $row["reference"]) {
                                if(isset($formulario["id"]) && $formulario["id"] === $row["id"]) {
                                    continue;
                                }
                                // $movieError = "Esta película ya existe en la base de datoas";
                                return $validate = false;
                            }
                        }
                        return $validate = true;
                    }
                }
                function console_log($data) //per a mostrar en console
                {
                    echo '<script>';
                    echo 'console.log(' . json_encode($data) . ')';
                    echo '</script>';
                }
