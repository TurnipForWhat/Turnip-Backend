# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 10.1.8-MariaDB)
# Database: turnip
# Generation Time: 2016-04-06 02:25:55 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Chat
# ------------------------------------------------------------

CREATE TABLE `Chat` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sender` int(11) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `chat_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Chat` WRITE;
/*!40000 ALTER TABLE `Chat` DISABLE KEYS */;

INSERT INTO `Chat` (`id`, `sender`, `body`, `chat_id`)
VALUES
	(1,1,'hello, world!',2),
	(2,1,'hello, world!',2),
	(3,1,'hello, world!',2);

/*!40000 ALTER TABLE `Chat` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Event
# ------------------------------------------------------------

CREATE TABLE `Event` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table FriendRequests
# ------------------------------------------------------------

CREATE TABLE `FriendRequests` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `to` int(11) DEFAULT NULL,
  `from` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `FriendRequests` WRITE;
/*!40000 ALTER TABLE `FriendRequests` DISABLE KEYS */;

INSERT INTO `FriendRequests` (`id`, `to`, `from`)
VALUES
	(1,NULL,1);

/*!40000 ALTER TABLE `FriendRequests` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table GroupChat
# ------------------------------------------------------------

CREATE TABLE `GroupChat` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `people` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `GroupChat` WRITE;
/*!40000 ALTER TABLE `GroupChat` DISABLE KEYS */;

INSERT INTO `GroupChat` (`id`, `people`)
VALUES
	(1,'1'),
	(2,'1'),
	(3,'1');

/*!40000 ALTER TABLE `GroupChat` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User
# ------------------------------------------------------------

CREATE TABLE `User` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `last_toggle_time` int(11) DEFAULT NULL,
  `hashed_password` varchar(255) DEFAULT NULL,
  `facebook_id` int(11) DEFAULT NULL,
  `profile_picture_id` int(11) DEFAULT NULL,
  `friends_list` varchar(1024) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `blocked_users` varchar(1024) DEFAULT NULL,
  `login_token` varchar(255) DEFAULT NULL,
  `interests` varchar(255) DEFAULT NULL,
  `anti_interests` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;

INSERT INTO `User` (`id`, `name`, `status`, `last_toggle_time`, `hashed_password`, `facebook_id`, `profile_picture_id`, `friends_list`, `email`, `blocked_users`, `login_token`, `interests`, `anti_interests`)
VALUES
	(1,'Jonathan',1,1459719392,'$2a$11$jrhAXhXcf1lQvbBQ6J/zb.gacnmUt2G9kwhLnEYpcN0e4selWuGcK',NULL,NULL,'1,5,10','butts@butts.butts',NULL,'0.d9sabxucm3i60f6r','1,2,3','4,5,6');

/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table UserToGroupChat
# ------------------------------------------------------------

CREATE TABLE `UserToGroupChat` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `chat_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `UserToGroupChat` WRITE;
/*!40000 ALTER TABLE `UserToGroupChat` DISABLE KEYS */;

INSERT INTO `UserToGroupChat` (`id`, `user`, `chat_id`)
VALUES
	(1,1,1),
	(2,1,3),
	(3,2,3),
	(4,3,3);

/*!40000 ALTER TABLE `UserToGroupChat` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
