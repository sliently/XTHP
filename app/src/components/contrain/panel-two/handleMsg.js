export default async function(obj) {
    let { message, type } = obj
    let self = this.$store.state.self
    let fromUser = {
        User_id: self.User_id,
        UserAvatar: self.UserAvatar,
        UserName: self.UserName
    }
    let msg = message
    let ZeroHour = randomZero(8)
    if (type == 1) {
        let fr = new FileReader()
        fr.readAsDataURL(message.file);
        fr.onload = (e) => {
            message = e.target.result
            let data = {
                fromUser,
                message,
                type,
                time: "无",
                _id: null,
                ZeroHour
            }
            this.$store.commit('addHistory', { info: data })
            this.$store.dispatch('sendMessage', { message: msg, type, ZeroHour, that: this })
        }
        return
    }
    if (type == 2) {
        message = {
            fileName: message.fileName,
            fileSize: message.fileSize,
            src: '#'
        }
        message = JSON.stringify(message)
    }
    let data = {
        fromUser,
        message,
        type,
        time: "time",
        _id: null,
        ZeroHour
    }
    this.$store.commit('addHistory', { info: data })
    this.$store.dispatch('sendMessage', { message: msg, type, ZeroHour, that: this })
    return ZeroHour
}

function randomZero(x) {
    let one = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let ran = ""
    for (let i = 0; i < x; i++) {
        let y = Math.floor(Math.random() * 10)
        ran += one[y]
    }
    return ran
}