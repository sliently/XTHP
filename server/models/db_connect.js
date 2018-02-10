const host = require('../config/cr-config').host,
    user = require('../config/cr-config').user,
    psw = require('../config/cr-config').password,
    database = require('../config/cr-config').database
let mysql = require('promise-mysql');
let pool = mysql.createPool({
    host: host,
    user: user,
    password: psw,
    database: database,
    connectionLimit: 10
})
const mysqlConnect = {
    // 数据库连接
    connect: async function() {
        return await pool.getConnection().catch(function(err) {
            console.log("数据库连接失败")
        });
    },
    query: function(sql) {
        return new Promise(async(resolve, reject) => {
            let conn = await this.connect()
            let result = await conn.query(sql).catch((err) => {
                reject(err)
            })
            conn.destroy()
            resolve(result)
        })
    }
}

module.exports = mysqlConnect