<div id="contenido">
    <form method="POST" name="delete_movie" id="delete_movie" action="index.php?page=movies&op=delete&id=<?php echo $_GET['id']; ?>">
        <table border='0'>
            <tr>
                <td align="center"  colspan="2"><h3>¿Seguro que deseas borrar el film <?php echo $_GET['id']; ?>?</h3></td>
                
            </tr>
            <tr>
                <td align="center"><button type="submit" name="delete" id="delete">Aceptar</button></td>
                <td align="center"><a class="Button_red" href="index.php?page=controller_user&op=list">Cancelar</a></td>
            </tr>
        </table>
    </form>
</div>
