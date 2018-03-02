const socket_io = require('socket.io'),
    user = require('../controllers/user'),
    JWT_KEY = require('../config/cr-config').jwt_key,
    //测试
    jwt = require('jsonwebtoken'),
    con = require('../models/db_connect'),
    msg = require('../controllers/message'),
    room = require('../controllers/room'),
    private = require('../controllers/private')
const socketio = {};
// token解释
function parseToken(info) {
    return new Promise((resolve, reject) => {
        try {
            info = jwt.verify(info, JWT_KEY);
            resolve(info);
        } catch (err) {
            reject('ERROR1001');
        }
    })
}
// 监听端口函数
socketio.getSocketio = async function(server) {
    let io = socket_io.listen(server)
        // user.createUser({
        //     password: "123456",
        //     email: "1792081401@qq.com",
        //     nickname: "晓彤"
        // })
    io.on('connect', function(socket) {
        socket.on('disconnect', () => {
                user.deleteOneLine(socket)
                console.log("断开连接")
            })
            // 注册用户
        socket.on('createUser', (info, cb) => {
                user.createUser(info, cb)
            })
            // info为参数 cb为回调函数 登录
        socket.on('verifyUser', (info, cb) => {
                user.loginUser(info, cb)
            })
            // 初始化
        socket.on('initUserInfo', (obj, cb) => {
                let { Agent, data } = obj
                parseToken(data).then((info) => {
                    user.getUserInfo(Agent, info, socket, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 获取当前在线
        socket.on('getOneLine', (data, cb) => {
                parseToken(data).then((info) => {
                    user.getOneLine(info, socket, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 退出当前用户
        socket.on('exitUser', (data, cb) => {
                user.exitUser(data, cb)
            })
            // 获取临时聊天列表
        socket.on('getTemporary', (info, cb) => {
                parseToken(info).then((data) => {
                    user.getTemporary(data, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 增加聊天
        socket.on('addTemporary', (info, cb) => {
                let { token, user_id } = info
                parseToken(token).then((data) => {
                    user.addTemporary(data, user_id, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 修改信息
        socket.on('changeUser', (info, cb) => {
                parseToken(info.token).then((data) => {
                    user.changeUser({...data, ...info }, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 修改头像
        socket.on('fileImage', (res, info, cb) => {
                // 图片数据流
                parseToken(info).then((data) => {
                    user.changeAvatar(res, data, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 获取历史记录
        socket.on('getHistory', (msg_id, info, cb) => {
                parseToken(info).then((data) => {
                    msg.getHistory(msg_id, data, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 接收消息
        socket.on('sendMessage', (obj, cb) => {
                let { UserObj, message, type, token } = obj
                parseToken(token).then((data) => {
                    msg.saveMessage(UserObj, message, type, data, socket, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 撤回消息
        socket.on('withdraw', (obj, cb) => {
                let { isRoom, _id, token } = obj
                parseToken(token).then((data) => {
                    msg.withdraw({ isRoom, _id, data }, socket, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 初始化room
        socket.on('initRoom', (obj, cb) => {
                parseToken(obj).then((data) => {
                    room.initRoomList(data, socket, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 创建群组
        socket.on('createGroup', (obj, cb) => {
                let { groupName, token } = obj
                parseToken(token).then((data) => {
                    room.createGroup(groupName, data, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 加入群
        socket.on('invite', (obj, cb) => {
                let { invite, token } = obj
                parseToken(token).then((data) => {
                    room.invite(invite, data, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 得到朋友或者群组信息
        socket.on('getGroup', (obj, cb) => {
                let { group_id, msg_id, token } = obj
                parseToken(token).then((data) => {
                    user.getGroup(group_id, msg_id, data, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 更新链接
        socket.on('updateLink', (obj, cb) => {
                room.updateLink(obj, cb)
            })
            // 修改群组资料
        socket.on('changeGroup', (obj, cb) => {
                let { isNoticeName, msg, _id } = obj
                room.changeRoom(isNoticeName, msg, _id, cb)
            })
            // 修改群里头像
        socket.on('groupImg', (obj, cb) => {
            room.changeRoomImg(obj, cb)
        })

        // 退出聊天
        socket.on('deleteMsg', (obj, cb) => {
                let { msg_id, token } = obj
                parseToken(token).then((data) => {
                    user.deleteMsg(msg_id, data, cb)
                }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1007' })
                })
            })
            // 搜索列表
        socket.on('queryPer', (obj, cb) => {
                user.queryPer(obj, cb)
            })
            // 屏蔽用户
        socket.on('Shield_user', (obj, cb) => {
            let { friend_id, token } = obj
            parseToken(token).then((data) => {
                private.Shield_user({ friend_id, user_id: data.user }, cb)
            }).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1007' })
            })
        })
        socket.on('getShield', (obj, cb) => {
            parseToken(obj).then((data) => {
                user.getShield(data, cb)
            }).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1007' })
            })
        })
    })
}
module.exports = socketio