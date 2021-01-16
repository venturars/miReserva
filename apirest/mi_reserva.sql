-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-01-2021 a las 17:22:07
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mi_reserva`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservations`
--

CREATE TABLE `reservations` (
  `reservation_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `pax` int(2) NOT NULL,
  `day_name` varchar(100) NOT NULL,
  `day` int(2) NOT NULL,
  `month` varchar(4) NOT NULL,
  `year` int(4) NOT NULL,
  `hour` varchar(5) NOT NULL,
  `shift_id` int(11) NOT NULL,
  `comments` varchar(200) NOT NULL,
  `status` enum('Reservada','Rechazada','Cancelada por cliente') NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_phone` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reservations`
--

INSERT INTO `reservations` (`reservation_id`, `customer_id`, `restaurant_id`, `table_id`, `pax`, `day_name`, `day`, `month`, `year`, `hour`, `shift_id`, `comments`, `status`, `customer_name`, `customer_phone`) VALUES
(3, 9, 288, 139, 2, 'Mon', 18, 'Jan', 2021, 'tuma', 155, 'rtyujk', 'Reservada', '', 0),
(6, 16, 288, 139, 2, 'Fri', 22, 'Jan', 2021, '14:00', 152, 'Sin comentarios', 'Reservada', 'Javi Rodríguez', 645234321);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurants`
--

CREATE TABLE `restaurants` (
  `restaurant_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `street_name` varchar(100) NOT NULL,
  `street_number` int(4) NOT NULL,
  `postal_code` int(11) NOT NULL,
  `phone` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `food_type` enum('Española','Mexicana','Argentina','Dominicana','Japonesa','China') NOT NULL,
  `header` varchar(300) DEFAULT NULL,
  `logo` varchar(300) DEFAULT NULL,
  `menu` varchar(300) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `owner_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `restaurants`
--

INSERT INTO `restaurants` (`restaurant_id`, `name`, `province`, `city`, `street_name`, `street_number`, `postal_code`, `phone`, `capacity`, `food_type`, `header`, `logo`, `menu`, `url`, `latitude`, `longitude`, `owner_id`) VALUES
(288, 'Kibon', 'Madrid', 'Alcala de Henares', 'menorca', 12, 28009, 912403939, 30, 'Japonesa', 'assets/photos/KIBONAJAPO.jpg', 'assets/photos/logokibona.jpg', NULL, 'www.kibon.com', '40.4857747', '-3.3436791', 10),
(289, 'La antigua', 'Madrid', 'Madrid', 'ayala', 112, 28028, 913469250, 30, 'Española', 'assets/photos/la-antigua.jpg', 'assets/photos/LOGO-antigua.jpg', NULL, 'www.laantigua.com', '40.4272924', '-3.6727454', 10),
(290, 'Coque', 'Madrid', 'madrid', 'serrano', 41, 28009, 2147483647, 30, 'Española', 'assets/photos/coque.jpg', 'assets/photos/logo-coque.jpg', NULL, 'www.coque.com', '40.4253869', '-3.6869007', 48),
(291, 'Goiko Grill', 'madrid', 'madrid', 'alcantara', 12, 28002, 2147483647, 30, 'Argentina', 'assets/photos/GOIKO.jpg', 'assets/photos/logo-goiko.jpg', NULL, 'www.goiko.com', '40.4310798', '-3.6735790', 48),
(292, 'La Cabaña', 'Madrid', 'madrid', 'alcala', 200, 28006, 912295905, 20, 'Argentina', 'assets/photos/la-cabaña-argentina.jpg', 'assets/photos/logo-lacabaña.jpg', NULL, 'www.lacabana.com', '40.4206967', '-3.6851451', 48),
(293, 'La taberna de Yasmin', 'madrid', 'coslada', 'chile', 162, 28820, 2147483647, 20, 'Dominicana', 'assets/photos/La-taberna-de-Yasmin.jpg', 'assets/photos/LOGO-la-taberna.jpg', NULL, 'www.lataberna.com', '40.4239519', '-3.5438456', 47),
(294, 'La taquería', 'madrid', 'madrid', 'fernan gonzalez', 12, 28009, 2147483647, 40, 'Mexicana', 'assets/photos/la-taqueria.jpg', 'assets/photos/logo-la-taqueria.jpg', NULL, 'www.lataqueria.com', '40.4204536', '-3.6744182', 47),
(295, 'Taqueria el chicharron', 'madrid', 'madrid', 'costanilla de los angeles', 12, 28001, 2147483647, 20, 'Mexicana', 'assets/photos/taqueria-el-chicharron.jpg', 'assets/photos/logotaqueria.jpg', NULL, 'www.chicharron.com', '40.4189322', '-3.7081204', 47),
(296, 'ChinaTown', 'madrid', 'madrid', 'prado', 15, 28009, 912912029, 20, 'China', NULL, NULL, NULL, 'www.burgerking.com', '40.4137995', '-3.6920053', 10),
(298, 'Vinoteca', 'Madrid', 'Madrid', 'Calle Pez', 2, 280082, 648609925, 120, 'Española', 'assets/photos/VINOTECA.jpg', 'assets/photos/LOGOvinoteca.jpg', NULL, 'http://vinoteca.es', '40.5678635', '-4.2613140', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shifts`
--

CREATE TABLE `shifts` (
  `shift_id` int(11) NOT NULL,
  `day` varchar(50) NOT NULL,
  `shift_from` varchar(5) NOT NULL,
  `shift_to` varchar(5) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `times_id` int(11) NOT NULL,
  `pax` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `shifts`
--

INSERT INTO `shifts` (`shift_id`, `day`, `shift_from`, `shift_to`, `restaurant_id`, `times_id`, `pax`) VALUES
(145, 'Mon', '14:00', '15:00', 288, 203, 29),
(146, 'Mon', '15:00', '16:00', 288, 203, 29),
(147, 'Tue', '14:00', '15:00', 288, 204, 12),
(148, 'Tue', '15:00', '16:00', 288, 204, 29),
(149, 'Thu', '13:30', '14:30', 288, 206, 29),
(150, 'Thu', '14:30', '15:30', 288, 206, 29),
(151, 'Fri', '13:00', '14:00', 288, 207, 29),
(152, 'Fri', '14:00', '15:00', 288, 207, 29),
(153, 'Fri', '15:00', '16:00', 288, 207, 29),
(154, 'Mon', '08:30', '09:30', 296, 208, 19),
(155, 'Mon', '09:30', '10:30', 296, 208, 19),
(156, 'Mon', '13:00', '16:30', 296, 209, 19),
(157, 'Mon', '14:00', '15:00', 296, 209, 19),
(158, 'Wed', '08:30', '09:30', 296, 210, 19),
(159, 'Wed', '13:30', '14:30', 296, 211, 13),
(162, 'Tue', '08:30', '10:00', 298, 213, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tables`
--

CREATE TABLE `tables` (
  `table_id` int(11) NOT NULL,
  `table_name` varchar(10) NOT NULL,
  `table_max` int(2) NOT NULL,
  `table_min` int(2) NOT NULL,
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tables`
--

INSERT INTO `tables` (`table_id`, `table_name`, `table_max`, `table_min`, `restaurant_id`) VALUES
(139, '1', 4, 2, 288),
(140, '2', 4, 2, 288),
(141, '3', 6, 4, 288),
(142, '4', 6, 4, 288),
(143, '5', 6, 4, 288),
(144, '1', 4, 2, 296),
(145, '2', 6, 4, 296),
(149, 'm1', 2, 1, 298);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `times`
--

CREATE TABLE `times` (
  `times_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `time_from` varchar(5) NOT NULL,
  `time_to` varchar(5) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `service` enum('Desayuno','Almuerzo','Cena','') NOT NULL,
  `active` enum('true','false') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `times`
--

INSERT INTO `times` (`times_id`, `name`, `time_from`, `time_to`, `restaurant_id`, `service`, `active`) VALUES
(203, 'Mon', '14:00', '16:00', 288, 'Desayuno', 'true'),
(204, 'Tue', '14:00', '16:30', 288, 'Almuerzo', 'true'),
(205, 'Wes', '10:00', '10:30', 288, 'Almuerzo', 'true'),
(206, 'Thu', '13:30', '16:00', 288, 'Almuerzo', 'true'),
(207, 'Fri', '13:00', '16:30', 288, 'Almuerzo', 'true'),
(208, 'Mon', '8:30', '11:00', 296, 'Desayuno', 'true'),
(209, 'Mon', '13:00', '16:30', 296, 'Almuerzo', 'true'),
(210, 'Wed', '8:30', '9:30', 296, 'Desayuno', 'true'),
(211, 'Wed', '13:30', '16:30', 296, 'Almuerzo', 'true'),
(213, 'Tue', '8:30', '11:00', 298, 'Desayuno', 'true');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `restaurant_id`, `owner_id`, `customer_id`, `mail`, `password`) VALUES
(3, NULL, 1, NULL, 'asd', 'asd'),
(6, NULL, 7, NULL, 'asd', 'asdasd'),
(7, NULL, 8, NULL, 'asd@asd.com', ''),
(10, NULL, 9, NULL, 'hola1', 'hola1'),
(11, NULL, 10, NULL, 'hola1@hola1', '123456'),
(231, NULL, 25, NULL, 'jasdf@ajsdfkKKk', 'ajdkfafd'),
(232, NULL, 26, NULL, 'jasdf@ajsdfkKKka', 'ajdkfafd'),
(233, NULL, 27, NULL, 'jasdf@ajsdfkKKkaadsfafds', 'ajdkfafd'),
(234, NULL, 28, NULL, 'pedro@marmol.com', 'marmol'),
(235, NULL, 29, NULL, 'jajaja@jajaja', 'jajajaja'),
(236, NULL, 30, NULL, 'hola1@hola1', 'jaksdflkdasfj'),
(237, NULL, 31, NULL, 'asdfa@asdjkasd', 'jalksdfkasdfjlkadsfkl'),
(238, NULL, 32, NULL, 'asdfa@asdjkasd', 'akdslfalkfdsjl'),
(239, NULL, 37, NULL, 'jasdf@ajsdfkKKkaadsfafds', 'ajdkfafd'),
(240, NULL, 38, NULL, 'jasdf@ajsdfkKKkaadsfafds', 'ajdkfafd'),
(241, NULL, 40, NULL, 'jesuscano@jesus', 'ajdkfafd'),
(242, NULL, 41, NULL, 'jaajaja@jajajajajajaja', 'aksdfaslfd'),
(243, NULL, 9, NULL, 'jesuscano@jesuaaa', 'ajdkfafd'),
(244, NULL, 10, NULL, 'cliente@cliente', '123456'),
(245, NULL, NULL, 11, 'jajaja@inviable', 'inviable'),
(251, NULL, 42, NULL, 'editar@fotos', 'editarfotos'),
(276, NULL, NULL, 12, 'jamon@jamon1', 'jamon1'),
(277, NULL, NULL, 13, 'yayayaya@yaya', 'yayayya'),
(278, NULL, NULL, 14, 'jajajajjajajaja@jajajaja', 'jajjajaja'),
(303, NULL, 43, NULL, 'asdfas@adjadsf', 'asjdkfalskf'),
(304, NULL, 44, NULL, 'jaslkdfasdf@jaskdfalksdf', 'jasdlkasdlkfas'),
(305, NULL, 45, NULL, 'jlkasdflkafds@jalksdfalkdsf', 'jlkasdflkasfd'),
(306, NULL, 46, NULL, 'ajslkdfjalkfd@jasdkflkdsa', 'jlkasjdflkaslkfd'),
(307, NULL, NULL, 15, 'ajsdkflsa@ajsdkfasfdlk', 'aslkdfdalksfd'),
(310, NULL, 47, NULL, 'miguel@gmail.com', '123456'),
(312, 288, NULL, NULL, 'kibona@kibona', 'kibona'),
(313, 289, NULL, NULL, 'laantigua@laantigua', 'laantigua'),
(314, NULL, 48, NULL, 'amancio@gmail.com', '123456'),
(315, 290, NULL, NULL, 'coque@coque.com', 'coque'),
(316, 291, NULL, NULL, 'goiko@goiko.com', 'goiko'),
(317, 292, NULL, NULL, 'lacabana@lacabana', 'lacabana'),
(318, 293, NULL, NULL, 'yasmin@yasmin.com', 'yasmin'),
(319, 294, NULL, NULL, 'lataqueria@lataqueria', 'lataqueria'),
(320, 295, NULL, NULL, 'chicharron@chicharron', 'chicharron'),
(321, 296, NULL, NULL, 'chinatown@chinatown', 'chinatown'),
(322, NULL, NULL, 16, 'javi@gmail.com', '123456'),
(323, NULL, 49, NULL, 'prueba@prueba', '123456'),
(325, NULL, 50, NULL, 'brodriguezserrano54@gmail.com', '123456'),
(326, 298, NULL, NULL, 'vinoteca@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_customer`
--

CREATE TABLE `user_customer` (
  `customer_id` int(11) NOT NULL,
  `phone` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `photo` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_customer`
--

INSERT INTO `user_customer` (`customer_id`, `phone`, `name`, `surname`, `photo`) VALUES
(1, 656506792, 'juan', 'gianina', 'mi foto'),
(2, 656506792, 'holis', 'holis2', 'asd'),
(3, 656506792, 'holis', 'holis2', 'asd'),
(4, 656506792, 'hola1', 'hola1', 'hola1'),
(5, 656506792, 'hola1', 'hola1', 'hola1'),
(6, 656506792, 'hola1', 'hola1', 'hola1'),
(7, 656506792, 'hola1', 'hola1', 'hola1'),
(8, 656506792, 'hola1', 'hola1', 'hola1'),
(9, 919129, 'asdj', 'jaskdf', NULL),
(10, 190191291, 'cliente', 'cliente', NULL),
(11, 111191912, 'jajaja', 'jaksdfkalaaa', 'assets/photos/potada2.png'),
(12, 912110122, 'pedro', 'guerra', NULL),
(13, 12132131, 'asdfads', 'adsfa', NULL),
(14, 192110909, 'Pedro', 'picapiedra', NULL),
(15, 0, 'jaslkdfalksf', 'jalksfjlksadf', NULL),
(16, 645234321, 'Javi', 'Rodríguez', 'assets/photos/amancio.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_owner`
--

CREATE TABLE `user_owner` (
  `owner_id` int(11) NOT NULL,
  `cif` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `photo` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_owner`
--

INSERT INTO `user_owner` (`owner_id`, `cif`, `name`, `surname`, `photo`) VALUES
(1, 'asd123', 'asd', 'asd', 'asd'),
(2, 'asd123', 'asd', 'asd', 'asd'),
(3, 'asd123', 'asd', 'asd', 'asd'),
(4, 'asd123', 'asd', 'asd', 'asd'),
(5, 'asd123', 'asd', 'asd', 'asd'),
(6, 'asd123', 'asd', 'asd', 'asd'),
(7, 'funciona', 'esta', 'cosa', 'asd'),
(8, 'funciona', 'micho', 'tito', 'fotito'),
(9, 'hola1', 'hola1', 'hola1', 'hola1'),
(10, 'asd123', 'Rosalía', 'Música', 'assets/photos/logokibona.jpg'),
(11, 'hola1', 'hola1', 'hola1', 'hola1'),
(12, 'hola1', 'hola1', 'hola1', 'hola1'),
(13, 'hola1', 'hola1', 'hola1', 'hola1'),
(14, 'hola1', 'hola1', 'hola1', 'hola1'),
(15, 'hola1', 'hola1', 'hola1', 'hola1'),
(16, 'hola2', 'hola2', 'hola2', 'hola2'),
(17, 'hola2', 'hola2', 'hola2', 'hola2'),
(18, 'hola2', 'hola2', 'hola2', 'hola2'),
(19, 'hola2', 'hola2', 'hola2', 'hola2'),
(20, 'hola2', 'hola2', 'hola2', 'hola2'),
(21, 'hola2', 'hola2', 'hola2', 'hola2'),
(22, 'hola2', 'hola2', 'hola2', 'hola2'),
(23, '919129', 'asdj', 'jaskdf', NULL),
(24, '919129', 'asdj', 'jaskdf', NULL),
(25, '919129', 'asdj', 'jaskdf', NULL),
(26, '919129', 'asdj', 'jaskdf', NULL),
(27, '919129', 'asdj', 'jaskdf', NULL),
(28, 'jaslkdffa', 'pedro', 'marmol', NULL),
(29, 'jajaja', 'jajajaja', 'jajajajajaja', NULL),
(30, 'jasldfasfl', 'yayayaya', 'yayayay', NULL),
(31, 'ajkdsflkadfs', 'pedro', 'marmol', NULL),
(32, 'ajlksdfalk', 'ajsdlfka', 'jkasdjflka', NULL),
(33, 'jalkdsfad', 'ajdslfdakf', 'akdslfajf', NULL),
(34, 'jlkasdjflkasdf', 'jasdlkfads', 'klajsdlkfafds', NULL),
(35, 'lkasjdflkadsf', 'yafunciona', 'yafunciona', NULL),
(36, 'jaksdkf', 'yayaya', 'yayaya', NULL),
(37, '919129', 'asdj', 'jaskdf', NULL),
(38, '919129', 'asdj', 'jaskdf', NULL),
(39, '919129', 'asdj', 'jaskdf', NULL),
(40, '919129', 'asdj', 'jaskdf', NULL),
(41, 'jasklfdas', 'jasdkfakfds', 'jaskldjfalkdsf', NULL),
(42, 'blablablaaaaa', 'prueba', 'editar fotos', 'assets/photos/logorestaurante.png'),
(43, 'jaskdf', 'ajksdfasfd', 'aksdfsaf', NULL),
(44, '1215215', 'ajsdfklsafd', 'jaslkdfadslkf', NULL),
(45, 'jkasdflkdasf', 'asjdflksad', 'jlkadsjflkas', NULL),
(46, 'ajaslkfdsa', 'ajdsflkasdfkl', 'jalkdaksfd', NULL),
(47, 'b82477027', 'Miguel ', 'Perez', NULL),
(48, 'b82701249', 'Amancio', 'Ortega', NULL),
(49, '123asdasdsoyJuan', 'pruebaFtp', '13r423', NULL),
(50, '28FAS24500', 'Ventu', 'Rodríguez', 'assets/photos/amancio.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `restaurant_id` (`restaurant_id`),
  ADD KEY `table_id` (`table_id`),
  ADD KEY `shift_id` (`shift_id`);

--
-- Indices de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`restaurant_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indices de la tabla `shifts`
--
ALTER TABLE `shifts`
  ADD PRIMARY KEY (`shift_id`),
  ADD KEY `restaurant_id` (`restaurant_id`),
  ADD KEY `times_id` (`times_id`);

--
-- Indices de la tabla `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`table_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indices de la tabla `times`
--
ALTER TABLE `times`
  ADD PRIMARY KEY (`times_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `owner_id` (`owner_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indices de la tabla `user_customer`
--
ALTER TABLE `user_customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indices de la tabla `user_owner`
--
ALTER TABLE `user_owner`
  ADD PRIMARY KEY (`owner_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `reservations`
--
ALTER TABLE `reservations`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `restaurant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=299;

--
-- AUTO_INCREMENT de la tabla `shifts`
--
ALTER TABLE `shifts`
  MODIFY `shift_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT de la tabla `tables`
--
ALTER TABLE `tables`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT de la tabla `times`
--
ALTER TABLE `times`
  MODIFY `times_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=327;

--
-- AUTO_INCREMENT de la tabla `user_customer`
--
ALTER TABLE `user_customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `user_owner`
--
ALTER TABLE `user_owner`
  MODIFY `owner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `user_customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`table_id`) REFERENCES `tables` (`table_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_4` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`shift_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `restaurants`
--
ALTER TABLE `restaurants`
  ADD CONSTRAINT `restaurants_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user_owner` (`owner_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `shifts`
--
ALTER TABLE `shifts`
  ADD CONSTRAINT `shifts_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shifts_ibfk_2` FOREIGN KEY (`times_id`) REFERENCES `times` (`times_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tables`
--
ALTER TABLE `tables`
  ADD CONSTRAINT `tables_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `times`
--
ALTER TABLE `times`
  ADD CONSTRAINT `times_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `user_customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`owner_id`) REFERENCES `user_owner` (`owner_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_4` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
