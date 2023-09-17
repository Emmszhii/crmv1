-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2023 at 03:30 PM
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
-- Table structure for table `crm_training_client_list`
--

CREATE TABLE `crm_training_client_list` (
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
-- Indexes for dumped tables
--

--
-- Indexes for table `crm_training_client_list`
--
ALTER TABLE `crm_training_client_list`
  ADD PRIMARY KEY (`client_list_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crm_training_client_list`
--
ALTER TABLE `crm_training_client_list`
  MODIFY `client_list_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
