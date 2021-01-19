<div id="contenido">
    <div class="container">
        <div class="row">
            <h1>Lista de Películas</h1>
        </div>
        <div class="row">
            <!-- <p><a href="index.php?page=controller_user&op=create"><img src="view/img/anadir.png"></a></p>  -->
            <p><a href="index.php?page=movies&op=create"><img src="view/img/add.png"></a></p>
            <table border=1>
                <tr>
                    <th width=250 align="center"><b>----------Accion----------</b></th>
                    <td width=85 align="center"><b>Director</b></th>
                    <td width=250><b>Película</b></th>

                </tr>
                <?php
                if ($resultado->num_rows === 0) {
                    echo '<tr>';
                    echo '<td align="center"  colspan="3">NO HAY NINGUNA PELÍCULA</td>';
                    echo '</tr>';
                } else {
                    foreach ($resultado as $row) { //Row = Fila, sería cada fila, amb els seus atributs per columna 
                        echo '<tr>';
                        echo '<td width=250 align="center">';
                        echo ("<span type='button' class='movieRead' id='" . $row['id'] . "'></span>");
                        // echo '<a class="Button_blue" href="index.php?page=movies&op=read&id=' . $row['id'] . '"><img src="view/img/read.png"></a>';
                        echo '&nbsp;';
                        echo '<a class="movieUpdate" href="index.php?page=movies&op=update&id=' . $row['id'] . '"></a>';
                        echo '&nbsp;';
                        echo ("<span type='button' class='movieDelete' id='" . $row['id'] . "'></span>");
                        // echo '<a class="movieDelete" href="index.php?page=movies&op=delete&id=' . $row['id'] . '"></a>';
                        echo '<td width=85 align="center">' . $row['director'] . '</td>';
                        echo '<td width=125>' . $row['movie'] . '</td>';
                        echo '</td>';
                        echo '</tr>';
                    }
                }
                ?>
            </table>
        </div>
    </div>
</div>

<!-- MODAL PARA SACAR LA VENTANA FLOTANTE DE READ, DELETE -->
<div id="list_modal"></div></br>