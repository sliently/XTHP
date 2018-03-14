const mutations = {
    //弹出框
    showToasts: (state, info) => {
        state.Toast = info
        if (state.toastTimer) clearTimeout(state.toastTimer)
        state.toastTimer = setTimeout(() => { state.Toast.toast = false }, 2000)
    },
    hideToasts: (state) => {
        state.Toast.toast = false
        if (state.toastTimer) clearTimeout(state.toastTimer)
    },
    // 获取token并且设置
    setUserToken: (state, token) => {
        state.user_token = token
    },
    // 退出并清除token
    deleteUserToken: (state) => {
        state.user_token = null
    },
    // 数据获取手否成功
    setAjax: (state, info) => {
        state.isAjax = info
    },
    setNewMsg: (state, info) => {
        state.isNewMsg = info
    },
    setGroupAjax: (state, info) => {
        state.isMsgPerson = info
    },
    setUserInfo: (state, info) => {
        state.self.User_id = info.User_id
        state.self.UserAvatar = info.UserAvatar
        state.self.UserName = info.UserName
        state.self.UserSlogan = info.UserSlogan
    },
    // 设置聊天列表
    setTemporary: (state, info) => {
        state.dialogue = []
        info.forEach((item, index, arr) => {
            item.unread = 0
            state.dialogue.push(item)
        })
    },
    // 关闭图片
    closeImgBig: (state, info) => {
        state.isImgBig = false
    },
    showImgBig: (state, info) => {
        state.ImgBig.src = info.src
        state.ImgBig.avatar = info.avatar
        state.isImgBig = true
    },
    // 把未读消息设置为0
    unread: (state, info) => {
        state.dialogue.forEach((item, index) => {
            if (typeof item.User_id == 'undefined' && info.room_id == item.room_id) {
                item.unread = 0
            }
            if (typeof item.room_id == 'undefined' && info.User_id == item.User_id) {
                item.unread = 0
            }
        })
    },
    updateTemporary: (state, { info, is, to }) => {
        state.dialogue.forEach((item, index, arr) => {
            if (info.msg.toUser.Group_id) {
                if (item.room_id && info.msg.toUser.Group_id == item.room_id) {
                    item.message = info.msg.message
                    item.time = info.msg.time
                    if (is) {
                        item.unread++
                    }
                }
            } else {
                if (to) {
                    if (item.User_id && info.msg.toUser.User_id == item.User_id) {
                        item.message = info.msg.message
                        item.time = info.msg.time
                        if (is) {
                            item.unread++
                        }
                    }
                } else {
                    if (item.User_id && info.msg.fromUser.User_id == item.User_id) {
                        item.message = info.msg.message
                        item.time = info.msg.time
                        if (is) {
                            item.unread++
                        }
                    }
                }
            }
        })
    },
    setMsgPerson: (state, info) => {
        state.msgPerson.num = 0
        state.msgPerson.msgAvatar = info.UserAvatar
        state.msgPerson.msgName = info.UserName
        if (info.User_id == null) {
            state.msgPerson.msg_id = null
            state.msgPerson.room_id = info.room_id
        } else {
            state.msgPerson.room_id = null
            state.msgPerson.msg_id = info.User_id
        }
    },
    deleteMsgPerson: (state) => {
        state.msgPerson = {
            msgAvatar: null,
            msgName: null,
            room_id: null,
            msg_id: null,
            num: 0
        }
    },
    setNum: (state) => {
        state.msgPerson.num++
    },
    // 设置历史记录
    setHistory: (state, info) => {
        if (state.msgPerson.num == 0) {
            state.messageList = info.reverse()
            return
        }
        info.forEach((item, index, arr) => {
            state.messageList.unshift(item)
        })

    },
    addHistory: (state, { info, ZeroHour }) => {
        if (!ZeroHour) {
            state.messageList.push(info)
            return
        }
        state.messageList.forEach((item, index, arr) => {
            if (item.ZeroHour && item.ZeroHour === ZeroHour) {
                arr.splice(index, 1, info)
                return
            }
        })
    },
    deleteDialogue: (state, info) => {
        state.dialogue.forEach((item, index, arr) => {
            if (info.user_id && item.User_id == info.user_id) {
                item.message = "开始对话"
                if (item.unread !== 0) {
                    item.unread--
                }
                return false
            }
            if (info.room_id && item.room_id == info.room_id) {
                delete item.message
                if (item.unread !== 0) {
                    item.unread--
                }
                return false
            }
        })
    },
    deleteHistory: (state, info) => {
        state.messageList.forEach((item, index, arr) => {
            if (item._id == info._id) {
                arr.splice(index, 1)
                return false
            }
        })
    },
    // 显示个人信息页
    showPersonIndex: (state) => {
        state.setUp = false
        state.personIndex = !state.personIndex
    },
    showPanePerson: (state) => {
        state.panePerson = !state.panePerson
    },
    // 创建群组显示页
    showNewGroup: (state) => {
        state.newGroup = !state.newGroup
    },
    // 创建群组显示页
    showSetUp: (state) => {
        state.setUp = !state.setUp
    },
    // 显示设置通知页面
    showSetUpNotice: (state) => {
        state.setUp = false
        state.setUpNotice = !state.setUpNotice
    },
    // 显示屏蔽页面
    showSltShield: (state) => {
        state.setUp = false
        state.sltShield = !state.sltShield
    },
    // 展示群组信息或者群组信息页
    showRightIndex: (state) => {
        state.rightInvite = false
        state.rightUser = false
        state.rightMessage = true
    },
    // 展示群组联系人
    showRightUser: (state) => {
        state.rightInvite = false
        state.rightMessage = false
        state.rightUser = true
    },
    showRightInvite: (state) => {
        state.rightMessage = false
        state.rightInvite = true
    },
    closeRightIndex: (state) => {
        state.rightInvite = false
        state.rightMessage = false
        state.rightUser = false
    },
    // 移动端显示消息列表
    showHistoryMessage: (state) => {
        state.historyMessage = !state.historyMessage
    },
    setGroup: (state, info) => {
        if (state.msgPerson.msg_id == null) {
            state.group.Group_id = info.Group_id
            state.group.GroupAvatar = info.GroupAvatar
            state.group.GroupName = info.GroupName
            state.group.GroupTime = info.GroupTime
            state.group.GroupAdmin = info.GroupAdmin
            state.group.GroupNotice = info.GroupNotice
            state.group.invite = info.invite
        }
        if (state.msgPerson.room_id == null) {
            state.group.Group_id = undefined
            state.group.GroupAvatar = info.UserAvatar
            state.group.GroupName = info.UserName
            state.group.GroupTime = info.lastLogin
            state.group.GroupAdmin = undefined
            state.group.GroupNotice = info.UserSlogan
            state.group.sltShield = info.sltShield
        }
    },
    // 设置屏蔽
    setSltShield: (state, info) => {
        state.group.sltShield = info
    },
    // 设置对话在线
    setOnLine: (state, info) => {
        state.onLine = info
    },
    setUser_Shield: (state, info) => {
        state.user_Shield = info
    },
    // 取消屏蔽
    deleteShield: (state, info) => {
        state.user_Shield.forEach((item, index, arr) => {
            if (item.User_id === info) {
                arr.splice(index, 1)
            }
        })
    }
}
export default mutations