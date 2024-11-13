-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2024 at 11:36 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medicaldiary`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `ID_Family` bigint(20) NOT NULL,
  `PassWord` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`ID_Family`, `PassWord`, `Email`) VALUES
(1, '$2a$10$laVKL79xjNu1cOfB5Pcu3uEnx7vZH5ihj1arNP4jfi0EcFdaX4ppa', 'kien@gmail.com'),
(2, '$2a$10$laVKL79xjNu1cOfB5Pcu3uEnx7vZH5ihj1arNP4jfi0EcFdaX4ppa', 'le@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `family`
--

CREATE TABLE `family` (
  `ID_Family` bigint(20) NOT NULL,
  `Name` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `family`
--

INSERT INTO `family` (`ID_Family`, `Name`) VALUES
(1, 'Gia đình 1'),
(2, 'Gia đình 2');

-- --------------------------------------------------------

--
-- Table structure for table `information`
--

CREATE TABLE `information` (
  `CCCD` varchar(255) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Gender` tinyint(1) DEFAULT NULL,
  `BHYT` varchar(255) DEFAULT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Job` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Medical_History` longtext DEFAULT NULL,
  `ID_Family` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `receipt`
--

CREATE TABLE `receipt` (
  `ID_Receipt` bigint(20) NOT NULL,
  `ID_Patient` varchar(255) DEFAULT NULL,
  `ID_Doctor` varchar(255) DEFAULT NULL,
  `Place` varchar(255) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `Reason` longtext DEFAULT NULL,
  `Diagnosis` varchar(255) DEFAULT NULL,
  `Treat` varchar(255) DEFAULT NULL,
  `Url_Result` varchar(255) DEFAULT NULL,
  `Url_BillDrug` varchar(255) DEFAULT NULL,
  `Remind` longtext DEFAULT NULL,
  `Date_Visit` datetime DEFAULT NULL,
  `Blood_Pressure` int(11) DEFAULT NULL,
  `Weight` int(11) DEFAULT NULL,
  `Height` int(11) DEFAULT NULL,
  `Heart_Rate` int(11) DEFAULT NULL,
  `Temperature` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `iD_Room` varchar(255) NOT NULL,
  `PIN` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room_detail`
--

CREATE TABLE `room_detail` (
  `ID_Room` varchar(255) NOT NULL,
  `ID_IsFollowed` varchar(255) NOT NULL,
  `Status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`Email`),
  ADD UNIQUE KEY `ID_Family` (`ID_Family`);

--
-- Indexes for table `family`
--
ALTER TABLE `family`
  ADD PRIMARY KEY (`ID_Family`),
  ADD UNIQUE KEY `ID_Family` (`ID_Family`);

--
-- Indexes for table `information`
--
ALTER TABLE `information`
  ADD PRIMARY KEY (`CCCD`),
  ADD UNIQUE KEY `CCCD` (`CCCD`),
  ADD KEY `ID_Family` (`ID_Family`);

--
-- Indexes for table `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`ID_Receipt`),
  ADD UNIQUE KEY `ID_Receipt` (`ID_Receipt`),
  ADD KEY `ID_Patient` (`ID_Patient`),
  ADD KEY `ID_Doctor` (`ID_Doctor`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`iD_Room`),
  ADD UNIQUE KEY `iD_Room` (`iD_Room`);

--
-- Indexes for table `room_detail`
--
ALTER TABLE `room_detail`
  ADD PRIMARY KEY (`ID_Room`,`ID_IsFollowed`),
  ADD KEY `ID_IsFollowed` (`ID_IsFollowed`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `family`
--
ALTER TABLE `family`
  MODIFY `ID_Family` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `receipt`
--
ALTER TABLE `receipt`
  MODIFY `ID_Receipt` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`ID_Family`) REFERENCES `family` (`ID_Family`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `information`
--
ALTER TABLE `information`
  ADD CONSTRAINT `information_ibfk_1` FOREIGN KEY (`ID_Family`) REFERENCES `family` (`ID_Family`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `receipt`
--
ALTER TABLE `receipt`
  ADD CONSTRAINT `receipt_ibfk_1` FOREIGN KEY (`ID_Patient`) REFERENCES `information` (`CCCD`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `receipt_ibfk_2` FOREIGN KEY (`ID_Doctor`) REFERENCES `information` (`CCCD`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `room_detail`
--
ALTER TABLE `room_detail`
  ADD CONSTRAINT `room_detail_ibfk_1` FOREIGN KEY (`ID_IsFollowed`) REFERENCES `information` (`CCCD`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `room_detail_ibfk_2` FOREIGN KEY (`ID_Room`) REFERENCES `room` (`iD_Room`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
