<section id="home" class="head-main-img">
	<div class="container">
		<div class="row text-center pad-row">
			<div class="col-md-12">
				<h1> UPDATE </h1>
			</div>
		</div>
	</div>
</section>

<form name="formmovies" id="formmovies" method="POST" ?>
	<table width="100%" border="1" cellspacing="2" cellpadding="2">

		<tbody>

			<tr>
				<td>ID</td>
				<td><input type="text" name="id" id="id" value="<?php echo $movie['id']; ?>" readonly>
				</td>
			</tr>

			<tr>
				<!--REFERENCIA REFERENCIA-->
				<td>Ref.</td>
				<td><input type="text" name="ref" id="ref" value="<?php echo $movie['reference']; ?>" placeholder="Ejemplo: SWIV77"><span id="error_ref" class="styerror">
						<?php echo isset($switch) ? "Este film ya existe en la base de datos" : ""; ?></span></td>
			</tr>

			<tr>
				<!--PELICULA PELICULA PELICULA-->
				<td>Película</td>
				<td><input type="text" name="movie" id="movie" placeholder="introduce una película" value="<?php echo $movie['movie']; ?>"><span id="error_movie" class="styerror">
			</tr>
			<tr>
				<!--DIRECTOR DIRECTOR DIRECTOR -->
				<td>Director</td>
				<td><input type="text" name="director" id="director" placeholder="introduce un director" value="<?php echo $movie['director']; ?>"><span id="error_director" class="styerror"></span></td>
			</tr>
			<tr>
				<!--EMAIL EMAIL EMAIL EMAIL -->
				<td>E-mail</td>
				<td><input type="text" name="email" id="email" placeholder="introduce tu e-mail" value="<?php echo $movie['email']; ?>" required><span id="error_email" class="styerror"></span></td>
			</tr>


			<tr>
				<!--FORMATO FORMATO FORMATO FORMATO FORMATO -->

				<td>Formato</td>
				<?php
				$lang = explode(":", $movie['formats']);
				?>
				<?php if (in_array("VHS", $lang)) { ?>
					<td>VHS<input type="checkbox" id="format" name="format[]" value="VHS" checked>&nbsp;&nbsp;&nbsp;&nbsp;
					<?php } else { ?>
					<td>VHS<input type="checkbox" id="format" name="format[]" value="VHS">&nbsp;&nbsp;&nbsp;&nbsp;
					<?php } ?>

					<?php if (in_array("DVD", $lang)) { ?>
						DVD<input type="checkbox" id="format" name="format[]" value="DVD" checked>&nbsp;&nbsp;&nbsp;&nbsp;
					<?php } else { ?>

						DVD<input type="checkbox" id="format" name="format[]" value="DVD">&nbsp;&nbsp;&nbsp;&nbsp;
					<?php } ?>

					<?php if (in_array("Blu-Ray", $lang)) { ?>
						Blu-Ray<input type="checkbox" id="format" name="format[]" value="Blu-Ray" checked>&nbsp;&nbsp;&nbsp;&nbsp;
					<?php } else { ?>
						Blu-Ray<input type="checkbox" id="format" name="format[]" value="Blu-Ray">&nbsp;&nbsp;&nbsp;&nbsp;
					<?php } ?>

					<?php if (in_array("4K", $lang)) { ?>
						4K<input type="checkbox" id="format" name="format[]" value="4K" checked>&nbsp;&nbsp;&nbsp;&nbsp;
					<?php } else { ?>
						4K<input type="checkbox" id="format" name="format[]" value="4K">&nbsp;&nbsp;&nbsp;&nbsp;
					<?php } ?>

					<?php if (in_array("Digital", $lang)) { ?>
						Digital<input type="checkbox" id="format" name="format[]" value="Digital" checked>&nbsp;&nbsp;&nbsp;&nbsp;
					<?php } else { ?>
						Digital<input type="checkbox" id="format" name="format[]" value="Digital">&nbsp;&nbsp;&nbsp;&nbsp;
					<?php } ?>

					<?php if (in_array("Otro", $lang)) { ?>
						Otro<input type="checkbox" name="format[]" value="Otro" checked>
					<?php } else { ?>
						Otro<input type="checkbox" name="format[]" value="Otro">
					<?php } ?>

					<span id="error_format" class="styerror"></span>
					</td>

			</tr>

			<tr>
				<!--PREMIOS AWARDS PREMIOS AWARDS -->
				<td>Premios</td>
				<td>
					<?php if ($movie['awards'] === "Sí") { ?>
						Sí <input name=awards id="awards" type="radio" value="Sí" required checked>
						No <input name=awards id="awards" type="radio" value="No">
						Desconocido <input name=awards id="awards" type="radio" value="Desonocido"><span id="error_awards" class="styerror"></span>
					<?php } else if ($movie['awards'] === "No") { ?>
						Sí <input name=awards id="awards" type="radio" value="Sí" required>
						No <input name=awards id="awards" type="radio" value="No" checked>
						Desconocido <input name=awards id="awards" type="radio" value="Desonocido"><span id="error_awards" class="styerror"></span>
					<?php } else { ?>
						Sí <input name=awards id="awards" type="radio" value="Sí" required>
						No <input name=awards id="awards" type="radio" value="No">
						Desconocido <input name=awards id="awards" type="radio" value="Desonocido"><span id="error_awards" class="styerror" checked></span>
					<?php } ?>

				</td>
			</tr>
			<tr>
				<!--GENERE GENERE GENERE GENERE-->
				<!-- <?php echo $movie['genere']; ?> -->
				<td>Genero</td>
				<td>
					<select name="genere" type="text">
						<option value="Selecciona un genero">Selecciona un género</option>
						<option value="Accion" <?php if ($movie['genere'] === "Accion") { ?> selected <?php } ?>>Acción</option>
						<option value="Ciencia ficcion" <?php if ($movie['genere'] === "Ciencia ficcion") { ?> selected <?php } ?>>Ciencia Ficcion</option>
						<option value="Fantasia" <?php if ($movie['genere'] === "Fantasia") { ?> selected <?php } ?>>Fantasía</option>
						<option value="Aventura" <?php if ($movie['genere'] === "Aventura") { ?> selected <?php } ?>>Aventura</option>
						<option value="Drama" <?php if ($movie['genere'] === "Drama") { ?> selected <?php } ?>>Drama</option>
						<option value="Thriller" <?php if ($movie['genere'] === "Thriller") { ?> selected <?php } ?>>Thriller</option>
						<option value="Comedia" <?php if ($movie['genere'] === "Comedia") { ?> selected <?php } ?>>Comedia</option>
						<option value="Gore" <?php if ($movie['genere'] === "Gore") { ?> selected <?php } ?>>Gore</option>
						<option value="Serie B" <?php if ($movie['genere'] === "Serie B") { ?> selected <?php } ?>>Serie b</option>
					</select><span id="error_genere" class="styerror"></span>
				</td>
			</tr>
			<tr>
				<!--FECHA FECHA FECHA FECHA-->
				<td>Fecha de lanzamiento</td>
				<td><input type="text" id="anyo" name="anyo" placeholder="fecha de lanzamiento" value="<?php echo $movie['anyo']; ?>" required><span id="error_date" class="styerror"></span></td>
			</tr>
			<tr>
				<!--PRECIO PRECIO PRECIO -->
				<td>Precio</td>
				<td><input type="text" name="price" id="price" placeholder="introduce el precio" value="<?php echo $movie['price']; ?>"><span id="error_price" class="styerror"></span></td>
			</tr>
			<tr>
				<!--IMG IMG IMG IMG IMG  -->
				<td>Img</td>
				<td><input type="text" name="img" id="img" placeholder="cinema_paradiso.jpg" value="<?php echo $movie['img']; ?>">><span id="error_img" class="styerror"></span></td>
			</tr>
		</tbody>
	</table>
	<!--SEND SEND SEND SEND SEND SEND -->
	<input value="update" name="update" id="update" type="button" onclick="validate_movies()" />
	<a href="index.php?page=movies&op=list"><input type="button" value="Return to List"></a>


</form>