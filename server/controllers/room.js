const con = require('../models/db_connect'),
    User = require('./user'),
    randomInvite = require('../config/random'),
    user_mysql = require('../models/user_mysql'),
    auth = require('../config/auth')
module.exports = {
    initRoomList: async(info, socket, cb) => {
        let { user, User_email } = info
        let sql = `select * from temporary where User_id = ${user}`
        let result = await con.query(sql).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        for (item of result) {
            if (item.UserRoom_id !== null) {
                socket.join(`room${item.UserRoom_id}`)
            }
        }
        return cb({ success: true })
    },
    saveRoomMessage: async(obj) => {
        let { from_id, room_id, message, time, type } = obj
        let sql = `insert into group_message (From_id,group_id,message,time,type) values (${from_id},${room_id},'${message}','${time}',${type})`
        let result = await con.query(sql).catch((err) => {
            console.log(err)
        })
        if (result) {
            let _id = result.insertId
            setTimeout(async() => {
                let sql1 = `update group_message set withdraw = 1 where groupMessage_id = ${_id}`
                let resul = await con.query(sql1).catch((err) => {
                    console.log(err)
                })
            }, 120000)
            return result.insertId
        }
        return false
    },
    createGroup: async(groupName, info, cb) => {
        let { user, User_email } = info
        let da = new Date(),
            Y = da.getFullYear(),
            M = da.getMonth() + 1,
            d = da.getDate(),
            m = da.getMinutes(),
            H = da.getHours()
        let createTime
        if (m < 10) {
            m = "0" + m
        }
        if (H > 12) {
            H = H - 12
            createTime = `创建于  ${M}/${d}/${Y}  0${H}:${m}  下午`
        } else {
            createTime = `创建于  ${M}/${d}/${Y}  ${H}:${m}  上午`
        }
        let invite = randomInvite(10)
        let sql = `insert into groups (GroupName,GroupAdmin,GroupTime,invite) values ('${groupName}',${user},'${createTime}','${invite}')`
        let result = await con.query(sql).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        if (result) {
            let sql2 = `insert into temporary (User_id,UserRoom_id) values (${user},${result.insertId})`
            let result2 = await con.query(sql2).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            await User.getTemporary(info, cb)
        }
    },
    changeRoom: async(isNoticeName, msg, _id, cb) => {
        let sql
        if (isNoticeName) {
            sql = `update groups set GroupName = '${msg}' where Group_id= ${_id}`
        } else {
            sql = `update groups set GroupNotice= '${msg}' where Group_id= ${_id}`
        }
        await con.query(sql).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        return cb({ notice: true })
    },
    invite: async(invite, data, cb) => {
        let { user } = data
        let sql = `select * from groups where invite = '${invite}'`
        let result = await con.query(sql).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        if (result) {
            let sql2 = `select * from temporary where User_id = ${user} and UserRoom_id = ${result[0].Group_id}`
            let msg2 = await con.query(sql2).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            if (msg2.length != 0) {
                return cb({ isOk: true })
            }
            let sql1 = `insert into temporary (User_id,UserRoom_id) values (${user},${result[0].Group_id})`
            let msg1 = await con.query(sql1).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            return cb({ isOk: true })
        }
    },
    updateLink: async(data, cb) => {
        let { Group_id, GroupAdmin } = data
        let invite = randomInvite(10)
        let sql = `update groups set invite = '${invite}' where Group_id = ${Group_id} and GroupAdmin = ${GroupAdmin}`
        let result = await con.query(sql).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        let da = await user_mysql.msgRoom(Group_id)
        return cb({ group: da })
    },
    changeRoomImg: async(obj, cb) => {
        let { file, group_id } = obj
        let data = await auth('group', file).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1006' })
            })
            // console.log(data.data.Location)
        let url = "https://" + data.data.Location
        let sql = `update groups set GroupAvatar = '${url}' where Group_id = '${group_id}'`
        let result = await con.query(sql).catch((err) => {
            // 查询失败
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        resault = await user_mysql.msgRoom(group_id)
        return cb({ group: resault })
    }
}