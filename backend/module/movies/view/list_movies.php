<section class="head-main-img">
    <div class="container">
        <div class="row text-center pad-row">
            <div class="col-md-12">
                <h1> CREATE </h1>
            </div>
        </div>
    </div>
</section>

        <div class="row">
            <!-- <p><a href="index.php?page=controller_user&op=create"><img src="view/img/anadir.png"></a></p>  -->
            <p><a href="index.php?page=movies&op=create"><img src="view/img/add.png"></a></p>
            <table border 1 id="data_list" class="display" width=1650px>
                <thead>
                    <tr>
                    <th width=100 align="center"><b> Acción</b></th>
                        <th width=85 align="center"><b> Director</b></th>
                        <th width=85 align="center"><b> Película</b></th>
                        <th width=50 align="center"><b> Año</b></th>
                        <th width=50 align="center"><b> Price</b></th>
                        <th width=50 align="center"><b> Img</b></th>
                    </tr>
                </thead>
                <tbody>
                <?php
                if ($resultado->num_rows === 0) {
                    echo '<tr>';
                    echo '<td align="center"  colspan="3">NO HAY NINGUNA PELÍCULA</td>';
                    echo '</tr>';
                } else {
                    foreach ($resultado as $row) { //Row = Fila, sería cada fila, amb els seus atributs per columna 
                        echo '<tr>';
                        echo '<td align="center">';
                        echo ("<span type='button' class='movieRead' id='" . $row['id'] . "'></span>");
                        // echo '<a class="Button_blue" href="index.php?page=movies&op=read&id=' . $row['id'] . '"><img src="view/img/read.png"></a>';
                        echo '&nbsp;';
                        echo '<a class="movieUpdate" href="index.php?page=movies&op=update&id=' . $row['id'] . '"></a>';
                        echo '&nbsp;';
                        echo ("<span type='button' class='movieDelete' id='" . $row['id'] . "'></span>");
                        // echo '<a class="movieDelete" href="index.php?page=movies&op=delete&id=' . $row['id'] . '"></a>';
                        echo '<td  align="center">' . $row['director'] . '</td>';
                        echo '<td align="center">' . $row['movie'] . '</td>';
                        echo '<td align="center">' . $row['anyo'] . '</td>';
                        echo '<td align="center">' . $row['price'] . '</td>';
                        echo '<td align="center">;<img src="module\movies\img\\' . $row['reference'] . '.jpg"></td>';
                        
                        echo '</td>';
                        echo '</tr>';

                    }
                }
                ?>
                 </tbody>
            </table>
    

<!-- MODAL PARA SACAR LA VENTANA FLOTANTE DE READ, DELETE -->
<div id="list_modal"></div>