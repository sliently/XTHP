const nodemailer = require('nodemailer');
module.exports = function(id, text) {
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.163.com',
            port: 465, // SMTP 端口
            secureConnection: true, // 使用 SSL
            auth: {
                user: '15909423090@163.com',
                pass: 'liuhai79538235'
            }
        });
        let mailOptions = {
            from: '"15909423090@163.com', // sender address
            to: '15909423090@qq.com', // list of receivers
            subject: 'haiping313.cn用户提醒', // Subject line
            text: `${id}:${text}`, // plain text body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        // console.log('Message sent: %s', info.messageId);
        });
    });
}
