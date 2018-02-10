

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user_message`
-- ----------------------------
DROP TABLE IF EXISTS `user_message`;
CREATE TABLE `user_message` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `From_id` int(11) NOT NULL,
  `To_id` int(11) NOT NULL,
  `message` char(255) DEFAULT NULL,
  `time` char(100) DEFAULT NULL,
  `type` int(3) DEFAULT NULL,
  `withdraw` int(1) DEFAULT '0',
  PRIMARY KEY (`message_id`),
  KEY `From_id` (`From_id`),
  KEY `To_id` (`To_id`),
  CONSTRAINT `user_message_ibfk_1` FOREIGN KEY (`From_id`) REFERENCES `user` (`User_id`),
  CONSTRAINT `user_message_ibfk_2` FOREIGN KEY (`To_id`) REFERENCES `user` (`User_id`)
) ENGINE=InnoDB AUTO_INCREMENT=310 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_message
-- ----------------------------
