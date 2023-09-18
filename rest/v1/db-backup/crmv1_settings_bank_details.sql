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
-- Table structure for table `crmv1_settings_bank_details`
--

CREATE TABLE `crmv1_settings_bank_details` (
  `bank_details_aid` int(11) NOT NULL,
  `bank_details_bank_name` varchar(100) NOT NULL,
  `bank_details_account_name` varchar(100) NOT NULL,
  `bank_details_account_number` varchar(100) NOT NULL,
  `bank_details_location` varchar(100) NOT NULL,
  `bank_details_is_active` tinyint(1) NOT NULL,
  `bank_details_created_at` datetime NOT NULL,
  `bank_details_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crmv1_settings_bank_details`
--

INSERT INTO `crmv1_settings_bank_details` (`bank_details_aid`, `bank_details_bank_name`, `bank_details_account_name`, `bank_details_account_number`, `bank_details_location`, `bank_details_is_active`, `bank_details_created_at`, `bank_details_updated_at`) VALUES
(1, 'test', 'test', 'test', 'test', 1, '2023-09-14 13:08:12', '2023-09-14 13:08:12'),
(3, 'sample', 'sample', 'sample', 'sample', 1, '2023-09-14 13:12:22', '2023-09-14 13:12:22'),
(4, 'sample11', 'sample11', 'sample11', 'sample11', 0, '2023-09-14 13:12:37', '2023-09-14 13:31:56'),
(5, '1', '1', '1', '1', 1, '2023-09-14 13:34:33', '2023-09-14 13:34:33'),
(6, '2', '1', '1', '1', 1, '2023-09-14 13:34:39', '2023-09-14 13:34:39'),
(7, '3', '3', '3', '3', 1, '2023-09-14 13:34:46', '2023-09-14 13:34:46'),
(8, '4', '4', '4', '4', 1, '2023-09-14 13:34:58', '2023-09-14 13:34:58'),
(9, '5', '5', '5', '5', 1, '2023-09-14 14:53:53', '2023-09-14 14:53:53'),
(10, 'yy', 'yy', 'yy', 'yy', 1, '2023-09-14 14:56:22', '2023-09-14 14:56:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crmv1_settings_bank_details`
--
ALTER TABLE `crmv1_settings_bank_details`
  ADD PRIMARY KEY (`bank_details_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crmv1_settings_bank_details`
--
ALTER TABLE `crmv1_settings_bank_details`
  MODIFY `bank_details_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
