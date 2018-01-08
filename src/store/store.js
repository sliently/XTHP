import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import getters from './getter'
import actions from './action'
// 注册vuex
Vue.use(Vuex)
let state = {
    // 数据是否获取 暂时设置为true
    ifAjax: true,
    // 信息页是否显示
    personIndex: false,
    //rightAside显示
    rightIndex: false,
    // 群组信息显示
    rightMessage: false,
    // 群组用户显示
    rightUser: false,
    // 移动端显示消息列表
    historyMessage: false,
    // 用户信息
    self: {
        UserAvatar: "/static/image/11.jpg",
        UserName: "LHP",
        UserSlogan: "我是最棒的",
        UserDialogue: {

        }
    },
    // 用户群组
    group: {
        GroupAvatar: "/static/image/12.jpg",
        GroupName: "THPX",
        GroupTime: "创建于12/12/2017",
        GroupFriend: {},
        GroupNotice: "公告是。。。。"
    }
}
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})