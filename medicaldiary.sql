-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 26, 2024 lúc 02:50 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `medicaldiary`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `UserName` varchar(255) NOT NULL,
  `PassWord` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Permission` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`UserName`, `PassWord`, `Email`, `Permission`) VALUES
('123456789', 'password123', 'a.nguyen@example.com', 1),
('234567890', 'password234', 'b.le@example.com', 0),
('345678901', 'password345', 'c.tran@example.com', 1),
('456789012', 'password456', 'd.pham@example.com', 0),
('567890123', 'password567', 'e.hoang@example.com', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bill`
--

CREATE TABLE `bill` (
  `ID_Bill` bigint(20) NOT NULL,
  `Total` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bill`
--

INSERT INTO `bill` (`ID_Bill`, `Total`) VALUES
(1, 150000),
(2, 200000),
(3, 250000),
(4, 300000),
(5, 350000),
(6, 150000),
(7, 200000),
(8, 250000),
(9, 300000),
(10, 350000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detail_bill`
--

CREATE TABLE `detail_bill` (
  `ID_Bill` bigint(20) NOT NULL,
  `ID_Drug` varchar(255) NOT NULL,
  `Amount_Drug` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `detail_bill`
--

INSERT INTO `detail_bill` (`ID_Bill`, `ID_Drug`, `Amount_Drug`) VALUES
(1, 'D001', 2),
(2, 'D003', 3),
(3, 'D004', 2),
(4, 'D005', 1),
(5, 'D002', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `drug`
--

CREATE TABLE `drug` (
  `ID_Drug` varchar(255) NOT NULL,
  `Name_Drug` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Price` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `drug`
--

INSERT INTO `drug` (`ID_Drug`, `Name_Drug`, `Description`, `Price`) VALUES
('D001', 'Paracetamol', 'Thuốc giảm đau, hạ sốt', 50000),
('D002', 'Aspirin', 'Thuốc giảm đau, chống viêm', 60000),
('D003', 'Amoxicillin', 'Kháng sinh phổ rộng', 70000),
('D004', 'Ibuprofen', 'Thuốc chống viêm, giảm đau', 80000),
('D005', 'Ceftriaxone', 'Kháng sinh', 90000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `family`
--

CREATE TABLE `family` (
  `ID_Family` bigint(20) NOT NULL,
  `Name` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `family`
--

INSERT INTO `family` (`ID_Family`, `Name`) VALUES
(1, 'Gia đình A'),
(2, 'Gia đình B'),
(3, 'Gia đình C');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `follow`
--

CREATE TABLE `follow` (
  `ID_Follow` varchar(255) NOT NULL,
  `ID_IsFollowed` varchar(255) NOT NULL,
  `Is_delete` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `information`
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
  `ID_Family` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `information`
--

INSERT INTO `information` (`CCCD`, `Name`, `Gender`, `BHYT`, `Phone`, `Job`, `Department`, `Address`, `Medical_History`, `ID_Family`) VALUES
('123456789', 'Nguyen Van A', 1, 'BHYT001', '0909123456', 'Bác sĩ', 'Nội khoa', '123 Đường A', 'Tiểu đường', 1),
('234567890', 'Le Thi B', 0, 'BHYT002', '0909234567', 'Giáo viên', 'Giáo dục', '456 Đường B', 'Cao huyết áp', 2),
('345678901', 'Tran Van C', 1, 'BHYT003', '0909345678', 'Kỹ sư', 'Công nghệ thông tin', '789 Đường C', 'Không', 1),
('456789012', 'Pham Thi D', 0, 'BHYT004', '0909456789', 'Kế toán', 'Tài chính', '12 Đường D', 'Dị ứng', 3),
('567890123', 'Hoang Van E', 1, 'BHYT005', '0909567890', 'Nhân viên bán hàng', 'Kinh doanh', '34 Đường E', 'Hen suyễn', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `receipt`
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
  `ID_Bill` bigint(20) DEFAULT NULL,
  `Remind` longtext DEFAULT NULL,
  `Date_Visit` datetime DEFAULT NULL,
  `Blood_Pressure` int(11) DEFAULT NULL,
  `Weight` int(11) DEFAULT NULL,
  `Height` int(11) DEFAULT NULL,
  `Heart_Rate` int(11) DEFAULT NULL,
  `Temperature` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `receipt`
--

INSERT INTO `receipt` (`ID_Receipt`, `ID_Patient`, `ID_Doctor`, `Place`, `Date`, `Reason`, `Diagnosis`, `Treat`, `Url_Result`, `ID_Bill`, `Remind`, `Date_Visit`, `Blood_Pressure`, `Weight`, `Height`, `Heart_Rate`, `Temperature`) VALUES
(1, '123456789', '345678901', 'Phòng khám A', '2024-09-20 10:00:00', 'Đau đầu', 'Cảm cúm', 'Paracetamol', 'http://ketqua.com', 1, 'Tái khám sau 1 tuần', '2024-09-27 10:00:00', 120, 70, 170, 80, 37),
(2, '234567890', '456789012', 'Bệnh viện B', '2024-09-21 11:00:00', 'Đau bụng', 'Viêm ruột', 'Amoxicillin', 'http://ketqua.com', 2, 'Kiểm tra sau 2 tuần', '2024-10-05 11:00:00', 110, 60, 160, 75, 36),
(3, '345678901', '123456789', 'Phòng khám C', '2024-09-22 12:00:00', 'Ho kéo dài', 'Viêm phổi', 'Ibuprofen', 'http://ketqua.com', 3, 'Uống thuốc đều đặn', '2024-09-29 12:00:00', 130, 80, 180, 85, 37),
(4, '456789012', '567890123', 'Bệnh viện D', '2024-09-23 13:00:00', 'Sốt cao', 'Sốt virus', 'Ceftriaxone', 'http://ketqua.com', 4, 'Theo dõi thêm', '2024-10-01 13:00:00', 125, 75, 175, 82, 38),
(5, '567890123', '234567890', 'Phòng khám E', '2024-09-24 14:00:00', 'Đau họng', 'Viêm họng', 'Aspirin', 'http://ketqua.com', 5, 'Uống thuốc 3 ngày', '2024-09-27 14:00:00', 115, 65, 165, 78, 36);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`UserName`),
  ADD UNIQUE KEY `UserName` (`UserName`);

--
-- Chỉ mục cho bảng `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`ID_Bill`),
  ADD UNIQUE KEY `ID_Bill` (`ID_Bill`);

--
-- Chỉ mục cho bảng `detail_bill`
--
ALTER TABLE `detail_bill`
  ADD PRIMARY KEY (`ID_Bill`,`ID_Drug`),
  ADD UNIQUE KEY `ID_Bill` (`ID_Bill`),
  ADD KEY `ID_Drug` (`ID_Drug`);

--
-- Chỉ mục cho bảng `drug`
--
ALTER TABLE `drug`
  ADD PRIMARY KEY (`ID_Drug`),
  ADD UNIQUE KEY `ID_Drug` (`ID_Drug`);

--
-- Chỉ mục cho bảng `family`
--
ALTER TABLE `family`
  ADD PRIMARY KEY (`ID_Family`),
  ADD UNIQUE KEY `ID_Family` (`ID_Family`);

--
-- Chỉ mục cho bảng `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`ID_Follow`,`ID_IsFollowed`),
  ADD UNIQUE KEY `ID_Follow` (`ID_Follow`),
  ADD KEY `ID_IsFollowed` (`ID_IsFollowed`);

--
-- Chỉ mục cho bảng `information`
--
ALTER TABLE `information`
  ADD PRIMARY KEY (`CCCD`),
  ADD UNIQUE KEY `CCCD` (`CCCD`),
  ADD KEY `ID_Family` (`ID_Family`);

--
-- Chỉ mục cho bảng `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`ID_Receipt`),
  ADD UNIQUE KEY `ID_Receipt` (`ID_Receipt`),
  ADD KEY `ID_Patient` (`ID_Patient`),
  ADD KEY `ID_Doctor` (`ID_Doctor`),
  ADD KEY `ID_Bill` (`ID_Bill`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bill`
--
ALTER TABLE `bill`
  MODIFY `ID_Bill` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `family`
--
ALTER TABLE `family`
  MODIFY `ID_Family` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `receipt`
--
ALTER TABLE `receipt`
  MODIFY `ID_Receipt` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`UserName`) REFERENCES `information` (`CCCD`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `detail_bill`
--
ALTER TABLE `detail_bill`
  ADD CONSTRAINT `detail_bill_ibfk_1` FOREIGN KEY (`ID_Bill`) REFERENCES `bill` (`ID_Bill`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `detail_bill_ibfk_2` FOREIGN KEY (`ID_Drug`) REFERENCES `drug` (`ID_Drug`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`ID_Follow`) REFERENCES `information` (`CCCD`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`ID_IsFollowed`) REFERENCES `information` (`CCCD`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `information`
--
ALTER TABLE `information`
  ADD CONSTRAINT `information_ibfk_1` FOREIGN KEY (`ID_Family`) REFERENCES `family` (`ID_Family`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `receipt`
--
ALTER TABLE `receipt`
  ADD CONSTRAINT `receipt_ibfk_1` FOREIGN KEY (`ID_Patient`) REFERENCES `information` (`CCCD`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `receipt_ibfk_2` FOREIGN KEY (`ID_Doctor`) REFERENCES `information` (`CCCD`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `receipt_ibfk_3` FOREIGN KEY (`ID_Bill`) REFERENCES `bill` (`ID_Bill`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
