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
CREATE DATABASE IF NOT EXISTS `db_tareas`
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_tareas`;
-- Base de datos: `db_tareas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `tipoEstado` varchar(50) NOT NULL,
  `color` varchar(7) NOT NULL,
   PRIMARY KEY (`id_estado`)
  

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
-- Estructura de tabla para la tabla `usuario`

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` blob NOT NULL,
  `rol` ENUM('empleado','lider') NOT NULL DEFAULT 'empleado',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

---- --------------------------------------------------------

--

-- Estructura de tabla para la tabla `equipo`

CREATE TABLE equipo (
  id int AUTO_INCREMENT PRIMARY KEY,
  nombre varchar(50) NOT NULL,
  lider_id int NOT NULL,
  FOREIGN KEY (lider_id) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--

-- ------------------------------------------------------------
CREATE TABLE `equipo_usuario` (
  `equipo_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`equipo_id`, `usuario_id`),
  KEY `idx_eu_usuario` (`usuario_id`),
  CONSTRAINT `fk_eu_equipo` FOREIGN KEY (`equipo_id`) REFERENCES `equipo` (`id`),
  CONSTRAINT `fk_eu_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `expired_at` datetime NOT NULL,
  `fk_id_estado` int(11) NOT NULL,
  `fk_id_usuario` int(11) NOT NULL,
  `equipo_id` int(11) DEFAULT NULL,
   PRIMARY KEY (`id`),
   KEY `fk_id_estado` (`fk_id_estado`),
  KEY `idx_tarea_equipo` (`equipo_id`),
   KEY `idx_tarea_usuario` (`fk_id_usuario`),
    CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`fk_id_estado`) REFERENCES `estado` (`id_estado`),
  CONSTRAINT `fk_tarea_usuario` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario` (`id`),
  CONSTRAINT `fk_tarea_equipo` FOREIGN KEY (`equipo_id`) REFERENCES `equipo` (`id`)
  

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
