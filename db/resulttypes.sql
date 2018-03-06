-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2018 at 09:34 AM
-- Server version: 5.7.21-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sportsdata`
--

-- --------------------------------------------------------

--
-- Table structure for table `resulttypes`
--

CREATE TABLE `resulttypes` (
  `id` int(11) UNSIGNED NOT NULL,
  `sportId` int(11) NOT NULL,
  `resultType` varchar(5) NOT NULL,
  `input` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `resulttypes`
--

INSERT INTO `resulttypes` (`id`, `sportId`, `resultType`, `input`) VALUES
(1, 1, 'FT', 1),
(2, 1, 'HT', 1),
(3, 1, 'OT', 1),
(4, 1, 'WO', 0),
(5, 1, 'C', 0),
(6, 1, 'AP', 1),
(7, 2, 'FT', 1),
(8, 2, 'HT', 1),
(9, 2, '1Q', 1),
(10, 2, '2Q', 1),
(11, 2, '3Q', 1),
(12, 2, '4Q', 1),
(13, 2, '5Q', 1),
(14, 2, 'OT', 1),
(15, 5, 'FT', 1),
(16, 5, 'Set1', 1),
(17, 5, 'Set2', 1),
(18, 5, 'Set3', 1),
(19, 5, 'Set4', 1),
(20, 5, 'Set5', 1),
(21, 4, 'FT', 1),
(28, 6, 'FT', 1),
(23, 4, '1P', 1),
(24, 4, '2P', 1),
(25, 4, '3P', 1),
(26, 4, 'AP', 1),
(27, 4, 'OT', 1),
(29, 6, 'HT', 1),
(30, 6, 'OT', 1),
(31, 23, 'FT', 1),
(32, 23, 'Set1', 1),
(33, 23, 'Set2', 1),
(34, 23, 'Set3', 1),
(35, 23, 'Set4', 1),
(36, 23, 'Set5', 1),
(37, 6, 'C', 0),
(38, 6, 'AP', 1),
(39, 23, 'C', 0),
(40, 4, 'C', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `resulttypes`
--
ALTER TABLE `resulttypes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `resulttypes`
--
ALTER TABLE `resulttypes`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
