<template>
  <div class="history">
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
    <my-dialog-one></my-dialog-one>
  </div>
</template>
<script>
import MyDialogOne from './messageHistory/dialogOne'
export default {
  name:'historys',
  components:{
    MyDialogOne
  },
  data(){
    return {
      refreshing:false,
      trigger:null
    }
  },
  mounted () {
    this.trigger = this.$el
  },
  methods:{
    refresh(){
      this.refreshing = true
      this.refreshing = false
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../common/mixin.less');
.history{
  position: relative;
  overflow: auto;
  -webkit-overflow-scrolling : touch;
  width: 100%;
  height: calc(~"100% - 124px");
    // 滚动条样式
  &::-webkit-scrollbar {//滚动条的宽度
      .scrollbar
  }
  &::-webkit-scrollbar-thumb {
      .scrollbar-thumb
  }
}
</style>

