
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `User_id` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(20) DEFAULT NULL,
  `UserEmail` varchar(255) DEFAULT NULL,
  `UserPassword` varchar(255) DEFAULT NULL,
  `UserAvatar` varchar(255) DEFAULT '/static/image/11.jpg',
  `UserSlogan` varchar(255) DEFAULT NULL,
  `lastLogin` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`User_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('8', 'LHP', '1558997208@qq.com', '9b61fa9cac9fafe28b629fa4178ffb23e22b36c0', 'http://lhp313-1253555032.cos.ap-chengdu.myqcloud.com/avatar/V7NL4yyhi.jpg', '很好', 'last login 2/10/2018 15:20');
INSERT INTO `user` VALUES ('9', '祝琦', '847186328@qq.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'http://lhp313-1253555032.cos.ap-chengdu.myqcloud.com/avatar/d4g3a8.jpg', '很对', 'last login 2/10/2018 9:31');
INSERT INTO `user` VALUES ('10', '浪', '1792081401@qq.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'http://lhp313-1253555032.cos.ap-chengdu.myqcloud.com/avatar/drqrxIMG_20180205_161032.jpg', 'ok', 'last login 2/10/2018 15:43');
INSERT INTO `user` VALUES ('11', 'sb', '123456', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'http://lhp313-1253555032.coscd.myqcloud.com/image/11.jpg?1519873202', 'bingle', 'last login 2/6/2018 12:50');
INSERT INTO `user` VALUES ('18', '猫妖', '我是猫妖啊', '01b307acba4f54f55aafc33bb06bbbf6ca803e9a', 'http://lhp313-1253555032.cos.ap-chengdu.myqcloud.com/avatar/tz1r11606805417504688F10785B6970828F0EE482D6871.jpg', null, 'last login 2/8/2018 20:18');
INSERT INTO `user` VALUES ('19', 'aaa', '1221111233@qq.com', 'c74ee3bd163d699db630bfb97a0f38bbdba297f2', '/static/image/11.jpg', null, 'last login 2/9/2018 14:33');
INSERT INTO `user` VALUES ('20', 'null', '123456@qq.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', '/static/image/11.jpg', null, 'last login 2/9/2018 14:33');
INSERT INTO `user` VALUES ('21', '不朽', 'root@qq.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', '/static/image/11.jpg', null, 'last login 2/9/2018 14:34');
INSERT INTO `user` VALUES ('22', '哈哈哈', '594410014@qq.com', '601f1889667efaebb33b8c12572835da3f027f78', '/static/image/11.jpg', null, 'last login 2/9/2018 14:43');
