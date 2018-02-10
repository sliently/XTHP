module.exports = {
    lastLogin: function() {
        let date = new Date()
        let Y = date.getFullYear(),
            M = date.getMonth(),
            D = date.getDate(),
            h = date.getHours(),
            m = date.getMinutes()
        let time = `last login ${M+1}/${D}/${Y} ${h}:${m}`
        return time
    }
}