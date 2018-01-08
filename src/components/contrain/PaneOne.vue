<template>
  <div id="rightMobile" class="pane-one">
    <!-- 头部 -->
    <my-header></my-header>
    <my-message-list></my-message-list>
  </div>
</template>
<script>
import MyHeader from './panel-one/header'
import MyMessageList from '@/components/common/messageList'
import {mapState,mapMutations} from 'vuex'
export default {
  name:"paneOne",
  data(){
    return {
      clientWidths:0
    }
  },
  computed:{
    ...mapState(['historyMessage'])
  },
  components:{
    MyHeader,
    MyMessageList
  },
  watch:{
    'historyMessage':(newVal,oldVal)=>{
      if(newVal){
        document.getElementById("rightMobile").classList.add('pane-one-show');
      }else{
        document.getElementById("rightMobile").classList.remove('pane-one-show');
      }
    }
  }
}
</script>
<style lang="less" scoped>
.pane-one{
    position: relative;
    width: 40%;
    height: 100%;
    background-color: #fff;
}
@media screen and (max-width:648px){
  .pane-one{
    width: 100%;
    right: 100%;
    z-index: 22;
    transition: right .1s;
  }
  .pane-one-show{
    right: 0;
  }
}
@media screen and (min-width:1025px){
  .pane-one{
    width: 30%;
  }
}
@media screen and (min-width:1440px){
  .pane-one{
    width: 25%;
  }
}
</style>

