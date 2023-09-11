-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2023 at 05:06 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm_training`
--

-- --------------------------------------------------------

--
-- Table structure for table `crm_training_roles`
--

CREATE TABLE `crm_training_roles` (
  `roles_aid` int(11) NOT NULL,
  `roles_name` varchar(100) NOT NULL,
  `roles_description` text NOT NULL,
  `roles_is_active` tinyint(1) NOT NULL,
  `roles_created_at` datetime NOT NULL,
  `roles_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crm_training_roles`
--

INSERT INTO `crm_training_roles` (`roles_aid`, `roles_name`, `roles_description`, `roles_is_active`, `roles_created_at`, `roles_updated_at`) VALUES
(1, 'test', 'test', 1, '2023-09-11 21:18:55', '2023-09-11 21:18:55'),
(8, 'trr', 'trrr', 1, '2023-09-11 23:04:50', '2023-09-11 23:04:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crm_training_roles`
--
ALTER TABLE `crm_training_roles`
  ADD PRIMARY KEY (`roles_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crm_training_roles`
--
ALTER TABLE `crm_training_roles`
  MODIFY `roles_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
