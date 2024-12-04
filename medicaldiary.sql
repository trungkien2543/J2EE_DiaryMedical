-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2024 at 11:00 AM
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
(1, '$2a$10$n6P2XA.RPVtrbV4DubOIReUdZxc83.putDZm84GQbQMgFg32KVwEC', ''),
(2, '$2a$10$Lbmg5MRRA97cOyAbH89FiOftmAtgF9G7WtmFn2xTDO9fFc2czTf2i', 'trungkien1862@gmail.com'),
(52, '$2a$10$eMA8273Gu/acl4o7.3mAHuVN1nlJl2lGCR4ZtGuhoock7bzg2ckye', 'trungkienle035@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `family`
--

CREATE TABLE `family` (
  `ID_Family` bigint(20) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `family`
--

INSERT INTO `family` (`ID_Family`, `Name`) VALUES
(1, ''),
(2, 'Kien Le'),
(52, 'Kiên Lê\'s Family');

-- --------------------------------------------------------

--
-- Table structure for table `family_seq`
--

CREATE TABLE `family_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `family_seq`
--

INSERT INTO `family_seq` (`next_val`) VALUES
(151);

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
  `Medical_History` varchar(255) DEFAULT NULL,
  `ID_Family` bigint(20) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `information`
--

INSERT INTO `information` (`CCCD`, `Name`, `Gender`, `BHYT`, `Phone`, `Job`, `Department`, `Address`, `Medical_History`, `ID_Family`, `Email`) VALUES
('134507986234', 'Tran Thi Do', 1, '2293829312938', '0345079862', 'Doctor', 'Bach Mai Hospital', 'abc Duong xyx', '', 2, 'abc@gmail.com'),
('153804726951', 'Kiet Pham', 1, '121231231', '0254608137', 'Engineer', 'GPROD ', 'XBS Duong DIDU', 'Phong thap', 52, 'trungkienle035@gmail.com'),
('230917485690', 'Le Khanh', 0, '123456788', '0758493162', 'Nurse', 'Cho Ray Hospital', 'abc Duong DBds', '', 2, 'trungkien182@gmail.com'),
('487206531928', 'Kiet Pham Le', 0, '121332141', '0254608137', 'Engineer', 'FPR Coparation', 'DIIDS Duong DISIDN', '', 52, 'trungkienl0@gmail.com'),
('48720653323', 'Kiet Pham Le', 0, '123124124124', '0254608137', 'Engineer', '12312', '123123', '12312321', NULL, 'trungkienle0@gmail.com'),
('748392015463', 'Le Trung Kien', 1, '12345678990', '0758493162', 'Teacher', 'Sai Gon University', 'DSH Duong D5', '', 2, 'trungkien1862@gmail.com'),
('965813407245', 'Le Tai Khoan', 0, '11234153', '0362801475', 'Teacher', 'High School', 'DII Duong DJNF', '', 2, 'trungkienle03@gmail.com');

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
  `Reason` varchar(255) DEFAULT NULL,
  `Diagnosis` varchar(255) DEFAULT NULL,
  `Treat` varchar(255) DEFAULT NULL,
  `Url_Result` varchar(255) DEFAULT NULL,
  `Url_BillDrug` varchar(255) DEFAULT NULL,
  `Remind` varchar(255) DEFAULT NULL,
  `Date_Visit` datetime DEFAULT NULL,
  `Blood_Pressure` int(11) DEFAULT NULL,
  `Weight` int(11) DEFAULT NULL,
  `Height` int(11) DEFAULT NULL,
  `Heart_Rate` int(11) DEFAULT NULL,
  `Temperature` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receipt`
--

INSERT INTO `receipt` (`ID_Receipt`, `ID_Patient`, `ID_Doctor`, `Place`, `Date`, `Reason`, `Diagnosis`, `Treat`, `Url_Result`, `Url_BillDrug`, `Remind`, `Date_Visit`, `Blood_Pressure`, `Weight`, `Height`, `Heart_Rate`, `Temperature`) VALUES
(1, '230917485690', '230917485690', 'abc', '2024-12-04 10:19:00', 'Dau bung ', 'Dau da day cap tinh', 'Dau da day ', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733282354/mwgsyktffogz09lbav4l.jpg', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733283232/liym9al1fcbtmmlqiowi.jpg', 'Uong thuoc day du', '2025-01-10 10:33:00', 100, 75, 189, 70, 37),
(2, '153804726951', '153804726951', 'cbc', '2025-01-03 10:50:00', 'Dau lung', 'Gai cot song', 'Gai cot song', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733284316/yzeh6271p8bz06fa6vz4.jpg', 'null', 'Tap the duc va uong thuoc', '2025-01-11 10:51:00', 100, NULL, NULL, 69, NULL),
(3, '748392015463', '487206531928', '12312', '2024-12-04 10:52:00', 'Trat tay', 'Viem khap tay', 'Bang bo', NULL, 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733284414/woedgdapfks1yaiygkck.jpg', 'Tranh va cham', NULL, 130, NULL, NULL, 50, NULL),
(4, '230917485690', '487206531928', '12312', '2024-10-01 10:54:00', '2', '2', '2', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733284487/tfgdk0co2aarcgcqunic.jpg', NULL, '2', NULL, 2, NULL, NULL, 2, NULL),
(5, '230917485690', '153804726951', 'cbc', '2024-12-14 10:59:00', '3', '3', '3', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733284800/smpye0ece0cv9glqrzo8.png', NULL, '3', '2024-12-27 10:59:00', 3, NULL, NULL, 3, NULL),
(6, '748392015463', '153804726951', 'cbc', '2024-10-01 11:04:00', '221', '233', '2321', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733285114/nqcbtxvultnvti4ni0pj.jpg', 'null', '12312', '2024-10-14 14:04:00', 32321, NULL, NULL, 11123, NULL),
(7, '748392015463', '153804726951', 'cbc', '2024-08-01 11:05:00', '34444', '44343', '434343', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733285138/ihh6tjgo46i3pjpw9bvq.png', NULL, '434343', NULL, 434343, NULL, NULL, 3434343, NULL),
(8, '748392015463', '153804726951', 'cbc', '2024-12-28 11:07:00', '33333', '33333', '33333', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733285499/qxwuqoiwnsthn6iyweat.jpg', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733285501/y8hwvcvrcklifcc6fcuq.jpg', '3333', NULL, 3333, 333, 33, 333, 33),
(9, '487206531928', '487206531928', '12312', '2024-12-07 11:13:00', '2', '2', '2', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733285625/esb7l3a80vzj1ujvkecd.jpg', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733285627/ezq0hesefkzgz60jbkrj.jpg', '2', '2024-12-28 11:13:00', 2, NULL, NULL, 2, NULL),
(10, '134507986234', '230917485690', 'abc', '2024-12-01 16:18:00', 'Dau dau', 'Viem tai mui hong', 'Uong thuoc theo don', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733303960/oapr7aidlmeqfrvlzwpw.jpg', NULL, 'Ve sinh tai thuong xuyen', NULL, 100, NULL, NULL, 100, NULL),
(11, '748392015463', '487206531928', 'FPR Coparation', '2024-12-28 16:24:00', 'Dau da day', 'Viem da day', 'Uong thuoc theo don', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733304317/ptabuwkha9qqytswjxnv.jpg', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733304319/fbeqwdutlnz9scdq1ojp.png', 'Tai kham vao 2 tuan sau', '2025-01-10 16:24:00', 100, NULL, NULL, 100, NULL),
(12, '230917485690', '487206531928', 'FPR Coparation', '2024-12-04 16:25:00', 'Dau chan', 'Bong gan', 'Bang bot', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733304393/d12sczvg5du80h5rn5gj.jpg', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733304396/rmqqhtrpepntvc1reqhf.jpg', 'An nhieu rau cu, Tai kham 1 tuan / 1 lan', '2024-12-11 16:26:00', 100, NULL, NULL, 100, NULL),
(13, '965813407245', '487206531928', 'FPR Coparation', '2025-04-08 16:27:00', 'Dau tay', 'Viem co', 'Su dung nep', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733304594/yvvfamrlv3xabby9dsfq.jpg', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733304597/c8ilrv3pblvcvkjipuec.jpg', 'Theo doi thuong xuyen', '2025-06-17 16:29:00', 100, NULL, NULL, 100, NULL),
(14, '965813407245', '134507986234', 'Bach Mai Hospital', '2025-01-30 16:30:00', 'Viem hong', 'Viem hong', 'Uong thuoc theo don', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733304776/upy3xdklvp73he3ngbx8.jpg', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733304777/cbrdstoycdetzeupz4o3.jpg', 'Han che do lanh', NULL, 100, NULL, NULL, 100, NULL),
(15, '965813407245', '134507986234', 'Bach Mai Hospital', '2024-07-18 16:33:00', 'Dau rang', 'Sau rang', 'Nho rang', NULL, 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733304861/mo2jbxmmf9mtjmaafugw.jpg', 'Kiem tra thuong xuyen', '2024-08-01 16:33:00', 100, NULL, NULL, 100, NULL),
(16, '965813407245', '134507986234', 'Bach Mai Hospital', '2024-06-13 16:34:00', 'Bi Dau Tay', 'Viem Co', 'Bo bot', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733304937/ir7nli54erf8yo0byq8i.jpg', NULL, 'Kiem tra moi tuan 1 lan', '2024-06-26 16:35:00', 100, NULL, NULL, 100, NULL),
(17, '748392015463', '230917485690', 'Cho Ray Hospital', '2024-04-04 16:37:00', 'Dau chan', '123455', 'Uong thuoc giam dau', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733305098/vo4qjnxpiaoimfoqbltk.jpg', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733305099/xrwmmvoqn4hhapirdx59.jpg', 'Han che van dong manh', '2024-04-18 16:37:00', 102, NULL, NULL, 70, NULL),
(18, '230917485690', '134507986234', 'Bach Mai Hospital', '2024-01-07 16:38:00', 'Dau bung', 'Viem da day', 'Uong thuoc ', NULL, 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733305186/e92qu56uo3nbnivb9gah.jpg', 'Han che an do cay', '2024-01-13 16:39:00', 100, 70, 169, 100, 37),
(19, '134507986234', '134507986234', 'Bach Mai Hospital', '2024-12-26 16:44:00', 'Dau hong', 'Viem hong', 'Uong thuoc theo don', NULL, NULL, 'Ngu som', '2024-12-28 16:44:00', 109, NULL, NULL, 98, NULL),
(20, '134507986234', '134507986234', 'Bach Mai Hospital', '2025-03-06 16:45:00', 'Met moi, Dau dau', 'Cang thang than kinh', 'Uong thuoc', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733305579/dskfrkzhmp5zsqlqq9sh.jpg', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733305580/xoosmhjn9sqtdgtu7tes.jpg', 'Tap the duc, giam thoi gian lam viec', NULL, 100, NULL, NULL, 100, NULL),
(21, '153804726951', '134507986234', 'Bach Mai Hospital', '2024-12-05 16:57:00', 'Dau tay', 'Gay xuong', 'Bo bot', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733306282/jtb8bp3hww3knvhtkcdp.jpg', 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733306284/pjmdxsuntfydytfyri3e.jpg', '2 tuan kiem tra lai', '2024-12-19 16:57:00', 100, NULL, NULL, 100, NULL),
(22, '487206531928', '134507986234', 'Bach Mai Hospital', '2024-12-07 16:58:00', 'Dau da day', 'Viem loet da day', 'Uong thuoc', NULL, 'http://res.cloudinary.com/dg6cip51q/image/upload/v1733306336/rogzyrrvakc3dynekiac.jpg', 'Han che an cay', '2024-12-13 16:58:00', 100, NULL, NULL, 100, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `iD_Room` varchar(255) NOT NULL,
  `PIN` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`iD_Room`, `PIN`) VALUES
('153804726951', '1'),
('487206531928', '22'),
('748392015463', '12');

-- --------------------------------------------------------

--
-- Table structure for table `room_detail`
--

CREATE TABLE `room_detail` (
  `ID_Room` varchar(255) NOT NULL,
  `ID_IsFollowed` varchar(255) NOT NULL,
  `Status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_detail`
--

INSERT INTO `room_detail` (`ID_Room`, `ID_IsFollowed`, `Status`) VALUES
('748392015463', '153804726951', -1);

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
  MODIFY `ID_Family` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `receipt`
--
ALTER TABLE `receipt`
  MODIFY `ID_Receipt` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
