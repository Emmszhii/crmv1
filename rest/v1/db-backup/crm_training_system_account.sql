-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2023 at 06:29 AM
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
-- Table structure for table `crm_training_system_account`
--

CREATE TABLE `crm_training_system_account` (
  `system_account_aid` int(11) NOT NULL,
  `system_account_name` varchar(100) NOT NULL,
  `system_account_email` varchar(100) NOT NULL,
  `system_account_role` varchar(100) NOT NULL,
  `system_account_is_active` tinyint(1) NOT NULL,
  `system_account_created_at` datetime NOT NULL,
  `system_account_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crm_training_system_account`
--

INSERT INTO `crm_training_system_account` (`system_account_aid`, `system_account_name`, `system_account_email`, `system_account_role`, `system_account_is_active`, `system_account_created_at`, `system_account_updated_at`) VALUES
(5, 'emmanuel', 'emmanuel@gmail.com', 'sadasda', 1, '2023-09-15 12:16:42', '2023-09-15 12:22:34'),
(6, 'hehehhe', 'heheh@gmail.com', 'sdasda', 1, '2023-09-15 12:23:27', '2023-09-15 12:23:27'),
(7, 'hahah', 'emms@gmail.com', 'hjashgjd', 1, '2023-09-15 12:23:46', '2023-09-15 12:23:46'),
(8, 'emms', 'emms1@gmail.com', 'jkashjsdahjk', 1, '2023-09-15 12:24:03', '2023-09-15 12:24:03'),
(9, 'emms2', 'emms2gmail.com', 'shjshh', 1, '2023-09-15 12:24:20', '2023-09-15 12:24:20'),
(10, 'test', 'test@gmail.com', 'asdas', 0, '2023-09-15 12:24:30', '2023-09-15 12:24:51'),
(11, 'emms', 'test2@gmail.com', 'asdasda', 1, '2023-09-15 12:24:40', '2023-09-15 12:25:44'),
(12, 'emms', 'test3@gmail.com', 'asdjaj', 1, '2023-09-15 12:26:07', '2023-09-15 12:26:07'),
(13, 'sadsa', 'test4@gmail.com', 'sdas', 1, '2023-09-15 12:26:28', '2023-09-15 12:26:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crm_training_system_account`
--
ALTER TABLE `crm_training_system_account`
  ADD PRIMARY KEY (`system_account_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crm_training_system_account`
--
ALTER TABLE `crm_training_system_account`
  MODIFY `system_account_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
