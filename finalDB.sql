-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2016 at 12:09 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `casino`
--

-- --------------------------------------------------------

--
-- Table structure for table `bets`
--

CREATE TABLE IF NOT EXISTS `bets` (
`bet_id` int(15) NOT NULL,
  `username` varchar(50) NOT NULL,
  `th` int(11) NOT NULL,
  `fi` int(11) NOT NULL,
  `hu` int(11) NOT NULL,
  `slots` varchar(60) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=101 ;

-- --------------------------------------------------------

--
-- Table structure for table `lobby`
--

CREATE TABLE IF NOT EXISTS `lobby` (
`lobby_id` int(11) NOT NULL,
  `special1` varchar(50) DEFAULT NULL,
  `special2` varchar(10) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `lobby`
--

INSERT INTO `lobby` (`lobby_id`, `special1`, `special2`) VALUES
(1, NULL, '0'),
(11, NULL, 'NULL');

-- --------------------------------------------------------

--
-- Table structure for table `lobby_user`
--

CREATE TABLE IF NOT EXISTS `lobby_user` (
  `lobby_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `color` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE IF NOT EXISTS `players` (
  `register_id` varchar(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `coins` int(11) NOT NULL,
  `coins_won` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`register_id`, `username`, `password`, `coins`, `coins_won`) VALUES
('awtyey', '30', '', 10000, 0),
('ayhooz', '35', '', 10000, 0),
('bdedvq', '0', '', 10000, 0),
('bhvniy', '57', '', 10000, 0),
('ccdxph', '28', '', 10000, 0),
('cdnbws', '8', '', 10000, 0),
('coylsh', '5', '', 10000, 0),
('crbbju', '94', '', 10000, 0),
('cusrex', '58', '', 10000, 0),
('cwzdsa', '85', '', 10000, 0),
('dbvwho', '84', '', 10000, 0),
('dgvgjx', '89', '', 10000, 0),
('dkripx', '48', '', 10000, 0),
('doxfae', '27', '', 10000, 0),
('dtpanx', '46', '', 10000, 0),
('dwcvel', '33', '', 10000, 0),
('dyizfk', '72', '', 10000, 0),
('ehxyqf', '71', '', 10000, 0),
('ejyibe', '11', '', 10000, 0),
('emebqy', '51', '', 10000, 0),
('emkbwf', '42', '', 10000, 0),
('eyjvyo', '39', '', 10000, 0),
('fdqtxg', '62', '', 10000, 0),
('ffhrii', '83', '', 10000, 0),
('fsexzs', '67', '', 10000, 0),
('fwqboy', '36', '', 10000, 0),
('fwtakg', '82', '', 10000, 0),
('hkbciu', '53', '', 10000, 0),
('hmojxq', '7', '', 10000, 0),
('hmtpcb', '26', '', 10000, 0),
('hppmuz', '15', '', 10000, 0),
('hzcxso', '32', '', 10000, 0),
('iberbb', '14', '', 10000, 0),
('ickrvw', '19', '', 10000, 0),
('iygqhu', '73', '', 10000, 0),
('janugv', '77', '', 10000, 0),
('jashcu', '43', '', 10000, 0),
('jgaekt', '12', '', 10000, 0),
('jgmucq', '56', '', 10000, 0),
('jlylbv', '24', '', 10000, 0),
('jokiqk', '34', '', 10000, 0),
('jtzuug', '22', '', 10000, 0),
('ksezfq', '41', '', 10000, 0),
('lefohc', '81', '', 10000, 0),
('lsykpu', '79', '', 10000, 0),
('ltlcrp', '86', '', 10000, 0),
('lzstbp', '70', '', 10000, 0),
('mfqghl', '50', '', 10000, 0),
('mjmsga', '52', '', 10000, 0),
('moiqek', '98', '', 10000, 0),
('moksuo', '45', '', 10000, 0),
('ncsmwk', '74', '', 10000, 0),
('nhtzuo', '31', '', 10000, 0),
('njrkfw', '65', '', 10000, 0),
('nqcpra', '64', '', 10000, 0),
('nusucv', '93', '', 10000, 0),
('oekize', '87', '', 10000, 0),
('oogqcv', '96', '', 10000, 0),
('oungcd', '40', '', 10000, 0),
('ovdbyq', '29', '', 10000, 0),
('owdtkv', '49', '', 10000, 0),
('oxxlrz', '37', '', 10000, 0),
('padmku', '23', '', 10000, 0),
('pagymr', '92', '', 10000, 0),
('pkbvma', '60', '', 10000, 0),
('pkbvmo', '59', '', 10000, 0),
('psvjgn', '54', '', 10000, 0),
('psyxxi', '21', '', 10000, 0),
('puxfdm', '75', '', 10000, 0),
('pwzztx', '10', '', 10000, 0),
('qheluu', '99', '', 10000, 0),
('qtghvc', '76', '', 10000, 0),
('qtlict', '55', '', 10000, 0),
('rfiqib', '47', '', 10000, 0),
('rymcwf', '9', '', 10000, 0),
('shiyqb', '66', '', 10000, 0),
('ttbske', '18', '', 10000, 0),
('ttttyf', '69', '', 10000, 0),
('twsawo', '44', '', 10000, 0),
('ufbqog', '16', '', 10000, 0),
('ughstz', '25', '', 10000, 0),
('unwckx', '90', '', 10000, 0),
('upihfp', '6', '', 10000, 0),
('upsusd', '17', '', 10000, 0),
('uubvsk', '63', '', 10000, 0),
('vchjqs', '1', '', 10000, 0),
('vlqtud', '13', '', 10000, 0),
('vlsegm', '68', '', 10000, 0),
('wdduyf', '20', '', 10000, 0),
('wprjcv', '95', '', 10000, 0),
('wvczzt', '4', '', 10000, 0),
('wvdnek', '38', '', 10000, 0),
('xmuach', '88', '', 10000, 0),
('yahqnq', '80', '', 10000, 0),
('yiljio', '61', '', 10000, 0),
('yodalq', '91', '', 10000, 0),
('yoftow', '3', '', 10000, 0),
('ypuezy', '78', '', 10000, 0),
('zkzaow', '2', '', 10000, 0),
('zynvuz', '97', '', 10000, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bets`
--
ALTER TABLE `bets`
 ADD PRIMARY KEY (`bet_id`), ADD KEY `username` (`username`);

--
-- Indexes for table `lobby`
--
ALTER TABLE `lobby`
 ADD PRIMARY KEY (`lobby_id`);

--
-- Indexes for table `lobby_user`
--
ALTER TABLE `lobby_user`
 ADD KEY `username` (`username`), ADD KEY `lobbyID` (`lobby_id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
 ADD PRIMARY KEY (`register_id`), ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bets`
--
ALTER TABLE `bets`
MODIFY `bet_id` int(15) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT for table `lobby`
--
ALTER TABLE `lobby`
MODIFY `lobby_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
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
