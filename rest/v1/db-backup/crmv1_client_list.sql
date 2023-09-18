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
-- Table structure for table `crmv1_client_list`
--

CREATE TABLE `crmv1_client_list` (
  `client_list_aid` int(11) NOT NULL,
  `client_list_account_number` varchar(100) NOT NULL,
  `client_list_company_name` varchar(100) NOT NULL,
  `client_list_company_email` varchar(100) NOT NULL,
  `client_list_contact_email` varchar(100) NOT NULL,
  `client_list_company_mobile` varchar(100) NOT NULL,
  `client_list_is_active` tinyint(1) NOT NULL,
  `client_list_created_at` datetime NOT NULL,
  `client_list_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crmv1_client_list`
--

INSERT INTO `crmv1_client_list` (`client_list_aid`, `client_list_account_number`, `client_list_company_name`, `client_list_company_email`, `client_list_contact_email`, `client_list_company_mobile`, `client_list_is_active`, `client_list_created_at`, `client_list_updated_at`) VALUES
(2, 'testing1', 'testing', 'testing', 'testing', 'testing', 1, '2023-09-18 19:38:15', '2023-09-18 19:38:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crmv1_client_list`
--
ALTER TABLE `crmv1_client_list`
  ADD PRIMARY KEY (`client_list_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crmv1_client_list`
--
ALTER TABLE `crmv1_client_list`
  MODIFY `client_list_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
