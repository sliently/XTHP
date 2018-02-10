<template>
  <div class="history">
    <my-dialog-one ref="list"></my-dialog-one>
    <my-back-bottom :scrollRef="scrollRef" :height="comScrollHeight" :durations="200"></my-back-bottom>
  </div>
</template>
<script>
import MyDialogOne from './messageHistory/dialogOne'
import MyBackBottom from '../../common/backBottom'
export default {
  name:'historys',
  data(){
    return {
      height:10
    }
  },
  components:{
    MyDialogOne,
    MyBackBottom
  },
  methods:{
    scrollRef(){
      return this.$refs.list.$refs.dd
    },
    comScrollHeight(){
      return this.$refs.list.$refs.scroll.scrollHeight - this.$refs.list.$refs.dd.offsetHeight
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

