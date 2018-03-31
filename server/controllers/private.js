const con = require('../models/db_connect')
module.exports = {
    savePrivateMessage: async(obj) => {
        let { from_id, to_id, message, time, type } = obj
        let sql = `insert into user_message (From_id,To_id,message,time,type) values (${from_id},${to_id},'${message}','${time}',${type})`
        let result = await con.query(sql).catch((err) => {
            console.log("失败")
        })
        if (result) {
            let _id = result.insertId
            setTimeout(async() => {
                let sql1 = `update user_message set withdraw = 1 where message_id = ${_id}`
                    // console.log(con)
                let resul = await con.query(sql1).catch((err) => {
                    console.log(err)
                })
            }, 120000)
            return result.insertId
        }
        return false
    },
    initUserInfo: async(obj) => {
        let { user, User_email } = obj
        let sql = `select User_id,UserName,UserAvatar,UserSlogan from user where User_id='${user}' and UserEmail = '${User_email}'`
        let result = await con.query(sql).catch((err) => {
            // 查询失败
            console.log("查询失败")
        })
        return result[0]
    },
    judgeTemporary: async(obj) => {
        let { user, msg_id } = obj
        let sql = `select * from temporary where User_id = ${msg_id} and UserFriend_id = ${user}`
        let result = await con.query(sql).catch((err) => {
            // 查询失败
            console.log("查询失败")
        })
        if (result.length == 0) {
            let sql1 = `insert into temporary (User_id,UserFriend_id) values (${msg_id},${user})`
            let result1 = await con.query(sql1).catch((err) => {
                console.log("插入失败")
            })
            return false
        }
        return true
    },
    // 屏蔽用户
    Shield_user: async(obj, cb) => {
        let { user_id, friend_id } = obj
        let sql1 = `select * from user_Shield where user_id=${user_id} and friend_id=${friend_id}`
        let result1 = await con.query(sql1).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        if (result1.length != 0) {
            let sql2 = `delete from user_Shield where user_id=${user_id} and friend_id=${friend_id}`
            let reqult2 = await con.query(sql2).catch((err) => {
                return cb({ isError: true, errMsg: 'ERROR1005' })
            })
            return cb({ isShield: false })
        }
        let sql = `insert into user_Shield (user_id,friend_id) values (${user_id},${friend_id})`
        let result = await con.query(sql).catch((err) => {
            return cb({ isError: true, errMsg: 'ERROR1005' })
        })
        return cb({ isShield: true })
    },
    // 查询是否被屏蔽
    sltShield: async(obj, cb) => {
        let { user_id, friend_id } = obj
        let sql = `select * from user_Shield where user_id = ${user_id} and friend_id = ${friend_id}`
        let result = await con.query(sql).catch((err) => {
            throw (err)
        })
        if (result.length == 0) {
            return false
        } else {
            return true
        }
    }
}