

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `groups`
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `Group_id` int(11) NOT NULL AUTO_INCREMENT,
  `GroupName` varchar(255) DEFAULT NULL,
  `GroupAdmin` int(255) DEFAULT NULL,
  `GroupNotice` varchar(255) DEFAULT NULL,
  `GroupAvatar` varchar(255) DEFAULT '/static/image/group.png',
  `GroupTime` char(255) DEFAULT NULL,
  `invite` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Group_id`),
  KEY `GroupAdmin` (`GroupAdmin`),
  CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`GroupAdmin`) REFERENCES `user` (`User_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

