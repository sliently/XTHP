const mutations = {
    // 显示个人信息页
    showPersonIndex: (state) => {
        state.personIndex = !state.personIndex
    },
    // 展示群组信息或者个人信息页
    showRightIndex: (state) => {
        state.rightUser = false
        state.rightMessage = true

    },
    // 展示群组联系人
    showRightUser: (state) => {
        state.rightMessage = false
        state.rightUser = true
    },
    closeRightIndex: (state) => {
        state.rightMessage = false
        state.rightUser = false
    },
    // 移动端显示消息列表
    showHistoryMessage: (state) => {
        state.historyMessage = !state.historyMessage
    }
}
export default mutations