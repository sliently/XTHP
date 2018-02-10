

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `temporary`
-- ----------------------------
DROP TABLE IF EXISTS `temporary`;
CREATE TABLE `temporary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `User_id` int(11) NOT NULL,
  `UserFriend_id` int(11) DEFAULT NULL,
  `UserRoom_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `User_id` (`User_id`),
  KEY `UserFriend_id` (`UserFriend_id`),
  KEY `UserRoom_id` (`UserRoom_id`),
  CONSTRAINT `temporary_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `user` (`User_id`),
  CONSTRAINT `temporary_ibfk_2` FOREIGN KEY (`UserFriend_id`) REFERENCES `user` (`User_id`),
  CONSTRAINT `temporary_ibfk_3` FOREIGN KEY (`UserRoom_id`) REFERENCES `groups` (`Group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8;


