-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2016 at 04:47 PM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 7.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `casino`
--

-- --------------------------------------------------------

--
-- Table structure for table `bets`
--

CREATE TABLE `bets` (
  `username` varchar(50) NOT NULL,
  `th` int(11) NOT NULL,
  `fi` int(11) NOT NULL,
  `hu` int(11) NOT NULL,
  `slots` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bets`
--

INSERT INTO `bets` (`username`, `th`, `fi`, `hu`, `slots`) VALUES
('mit17k', 0, 0, 6, '1,2,3,4'),
('mit17k', 1, 2, 6, '2,4,5,8');

-- --------------------------------------------------------

--
-- Table structure for table `lobby`
--

CREATE TABLE `lobby` (
  `lobby_id` int(11) NOT NULL,
  `special` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lobby`
--

INSERT INTO `lobby` (`lobby_id`, `special`) VALUES
(1, NULL),
(2, NULL),
(3, '1475047885'),
(6, '123456'),
(7, '1475171147'),
(8, '1475171334'),
(9, '1475171443'),
(10, '1475171622'),
(11, '1475171644'),
(12, '1475171683'),
(13, '1475171758'),
(14, '1475171805'),
(15, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lobby_user`
--

CREATE TABLE `lobby_user` (
  `lobby_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `colour_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lobby_user`
--

INSERT INTO `lobby_user` (`lobby_id`, `username`, `colour_id`) VALUES
(3, 'abcde', 1);

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `username` varchar(50) NOT NULL,
  `password` int(11) NOT NULL,
  `coins` int(11) NOT NULL,
  `coins_won` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`username`, `password`, `coins`, `coins_won`) VALUES
('abcde', 222, 100, 1),
('asdfg', 3223, 1000, 12323),
('mit17k', 12345, 10000, 22),
('qwert', 12345, 10000, 0),
('yuiop', 12345, 10000, 0),
('zxcvb', 12345, 122222, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bets`
--
ALTER TABLE `bets`
  ADD KEY `username` (`username`);

--
-- Indexes for table `lobby`
--
ALTER TABLE `lobby`
  ADD PRIMARY KEY (`lobby_id`);

--
-- Indexes for table `lobby_user`
--
ALTER TABLE `lobby_user`
  ADD KEY `username` (`username`),
  ADD KEY `lobbyID` (`lobby_id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lobby`
--
ALTER TABLE `lobby`
  MODIFY `lobby_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bets`
--
ALTER TABLE `bets`
  ADD CONSTRAINT `unique_player` FOREIGN KEY (`username`) REFERENCES `players` (`username`);

--
-- Constraints for table `lobby_user`
--
ALTER TABLE `lobby_user`
  ADD CONSTRAINT `lobby_user1` FOREIGN KEY (`lobby_id`) REFERENCES `lobby` (`lobby_id`),
  ADD CONSTRAINT `lobby_user2` FOREIGN KEY (`username`) REFERENCES `players` (`username`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
