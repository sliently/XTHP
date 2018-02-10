<template>
  <div class="pane-right">
      <transition name="bounce" mode="out-in">
          <my-right-index v-if="rightMessage"></my-right-index>
          <my-right-user v-if="rightUser"></my-right-user>
          <my-invite-msg v-if="rightInvite"></my-invite-msg>
      </transition>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import MyRightIndex from './paneRight/rightIndex'
import MyRightUser from './paneRight/rightUser'
import MyInviteMsg from './paneRight/invite'
export default {
  name:'paneRight',
  components:{
      MyRightIndex,
      MyRightUser,
      MyInviteMsg
  },
  computed:{
      ...mapState(['rightIndex','rightMessage','rightUser','rightInvite'])
  },
  methods:{
      ...mapMutations(['showRightIndex','showRightUser','closeRightIndex'])
  }
}
</script>
<style lang="less" scoped>
.pane-right{
    position: relative;
    width: 60%;
    height: 100%;
    display: inline-block;
    font-size: 0;
      .manager{
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        pointer-events: auto;
        width: 100%;
        height: 100%;
        background: #f5f5f5;
        font-size: 14px;
        color: #000;
    }
}
.bounce-enter-active {
  animation: bounce-in .1s;
}
.bounce-leave-active {
  animation: bounce-in .1s reverse;
}
  @keyframes bounce-in {
    0% {
        left: 60%;
    }
    100% {
        left: 0;
    }
}
@media screen and (max-width: 648px){
.pane-right{
    width: 100%;
  }
    @keyframes bounce-in {
    0% {
        left: 100%;
    }
    100% {
        left: 0;
    }
}
}
@media screen and (min-width: 1025px){
  .pane-right{
    width: 30%;
  }
    @keyframes bounce-in {
    0% {
        left: 30%;
    }
    100% {
        left: 0;
    }
}
}
@media screen and (min-width: 1440px){
  .pane-right{
    width: 25%;
  }
    @keyframes bounce-in {
    0% {
        left: 25%;
    }
    100% {
        left: 0;
    }
}
}

</style>

