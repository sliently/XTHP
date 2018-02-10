const getters = {
    // 处理聊天记录
    handleMessage: (state) => {
        let listRow = []
        state.messageList.forEach((item, index, arr) => {
            let { _id, fromUser, toUser, message, time, type } = item
            let self = state.self
            let list = {}
            list.message = message
            list.time = time
            list.type = type
            list._id = _id
            if (fromUser.User_id == self.User_id) {
                list.UserAvatar = self.UserAvatar
                list.UserAvatarSlot = 'order:2;'
                list.UserIconSlot = 'more-right'
                list.UserName = self.UserName
                list.UserNameSlot = 'text-align:right'

            } else {
                list.UserAvatar = fromUser.UserAvatar
                list.UserAvatarSlot = ''
                list.UserName = fromUser.UserName
                list.UserNameSlot = 'text-align:left'
                list.UserIconSlot = 'more-left'
            }
            listRow.push(list)
        })
        return listRow
    }
}
export default getters