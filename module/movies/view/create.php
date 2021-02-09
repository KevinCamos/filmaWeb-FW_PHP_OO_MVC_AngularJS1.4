<section id="home" class="head-main-img">
	<div class="container">
		<div class="row text-center pad-row">
			<div class="col-md-12">
				<h1> CREATE </h1>
			</div>
		</div>
	</div>
</section>

<form name="formmovies" id=formmovies method="POST" ?>
	<table class="styled-table">

		<tbody>
			<!--REFERENCIA REFERENCIA-->

			<tr>
				<td>Ref.</td>
				<td><input type="text" name="ref" id="ref" placeholder="Ejemplo: SWIV77"><span id="error_ref" class="styerror">
						<?php echo isset($switch) ? "Este film ya existe en la base de datos" : ""; ?></span></td>
			</tr>
			<!--PELICULA PELICULA PELICULA-->
			<tr>
				<td>Película</td>
				<td><input type="text" name="movie" id="movie" placeholder="introduce una película"><span id="error_movie" class="styerror"></span></td>
			</tr>
			<tr>
				<!--DIRECTOR DIRECTOR DIRECTOR -->
				<td>Director</td>
				<td><input type="text" name="director" id="director" placeholder="introduce un director"><span id="error_director" class="styerror"></span></td>
			</tr>
			<tr>
				<!--EMAIL EMAIL EMAIL EMAIL -->
				<td>E-mail</td>
				<td><input type="text" name="email" id="email" placeholder="introduce tu e-mail" required><span id="error_email" class="styerror"></span></td>
			</tr>
			<tr>
				<!--FORMATO FORMATO FORMATO FORMATO FORMATO -->

				<td>Formato</td>
				<td>VHS<input type="checkbox" id="format" name="format[]" value="VHS" id="format">&nbsp;&nbsp;&nbsp;&nbsp;
					DVD<input type="checkbox" id="format" name="format[]" value="DVD" id="format">&nbsp;&nbsp;&nbsp;&nbsp;
					Blu-Ray<input type="checkbox" id="format" name="format[]" value="Blu-Ray">&nbsp;&nbsp;&nbsp;&nbsp;
					4K<input type="checkbox" id="format" name="format[]" value="4K">&nbsp;&nbsp;&nbsp;&nbsp;
					Digital<input type="checkbox" id="format" name="format[]" value="Digital">&nbsp;&nbsp;&nbsp;&nbsp;
					Otro<input type="checkbox" name="format[]" value="Otro">
					<span id="error_format" class="styerror"></span>
				</td>

			</tr>
			<tr>
				<!--PREMIOS AWARDS PREMIOS AWARDS -->
				<td>Premios</td>
				<td>
					Sí <input name=awards id="awards" type="radio" value="Sí" required>
					No <input name=awards id="awards" type="radio" value="No">
					Desconocido <input name=awards id="awards" type="radio" value="Desonocido"><span id="error_awards" class="styerror"></span>
				</td>
			</tr>
			<tr>
				<!--GENERE GENERE GENERE GENERE-->
				<td>Genero</td>
				<td>
					<select name="genere" type="text">
						<option value="Selecciona un genero">Selecciona un género</option>
						<option value="Accion">Acción</option>
						<option value="Ciencia ficcion">Ciencia Ficcion</option>
						<option value="Fantasia">Fantasía</option>
						<option value="Aventura">Aventura</option>
						<option value="Drama">Drama</option>
						<option value="Thriller">Thriller</option>
						<option value="Comedia">comedia</option>
						<option value="Gore">Gore</option>
					</select><span id="error_genere" class="styerror"></span>
				</td>
			</tr>
			<tr>
				<!--FECHA FECHA FECHA FECHA-->
				<td>Fecha de lanzamiento</td>
				<td><input type="text" id="anyo" name="anyo" placeholder="fecha de lanzamiento" required><span id="error_date" class="styerror"></span></td>
			</tr>
			<tr>
				<!--PRECIO PRECIO PRECIO -->
				<td>Precio</td>
				<td><input type="text" name="price" id="price" placeholder="introduce el precio"><span id="error_price" class="styerror"></span></td>
			</tr>
			<tr>
				<!--IMG IMG IMG IMG IMG  -->
				<td>Img</td>
				<td><input type="text" name="img" id="img" placeholder="cinema_paradiso.jpg"><span id="error_img" class="styerror"></span></td>
			</tr>
		</tbody>
	</table>
	<!--SEND SEND SEND SEND SEND SEND -->
	<input value="create" name="create" id="create" type="button" onclick="validate_movies()" />
	<input type="reset" value="Clean">
	<a href="index.php?page=movies&op=list"><input type="button" value="Return to List"></a>


</form>