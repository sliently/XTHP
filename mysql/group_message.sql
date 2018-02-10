

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `group_message`
-- ----------------------------
DROP TABLE IF EXISTS `group_message`;
CREATE TABLE `group_message` (
  `groupMessage_id` int(11) NOT NULL AUTO_INCREMENT,
  `From_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `message` char(255) DEFAULT NULL,
  `time` char(100) DEFAULT NULL,
  `type` int(3) DEFAULT NULL,
  `withdraw` int(1) DEFAULT '0',
  PRIMARY KEY (`groupMessage_id`),
  KEY `From_id` (`From_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `group_message_ibfk_1` FOREIGN KEY (`From_id`) REFERENCES `user` (`User_id`),
  CONSTRAINT `group_message_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`Group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=341 DEFAULT CHARSET=utf8;
