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


CREATE DATABASE IF NOT EXISTS `db_tareas`
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_tareas`;
--
-- Base de datos: `db_tareas`
--


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

-- Tablas rol, permiso y rol_permiso (con sus datos)


--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id`          int(11)      NOT NULL AUTO_INCREMENT,
  `nombre`      varchar(50)  NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_rol_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `id`          int(11)      NOT NULL AUTO_INCREMENT,
  `nombre`      varchar(50)  NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_permiso_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Estructura de tabla para la tabla `rol_permiso`
-- (tabla intermedia: un rol tiene muchos permisos y viceversa)
--

CREATE TABLE `rol_permiso` (
  `rol_id`     int(11) NOT NULL,
  `permiso_id` int(11) NOT NULL,
  PRIMARY KEY (`rol_id`, `permiso_id`),
  KEY `idx_rp_permiso` (`permiso_id`),
  CONSTRAINT `fk_rp_rol`     FOREIGN KEY (`rol_id`)     REFERENCES `rol` (`id`),
  CONSTRAINT `fk_rp_permiso` FOREIGN KEY (`permiso_id`) REFERENCES `permiso` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
-- Ids fijos: 1 = Administrador, 2 = Líder, 3 = Miembro
--

INSERT INTO `rol` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Administrador', 'Gestiona usuarios, roles y equipos; ve y modifica todas las tareas'),
(2, 'Líder',         'Gestiona los miembros y las tareas de sus equipos'),
(3, 'Miembro',       'Ve sus tareas asignadas y cambia su estado');

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `permiso` (`nombre`, `descripcion`) VALUES
('usuarios.ver',       'Ver y buscar usuarios'),
('usuarios.crear',     'Crear usuarios'),
('usuarios.editar',    'Editar usuarios y asignar rol'),
('usuarios.eliminar',  'Desactivar usuarios'),
('roles.gestionar',    'CRUD de roles'),
('permisos.gestionar', 'CRUD de permisos y asignación a roles'),
('equipos.ver',        'Ver equipos'),
('equipos.crear',      'Crear equipos'),
('equipos.editar',     'Editar equipos y asignar líder'),
('equipos.eliminar',   'Eliminar equipos'),
('equipos.miembros',   'Agregar y quitar miembros de un equipo'),
('tareas.ver',         'Ver tareas'),
('tareas.crear',       'Crear y asignar tareas'),
('tareas.editar',      'Editar tareas'),
('tareas.eliminar',    'Eliminar tareas'),
('tareas.estado',      'Cambiar el estado de una tarea'),
('estadisticas.ver',   'Ver dashboard y estadísticas');

--
-- Volcado de datos para la tabla `rol_permiso`
--

-- Administrador: todos los permisos
INSERT INTO `rol_permiso` (`rol_id`, `permiso_id`)
SELECT r.id, p.id FROM `rol` r CROSS JOIN `permiso` p
WHERE r.nombre = 'Administrador';

-- Líder
INSERT INTO `rol_permiso` (`rol_id`, `permiso_id`)
SELECT r.id, p.id FROM `rol` r CROSS JOIN `permiso` p
WHERE r.nombre = 'Líder' AND p.nombre IN
('usuarios.ver','equipos.ver','equipos.miembros','tareas.ver','tareas.crear',
 'tareas.editar','tareas.eliminar','tareas.estado','estadisticas.ver');

-- Miembro
INSERT INTO `rol_permiso` (`rol_id`, `permiso_id`)
SELECT r.id, p.id FROM `rol` r CROSS JOIN `permiso` p
WHERE r.nombre = 'Miembro' AND p.nombre IN
('equipos.ver','tareas.ver','tareas.estado');
-- 
-- Estructura de tabla para la tabla `usuario`

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` blob NOT NULL,
  `rol_id` int(11) NOT NULL DEFAULT 3,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_usuario_rol` (`rol_id`),
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Estructura de tabla para la tabla `equipo`

CREATE TABLE equipo (
  id int AUTO_INCREMENT PRIMARY KEY,
  nombre varchar(50) NOT NULL,
  lider_id int NOT NULL,
  FOREIGN KEY (lider_id) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--

-- Estructura de tabla para la tabla `equipo_usuario`
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
