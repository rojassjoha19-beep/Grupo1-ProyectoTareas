-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-09-2026 a las 13:24:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_tareas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `id_estado` int(11) NOT NULL,
  `tipoEstado` varchar(50) NOT NULL,
  `color` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id_estado`, `tipoEstado`, `color`) VALUES
(1, 'ToDo', '#36b9cc'),
(2, 'Doing', '#4e73df'),
(3, 'Finished', '#1cc88a'),
(4, 'Expired', '#e74a3b');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `expired_at` datetime NOT NULL,
  `fk_id_estado` int(11) NOT NULL,
  `fk_id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`id`, `titulo`, `descripcion`, `created_at`, `updated_at`, `deleted_at`, `expired_at`, `fk_id_estado`, `fk_id_usuario`) VALUES
(14, 'Usuario', 'Una vez que el usuario pudo loguearse que pueda elegir los productos que desea comprar', '2024-06-12 12:02:32', NULL, NULL, '2024-06-12 00:00:00', 4, 0),
(27, 'Clientes', 'Se necesita listado de clientes que paguen con TC y el total de lo facturado a cada uno de enero a marzo 2024', '2024-06-12 12:44:38', NULL, NULL, '2024-06-05 00:00:00', 4, 0),
(28, 'Correcciones', 'Corregir parciales taller de Comunicación IFTS 16', '2024-06-12 12:51:17', NULL, NULL, '2024-06-14 00:00:00', 4, 0),
(29, 'tarea test 1', 'nueva tarea test', '2026-09-19 13:35:21', NULL, NULL, '2026-09-20 00:00:00', 1, 0),
(30, 'tarea test 1', 'nueva tarea test', '2026-09-19 13:35:33', NULL, NULL, '2026-09-20 00:00:00', 1, 0),
(31, 'tarea test 1', 'nueva tarea test', '2026-09-19 13:43:58', NULL, NULL, '2026-09-20 00:00:00', 1, 0),
(32, 'tarea 2d', 'dddd', '2026-09-19 13:48:50', '2026-09-19 18:31:16', '2026-09-19 18:37:13', '2026-09-20 00:00:00', 2, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` blob NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `avatar`, `email`, `pass`, `created_at`, `updated_at`, `deleted_at`) VALUES
(4, 'Juan Pablo', 'Cesarini', 'img20240311_19371145.jpg', 'jpablocesarini@gmail.com', 0x938e832f73557d73e7f1c08e8f4b2ae3, '2024-05-15 19:34:42', '2026-09-14 13:41:43', NULL),
(5, 'test', 'test', 'test_27.png', 'juanpcesarini@hotmail.com', 0x2432792431302439352e546259364f52637a4f41355a7334633353554f67645152796a57646f6a6830736f323758506b74496c4a5868313134464a79, '2025-07-15 21:27:59', '2025-07-15 21:27:59', NULL),
(11, 'Juan', 'Cesarini', 'img_default.png', 'lic.juanpablocesarini@gmail.com', 0xd24705858e42ab55ed8a7dddaeca130a, '2026-09-10 16:15:30', '2026-09-14 13:26:26', NULL),
(12, 'Pepe', 'Pompin', 'img_default.png', 'jpablocesarini@gmail.com', 0x938e832f73557d73e7f1c08e8f4b2ae3, '2026-09-14 13:35:23', '2026-09-14 13:41:43', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_estado` (`fk_id_estado`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`fk_id_estado`) REFERENCES `estado` (`id_estado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
