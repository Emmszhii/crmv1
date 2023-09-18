-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2023 at 07:07 AM
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
-- Table structure for table `crm_training_client_account`
--

CREATE TABLE `crm_training_client_account` (
  `client_account_aid` int(11) NOT NULL,
  `client_account_contact_name` varchar(100) NOT NULL,
  `client_account_contact_email` varchar(100) NOT NULL,
  `client_account_number` varchar(100) NOT NULL,
  `client_account_company_name` varchar(100) NOT NULL,
  `client_account_role` varchar(100) NOT NULL,
  `client_account_is_active` tinyint(1) NOT NULL,
  `client_account_created_at` datetime NOT NULL,
  `client_account_update_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crm_training_client_account`
--

INSERT INTO `crm_training_client_account` (`client_account_aid`, `client_account_contact_name`, `client_account_contact_email`, `client_account_number`, `client_account_company_name`, `client_account_role`, `client_account_is_active`, `client_account_created_at`, `client_account_update_at`) VALUES
(2, 'test222', 'test', 'test', 'test1', 'test22', 1, '2023-09-18 09:37:17', '2023-09-18 10:00:29'),
(3, 'sample121', 'sampole', 'sample3', 'sample1', 'sample1133', 0, '2023-09-18 10:00:40', '2023-09-18 13:05:00'),
(4, 'testing', 'testing', 'testing', 'testing', 'testing', 1, '2023-09-18 10:00:50', '2023-09-18 10:00:50'),
(5, 'sample2', 'sample233333333', 'sample23', 'sample2', 'sample2', 1, '2023-09-18 10:01:07', '2023-09-18 13:01:32'),
(6, 'sample3', 'sample3', 'sample3', 'sample3', 'sample3', 1, '2023-09-18 10:01:17', '2023-09-18 10:01:43'),
(7, 'sample4', 'sample4', 'sample4', 'sample4', 'sample4', 1, '2023-09-18 10:01:52', '2023-09-18 10:01:52'),
(8, 'sample5', 'sample5', 'sample5', 'sample5', 'sample5', 1, '2023-09-18 10:01:59', '2023-09-18 10:01:59'),
(9, 'sample6', 'sample6', 'sample6', 'sample6', 'sample6', 1, '2023-09-18 10:02:06', '2023-09-18 10:02:06'),
(10, 'sample7', 'sample7', 'sample7', 'sample7', 'sample7', 1, '2023-09-18 10:02:15', '2023-09-18 10:02:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crm_training_client_account`
--
ALTER TABLE `crm_training_client_account`
  ADD PRIMARY KEY (`client_account_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crm_training_client_account`
--
ALTER TABLE `crm_training_client_account`
  MODIFY `client_account_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
