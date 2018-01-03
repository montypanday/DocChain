-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: docchain
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fileactions`
--
CREATE TABLE `fileactions` (
  `ActionTime` datetime NOT NULL,
  `fileID` varchar(64) NOT NULL,
  `StoragePlatform` varchar(20) NOT NULL,
  `ActionType` varchar(20) NOT NULL,
  `UserID` varchar(64) NOT NULL,
  `FileHash` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`fileID`,`StoragePlatform`,`ActionTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fileactions`
--
LOCK TABLES `fileactions` WRITE;
/*!40000 ALTER TABLE `fileactions` DISABLE KEYS */;
INSERT INTO `fileactions` VALUES ('2017-12-31 21:30:31','0B9_WPLEFe8EdWHFCbVZFb3Z1U3M','Google Drive','Delete','mathewsmith2k13@gmail.com',NULL),('2017-12-31 21:10:20','1522XkRF4CEbHbw5Cu9qbx-cLrz9QOW-P','Google Drive','Upload','mathewsmith2k13@gmail.com',NULL),('2017-12-31 12:07:26','1vcanBJJobKqvNvpiVdZK76xkxqAvU2aNIOiRpNopRsQ','Google Drive','Delete','mathewsmith2k13@gmail.com',NULL),('2017-12-31 21:09:49','1vGrf9Gq0s0-Vz6MWg_A2Tag14NsTC-xGZHSE762SQ8g','Google Drive','Delete','mathewsmith2k13@gmail.com',NULL),('2017-12-31 12:11:11','1XiD-8oQ2bSOT458PpF7n0ZrKCj7PN23PDBW1Qt5GRMk','Google Drive','Delete','mathewsmith2k13@gmail.com',NULL),('2017-12-31 12:13:11','1ynA5-7SCbQwo1INkMmQ3KKccI_NMB4W6YHhDjeUa_JI','Google Drive','Delete','mathewsmith2k13@gmail.com',NULL),('2017-12-28 14:24:30','249123917778','Box','Preview','Box.V2.Models.BoxUser','cc704155ba934fe0befb558430836f0e9f3ff0ac'),('2017-12-28 14:28:37','249123917778','Box','Preview','2881201177','cc704155ba934fe0befb558430836f0e9f3ff0ac'),('2017-12-28 14:33:00','249123917778','Box','Preview','2881201177','cc704155ba934fe0befb558430836f0e9f3ff0ac'),('2017-12-28 15:03:56','249123917778','Box','Preview','2881201177','cc704155ba934fe0befb558430836f0e9f3ff0ac'),('2017-12-28 15:20:41','249123917778','Box','Preview','2881201177','cc704155ba934fe0befb558430836f0e9f3ff0ac'),('2017-12-28 15:45:44','249123917778','Box','Preview','2881201177','cc704155ba934fe0befb558430836f0e9f3ff0ac'),('2017-12-28 15:47:12','249123917778','Box','Preview','2881201177','cc704155ba934fe0befb558430836f0e9f3ff0ac'),('2017-12-28 14:27:13','249123929748','Box','Preview','Box.V2.Models.BoxUser','7df98e30a6e7b2ad6ba296f06bf9f22fc22ba588'),('2017-12-31 10:21:43','249123929748','Box','Preview','2881201177','7df98e30a6e7b2ad6ba296f06bf9f22fc22ba588'),('2017-12-31 21:02:52','261060626661','Box','Preview','2881201177','13759e8b0338b0aa3b78795a76edf3cc395a4d78'),('2017-12-31 21:04:26','261060718295','Box','Preview','2881201177','13759e8b0338b0aa3b78795a76edf3cc395a4d78');
/*!40000 ALTER TABLE `fileactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trackedfiles`
--
CREATE TABLE `trackedfiles` (
  `FileID` varchar(64) NOT NULL,
  `Platform` varchar(24) NOT NULL,
  PRIMARY KEY (`FileID`),
  UNIQUE KEY `FileID_UNIQUE` (`FileID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackedfiles`
--
LOCK TABLES `trackedfiles` WRITE;
/*!40000 ALTER TABLE `trackedfiles` DISABLE KEYS */;
INSERT INTO `trackedfiles` VALUES ('testFile','testPlatform');
/*!40000 ALTER TABLE `trackedfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `ID` varchar(10) DEFAULT NULL,
  `BoxID` varchar(10) DEFAULT NULL,
  `GoogleID` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-01 22:36:36
