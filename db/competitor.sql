-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 07, 2018 at 08:37 AM
-- Server version: 5.7.20-0ubuntu0.16.04.1
-- PHP Version: 7.2.0-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ekollive`
--

-- --------------------------------------------------------

--
-- Table structure for table `competitor`
--

CREATE TABLE `competitor` (
  `compId` int(11) NOT NULL,
  `lang` char(5) NOT NULL,
  `compId2` int(11) NOT NULL,
  `sportId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `tournamentId` int(11) NOT NULL,
  `uploadImage` tinyint(1) NOT NULL DEFAULT '0',
  `compName` varchar(255) NOT NULL,
  `locks` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `competitor`
--
ALTER TABLE `competitor`
  ADD PRIMARY KEY (`compId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `competitor`
--
ALTER TABLE `competitor`
  MODIFY `compId` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
