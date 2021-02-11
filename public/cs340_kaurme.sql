-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 10, 2021 at 08:42 PM
-- Server version: 10.4.17-MariaDB-log
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_kaurme`
--

-- --------------------------------------------------------

--
-- Table structure for table `Albums`
--

DROP TABLE IF EXISTS `Albums`;
CREATE TABLE `Albums` (
  `Album_ID` int(11) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Artist_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Artists`
--

DROP TABLE IF EXISTS `Artists`;
CREATE TABLE `Artists` (
  `Artist_ID` int(11) NOT NULL,
  `First_name` varchar(255) DEFAULT NULL,
  `Last_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Books`
--

DROP TABLE IF EXISTS `Books`;
CREATE TABLE `Books` (
  `Book_ID` int(11) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Artist_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Movies`
--

DROP TABLE IF EXISTS `Movies`;
CREATE TABLE `Movies` (
  `Movie_ID` int(11) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Artist_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Patrons`
--

DROP TABLE IF EXISTS `Patrons`;
CREATE TABLE `Patrons` (
  `Patron_ID` int(11) NOT NULL,
  `First_name` varchar(255) DEFAULT NULL,
  `Last_name` varchar(255) DEFAULT NULL,
  `Email_address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Patrons`
--

INSERT INTO `Patrons` (`Patron_ID`, `First_name`, `Last_name`, `Email_address`) VALUES
(1, 'Lucy', 'Pevensie', 'Queen_Lucy@hotmail.com'),
(2, 'Quentin', 'Coldwater', 'Fillory4Ever@gmail.com'),
(3, 'Sophie', 'Hatter', 'Scarecrow_Fan5@aol.com'),
(4, 'Starr', 'Carter', 'StarrNikes@hotmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Patrons_Albums`
--

DROP TABLE IF EXISTS `Patrons_Albums`;
CREATE TABLE `Patrons_Albums` (
  `Patron_ID` int(11) NOT NULL,
  `Album_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Patrons_Books`
--

DROP TABLE IF EXISTS `Patrons_Books`;
CREATE TABLE `Patrons_Books` (
  `Patron_ID` int(11) NOT NULL,
  `Book_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Patrons_Movies`
--

DROP TABLE IF EXISTS `Patrons_Movies`;
CREATE TABLE `Patrons_Movies` (
  `Patron_ID` int(11) NOT NULL,
  `Movie_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Albums`
--
ALTER TABLE `Albums`
  ADD PRIMARY KEY (`Album_ID`),
  ADD KEY `Artist_ID` (`Artist_ID`);

--
-- Indexes for table `Artists`
--
ALTER TABLE `Artists`
  ADD PRIMARY KEY (`Artist_ID`);

--
-- Indexes for table `Books`
--
ALTER TABLE `Books`
  ADD PRIMARY KEY (`Book_ID`),
  ADD KEY `Artist_ID` (`Artist_ID`);

--
-- Indexes for table `Movies`
--
ALTER TABLE `Movies`
  ADD PRIMARY KEY (`Movie_ID`),
  ADD KEY `Artist_ID` (`Artist_ID`);

--
-- Indexes for table `Patrons`
--
ALTER TABLE `Patrons`
  ADD PRIMARY KEY (`Patron_ID`);

--
-- Indexes for table `Patrons_Albums`
--
ALTER TABLE `Patrons_Albums`
  ADD PRIMARY KEY (`Patron_ID`,`Album_ID`),
  ADD KEY `Album_ID` (`Album_ID`);

--
-- Indexes for table `Patrons_Books`
--
ALTER TABLE `Patrons_Books`
  ADD PRIMARY KEY (`Patron_ID`,`Book_ID`),
  ADD KEY `Book_ID` (`Book_ID`);

--
-- Indexes for table `Patrons_Movies`
--
ALTER TABLE `Patrons_Movies`
  ADD PRIMARY KEY (`Patron_ID`,`Movie_ID`),
  ADD KEY `Movie_ID` (`Movie_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Albums`
--
ALTER TABLE `Albums`
  MODIFY `Album_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Artists`
--
ALTER TABLE `Artists`
  MODIFY `Artist_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Books`
--
ALTER TABLE `Books`
  MODIFY `Book_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Movies`
--
ALTER TABLE `Movies`
  MODIFY `Movie_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Patrons`
--
ALTER TABLE `Patrons`
  MODIFY `Patron_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Albums`
--
ALTER TABLE `Albums`
  ADD CONSTRAINT `Albums_ibfk_1` FOREIGN KEY (`Artist_ID`) REFERENCES `Artists` (`Artist_ID`);

--
-- Constraints for table `Books`
--
ALTER TABLE `Books`
  ADD CONSTRAINT `Books_ibfk_1` FOREIGN KEY (`Artist_ID`) REFERENCES `Artists` (`Artist_ID`);

--
-- Constraints for table `Movies`
--
ALTER TABLE `Movies`
  ADD CONSTRAINT `Movies_ibfk_1` FOREIGN KEY (`Artist_ID`) REFERENCES `Artists` (`Artist_ID`);

--
-- Constraints for table `Patrons_Albums`
--
ALTER TABLE `Patrons_Albums`
  ADD CONSTRAINT `Patrons_Albums_ibfk_1` FOREIGN KEY (`Patron_ID`) REFERENCES `Patrons` (`Patron_ID`),
  ADD CONSTRAINT `Patrons_Albums_ibfk_2` FOREIGN KEY (`Album_ID`) REFERENCES `Albums` (`Album_ID`);

--
-- Constraints for table `Patrons_Books`
--
ALTER TABLE `Patrons_Books`
  ADD CONSTRAINT `Patrons_Books_ibfk_1` FOREIGN KEY (`Patron_ID`) REFERENCES `Patrons` (`Patron_ID`),
  ADD CONSTRAINT `Patrons_Books_ibfk_2` FOREIGN KEY (`Book_ID`) REFERENCES `Books` (`Book_ID`);

--
-- Constraints for table `Patrons_Movies`
--
ALTER TABLE `Patrons_Movies`
  ADD CONSTRAINT `Patrons_Movies_ibfk_1` FOREIGN KEY (`Patron_ID`) REFERENCES `Patrons` (`Patron_ID`),
  ADD CONSTRAINT `Patrons_Movies_ibfk_2` FOREIGN KEY (`Movie_ID`) REFERENCES `Movies` (`Movie_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
