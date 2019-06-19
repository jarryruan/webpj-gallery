-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: webpj
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.16.04.1

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
-- Table structure for table `instruction`
--

DROP TABLE IF EXISTS `instruction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instruction` (
  `instruction_id` int(11) NOT NULL AUTO_INCREMENT,
  `painting_id` int(11) NOT NULL,
  `content` varchar(100) NOT NULL,
  PRIMARY KEY (`instruction_id`),
  KEY `instruction_painting_painting_id_fk` (`painting_id`),
  CONSTRAINT `instruction_painting_painting_id_fk` FOREIGN KEY (`painting_id`) REFERENCES `painting` (`painting_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instruction`
--

LOCK TABLES `instruction` WRITE;
/*!40000 ALTER TABLE `instruction` DISABLE KEYS */;
INSERT INTO `instruction` VALUES (1,2,'太帅了'),(2,2,'做这个pj的同学拿A'),(3,1,'做这个pj的同学拿A'),(4,3,'太美了'),(5,4,'老毛太帅了'),(6,5,'杨范太厉害了'),(7,6,'阮神牛×'),(8,7,'这幅画很好看'),(9,8,'下一幅更好看'),(10,9,'画这幅画的人很厉害'),(11,10,'做这个东西的同学太厉害了'),(12,11,'做这个pj的同学拿A'),(13,12,'做这个pj的同学拿A'),(15,14,'大家都拿A'),(16,15,'期末快乐'),(17,16,'这个pj很秀'),(18,17,'厉害厉害'),(19,18,'我的天呐，太好看了'),(20,19,'太美了，无法自拔'),(21,20,'大家看，这个很好看'),(22,21,'大家小心。不要掉下去'),(23,22,'大家小心。不要掉下去'),(24,23,'大家小心。不要掉下去'),(25,24,'大家小心。不要掉下去'),(26,25,'大家小心。不要掉下去'),(27,26,'大家小心。不要掉下去'),(28,27,'大家小心。不要掉下去'),(29,28,'大家小心。不要掉下去'),(30,29,'大家小心。不要掉下去'),(31,30,'大家小心。不要掉下去'),(32,31,'大家小心。不要掉下去'),(33,32,'大家小心。不要掉下去'),(34,33,'大家小心。不要掉下去');
/*!40000 ALTER TABLE `instruction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `painting`
--

DROP TABLE IF EXISTS `painting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `painting` (
  `painting_id` int(11) NOT NULL AUTO_INCREMENT,
  `painting_name` varchar(100) NOT NULL,
  `painting_path` varchar(100) NOT NULL,
  `house_id` int(11) NOT NULL,
  PRIMARY KEY (`painting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `painting`
--

LOCK TABLES `painting` WRITE;
/*!40000 ALTER TABLE `painting` DISABLE KEYS */;
INSERT INTO `painting` VALUES (1,'一篮子苹果','梵高/一篮子苹果.jpg',1),(2,'丰收的季节','梵高/丰收的季节.jpg',1),(3,'吃马铃薯的人','梵高/吃马铃薯的人.jpg',1),(4,'埃顿花园的回忆','梵高/埃顿花园的回忆.jpg',1),(5,'夜间咖啡馆','梵高/夜间咖啡馆.jpg',1),(6,'小树林','梵高/小树林.jpg',1),(7,'暴风雨的天空','梵高/暴风雨的天空.jpg',1),(8,'有乌鸦的麦田','梵高/有乌鸦的麦田.jpg',1),(9,'聚会','梵高/聚会.jpg',1),(10,'落日下的深秋','梵高/落日下的深秋.jpg',1),(11,'阿姆斯特丹的海边','梵高/阿姆斯特丹的海边.jpg',1),(12,'坐在公园里的女子','毕加索/坐在公园里的女子.jpg',2),(13,'坐在扶手椅上的女子','毕加索/坐在扶手椅上的女子.jpg',2),(14,'女子和公鸡','毕加索/女子和公鸡.jpg',2),(15,'室内的女子','毕加索/室内的女子.jpg',2),(16,'沐浴','毕加索/沐浴.jpg',2),(17,'牛头骨','毕加索/牛头骨.jpg',2),(18,'画室','毕加索/画室.jpg',2),(19,'画家和模特儿','毕加索/画家和模特儿.jpg',2),(20,'缝纫的女人周围环绕着她的孩子们','毕加索/缝纫的女人周围环绕着她的孩子们.jpg',2),(21,'背对着镜子入睡的裸女','毕加索/背对着镜子入睡的裸女.jpg',2),(22,'镜前少女','毕加索/镜前少女.jpg',2),(23,'丽达与鹅','达芬奇/丽达与鹅.jpg',3),(24,'吉内薇拉·班琪','达芬奇/吉内薇拉·班琪.jpg',3),(25,'哺乳圣母','达芬奇/哺乳圣母.jpg',3),(26,'圣母子与圣安妮','达芬奇/圣母子与圣安妮.jpg',3),(27,'基督受洗','达芬奇/基督受洗.jpg',3),(28,'基督的洗礼','达芬奇/基督的洗礼.jpg',3),(29,'安吉里之战','达芬奇/安吉里之战.jpg',3),(30,'抱貂女郎','达芬奇/抱貂女郎.jpg',3),(31,'持康乃馨的圣母','达芬奇/持康乃馨的圣母.jpg',3),(32,'纺车边的圣母','达芬奇/纺车边的圣母.jpg',3),(33,'蒙娜丽莎的微笑','达芬奇/蒙娜丽莎的微笑.jpg',3);
/*!40000 ALTER TABLE `painting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position` (
  `position_id` int(11) NOT NULL AUTO_INCREMENT,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `z` float NOT NULL,
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,0,0,0),(2,1,1,1),(3,1.3,1,1);
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `painting_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(500) NOT NULL,
  `position_id` int(11) NOT NULL,
  `rotation_id` int(11) NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `review_painting_painting_id_fk` (`painting_id`),
  KEY `review_user_user_id_fk` (`user_id`),
  KEY `review_position_position_id_fk` (`position_id`),
  KEY `review_rotation_rotation_id_fk` (`rotation_id`),
  CONSTRAINT `review_painting_painting_id_fk` FOREIGN KEY (`painting_id`) REFERENCES `painting` (`painting_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_position_position_id_fk` FOREIGN KEY (`position_id`) REFERENCES `position` (`position_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_rotation_rotation_id_fk` FOREIGN KEY (`rotation_id`) REFERENCES `rotation` (`rotation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_user_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,5,'这幅画画的真棒！',1,1),(2,1,5,'这幅画画的真棒！',2,2),(3,1,5,'这幅画画的真棒！',3,3);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rotation`
--

DROP TABLE IF EXISTS `rotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rotation` (
  `rotation_id` int(11) NOT NULL AUTO_INCREMENT,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `z` float NOT NULL,
  PRIMARY KEY (`rotation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rotation`
--

LOCK TABLES `rotation` WRITE;
/*!40000 ALTER TABLE `rotation` DISABLE KEYS */;
INSERT INTO `rotation` VALUES (1,0,0,0),(2,2,2,2),(3,4.376,2,2);
/*!40000 ALTER TABLE `rotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'polarwk','67266f662a7437ddb4763e4b1f9769b2'),(2,'王锴','88bf06b05d3b3c4a4e89e4a9dc15c32b'),(3,'polar','b0cddc49e7c29ab0e55b5778705640b4'),(4,'wangkai','a12c93edc19fa21e7eaed3b74e997299'),(5,'张三','ea000b6d22e95b5ae874453918efa533'),(6,'李四','2f4ce48a2f919d6df49edef749142e87'),(7,'美女','d629e5262bb5c12776650b9241a08c9c'),(8,'yangfan','a422e99aa84f2187469fb0498cd66062'),(9,'kong','cc8f19a1674f84e7bf8476db25a758f1'),(10,'123','4297f44b13955235245b2497399d7a93');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-17 16:31:07
