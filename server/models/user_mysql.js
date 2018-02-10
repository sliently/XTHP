const con = require('./db_connect')
module.exports = {
    // 查询是否有该邮箱
    selectEmail: async function(email) {
        // 等待数据库连接成功
        let sql = `select * from user where UserEmail = '${email}'`
        let result = await con.query(sql).catch((err) => {
            // 查询失败
            console.log("查询失败")
        })
        if (result.length == 0) {
            return false
        }
        return true
    },
    // 查询是否有该用户名
    selectUsername: async(UserName) => {
        let sql = `select * from user where UserName = '${UserName}'`
        let result = await con.query(sql).catch((err) => {
            // 查询失败
            console.log("查询失败")
        })
        if (result.length == 0) {
            return false
        }
        return true
    },
    // 查询朋友资料
    msgFriend: async(info) => {
        let sql = `select User_id,UserAvatar,UserName,UserSlogan,lastLogin from user where User_id = ${info}`
        let result = await con.query(sql).catch((err) => {
            console.log("查询失败")
        })
        return result
    },
    // 查询群组资料
    msgRoom: async(info) => {
        let sql = `select * from groups where Group_id = ${info}`
        let result = await con.query(sql).catch((err) => {
            console.log("查询失败")
        })
        return result
    },
    // 创建新用户
    create: async(info) => {
        let { password, email, nickname } = info
        let sql = `insert into user (UserName,UserPassword,UserEmail) values ('${nickname}','${password}','${email}')`
        let result = await con.query(sql).catch((err) => {
            // 查询失败
            console.log("查询失败")
        })
        return result
    },
    // 验证密码是否正确
    isLogin: async(info) => {
        let { password, email } = info
        let sql = `select * from user where UserPassword = '${password}' and UserEmail = '${email}'`
        let result = await con.query(sql).catch((err) => {
            console.log("查询失败")
        })
        if (result.length == 0) {
            return false
        }
        return result
    },
    // 获取所有聊天
    sltTemporary: async(info) => {
        let { user, User_email } = info
        let sql = `select * from Temporary where User_id='${user}'`
        let result = await con.query(sql).catch((err) => {
            console.log("查询失败1")
        })
        if (result.length == 0) {
            return false
        }
        return result
    },
    // 获取个人聊天
    psTemporary: async(info) => {
        let { user, UserFriend_id } = info
        let sql = `SELECT User_id,UserName,UserAvatar from user where User_id=${UserFriend_id}`
        let result = await con.query(sql).catch((err) => {
            console.log("查询失败2")
        })
        if (result.length == 0) {
            return false
        }
        let sql2
        if (user == UserFriend_id) {
            sql2 = `SELECT message,time FROM user_message where From_id = ${user} and To_id = ${UserFriend_id} order by message_id desc limit 0,1`
        } else {
            sql2 = `SELECT message,time FROM (SELECT * from user_message where From_id = ${user} or To_id = ${user}) t
            WHERE From_id = ${result[0].User_id} or To_id = ${result[0].User_id} order by message_id desc limit 0,1`
        }
        let result2 = await con.query(sql2).catch((err) => {
            // 查询失败
            console.log("查询失败1")
        })
        return {...result[0], ...result2[0] }
    },
    // 获取房间聊天
    roomTemporary: async(info) => {
        let { user, UserRoom_id } = info
        let sql = `SELECT * from groups where Group_id=${UserRoom_id}`
        let result = await con.query(sql).catch((err) => {
            console.log("查询失败")
        })
        let sql2 = `SELECT message,time from group_message where group_id = ${UserRoom_id} order by groupMessage_id desc limit 0,1`
        let result2 = await con.query(sql2).catch((err) => {
            // 查询失败
            console.log("查询失败")
        })
        let msg = {}
        msg.UserAvatar = result[0].GroupAvatar
        msg.UserName = result[0].GroupName
        msg.room_id = result[0].Group_id
        return {...result2[0], ...msg }
    }
}