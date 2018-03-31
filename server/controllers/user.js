const jwt = require('jsonwebtoken'),
    crypto = require('../models/encryption'),
    user_mysql = require('../models/user_mysql'),
    JW_KEY = require('../config/cr-config').jwt_key,
    con = require('../models/db_connect'),
    private = require('./private'),
    Time = require('../config/time'),
    auth = require('../config/auth')
let onLine = []
module.exports = {
    createUser: async function(info, cb) {
        let { password, email, nickname } = info
        // 查询是否有该用户
        let [user, userN] = await Promise.all([
                user_mysql.selectEmail(email),
                user_mysql.selectUsername(nickname)
            ]).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            // 加密密码
        password = crypto.encryption(password)
            // 已经有该邮箱或者用户名
        if (user || userN) {
            return cb({ isError: true, errMsg: 'ERROR1002' })
        }
        let resault = await user_mysql.create({ password, email, nickname }).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        if (resault) {
            // 生成token回传
            // 签署时间30天
            let sql1 = `insert into temporary (User_id,UserRoom_id) values (${resault.insertId},2)`
            let msg1 = await con.query(sql1).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            let exp = Math.floor((new Date().getTime()) / 1000) + 60 * 60 * 24 * 30;
            let verifys = jwt.sign({ user: resault.insertId, User_email: email, exp: exp }, JW_KEY)
            return cb({ token: verifys })
        }
        return cb({ isError: true, errMsg: 'ERROR1000' });
    },
    loginUser: async function(info, cb) {
        let { password, email } = info
        // 加密密码
        password = crypto.encryption(password)
        let [user, isTrue] = await Promise.all([
            user_mysql.selectEmail(email),
            user_mysql.isLogin({ password, email })
        ]).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        if (!user) {
            console.log("查无此人")
            return cb({ isError: true, errMsg: 'ERROR1003' });
        }
        if (isTrue) {
            // 生成token回传
            // 签署时间30天
            let exp = Math.floor((new Date().getTime()) / 1000) + 60 * 60 * 24 * 30;
            let verifys = jwt.sign({ user: isTrue[0].User_id, User_email: isTrue[0].UserEmail, exp: exp }, JW_KEY)
            return cb({ token: verifys })
        }
        return cb({ isError: true, errMsg: 'ERROR1004' });

    },
    // 获取个人信息
    getUserInfo: async function(Agent, info, socket, cb) {
        let { user, User_email } = info
        let data = await private.initUserInfo(info).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        socket.join(`user${user}`)
            // 更新最后登录时间
        let sql = `update user set lastLogin = '${Time.lastLogin()}' where User_id = ${user}`
        await con.query(sql).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        cb({ UserInfo: data })
        for (item of onLine) {
            if (item.user && item.user == user) {
                return
            }
        }
        let qq = {}
        qq.user = user
        qq.info = info
        qq.socket_id = socket.id
        qq.Agent = Agent
        onLine.push(qq)
    },
    // 获取临时聊天人列表
    getTemporary: async function(info, cb) {
        let { user, User_email } = info
        let Temporary = await user_mysql.sltTemporary(info).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        let data = []
        for (i of Temporary) {
            if (i.UserRoom_id == null) {
                let msg = await user_mysql.psTemporary({...info, ...i }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1005' })
                })
                data.push(msg)
            } else {
                let msg = await user_mysql.roomTemporary({...info, ...i }).catch((err) => {
                    return cb({ isError: true, errMsg: 'ERROR1005' })
                })
                data.push(msg)
            }
        }
        return cb({ Temporary: data })
    },
    addTemporary: async function(info, _id, cb) {
        let { user } = info
        let sql = `insert into temporary (User_id,UserFriend_id) values (${user},${_id})`
        let sql2 = `select * from temporary where User_id = ${user} and UserFriend_id = ${_id}`
        let result1 = await con.query(sql2).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        if (result1.length == 0) {
            let result = await con.query(sql).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            this.getTemporary(info, cb)
        }
        return
    },
    // 修改个人资料
    changeUser: async function(info, cb) {
        let { user, User_email, isName, message } = info
        let ss = isName ? 'UserName' : 'UserSlogan'
        let sql = `update user set ${ss} = '${message}' where User_id = '${user}' and UserEmail = '${User_email}'`
        let result = await con.query(sql).catch((err) => {
            // 查询失败
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        let UserInfo = await private.initUserInfo({ user, User_email })
        return cb({ UserInfo: UserInfo })
    },
    // 修改头像
    changeAvatar: async function(obj, info, cb) {
        let { user, User_email } = info
        let data = await auth('avatar', obj).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1006' })
            })
            // console.log(data.data.Location)
        let url = "https://" + data.data.Location
        let sql = `update user set UserAvatar = '${url}' where User_id = '${user}' and UserEmail = '${User_email}'`
        let result = await con.query(sql).catch((err) => {
            // 查询失败
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        let UserInfo = await private.initUserInfo({ user, User_email })
        return cb({ UserInfo: UserInfo })
    },
    getGroup: async function(group_id, msg_id, data, cb) {
        let resault
        if (group_id == null) {
            resault = await user_mysql.msgFriend(msg_id).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            let sltShield = await private.sltShield({ user_id: data.user, friend_id: msg_id }).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            return cb({ group: {...resault[0], sltShield } })
        } else {
            resault = await user_mysql.msgRoom(group_id).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            return cb({ group: resault[0] })
        }
        return cb({ isError: true, errMsg: 'ERROR1007' })
    },
    // 获取在线人
    getOneLine: async function(info, socket, cb) {
        let arr = []
        for (item of onLine) {
            let data = await private.initUserInfo(item.info).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            arr.push({
                ...data,
                userAgent: item.Agent
            })
        }
        return cb({ onLine: arr })
    },
    // 得到被屏蔽人的信息
    getShield: async function(info, cb) {
        let sql = `select friend_id from user_Shield where user_id = ${info.user}`
        let result = await con.query(sql).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        let arr = []
        for (item of result) {
            let sql1 = `select User_id,UserName,UserAvatar,UserSlogan from user where User_id = ${item.friend_id}`
            let result1 = await con.query(sql1).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            let qq = onLine.filter((x) => {
                return x.info.user == result1[0].User_id
            })
            if (qq.length != 0) {
                arr.push({
                    ...result1[0],
                    userAgent: qq[0].Agent
                })
            } else {
                arr.push({
                    ...result1[0],
                    userAgent: '[ offLine ]'
                })
            }
        }
        return cb({ Shield: arr })
    },
    queryPer: async function(obj, cb) {
        let sql = `select User_id,UserName,UserAvatar,UserSlogan from user where UserName like '%${obj}%'`
        let result = await con.query(sql).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        let arr = []
        result.forEach((item, index) => {
            let qq = onLine.filter((x) => {
                return x.info.user == item.User_id
            })
            if (qq.length != 0) {
                arr.push({
                    ...item,
                    userAgent: qq[0].Agent
                })
            } else {
                arr.push({
                    ...item,
                    userAgent: '[ offLine ]'
                })
            }
        })
        return cb({ queryPer: arr })
    },
    // 用户离线删除
    deleteOneLine: function(socket) {
        onLine.forEach((item, index, arr) => {
            if (socket.id == item.socket_id) {
                onLine.splice(index, 1)
            }
        })
    },
    // 用户自动退出
    exitUser: function(info, cb) {
        onLine.forEach((item, index, arr) => {
            if (info == item.user) {
                onLine.splice(index, 1)
            }
        })
    },
    deleteMsg: async function(obj, data, cb) {
        let { room_id, msg_id } = obj
        let { user } = data
        let sql
        if (room_id == null) {
            sql = `delete from temporary where User_id = ${user} and UserFriend_id = ${msg_id}`
        } else {
            sql = `delete from temporary where User_id = ${user} and UserRoom_id = ${room_id}`
        }
        let result = await con.query(sql).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        this.getTemporary(data, cb)
    }
}