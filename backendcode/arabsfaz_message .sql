-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 17, 2020 at 09:03 AM
-- Server version: 10.3.24-MariaDB-log-cll-lve
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arabsfaz_message`
--

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `sender` varchar(120) NOT NULL,
  `receiver` varchar(120) NOT NULL,
  `message` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `sender`, `receiver`, `message`) VALUES
(1, 'mos@gmail.com', 'mos2@gmail.com', 'this is test message'),
(2, 'mosd3439@gmail.com', 'rever@gmail.com', 'This post man message'),
(3, 'mosd3439@gmail.com', 'rever@gmail.com', 'This post man message 2');

-- --------------------------------------------------------

--
-- Table structure for table `messageuser`
--

CREATE TABLE `messageuser` (
  `id` int(11) NOT NULL,
  `userName` varchar(100) DEFAULT NULL,
  `mobile` int(11) DEFAULT NULL,
  `email` varchar(120) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `userImage` varchar(150) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messageuser`
--

INSERT INTO `messageuser` (`id`, `userName`, `mobile`, `email`, `password`, `userImage`) VALUES
(13, 'hello ionic', 234555, 'ionic@gmail.com', '12345', NULL),
(14, 'moshiur', 234555, 'most@gmail.com', '12345', NULL),
(15, 'sdfsdf', 234555, 'mos@gmail.com', 'sdfsdf', NULL),
(16, 'sdfsdf', 234555, 'sfdsdfsd', 'sdfsdf', NULL),
(17, 'sdfsdf', 234555, 'sfdsdfsd33', 'sdfsdf', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messageuser`
--
ALTER TABLE `messageuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `messageuser`
--
ALTER TABLE `messageuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
