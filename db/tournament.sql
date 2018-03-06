-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 27, 2018 at 10:48 AM
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
-- Database: `sportsdata`
--

-- --------------------------------------------------------

--
-- Table structure for table `tournament`
--

CREATE TABLE `tournament` (
  `sportId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `tournamentId` int(11) NOT NULL,
  `lang` char(5) NOT NULL,
  `tournamentName` varchar(50) NOT NULL,
  `minTip` tinyint(5) NOT NULL DEFAULT '1',
  `kombiMinStake` int(11) DEFAULT NULL,
  `kombiMaxStake` int(11) DEFAULT NULL,
  `kombiMaxPay` int(11) DEFAULT NULL,
  `singleMinStake` int(11) DEFAULT NULL,
  `singleMaxStake` int(11) DEFAULT NULL,
  `singleMaxPay` int(11) DEFAULT NULL,
  `liveMinStake` int(11) DEFAULT NULL,
  `liveMaxStake` int(11) DEFAULT NULL,
  `liveMaxPay` int(11) DEFAULT NULL,
  `betLimit` int(11) DEFAULT NULL,
  `liveBetLimit` decimal(10,2) DEFAULT NULL,
  `tournamentOddsKey` int(11) DEFAULT NULL,
  `oddsLock` enum('0','1') NOT NULL DEFAULT '1',
  `listOrder` int(11) NOT NULL DEFAULT '0',
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `liveStatus` tinyint(1) NOT NULL DEFAULT '1',
  `locks` enum('0','1') NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tournament`
--
ALTER TABLE `tournament`
  ADD PRIMARY KEY (`sportId`,`categoryId`,`tournamentId`,`lang`),
  ADD KEY `tournamentId0` (`tournamentId`),
  ADD KEY `categoryId1` (`categoryId`),
  ADD KEY `sportId2` (`sportId`,`categoryId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
