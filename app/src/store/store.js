import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import getters from './getter'
import actions from './action'
// 注册vuex
Vue.use(Vuex)
let state = {
    // 弹出框属性
    Toast: {
        toast: false,
        msg: ""
    },
    toastTimer: null,
    user_token: null,
    // 数据是否获取 暂时设置为true
    isAjax: false,
    isNewMsg: false,
    isMsgPerson: false,
    // 屏蔽对象页
    sltShield: false,
    // 无更多消息弹出框
    toast: false,
    // 信息页是否显示
    personIndex: false,
    // 显示用户好友
    panePerson: false,
    // 创建群组
    newGroup: false,
    // 显示设置
    setUp: false,
    // zz设置通知
    setUpNotice: false,
    //rightAside显示
    rightIndex: false,
    // 群组信息显示
    rightMessage: false,
    // 群组用户显示
    rightUser: false,
    // 邀请链接页面
    rightInvite: false,
    // 移动端显示消息列表
    historyMessage: false,
    // 用户信息
    self: {
        User_id: null,
        UserAvatar: null,
        UserName: null,
        UserSlogan: null
    },
    //临时聊天信息列表
    dialogue: [
        //     {
        //     User_id: 12,
        //     UserAvatar: "/static/image/12.png",
        //     UserName: "hhh",
        //     // 最后一条对话消息
        //     UserDialogue: {
        //         time: '4点下午',
        //         message: "很对"
        //     },
        //     // 几条未读消息
        //     unread: 12
        // }
    ],
    // 聊天记录
    messageList: [],
    // 用户群组
    group: {
        Group_id: null,
        GroupAvatar: null,
        GroupName: null,
        GroupTime: null,
        GroupNotice: null,
        GroupAdmin: null,
        GroupNotice: null,
        invite: null,
        sltShield: null
    },
    // 当前聊天信息
    msgPerson: {
        msgAvatar: null,
        msgName: null,
        room_id: null,
        msg_id: null,
        num: 0
    },
    onLine: [],
    // 储存被屏蔽的用户
    user_Shield: []
}
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})