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

DROP TABLE IF EXISTS `fileactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fileactions` (
  `ActionTime` datetime NOT NULL,
  `FileID` varchar(64) NOT NULL,
  `StoragePlatform` varchar(20) NOT NULL,
  `ActionType` varchar(20) NOT NULL,
  `UserName` varchar(64) NOT NULL,
  `UserEmail` varchar(64) NOT NULL,
  `FileHash` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`FileID`,`StoragePlatform`,`ActionTime`),
  KEY `index_file` (`FileID`,`StoragePlatform`),
  KEY `index_user` (`UserEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fileactions`
--

LOCK TABLES `fileactions` WRITE;
/*!40000 ALTER TABLE `fileactions` DISABLE KEYS */;
INSERT INTO `fileactions` VALUES ('2018-01-20 17:34:22','263262238234','Box','Preview','Matt Smith','smmath@deakin.edu.au','3be34e678fed59b13f20bc7c128e08eea2e86ba9'),('2018-01-21 16:59:38','263262238234','Box','Preview','Matt Smith','smmath@deakin.edu.au','3be34e678fed59b13f20bc7c128e08eea2e86ba9'),('2018-01-27 18:54:38','263262238234','Box','Preview','Matt Smith','smmath@deakin.edu.au','3be34e678fed59b13f20bc7c128e08eea2e86ba9'),('2018-01-28 02:16:40','263262238234','Box','Preview','Matt Smith','smmath@deakin.edu.au','3be34e678fed59b13f20bc7c128e08eea2e86ba9'),('2018-01-28 15:27:51','263262238234','Box','Rename','Matt Smith','smmath@deakin.edu.au','3be34e678fed59b13f20bc7c128e08eea2e86ba9'),('2018-01-28 16:56:42','263262238234','Box','Preview','Matt Smith','smmath@deakin.edu.au','3be34e678fed59b13f20bc7c128e08eea2e86ba9'),('2018-01-28 17:02:26','263262238234','Box','Preview','Matt Smith','smmath@deakin.edu.au','3be34e678fed59b13f20bc7c128e08eea2e86ba9'),('2018-01-14 18:40:00','263262635409','Box','Preview','Matt Smith','smmath@deakin.edu.au','fbfe7fc35ac24fd40b83c41f7e7e515a8751af3c'),('2018-01-20 15:53:57','263262635409','Box','Preview','Matt Smith','smmath@deakin.edu.au','fbfe7fc35ac24fd40b83c41f7e7e515a8751af3c'),('2018-01-20 17:31:10','263262635409','Box','Preview','Matt Smith','smmath@deakin.edu.au','fbfe7fc35ac24fd40b83c41f7e7e515a8751af3c'),('2018-01-20 18:03:49','263262635409','Box','Preview','Matt Smith','smmath@deakin.edu.au','fbfe7fc35ac24fd40b83c41f7e7e515a8751af3c'),('2018-01-20 18:06:14','263262635409','Box','Preview','Matt Smith','smmath@deakin.edu.au','fbfe7fc35ac24fd40b83c41f7e7e515a8751af3c'),('2018-01-27 18:53:59','263262635409','Box','Preview','Matt Smith','smmath@deakin.edu.au','fbfe7fc35ac24fd40b83c41f7e7e515a8751af3c'),('2018-01-27 23:55:56','263262635409','Box','Preview','Matt Smith','smmath@deakin.edu.au','fbfe7fc35ac24fd40b83c41f7e7e515a8751af3c'),('2018-01-28 17:39:08','263262635409','Box','Preview','Matt Smith','smmath@deakin.edu.au','fbfe7fc35ac24fd40b83c41f7e7e515a8751af3c'),('2018-01-28 17:39:41','263262635409','Box','Download','Matt Smith','smmath@deakin.edu.au','fbfe7fc35ac24fd40b83c41f7e7e515a8751af3c'),('2018-01-20 15:54:26','263262652142','Box','Rename','Matt Smith','smmath@deakin.edu.au','05f2db7a9a93185e94ba6c72ec62440074cd747e'),('2018-01-20 18:03:22','263262652142','Box','Preview','Matt Smith','smmath@deakin.edu.au','05f2db7a9a93185e94ba6c72ec62440074cd747e'),('2018-01-27 18:54:23','263262652142','Box','Preview','Matt Smith','smmath@deakin.edu.au','05f2db7a9a93185e94ba6c72ec62440074cd747e'),('2018-01-28 15:28:15','263262652142','Box','Preview','Matt Smith','smmath@deakin.edu.au','05f2db7a9a93185e94ba6c72ec62440074cd747e'),('2018-01-28 15:32:03','263262652142','Box','Preview','Matt Smith','smmath@deakin.edu.au','05f2db7a9a93185e94ba6c72ec62440074cd747e'),('2018-01-28 15:32:08','263262652142','Box','Download','Matt Smith','smmath@deakin.edu.au','05f2db7a9a93185e94ba6c72ec62440074cd747e'),('2018-01-28 15:32:11','263262652142','Box','Share Link','Matt Smith','smmath@deakin.edu.au','05f2db7a9a93185e94ba6c72ec62440074cd747e'),('2018-01-28 15:32:26','263262652142','Box','Preview','Matt Smith','smmath@deakin.edu.au','05f2db7a9a93185e94ba6c72ec62440074cd747e'),('2018-01-28 15:32:31','263262652142','Box','Preview','Matt Smith','smmath@deakin.edu.au','05f2db7a9a93185e94ba6c72ec62440074cd747e'),('2018-01-28 15:34:06','263262652142','Box','Rename','Matt Smith','smmath@deakin.edu.au','05f2db7a9a93185e94ba6c72ec62440074cd747e'),('2018-01-28 17:44:07','270624756168','Box','Upload','Matt Smith','smmath@deakin.edu.au','6f6111a40239c2152092dd98ff118fc7472df16d'),('2018-01-28 17:45:50','270624756168','Box','Preview','Matt Smith','smmath@deakin.edu.au','6f6111a40239c2152092dd98ff118fc7472df16d'),('2018-01-28 17:48:41','270624756168','Box','Preview','Matt Smith','smmath@deakin.edu.au','b8c274807887e8b2d317ee72bd4a2ae96a93108e');
/*!40000 ALTER TABLE `fileactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trackedfiles`
--

DROP TABLE IF EXISTS `trackedfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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

-- Dump completed on 2018-01-30 13:18:43
