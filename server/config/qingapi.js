const axios = require('axios');
module.exports = async (msg) => {
    let message = await axios.get('http://api.qingyunke.com/api.php', {
        params: {
            key: 'free',
            appid: 0,
            msg: msg
        }
    })
    return message.data.content
}
