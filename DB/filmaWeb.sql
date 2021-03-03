-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-03-2021 a las 06:19:43
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `filmoteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `img` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id_category`, `img`, `category`) VALUES
(1, '80.jpg', 'decade'),
(2, 'vhs.jpg', 'formate'),
(3, 'fantasia.jpg', 'genere');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies`
--

CREATE TABLE `movies` (
  `id` int(6) UNSIGNED NOT NULL,
  `reference` varchar(6) NOT NULL,
  `movie` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `formats` varchar(50) NOT NULL,
  `director` varchar(30) NOT NULL,
  `genere` varchar(15) NOT NULL,
  `awards` varchar(11) NOT NULL,
  `anyo` varchar(11) NOT NULL,
  `price` varchar(20) DEFAULT NULL,
  `img` varchar(100) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `clicks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movies`
--

INSERT INTO `movies` (`id`, `reference`, `movie`, `email`, `formats`, `director`, `genere`, `awards`, `anyo`, `price`, `img`, `country`, `clicks`) VALUES
(15, 'SWIV77', 'Star Wars IV', 'kevin_camos@hotmail.es', 'VHS', 'George Lucas', 'Ciencia ficcion', 'Sí', '1977', '19.95', 'SWIV77.jpg', 'Estados Unidos', 10),
(17, 'SWEV80', 'Star Wars V', 'kevin_camos@hotmail.es', 'VHS', 'George Lucas', 'Fantasia', 'Sí', '1980', '19.95', 'SWEV80.jpg', 'Estados Unidos', 226),
(18, 'SWVI83', 'Star Wars VI', 'lucasfilms@gmail.com', 'VHS:DVD:Blu-Ray:4K:Digital:Otro', 'George Lucas', 'Fantasia', 'Sí', '1983', '19.95', 'SWVI83.jpg', 'Estados Unidos', 31),
(19, 'SWI999', 'Star Wars I', 'lucasfilms@gmail.com', 'VHS:DVD:Blu-Ray:Digital:Otro', 'George Lucas', 'Accion', 'Sí', '1999', '19.95', 'SWI999.jpg', 'Estados Unidos', 9),
(20, 'SWII02', 'Star Wars II', 'lucasfilms@gmail.com', 'DVD:Blu-Ray:4K:Digital:Otro', 'George Lucas', 'Fantasia', 'No', '2002', '19.95', 'SWII02.jpg', 'Estados Unidos', 9),
(21, 'SWIII5', 'Star Wars III', 'lucasfilms@gmail.com', 'DVD:Blu-Ray:4K:Digital:Otro', 'George Lucas', 'Fantasia', 'Sí', '2005', '19.95', 'SWIII5.jpg', 'Estados Unidos', 9),
(22, 'SWVII5', 'Star Wars VII', 'lucasfilms@gmail.com', 'DVD:Blu-Ray:Digital:Otro', 'George Lucas', 'Fantasia', 'Sí', '2021', '19.95', 'SWVII5.jpg', 'Estados Unidos', 10),
(23, 'SWVIII', 'Star Wars VIII', 'lucasfilms@gmail.com', '4K:Digital', 'George Lucas', 'Ciencia ficcion', 'Sí', '2017', '19.95', 'SWVIII.jpg', 'Estados Unidos', 10),
(24, 'SWIX19', 'Star Wars IX', 'lucasfilms@gmail.com', 'Blu-Ray:4K:Digital:Otro', 'George Lucas', 'Fantasia', 'Sí', '2019', '19.95', 'SWIX19.jpg', 'Estados Unidos', 10),
(26, 'SWRO16', 'Rogue One, Star Wars', 'lucasfilms@gmail.com', 'Blu-Ray:4K:Digital:Otro', 'George Lucas', 'Fantasia', 'Sí', '2016', '19.95', 'SWRO16.jpg', 'Estados Unidos', 9),
(28, 'BTTFP1', 'Regreso al Futuro 2', 'Robert@back.com', 'VHS:DVD:Blu-Ray:Digital', 'Robert Zemeckis', 'Fantasia', 'Sí', '1985', '19.95', 'BTTFP1.jpg', 'Estados Unidos', 13),
(29, 'BTTFP2', 'Regreso al Futuro 1', 'Robert@back.com', 'VHS:DVD:Blu-Ray:4K:Digital', 'Robert', 'Ciencia ficcion', 'Sí', '1989', '19.95', 'BTTFP2.jpg', 'Estados Unidos', 9),
(30, 'BTTFP3', 'Regreso al Futuro 3', 'Robert@back.com', 'VHS', 'Robert Zemeckis', 'Fantasia', 'Sí', '1990', '19.95', 'BTTFP3.jpg', 'Estados Unidos', 9),
(31, 'EDDBAI', 'El día de la bestia', 'alexdelaiglesia@gmail.com', 'VHS:DVD:Digital', 'Álex de la Iglesia', 'Comedia', 'Sí', '1995', '9.95', 'EDDBAI.jpg', 'España', 120),
(32, 'BEAN97', 'Mr Bean The Movie', 'mrbean@gmail.com', 'VHS:Digital', 'Rowan Atkinson', 'Comedia', 'No', '1997', '9.95', 'BEAN97.jpg', 'Inglaterra', 32),
(33, 'BRAHEA', 'Braveheart', 'braveheart@gmail.com', 'VHS:DVD:Blu-Ray:4K:Digital:Otro', 'Mel Gibson', 'Drama', 'Sí', '1995', '15.95', 'BRAHEA.jpg', 'Estados Unidos', 28),
(34, 'STTM79', 'Star Trek: The Motion Picture', 'startrek@gmail.com', 'VHS:DVD:Blu-Ray:4K:Digital:Otro', 'Robert Wise', 'Ciencia ficcion', 'No', '1979', '12.95', 'STTM79.jpg', 'Estados Unidos', 11),
(35, 'STVI91', 'Star Trek: The undiscovered Co', 'startrek@gmail.com', 'VHS:DVD:Blu-Ray:4K:Digital:Otro', 'Nicholas Meyer', 'Ciencia ficcion', 'No', '1991', '11.95', 'STVI91.jpg', 'Estados Unidos', 9),
(36, 'WILLOW', 'Willow', 'willow@gmail.com', 'VHS:DVD:Blu-Ray:4K:Digital:Otro', 'Ron Howard', 'Fantasia', 'No', '1988', '18.95', 'WILLOW.jpg', 'Reino Unido', 45),
(37, 'SOUL20', 'Soul', 'soul@gmail.com', 'Digital:Otro', 'Pete Docter', 'Animación', 'Sí', '2020', '17.95', 'SOUL20.jpg', 'Estados Unidos', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shop`
--

CREATE TABLE `shop` (
  `cod_shop` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `shop`
--

INSERT INTO `shop` (`cod_shop`, `name`, `longitude`, `latitude`) VALUES
(1, 'Ontinyent', '-0.6167', '38.8167'),
(2, 'Bocairent', '-0.61667', '38.76667'),
(3, 'Xàtiva', '-0.5235474', '38.9899566');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiene`
--

CREATE TABLE `tiene` (
  `cod_shop` int(11) NOT NULL DEFAULT 0,
  `id` int(6) UNSIGNED NOT NULL DEFAULT 0,
  `cantidad` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tiene`
--

INSERT INTO `tiene` (`cod_shop`, `id`, `cantidad`) VALUES
(1, 32, 5),
(2, 32, 5),
(3, 32, 0),
(1, 28, 5),
(2, 28, 5),
(3, 28, 5),
(1, 29, 5),
(2, 29, 5),
(3, 29, 5),
(1, 30, 5),
(2, 30, 5),
(3, 30, 5),
(1, 31, 5),
(2, 31, 5),
(3, 31, 0),
(1, 17, 5),
(2, 17, 5),
(3, 17, 5),
(1, 19, 5),
(2, 19, 5),
(3, 19, 0),
(1, 20, 5),
(2, 20, 0),
(3, 20, 0),
(1, 21, 5),
(2, 21, 0),
(3, 21, 0),
(1, 15, 5),
(2, 15, 5),
(3, 15, 5),
(1, 24, 5),
(2, 24, 0),
(3, 24, 5),
(1, 26, 5),
(2, 26, 0),
(3, 26, 5),
(1, 18, 5),
(2, 18, 5),
(3, 18, 0),
(1, 22, 5),
(2, 22, 0),
(3, 22, 0),
(1, 23, 5),
(2, 23, 0),
(3, 23, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indices de la tabla `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference` (`reference`);

--
-- Indices de la tabla `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`cod_shop`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `shop`
--
ALTER TABLE `shop`
  MODIFY `cod_shop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
