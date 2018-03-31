const con = require('../models/db_connect'),
    user_mysql = require('../models/user_mysql'),
    private = require('./private'),
    room = require('./room'),
    User = require('./user'),
    auth = require('../config/auth')
module.exports = {
    getHistory: async(res, data, cb) => {
        let { room_id, msg_id, num } = res
        let { user } = data
        if (room_id == null) {
            // 查询聊天
            let sql
            if (user == msg_id) {
                sql = `select message_id,From_id,To_id,message,time,type from user_message where From_id = ${msg_id} and To_id = ${msg_id} order by message_id desc limit ${16*num},16`
            } else {
                sql = `select message_id,From_id,To_id,message,time,type from (select * from user_message where From_id = ${user} or To_id = ${user}) t
            where From_id = ${msg_id} or To_id = ${msg_id} order by message_id desc limit ${16*num},16`
            }
            let result = await con.query(sql).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            if (result.length == 0) {
                return cb({ num: 0 })
            }
            let datas = []
            for (item of result) {
                let fromUser = await user_mysql.msgFriend(item.From_id).catch(() => {
                    return cb({ isError: true, errMsg: 'ERROR1005' })
                })
                let toUser = await user_mysql.msgFriend(item.To_id).catch(() => {
                    return cb({ isError: true, errMsg: 'ERROR1005' })
                })
                let data = {
                    _id: item.message_id,
                    fromUser: fromUser[0],
                    toUser: toUser[0],
                    message: item.message,
                    time: item.time,
                    type: item.type
                }
                datas.push(data)
            }
            return cb({ history: datas })
        }
        if (msg_id == null) {
            let sql = `select groupMessage_id,From_id,group_id,message,time,type from group_message where group_id = ${room_id} order by groupMessage_id desc limit ${16*num},16`
            let result = await con.query(sql).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            if (result.length == 0) {
                return cb({ num: 0 })
            }
            let datas = []
            for (item of result) {
                let fromUser = await user_mysql.msgFriend(item.From_id).catch(() => {
                    return cb({ isError: true, errMsg: 'ERROR1005' })
                })
                let toUser = await user_mysql.msgRoom(item.group_id).catch(() => {
                    return cb({ isError: true, errMsg: 'ERROR1005' })
                })
                let data = {
                    _id: item.groupMessage_id,
                    fromUser: fromUser[0],
                    toUser: toUser[0],
                    message: item.message,
                    time: item.time,
                    type: item.type
                }
                datas.push(data)
            }
            return cb({ history: datas })
        }
    },
    saveMessage: async(UserObj, message, type, data, socket, cb) => {
        if (type == 1 || type == 2) {
            let data = await auth('msg', { file: message.file, name: message.fileName }).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            let src = "http://" + data.data.Location
            if (type == 1) {
                message = src
            } else {
                let msg = {
                    fileName: message.fileName,
                    fileSize: message.fileSize,
                    src: src
                }
                message = JSON.stringify(msg)
            }
        }
        let { room_id, msg_id } = UserObj
        let { user } = data
        let isTrue
        let time = new Date()
        if (room_id == null) {
            let obj = {
                    from_id: user,
                    to_id: msg_id,
                    message: message,
                    time: time,
                    type: type
                }
                // 查看对方是否屏蔽自己
            let isShield = await private.sltShield({ user_id: msg_id, friend_id: user }).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            if (isShield) {
                return cb({ isShield: true })
            }
            isTrue = await private.savePrivateMessage(obj).catch(() => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            let fromUser = await user_mysql.msgFriend(user).catch(() => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            let toUser = await user_mysql.msgFriend(msg_id).catch(() => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            let data = {
                    fromUser: fromUser[0],
                    toUser: toUser[0],
                    message: message,
                    time: time,
                    type: type,
                    _id: isTrue
                }
                // 判断对方是否有自己的聊天以及是否屏蔽自己
            let da = await private.judgeTemporary({ user, msg_id }).catch(() => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            let temporary2
            if (da) {
                temporary2 = false
            } else {
                await User.getTemporary({ user: msg_id }, function(info) {
                    temporary2 = info.Temporary
                })
            }
            socket.broadcast.to(`user${msg_id}`).emit('newMessage', { msg: data, Temporary: temporary2 })
            return cb({ msg: data })
        }
        if (msg_id == null) {
            let obj = {
                from_id: user,
                room_id: room_id,
                message: message,
                time: time,
                type: type
            }
            isTrue = await room.saveRoomMessage(obj)
            let fromUser = await user_mysql.msgFriend(user)
            let toUser = await user_mysql.msgRoom(room_id)
            let data = {
                fromUser: fromUser[0],
                toUser: toUser[0],
                message: message,
                time: time,
                type: type,
                _id: isTrue
            }
            socket.broadcast.to(`room${room_id}`).emit('newMessage', { msg: data, Temporary: false })
            return cb({ msg: data })
        }
        return cb({ err: true, msgErr: 'ERROR1006' })
    },
    withdraw: async(obj, socket, cb) => {
        let { isRoom, _id, data } = obj
        let sql, sql1
        if (isRoom.isRoom) {
            sql = `delete from group_message where groupMessage_id=${_id}`
            sql1 = `select withdraw from group_message  where groupMessage_id=${_id}`
        } else {
            sql = `delete from user_message where message_id=${_id}`
            sql1 = `select withdraw from user_message  where message_id=${_id}`
        }
        let result = await con.query(sql1).catch((err) => {
            return cb({ isError: true, msgErr: 'ERROR1005' })
        })
        if (result[0].withdraw == 0) {
            await con.query(sql).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            if (isRoom.isRoom) {
                socket.broadcast.to(`room${isRoom.msg_id}`).emit('withdraw', { withdraw: true, _id, room_id: isRoom.msg_id })
                return cb({ withdraw: true, _id, room_id: isRoom.msg_id })
            } else {
                socket.broadcast.to(`user${isRoom.msg_id}`).emit('withdraw', { withdraw: true, _id, user_id: isRoom.user_id })
                return cb({ withdraw: true, _id, user_id: isRoom.msg_id })
            }

        } else {
            return cb({ withdraw: false })
        }
    }
}