-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 22, 2021 at 04:46 PM
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

--
-- Dumping data for table `Albums`
--

INSERT INTO `Albums` (`Album_ID`, `Title`, `Artist_ID`) VALUES
(1, 'Szobel', 5),
(2, 'Cassie', 6),
(3, 'Kung Fu Fighting and Other Great Love Songs', 7),
(4, 'Love Peace and Happiness', 7),
(5, 'Keep Pleasing Me', 7);

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

--
-- Dumping data for table `Artists`
--

INSERT INTO `Artists` (`Artist_ID`, `First_name`, `Last_name`) VALUES
(1, 'Anna', 'Sewell'),
(2, 'Emily', ' Brontë'),
(3, 'Margaret', 'Mitchell'),
(4, 'Ralph', 'Ellison'),
(5, 'Hermann', 'Szobel'),
(6, 'Cassie', 'Ventura'),
(7, 'Carl', 'Douglas'),
(8, 'Kinka', 'Usher');

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

--
-- Dumping data for table `Books`
--

INSERT INTO `Books` (`Book_ID`, `Title`, `Artist_ID`) VALUES
(1, 'Black Beauty', 1),
(2, 'Wuthering Heights', 2),
(3, 'Lost Laysen', 3),
(4, 'Gone With the Wind', 3),
(5, 'Invisible Man', 4),
(6, 'Flying Home and Other Stories', 4),
(7, 'Juneteenth', 4),
(8, 'Three Days Before the Shooting...', 4),
(9, 'Shadow and Act', 4),
(10, 'Going to the Territory', 4),
(11, 'The Collected Essays of Ralph Ellison', 4),
(12, 'Living with Music: Ralph Ellison\'s Jazz Writings', 4),
(13, 'Trading Twelves: The Selected Letters of Ralph Ellison and Albert Murray', 4);

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

--
-- Dumping data for table `Movies`
--

INSERT INTO `Movies` (`Movie_ID`, `Title`, `Artist_ID`) VALUES
(1, 'Mystery Men', 8);

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

--
-- Dumping data for table `Patrons_Albums`
--

INSERT INTO `Patrons_Albums` (`Patron_ID`, `Album_ID`) VALUES
(1, 1),
(1, 2),
(1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Patrons_Books`
--

DROP TABLE IF EXISTS `Patrons_Books`;
CREATE TABLE `Patrons_Books` (
  `Patron_ID` int(11) NOT NULL,
  `Book_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Patrons_Books`
--

INSERT INTO `Patrons_Books` (`Patron_ID`, `Book_ID`) VALUES
(2, 2),
(2, 5),
(4, 2),
(4, 13);

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
-- Dumping data for table `Patrons_Movies`
--

INSERT INTO `Patrons_Movies` (`Patron_ID`, `Movie_ID`) VALUES
(3, 1);

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
  MODIFY `Album_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Artists`
--
ALTER TABLE `Artists`
  MODIFY `Artist_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Books`
--
ALTER TABLE `Books`
  MODIFY `Book_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `Movies`
--
ALTER TABLE `Movies`
  MODIFY `Movie_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
