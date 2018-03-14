<template>
  <div :class="{'pane-two':!rightMessage || !rightUser || !rightInvite,'pane-three':rightMessage || rightUser || rightInvite}">
      <div v-show="this.$store.state.msgPerson.msgName" style="width:100%;height:100%;">
        <my-header></my-header>
        <my-message-his></my-message-his>
        <my-send-message></my-send-message>
      </div>
      <div class="one" @click="showHistoryMessage" v-show="!this.$store.state.msgPerson.msgName">
        <div class="one-img" >
          <img src="https://lhp313-1253555032.coscd.myqcloud.com/static/11111.jpg">
          <p>赶紧选择群聊</p>
        </div>
      </div>
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
    ...mapState(['rightMessage','rightUser','rightInvite'])
  },
  components:{
    MyHeader,
    MySendMessage,
    MyMessageHis
  },
  methods:{
    ...mapMutations(['showHistoryMessage'])
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
.one{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  .one-img{
    width: 60%;
    height: auto;
    text-align: center;
    img{
      width: 100%;
      max-width: 300px;
    }
  }
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

