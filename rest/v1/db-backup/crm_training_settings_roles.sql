-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2023 at 08:09 AM
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
-- Table structure for table `crm_training_settings_roles`
--

CREATE TABLE `crm_training_settings_roles` (
  `settings_roles_aid` int(11) NOT NULL,
  `settings_roles_name` varchar(20) NOT NULL,
  `settings_roles_description` text NOT NULL,
  `settings_roles_is_active` tinyint(1) NOT NULL,
  `settings_roles_created_at` datetime NOT NULL,
  `settings_roles_updated_at` datetime NOT NULL,
  `settings_roles_is_developer` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crm_training_settings_roles`
--
ALTER TABLE `crm_training_settings_roles`
  ADD PRIMARY KEY (`settings_roles_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crm_training_settings_roles`
--
ALTER TABLE `crm_training_settings_roles`
  MODIFY `settings_roles_aid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
