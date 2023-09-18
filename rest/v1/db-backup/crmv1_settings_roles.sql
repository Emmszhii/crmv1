-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2023 at 01:44 PM
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
-- Database: `crmv1`
--

-- --------------------------------------------------------

--
-- Table structure for table `crmv1_settings_roles`
--

CREATE TABLE `crmv1_settings_roles` (
  `roles_aid` int(11) NOT NULL,
  `roles_name` varchar(100) NOT NULL,
  `roles_description` text NOT NULL,
  `roles_is_active` tinyint(1) NOT NULL,
  `roles_created_at` datetime NOT NULL,
  `roles_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crmv1_settings_roles`
--

INSERT INTO `crmv1_settings_roles` (`roles_aid`, `roles_name`, `roles_description`, `roles_is_active`, `roles_created_at`, `roles_updated_at`) VALUES
(5, 'sample', 'sample', 1, '2023-09-12 09:20:10', '2023-09-12 09:22:46'),
(6, 'hix', 'hi', 1, '2023-09-12 09:25:44', '2023-09-12 10:14:16'),
(11, '1', '1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 1, '2023-09-12 10:02:09', '2023-09-12 10:02:09'),
(12, 'hiiii', 'hiiii', 1, '2023-09-12 10:13:51', '2023-09-12 10:13:51'),
(13, 'testing', 'hooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 1, '2023-09-12 10:25:28', '2023-09-12 10:25:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crmv1_settings_roles`
--
ALTER TABLE `crmv1_settings_roles`
  ADD PRIMARY KEY (`roles_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crmv1_settings_roles`
--
ALTER TABLE `crmv1_settings_roles`
  MODIFY `roles_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
