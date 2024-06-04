CREATE DATABASE  IF NOT EXISTS `movie_mate` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `movie_mate`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: localhost    Database: movie_mate
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `details` varchar(2500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Wonka','2024-03-11','1 HR 56 MIN','https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,h_465,q_auto,w_310/v1699288064/amc-cdn/production/2/movies/65900/65858/PosterDynamic/160145.jpg','Based on the extraordinary character at the center of Charlie and the Chocolate Factory, Roald Dahl’s most iconic children’s book and one of the best-selling children’s books of all time, “Wonka” tells the wondrous story of how the world’s greatest inventor, magician and chocolate-maker became the beloved Willy Wonka we know today.'),(2,'Oppenheimer','2024-03-11','3 HR','https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,h_465,q_auto,w_310/v1685106965/amc-cdn/production/2/movies/67000/66956/PosterDynamic/152967.jpg','Written and directed by Christopher Nolan, Oppenheimer is an IMAX®-shot epic thriller that thrusts audiences into the pulse-pounding paradox of the enigmatic man who must risk destroying the world in order to save it. The film stars Cillian Murphy as J. Robert Oppenheimer and Emily Blunt as his wife, biologist and botanist Katherine “Kitty” Oppenheimer. The film is based on the Pulitzer Prize-winning book American Prometheus: The Triumph and Tragedy of J. Robert Oppenheimer by Kai Bird and the late Martin J. Sherwin. '),(3,'Migration','2024-03-11','1 HR 31 MIN','https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,h_465,q_auto,w_310/v1697428147/amc-cdn/production/2/movies/53000/53042/PosterDynamic/159394.jpg','Illumination and Universal Pictures present a new original film, MIGRATION, a modern-day comedy following a family of ducks who convince their over-protective father to go on the vacation of a lifetime as they attempt to migrate from New England, through New York City, and ultimately down to the Bahamas. The film is produced by Illumination founder Chris Meledandri and directed by Oscar nominee Benjamin Renner (Ernest et Celestine) with an original screenplay by Mike White (School of Rock, White Lotus).'),(4,'Bob Marley: One Love','2024-03-11','1 HR 47 MIN','https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,h_465,q_auto,w_310/v1701788151/amc-cdn/production/2/movies/69200/69206/PosterDynamic/161038.jpg','BOB MARLEY: ONE LOVE celebrates the life and music of an icon who inspired generations through his message of love and unity. On the big screen for the first time, discover Bob’s powerful story of overcoming adversity and the journey behind his revolutionary music. Produced in partnership with the Marley family and starring Kingsley Ben-Adir as the legendary musician and Lashana Lynch as his wife Rita.'),(5,'Demon Slayer: Kimetsu No Yaiba - To the Hashira Training','2024-03-25','1 HR 43 MIN','https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,h_465,q_auto,w_310/v1706150777/amc-cdn/production/2/movies/75700/75739/PosterDynamic/162476.png','Demon Slayer: Kimetsu no Yaiba -To the Hashira Training- will feature “A Connected Bond: Daybreak and First Light” (Episode 11) from the Swordsmith Village Arc, featuring the conclusion of the fierce battle between Tanjiro and Upper Four demon Hantengu, as well as Nezukos triumph over the sun. Seamlessly followed by Episode 1 of the highly anticipated Hashira Training Arc, featuring the start of training conducted by the Hashira in preparation for the forthcoming final battle against Muzan Kibutsuji, an episode never before seen by audiences.'),(6,'Dune 2 IMAX ','2024-03-20','2 HR 46 MIN','https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,h_465,q_auto,w_310/v1706151768/amc-cdn/production/2/movies/76000/75954/PosterDynamic/162481.jpg','The saga continues as award-winning filmmaker Denis Villeneuve embarks on “Dune: Part Two,” the next chapter of Frank Herbert’s celebrated novel Dune, with an expanded all-star international ensemble cast. This follow-up film will explore the mythic journey of Paul Atreides (Timothée Chalamet) as he unites with Chani (Zendaya) and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.'),(7,'Star Wars Episode I: The Phantom Menace','2024-05-03','2 HR 15 MIN','https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,h_465,q_auto,w_310/v1711115203/amc-cdn/production/2/movies/76500/76494/PosterDynamic/164236.jpg','Experience the heroic action and unforgettable adventures of Star Wars: Episode I - The Phantom Menace. See the first fateful steps in the journey of Anakin Skywalker. Stranded on the desert planet Tatooine after rescuing young Queen Amidala from the impending invasion of Naboo, Jedi apprentice Obi-Wan Kenobi and his Jedi Master Qui-Gon Jinn discover nine-year-old Anakin, who is unusually strong in the Force. Anakin wins a thrilling Podrace and with it his freedom as he leaves his home to be trained as a Jedi.'),(8,'Back to Black','2024-05-17','2 HR 3 MIN','https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,h_465,q_auto,w_310/v1708104099/amc-cdn/production/2/movies/75700/75666/PosterDynamic/163209.jpg','The extraordinary story of Amy Winehouse’s early rise to fame from her early days in Camden through the making of her groundbreaking album, Back to Black that catapulted Winehouse to global fame. Told through Amy’s eyes and inspired by her deeply personal lyrics, the film explores and embraces the many layers of the iconic artist and the tumultuous love story at the center of one of the most legendary albums of all time.'),(9,'The Fall Guy','2024-05-03','2 HR 6 MIN','https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,h_465,q_auto,w_310/v1709921464/amc-cdn/production/2/movies/70800/70790/PosterDynamic/163689.jpg','He’s a stuntman, and like everyone in the stunt community, he gets blown up, shot, crashed, thrown through windows and dropped from the highest of heights, all for our entertainment. And now, fresh off an almost career-ending accident, this working-class hero has to track down a missing movie star, solve a conspiracy and try to win back the love of his life while still doing his day job. What could possibly go right? '),(10,'Kingdom of the Planet of the Apes','2024-05-10','2 HR 25 MIN','https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,h_465,q_auto,w_310/v1712593232/amc-cdn/production/2/movies/67500/67468/PosterDynamic/164492.jpg','Director Wes Ball breathes new life into the global, epic franchise set several generations in the future following Caesar’s reign, in which apes are the dominant species living harmoniously and humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seats`
--

DROP TABLE IF EXISTS `seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seats` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `seat_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seats`
--

LOCK TABLES `seats` WRITE;
/*!40000 ALTER TABLE `seats` DISABLE KEYS */;
INSERT INTO `seats` VALUES (1,'A1'),(2,'A2'),(3,'A3'),(4,'A4'),(5,'A5'),(6,'A6'),(7,'A7'),(8,'A8'),(9,'B1'),(10,'B2'),(11,'B3'),(12,'B4'),(13,'B5'),(14,'B6'),(15,'B7'),(16,'B8'),(17,'C1'),(18,'C2'),(19,'C3'),(20,'C4'),(21,'C5'),(22,'C6'),(23,'C7'),(24,'C8'),(25,'D1'),(26,'D2'),(27,'D3'),(28,'D4'),(29,'D5'),(30,'D6'),(31,'D7'),(32,'D8'),(33,'E1'),(34,'E2'),(35,'E3'),(36,'E4'),(37,'E5'),(38,'E6'),(39,'E7'),(40,'E8');
/*!40000 ALTER TABLE `seats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `start_time` time(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,'13:00:00.000000'),(2,'15:00:00.000000'),(3,'18:00:00.000000'),(4,'21:00:00.000000'),(5,'19:00:00.000000');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showtimes`
--

DROP TABLE IF EXISTS `showtimes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showtimes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `movie_id` bigint DEFAULT NULL,
  `session_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKeltpyuei1d5g3n6ikpsjwwil6` (`movie_id`),
  KEY `FK9n8h8rqltsgm33itb7fi58lb2` (`session_id`),
  CONSTRAINT `FK9n8h8rqltsgm33itb7fi58lb2` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`),
  CONSTRAINT `FKeltpyuei1d5g3n6ikpsjwwil6` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showtimes`
--

LOCK TABLES `showtimes` WRITE;
/*!40000 ALTER TABLE `showtimes` DISABLE KEYS */;
INSERT INTO `showtimes` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,2,2),(6,2,5),(7,3,1),(8,3,2),(9,3,3),(10,3,4),(11,4,1),(12,4,2),(13,4,3),(14,4,4),(15,5,1),(16,5,2),(17,5,3),(18,5,4),(19,6,2),(20,6,4),(21,6,5);
/*!40000 ALTER TABLE `showtimes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_seats`
--

DROP TABLE IF EXISTS `ticket_seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_seats` (
  `ticket_id` bigint NOT NULL,
  `seat_id` bigint NOT NULL,
  PRIMARY KEY (`ticket_id`,`seat_id`),
  KEY `FK2lqhsnvybynd9txyqu99lhtwf` (`seat_id`),
  CONSTRAINT `FK2lqhsnvybynd9txyqu99lhtwf` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`),
  CONSTRAINT `FKfxdd0rdiannlumvkr87jjkpr0` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_seats`
--

LOCK TABLES `ticket_seats` WRITE;
/*!40000 ALTER TABLE `ticket_seats` DISABLE KEYS */;
INSERT INTO `ticket_seats` VALUES (17,9),(17,10),(20,13),(18,14),(20,14),(18,15),(19,39),(19,40);
/*!40000 ALTER TABLE `ticket_seats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `adult_count` bigint DEFAULT NULL,
  `child_count` bigint DEFAULT NULL,
  `paid_amount` double DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `showtime_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `selected_date` varchar(255) DEFAULT NULL,
  `order_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo0u22315eoxdv59tn6wsdn8b1` (`showtime_id`),
  KEY `FK4eqsebpimnjen0q46ja6fl2hl` (`user_id`),
  CONSTRAINT `FK4eqsebpimnjen0q46ja6fl2hl` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKo0u22315eoxdv59tn6wsdn8b1` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (1,0,2,23.98,342465453,9,1,'2024-04-07','2024-04-05T14:27:43.833Z'),(2,2,0,31.98,342465723,6,1,'2024-04-05','2024-04-05T14:50:14.744Z'),(3,1,1,27.98,342466025,17,1,'2024-04-16','2024-04-05T15:15:26.315Z'),(4,2,0,31.98,342534960,6,1,'2024-04-09','2024-04-09T15:00:00.527Z'),(5,2,0,31.98,342673463,4,6,'2024-04-17','2024-04-17T15:08:33.744Z'),(6,2,0,31.98,342673492,20,6,'2024-04-19','2024-04-17T15:24:18.142Z'),(7,1,1,27.98,342685247,17,6,'2024-04-20','2024-04-18T07:43:47.804Z'),(10,2,0,31.98,343139220,21,1,'2024-05-19','2024-05-14T14:15:01.334Z'),(11,2,0,31.98,343142429,3,1,'2024-05-17','2024-05-14T18:42:23.768Z'),(12,1,1,27.98,343142481,9,1,'2024-05-17','2024-05-14T18:46:42.213Z'),(13,2,0,31.98,343142964,6,1,'2024-05-21','2024-05-14T19:26:59.096Z'),(14,2,0,31.98,343143087,17,1,'2024-05-16','2024-05-14T19:37:12.868Z'),(15,2,0,31.98,343212832,17,1,'2024-05-24','2024-05-18T20:29:19.516Z'),(16,2,0,31.98,343212911,2,1,'2024-05-22','2024-05-18T20:35:51.765Z'),(17,2,0,31.98,343225380,4,1,'2024-05-22','2024-05-19T13:54:57.825Z'),(18,2,0,31.98,343230006,6,2,'2024-05-23','2024-05-19T20:20:28.972Z'),(19,0,2,23.98,343230431,7,2,'2024-05-20','2024-05-19T20:55:51.094Z'),(20,2,0,31.98,343242294,14,2,'2024-05-26','2024-05-20T13:24:30.312Z');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test@test.com','Damla','Sevinc','$2a$10$S2KsoqGKuR3h652vBLVDS.jncHDezclGYYQw0fN.Tjk.kvLqY9XBK'),(2,'test2@test.com','test2','test2','$2a$10$3LmQQt4RcAO6zNcC9qSTjeIYYd0dPLzNCztXc6kiQpU4xJwF/bO9.'),(3,'test1@test.com','damla','sevinc','$2a$10$FtW1.FNzBYVGVYI.1ZNfrONGZGrU/UTclPTS2AKdNi8RLLvKsOE/.');
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

-- Dump completed on 2024-06-04 22:51:14
