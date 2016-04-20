# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 10.0.22-MariaDB-0+deb8u1)
# Database: turnip
# Generation Time: 2016-04-20 00:14:07 +0000
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
  `chat_id` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table GroupChat
# ------------------------------------------------------------

CREATE TABLE `GroupChat` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `people` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table User
# ------------------------------------------------------------

CREATE TABLE `User` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf32 DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `last_toggle_time` int(11) DEFAULT NULL,
  `hashed_password` varchar(255) DEFAULT NULL,
  `facebook_id` varchar(255) DEFAULT NULL,
  `profile_picture_id` varchar(11) DEFAULT '',
  `friends_list` varchar(1024) DEFAULT '',
  `email` varchar(255) DEFAULT NULL,
  `blocked_users` varchar(1024) DEFAULT NULL,
  `login_token` varchar(255) DEFAULT NULL,
  `gms_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
