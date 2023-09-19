-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2023 at 04:27 PM
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
-- Table structure for table `crmv1_info`
--

CREATE TABLE `crmv1_info` (
  `info_aid` int(11) NOT NULL,
  `info_name` varchar(11) NOT NULL,
  `info_description` text NOT NULL,
  `info_is_active` tinyint(1) NOT NULL,
  `info_created_at` datetime NOT NULL,
  `info_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crmv1_info`
--

INSERT INTO `crmv1_info` (`info_aid`, `info_name`, `info_description`, `info_is_active`, `info_created_at`, `info_updated_at`) VALUES
(2, 'test', 'test', 1, '2023-09-19 20:16:42', '2023-09-19 22:11:46'),
(3, 'sample1', 'sample', 1, '2023-09-19 20:16:48', '2023-09-19 20:18:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crmv1_info`
--
ALTER TABLE `crmv1_info`
  ADD PRIMARY KEY (`info_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crmv1_info`
--
ALTER TABLE `crmv1_info`
  MODIFY `info_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
