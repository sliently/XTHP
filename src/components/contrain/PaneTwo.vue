<template>
  <div :class="{'pane-two':!rightMessage || !rightUser,'pane-three':rightMessage || rightUser}">
      <my-header></my-header>
      <my-message-his></my-message-his>
      <my-send-message></my-send-message>
  </div>
</template>
<script>
import MyHeader from './panel-two/header'
import MyMessageHis from './panel-two/MessageHis'
import MySendMessage from './panel-two/sendMessage'
import {mapState,mapMutations} from 'vuex'
export default {
  name:'paneTwo',
  computed:{
    ...mapState(['rightMessage','rightUser'])
  },
  components:{
    MyHeader,
    MySendMessage,
    MyMessageHis
  }
}
</script>
<style lang="less" scoped>
.pane-two,.pane-three{
    position: relative;
    width: 60%;
    height: 100%;
    background-color: #e5ddd5;
}
@media screen and (max-width:648px){
  .pane-two{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 21;
  }
}
@media screen and (min-width:1025px){
  .pane-two{
    width: 70%;
  }
  .pane-three{
    width: 40%;
  }
}
@media screen and (min-width:1440px){
  .pane-two{
    width: 75%;
  }
  .pane-three{
    width: 50%;
  }
}
</style>

