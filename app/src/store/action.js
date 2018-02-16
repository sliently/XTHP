import Vue from 'vue'
import userAgent from '../common/js/user-agent'
const actions = {
    getUserInfo: ({ state, commit }, that) => {
        let Agent = userAgent()
        let datas = { Agent, data: state.user_token }
        that.$socket.emit('initUserInfo', datas, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            commit('setUserInfo', info.UserInfo)
            return
        })
    },
    // 获取在线人数
    getOneLine: ({ state, commit }, that) => {
        that.$socket.emit('getOneLine', state.user_token, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            commit('setOnLine', info.onLine)
            return
        })
    },
    addTemporary: ({ state, commit }, obj) => {
        let { user_id, that } = obj
        let data = {
            user_id,
            token: state.user_token
        }
        that.$socket.emit('addTemporary', data, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            commit('setTemporary', info.Temporary)
            return
        })
    },
    // 获取当前用户临时聊天
    getTemporary: ({ state, commit }, that) => {
        that.$socket.emit('getTemporary', state.user_token, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            commit('setTemporary', info.Temporary)
            return
        })
    },
    getHistory: ({ state, commit }, that) => {
        that.$socket.emit('getHistory', state.msgPerson, state.user_token, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            commit('setAjax', false)
            commit('setNewMsg', false)
            if (info.num == 0) {
                commit('showToast')
                if (state.messageList.length !== 0) {
                    commit('setHistory', [])
                }
                return
            }
            commit('setHistory', info.history)
            return
        })
    },
    // 初始化房间
    initRoom: ({ state }, that) => {
        that.$socket.emit('initRoom', state.user_token, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            return
        })
    },
    // 修改头像
    inputImage: ({ state, commit }, obj) => {
        let { that, file } = obj
        that.$socket.emit('fileImage', file, state.user_token, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            commit('setUserInfo', info.UserInfo)
            return
        })
    },
    // 修改个人系列
    changeUser: ({ state, commit }, obj) => {
        let { isName, that, message } = obj
        that.$socket.emit('changeUser', { isName: isName, message: message, token: state.user_token }, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            commit('setUserInfo', info.UserInfo)
            return
        })
    },
    // 修改头像
    groupImg: ({ state, commit }, obj) => {
        let { that, file } = obj
        that.$socket.emit('groupImg', { file, group_id: state.group.Group_id }, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            commit("setGroup", info.group[0])
            return
        })
    },
    // 修改群组系列
    changeNotice: ({ state, commit }, obj) => {
        let { isNoticeName, that, msg } = obj
        that.$socket.emit('changeGroup', { isNoticeName, msg, _id: state.group.Group_id }, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
        })
    },
    // 发送信息
    sendMessage: ({ state, commit }, obj) => {
        let { message, type, ZeroHour, that } = obj
        that.$socket.emit('sendMessage', { UserObj: state.msgPerson, message: message, type: type, token: state.user_token }, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            commit('updateTemporary', { info, is: false, to: true })
            commit('addHistory', { info: info.msg, ZeroHour })
            return
        })
    },
    createGroup: ({ state, commit }, obj) => {
        let { groupName, that } = obj
        that.$socket.emit('createGroup', { groupName: groupName, token: state.user_token }, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            commit('setTemporary', info.Temporary)
            commit('showNewGroup')
            return
        })
    },
    getGroup: ({ state, commit }, obj) => {
        let { that } = obj
        let data = {
            group_id: state.msgPerson.room_id,
            msg_id: state.msgPerson.msg_id,
            token: state.user_token
        }
        that.$socket.emit('getGroup', data, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            commit("setGroup", info.group[0])
            commit('setGroupAjax', false)
            return
        })
    },
    updateLink: ({ state, commit }, obj) => {
        let { that } = obj
        let data = {
            Group_id: state.group.Group_id,
            GroupAdmin: state.group.GroupAdmin,
        }
        that.$socket.emit('updateLink', data, (info) => {
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            commit("setGroup", info.group[0])
            commit("showToasts", { toast: true, msg: "更新成功" })
            commit('setGroupAjax', false)
            return
        })
    },
    // 退出聊天
    deleteMsg: ({ state, commit }, that) => {
            let data = {
                token: state.user_token,
                msg_id: state.msgPerson
            }
            that.$socket.emit('deleteMsg', data, (info) => {
                if (info.isError) {
                    console.log(info.errMsg)
                    return
                }
                commit('deleteMsgPerson')
                commit('setTemporary', info.Temporary)
                return
            })
        }
        // socket_newMessage: ({ commit }, info) => {
        //     if (info.isError) {
        //         console.log(info.errMsg)
        //         return
        //     }
        //     commit('addHistory', info.msg)
        //         // commit('setTemporary', info.Temporary)

    // }
}
export default actions