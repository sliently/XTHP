/*
Navicat MySQL Data Transfer

Source Server         : haiping313.cn_3306
Source Server Version : 50717
Source Host           : haiping313.cn:3306
Source Database       : lhpboge

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-03-31 19:48:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user_shield`
-- ----------------------------
DROP TABLE IF EXISTS `user_shield`;
CREATE TABLE `user_shield` (
  `Shield_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `friend_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`Shield_id`),
  KEY `user_id` (`user_id`),
  KEY `friend_id` (`friend_id`),
  CONSTRAINT `user_shield_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`User_id`),
  CONSTRAINT `user_shield_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `user` (`User_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_shield
-- ----------------------------
INSERT INTO `user_shield` VALUES ('2', '8', '92');
