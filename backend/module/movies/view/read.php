<h1>Detalles de la película</h1>

<table border=1>
    <?php
    foreach ($resultado as $type => $value) { //Row = Fila, sería cada fila, amb els seus atributs per columna 
        if ($type == "anyo") {
            $type = "año";
        }
        echo '<tr>';
        echo '<td>' . $type . '</td>';
        echo '<td>' . $value . '</td>';
        echo '</tr>';
    }
    ?>

</table>
<a href="index.php?page=movies&op=list"><input type="button" value="Return to List"></a>