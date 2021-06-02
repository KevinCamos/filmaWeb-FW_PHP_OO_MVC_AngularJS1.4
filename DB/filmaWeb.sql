-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2021 a las 21:11:03
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
-- Estructura de tabla para la tabla `albaran`
--

CREATE TABLE `albaran` (
  `idalbaran` int(11) NOT NULL,
  `idcliente` varchar(100) DEFAULT NULL,
  `estado` varchar(15) NOT NULL DEFAULT 'proceso'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `albaran`
--

INSERT INTO `albaran` (`idalbaran`, `idcliente`, `estado`) VALUES
(1, '13', 'F'),
(2, '19', 'F'),
(3, '19', 'F'),
(4, '13', 'F'),
(5, '15', 'F'),
(6, '27', 'F'),
(7, '28', 'F'),
(8, 'FW-bb3a2e74cd46de46fbed', 'F'),
(11, 'FW-bb3a2e74cd46de46fbed', 'F'),
(15, 'GM-o6lK6IHxSMcVp8V17klzl8tkMSS2', 'F'),
(16, 'FW-bb3a2e74cd46de46fbed', 'F'),
(18, 'FW-bb3a2e74cd46de46fbed', 'F'),
(19, 'FW-bb3a2e74cd46de46fbed', 'F'),
(20, 'FW-bb3a2e74cd46de46fbed', 'F'),
(21, 'FW-bb3a2e74cd46de46fbed', 'F'),
(22, 'FW-bb3a2e74cd46de46fbed', 'F'),
(23, 'FW-bb3a2e74cd46de46fbed', 'F'),
(24, 'FW-bb3a2e74cd46de46fbed', 'F'),
(25, 'FW-bb3a2e74cd46de46fbed', 'F'),
(26, 'FW-bb3a2e74cd46de46fbed', 'F'),
(27, 'FW-bb3a2e74cd46de46fbed', 'F'),
(28, 'FW-bb3a2e74cd46de46fbed', 'F'),
(29, 'FW-bb3a2e74cd46de46fbed', 'F'),
(30, 'FW-bb3a2e74cd46de46fbed', 'F'),
(31, 'FW-bb3a2e74cd46de46fbed', 'F'),
(32, 'FW-bb3a2e74cd46de46fbed', 'F'),
(33, 'FW-bb3a2e74cd46de46fbed', 'F'),
(34, 'FW-bb3a2e74cd46de46fbed', 'F'),
(35, 'FW-bb3a2e74cd46de46fbed', 'F'),
(36, 'FW-bb3a2e74cd46de46fbed', 'F'),
(37, 'FW-bb3a2e74cd46de46fbed', 'F'),
(38, 'FW-bb3a2e74cd46de46fbed', 'F'),
(39, 'FW-bb3a2e74cd46de46fbed', 'F'),
(40, 'FW-bb3a2e74cd46de46fbed', 'F'),
(41, 'FW-bb3a2e74cd46de46fbed', 'F'),
(42, 'FW-bb3a2e74cd46de46fbed', 'F'),
(43, 'GM-3yTtgxNyAGYD9jMt5NsitCyzMji2', 'F'),
(44, 'GM-3yTtgxNyAGYD9jMt5NsitCyzMji2', 'F'),
(45, 'GM-3yTtgxNyAGYD9jMt5NsitCyzMji2', 'proceso'),
(46, 'FW-bb3a2e74cd46de46fbed', 'F'),
(47, 'FW-bb3a2e74cd46de46fbed', 'proceso');

--
-- Disparadores `albaran`
--
DELIMITER $$
CREATE TRIGGER `factura` AFTER UPDATE ON `albaran` FOR EACH ROW BEGIN
IF NEW.estado LIKE "F" THEN

INSERT INTO facturacion  (idalbaran, idcliente, fechaFac, basImpon, totalIVA, totalFac)
SELECT idalbaran, idcliente, fecha, ROUND((totalPrice/1.21),2) AS basImpon ,  ROUND((totalPrice/1.21*0.21), 2) AS IVA,ROUND(totalPrice,2) as totalPrice
FROM (SELECT l.idalbaran, a.idcliente, now() as fecha , SUM((l.cantidad*m.price)) AS totalPrice
    FROM linea_producto l, movies m, albaran a
    WHERE l.idproducto=m.id
    AND  l.idalbaran = OLD.idalbaran
    and l.idalbaran= a.idalbaran
    AND l.cantidad <> 0
    GROUP BY l.idalbaran) AS K;
    
 END IF;
 
END
$$
DELIMITER ;

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
-- Estructura de tabla para la tabla `facturacion`
--

CREATE TABLE `facturacion` (
  `idfacturacion` int(11) NOT NULL,
  `idalbaran` int(11) DEFAULT NULL,
  `idcliente` varchar(100) DEFAULT NULL,
  `fechaFac` varchar(45) DEFAULT NULL,
  `basImpon` float DEFAULT NULL,
  `totalIVA` float DEFAULT NULL,
  `totalFac` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `facturacion`
--

INSERT INTO `facturacion` (`idfacturacion`, `idalbaran`, `idcliente`, `fechaFac`, `basImpon`, `totalIVA`, `totalFac`) VALUES
(1, 1, '13', '2021-03-26 19:28:06', 23.88, 5.02, 28.9),
(2, 2, '19', '2021-03-27 00:06:06', 37.07, 7.78, 44.85),
(3, 3, '19', '2021-03-27 00:32:12', 190.33, 39.97, 230.3),
(4, 4, '13', '2021-03-29 01:08:30', 90.66, 19.04, 109.7),
(5, 5, '15', '2021-03-29 17:14:38', 34.59, 7.26, 41.85),
(6, 6, '27', '2021-03-29 17:19:18', 29.63, 6.22, 35.85),
(7, 7, '28', '2021-04-03 19:56:27', 21.4, 4.5, 25.9),
(8, 8, 'FW-bb3a2e74cd46de46fbed', '2021-04-27 21:17:41', 80.66, 16.94, 97.6),
(9, 11, 'FW-bb3a2e74cd46de46fbed', '2021-04-27 21:31:20', 432.6, 90.85, 523.45),
(10, 15, 'GM-o6lK6IHxSMcVp8V17klzl8tkMSS2', '2021-04-27 21:37:13', 41.2, 8.65, 49.85),
(11, 16, 'FW-bb3a2e74cd46de46fbed', '2021-05-04 23:18:31', 24.71, 5.19, 29.9),
(12, 18, 'FW-bb3a2e74cd46de46fbed', '2021-05-04 23:20:38', 16.49, 3.46, 19.95),
(13, 19, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 17:39:48', 62.64, 13.16, 75.8),
(14, 20, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 17:42:13', 29.67, 6.23, 35.9),
(15, 21, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 17:44:10', 46.16, 9.69, 55.85),
(16, 22, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 17:45:18', 16.45, 3.45, 19.9),
(17, 23, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 17:49:26', 8.22, 1.73, 9.95),
(18, 24, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 17:56:01', 16.45, 3.45, 19.9),
(19, 25, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 17:58:07', 13.18, 2.77, 15.95),
(20, 26, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 18:00:39', 21.4, 4.5, 25.9),
(21, 27, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 18:02:54', 8.22, 1.73, 9.95),
(22, 28, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 18:03:39', 16.45, 3.45, 19.9),
(23, 29, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 18:03:56', 13.18, 2.77, 15.95),
(24, 30, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 18:04:47', 8.22, 1.73, 9.95),
(25, 31, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 18:30:06', 57.64, 12.11, 69.75),
(26, 32, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 18:30:54', 41.2, 8.65, 49.85),
(27, 33, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 18:34:28', 24.71, 5.19, 29.9),
(28, 34, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 18:35:37', 24.71, 5.19, 29.9),
(29, 35, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 18:36:39', 24.71, 5.19, 29.9),
(30, 36, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 18:37:28', 24.71, 5.19, 29.9),
(31, 37, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 18:41:01', 42.85, 9, 51.85),
(32, 38, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 18:42:03', 229.92, 48.28, 278.2),
(33, 40, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 20:17:55', 16.45, 3.45, 19.9),
(34, 41, 'FW-bb3a2e74cd46de46fbed', '2021-05-31 20:47:25', 13.18, 2.77, 15.95),
(35, 43, 'GM-3yTtgxNyAGYD9jMt5NsitCyzMji2', '2021-06-01 16:23:26', 32.93, 6.92, 39.85),
(36, 42, 'FW-bb3a2e74cd46de46fbed', '2021-06-02 19:44:41', 140.12, 29.43, 169.55),
(37, 44, 'GM-3yTtgxNyAGYD9jMt5NsitCyzMji2', '2021-06-02 19:47:18', 75.79, 15.91, 91.7),
(38, 46, 'FW-bb3a2e74cd46de46fbed', '2021-06-02 19:49:56', 24.71, 5.19, 29.9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `liketo`
--

CREATE TABLE `liketo` (
  `idusers` varchar(100) DEFAULT NULL,
  `idmovies` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `liketo`
--

INSERT INTO `liketo` (`idusers`, `idmovies`) VALUES
('', 31),
('FW-bb3a2e74cd46de46fbed', 26),
('FW-bb3a2e74cd46de46fbed', 26),
('FW-bb3a2e74cd46de46fbed', 26),
('FW-bb3a2e74cd46de46fbed', 15),
('FW-bb3a2e74cd46de46fbed', 21),
('FW-bb3a2e74cd46de46fbed', 31),
('FW-bb3a2e74cd46de46fbed', 33),
('GM-3yTtgxNyAGYD9jMt5NsitCyzMji2', 31);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `linea_producto`
--

CREATE TABLE `linea_producto` (
  `idlinea` int(11) NOT NULL,
  `idalbaran` int(11) NOT NULL,
  `idproducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `linea_producto`
--

INSERT INTO `linea_producto` (`idlinea`, `idalbaran`, `idproducto`, `cantidad`) VALUES
(1, 1, 17, 0),
(2, 1, 32, 1),
(3, 1, 36, 1),
(4, 2, 17, 0),
(5, 2, 31, 1),
(6, 2, 33, 1),
(7, 2, 36, 1),
(8, 3, 17, 1),
(9, 3, 18, 1),
(10, 3, 31, 1),
(11, 3, 36, 2),
(12, 3, 33, 1),
(13, 3, 32, 1),
(14, 3, 28, 1),
(15, 3, 35, 2),
(16, 3, 15, 1),
(17, 3, 24, 1),
(18, 3, 21, 1),
(19, 3, 34, 1),
(20, 4, 32, 1),
(21, 4, 18, 2),
(22, 4, 26, 1),
(23, 4, 23, 1),
(24, 4, 19, 1),
(25, 5, 17, 0),
(26, 5, 31, 1),
(27, 5, 33, 2),
(28, 6, 31, 1),
(29, 6, 33, 1),
(30, 6, 18, 0),
(31, 6, 32, 1),
(32, 7, 31, 0),
(33, 7, 33, 1),
(34, 7, 32, 1),
(35, 8, 17, 0),
(41, 8, 31, 5),
(42, 8, 33, 3),
(43, 11, 31, 5),
(44, 11, 33, 2),
(45, 11, 17, 7),
(46, 11, 18, 3),
(47, 11, 32, 2),
(48, 11, 36, 2),
(49, 11, 19, 1),
(50, 11, 35, 1),
(51, 11, 34, 1),
(52, 11, 28, 3),
(53, 11, 23, 1),
(54, 11, 22, 1),
(55, 11, 30, 1),
(56, 11, 24, 1),
(57, 12, 31, 0),
(58, 13, 31, 1),
(59, 14, 31, 1),
(60, 15, 31, 1),
(61, 15, 18, 1),
(62, 15, 17, 1),
(63, 16, 31, 1),
(64, 16, 17, 1),
(65, 18, 17, 1),
(66, 19, 31, 0),
(67, 19, 33, 1),
(68, 19, 28, 1),
(69, 19, 32, 0),
(70, 17, 31, 1),
(71, 17, 32, 1),
(72, 19, 30, 0),
(73, 19, 29, 2),
(74, 20, 33, 1),
(75, 20, 28, 1),
(76, 21, 33, 1),
(77, 21, 29, 1),
(78, 21, 28, 1),
(79, 22, 31, 1),
(80, 22, 32, 1),
(81, 23, 31, 1),
(82, 24, 31, 2),
(83, 25, 33, 1),
(84, 26, 33, 1),
(85, 26, 31, 1),
(86, 27, 31, 1),
(87, 28, 31, 2),
(88, 29, 33, 1),
(89, 30, 31, 1),
(90, 31, 31, 1),
(91, 31, 28, 1),
(92, 31, 30, 1),
(93, 31, 32, 2),
(94, 32, 31, 0),
(95, 32, 30, 2),
(96, 32, 32, 1),
(97, 33, 31, 1),
(98, 33, 28, 1),
(99, 34, 31, 1),
(100, 34, 28, 1),
(101, 35, 31, 1),
(102, 35, 29, 1),
(103, 36, 31, 1),
(104, 36, 28, 1),
(105, 37, 33, 2),
(106, 37, 28, 1),
(107, 38, 32, 1),
(108, 38, 30, 1),
(109, 38, 28, 1),
(110, 38, 31, 1),
(111, 38, 33, 1),
(112, 38, 29, 1),
(113, 38, 35, 1),
(114, 38, 37, 1),
(115, 38, 26, 1),
(116, 38, 19, 1),
(117, 38, 20, 1),
(118, 38, 34, 1),
(119, 38, 24, 1),
(120, 38, 22, 1),
(121, 38, 17, 1),
(122, 38, 21, 1),
(123, 39, 31, 0),
(124, 40, 31, 1),
(125, 40, 32, 1),
(126, 41, 31, 0),
(127, 41, 28, 0),
(128, 41, 33, 1),
(129, 42, 31, 0),
(130, 42, 33, 0),
(131, 42, 32, 1),
(132, 42, 29, 0),
(133, 43, 31, 1),
(134, 43, 32, 1),
(135, 43, 28, 1),
(136, 42, 28, 8),
(137, 44, 31, 1),
(138, 44, 33, 2),
(139, 44, 29, 1),
(140, 44, 32, 1),
(141, 44, 30, 1),
(142, 45, 31, 1),
(143, 46, 31, 1),
(144, 46, 29, 1),
(145, 47, 31, 2),
(146, 47, 29, 1),
(147, 47, 30, 1),
(148, 47, 18, 1);

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
(17, 'SWEV80', 'Star Wars V', 'kevin_camos@hotmail.es', 'VHS', 'George Lucas', 'Fantasia', 'Sí', '1980', '19.95', 'SWEV80.jpg', 'Estados Unidos', 441),
(18, 'SWVI83', 'Star Wars VI', 'lucasfilms@gmail.com', 'VHS:DVD:Blu-Ray:4K:Digital:Otro', 'George Lucas', 'Fantasia', 'Sí', '1983', '19.95', 'SWVI83.jpg', 'Estados Unidos', 36),
(19, 'SWI999', 'Star Wars I', 'lucasfilms@gmail.com', 'VHS:DVD:Blu-Ray:Digital:Otro', 'George Lucas', 'Accion', 'Sí', '1999', '19.95', 'SWI999.jpg', 'Estados Unidos', 9),
(20, 'SWII02', 'Star Wars II', 'lucasfilms@gmail.com', 'DVD:Blu-Ray:4K:Digital:Otro', 'George Lucas', 'Fantasia', 'No', '2002', '19.95', 'SWII02.jpg', 'Estados Unidos', 9),
(21, 'SWIII5', 'Star Wars III', 'lucasfilms@gmail.com', 'DVD:Blu-Ray:4K:Digital:Otro', 'George Lucas', 'Fantasia', 'Sí', '2005', '19.95', 'SWIII5.jpg', 'Estados Unidos', 12),
(22, 'SWVII5', 'Star Wars VII', 'lucasfilms@gmail.com', 'DVD:Blu-Ray:Digital:Otro', 'George Lucas', 'Fantasia', 'Sí', '2021', '19.95', 'SWVII5.jpg', 'Estados Unidos', 10),
(23, 'SWVIII', 'Star Wars VIII', 'lucasfilms@gmail.com', '4K:Digital', 'George Lucas', 'Ciencia ficcion', 'Sí', '2017', '19.95', 'SWVIII.jpg', 'Estados Unidos', 12),
(24, 'SWIX19', 'Star Wars IX', 'lucasfilms@gmail.com', 'Blu-Ray:4K:Digital:Otro', 'George Lucas', 'Fantasia', 'Sí', '2019', '19.95', 'SWIX19.jpg', 'Estados Unidos', 10),
(26, 'SWRO16', 'Rogue One, Star Wars', 'lucasfilms@gmail.com', 'Blu-Ray:4K:Digital:Otro', 'George Lucas', 'Fantasia', 'Sí', '2016', '19.95', 'SWRO16.jpg', 'Estados Unidos', 10),
(28, 'BTTFP1', 'Regreso al Futuro 2', 'Robert@back.com', 'VHS:DVD:Blu-Ray:Digital', 'Robert Zemeckis', 'Fantasia', 'Sí', '1985', '19.95', 'BTTFP1.jpg', 'Estados Unidos', 17),
(29, 'BTTFP2', 'Regreso al Futuro 1', 'Robert@back.com', 'VHS:DVD:Blu-Ray:4K:Digital', 'Robert', 'Ciencia ficcion', 'Sí', '1989', '19.95', 'BTTFP2.jpg', 'Estados Unidos', 12),
(30, 'BTTFP3', 'Regreso al Futuro 3', 'Robert@back.com', 'VHS', 'Robert Zemeckis', 'Fantasia', 'Sí', '1990', '19.95', 'BTTFP3.jpg', 'Estados Unidos', 9),
(31, 'EDDBAI', 'El día de la bestia', 'alexdelaiglesia@gmail.com', 'VHS:DVD:Digital', 'Álex de la Iglesia', 'Comedia', 'Sí', '1995', '9.95', 'EDDBAI.jpg', 'España', 271),
(32, 'BEAN97', 'Mr Bean The Movie', 'mrbean@gmail.com', 'VHS:Digital', 'Rowan Atkinson', 'Comedia', 'No', '1997', '9.95', 'BEAN97.jpg', 'Inglaterra', 49),
(33, 'BRAHEA', 'Braveheart', 'braveheart@gmail.com', 'VHS:DVD:Blu-Ray:4K:Digital:Otro', 'Mel Gibson', 'Drama', 'Sí', '1995', '15.95', 'BRAHEA.jpg', 'Estados Unidos', 88),
(34, 'STTM79', 'Star Trek: The Motion Picture', 'startrek@gmail.com', 'VHS:DVD:Blu-Ray:4K:Digital:Otro', 'Robert Wise', 'Ciencia ficcion', 'No', '1979', '12.95', 'STTM79.jpg', 'Estados Unidos', 12),
(35, 'STVI91', 'Star Trek: The undiscovered Co', 'startrek@gmail.com', 'VHS:DVD:Blu-Ray:4K:Digital:Otro', 'Nicholas Meyer', 'Ciencia ficcion', 'No', '1991', '11.95', 'STVI91.jpg', 'Estados Unidos', 10),
(36, 'WILLOW', 'Willow', 'willow@gmail.com', 'VHS:DVD:Blu-Ray:4K:Digital:Otro', 'Ron Howard', 'Fantasia', 'No', '1988', '18.95', 'WILLOW.jpg', 'Reino Unido', 72),
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idusers` varchar(200) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `pssword` varchar(300) NOT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `type` varchar(12) DEFAULT 'user',
  `activate` varchar(10) DEFAULT NULL,
  `token_email` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idusers`, `email`, `username`, `pssword`, `avatar`, `type`, `activate`, `token_email`) VALUES
('1', '1', '1', 'kevinsin', '1', '1', '1', '1'),
('FW-9602974e70cc35d59ed1', 'david@gmail.com', 'david', '$2y$10$IdBQDkODft//epxZ3E16T.Z3p6T4hPyAvpg2x2TWh3982GFaTEAHm', 'https://www.gravatar.com/avatar/f3c52e5ef3d2b471d0ef51c66c21d10c?s=40&d=robohash', 'user', NULL, 'eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJIUzI1NiJ9.eyJpYXQiOjE2MjA4NjM2NTcsImV4cCI6MTYyMDk1MDA1NywibmFtZSI6ImRhdmlkIn0.Bx_UDmHDW2I10mZ-DdUyQguTal6XW_0q3KtoktvNC0Y'),
('FW-bb3a2e74cd46de46fbed', 'kevincamossoto@gmail.com', 'kevin', '$2y$10$J8ShyUixf9cdPjjAXlTSj.oicU.F8Wi5noCI/ffEpm/iSxp3pNPOm', 'https://www.gravatar.com/avatar/4e857d254608f56bc3d8ac79c259741a?s=40&d=robohash', 'user', 'activate', ''),
('FW-deb9d9c294c19649f1ed', 'davida@gmail.com', 'davida', '$2y$10$5SFDQWryf.4zCzN9cXEcu.WSghmG/UCAeKO.AM1bfMXJtV2.n5LoG', 'https://www.gravatar.com/avatar/eb8d5c42ab7ac8bf440adc78b4785b12?s=40&d=robohash', 'user', NULL, 'eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJIUzI1NiJ9.eyJpYXQiOjE2MjA4NjM3MTIsImV4cCI6MTYyMDk1MDExMiwibmFtZSI6ImRhdmlkYSJ9.1YZNcrar_bxSnElo5b-ZkyTE0TRTLHLpL7fv9PNBIcw'),
('GM-3yTtgxNyAGYD9jMt5NsitCyzMji2', 'kevincamos@gmail.com', 'Kevin CS', '27c96d4ae66808b5c2e5f4bc11539f5fa1a99c4203c0d54116813afea05e58c504fac111b686c382c19418b7c54f08f0fcf3', 'https://lh3.googleusercontent.com/a-/AOh14GiQet_ZNMi2hSeHetVgZvdVqTa_eGxIdd4McAHfiA=s96-c', 'user', 'activate', NULL),
('GM-IjzsnPN1QxgmhGuLEpTqfnw43cG2', 'kevin_camos@hotmail.es', 'KCS9400 KCS', '7a3d94448c249c63c3e4f461ba7cfca3dfd24d59c0c85b5390d8467d1a59c1a4e7e3207aa2712cd16a42240f75d9c427e287', 'https://lh3.googleusercontent.com/a-/AOh14GgGUKwavpjboyuqkCOcY-e-22-PyNoy41t_lbk-PA=s96-c', 'user', 'activate', NULL),
('GM-NpTYqANxUYQKRce2lExc6xZd4012', 'kevincamossoto@gmail.com', 'Kevin Camós Soto', 'd65c54df1bf6c219b95717d3f60b4f6ab52bd782cf07c77ccde59d632476f3a84a245c5e6e7723220d60dc7d158406ef4655', 'https://lh3.googleusercontent.com/a-/AOh14Gj3WosJ5rUh9biBsTv4qZJrrrkOt7H9M4YPB_5g=s96-c', 'user', 'activate', NULL),
('GM-o6lK6IHxSMcVp8V17klzl8tkMSS2', 'filmawebdaw@gmail.com', 'Kevin Camos', '9aa70454f31edf078c5f9315b1e7734b43f9ede425809e70432b32a2b810f9bd7f330af31e47f8618061a15962aa0faa4f9d', 'https://lh5.googleusercontent.com/-RbpMAZd6NsY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmCnPCQeXsiwdiy7x9hn5Um7m2WpQ/s96-c/photo.jpg', 'user', 'activate', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `albaran`
--
ALTER TABLE `albaran`
  ADD PRIMARY KEY (`idalbaran`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indices de la tabla `facturacion`
--
ALTER TABLE `facturacion`
  ADD PRIMARY KEY (`idfacturacion`);

--
-- Indices de la tabla `linea_producto`
--
ALTER TABLE `linea_producto`
  ADD PRIMARY KEY (`idlinea`,`idalbaran`,`idproducto`);

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
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idusers`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `albaran`
--
ALTER TABLE `albaran`
  MODIFY `idalbaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `facturacion`
--
ALTER TABLE `facturacion`
  MODIFY `idfacturacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `linea_producto`
--
ALTER TABLE `linea_producto`
  MODIFY `idlinea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

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
