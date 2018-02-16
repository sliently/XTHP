<template>
  <div class="pane-left">
      <transition name="bounce" mode="out-in">
          <!-- 个人信息 -->
        <div v-if="personIndex" key="personIndex" class="manager">
            <my-person-index></my-person-index>
        </div>
        <!-- 搜索朋友 -->
        <div v-if="panePerson" class="manager">
            <my-pane-person></my-pane-person>
        </div>
        <!-- 新建群组 -->
        <div v-if="newGroup" class="manager">
            <my-new-group></my-new-group>
        </div>
        <!-- 设置 -->
        <div v-if="setUp" key="setUp" class="manager">
            <my-set-up></my-set-up>
        </div>
        <!-- 设置通知 -->
        <div v-if="setUpNotice" class="manager">
            <my-set-up-notice></my-set-up-notice>
        </div>
      </transition>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import MyPersonIndex from './personIndex/personIndex'
import MyPanePerson from './panePerson/panePerson'
import MyNewGroup from './newGroup/newGroup'
import MySetUp from './setUp/setup'
import MySetUpNotice from './setUp/notive'
export default {
  name:"paneLeft",
  components:{
      MyPersonIndex,
      MyPanePerson,
      MyNewGroup,
      MySetUp,
      MySetUpNotice
  },
  computed:{
      ...mapState(['personIndex',"panePerson","newGroup",'setUp','setUpNotice'])
  },
  methods:{
      ...mapMutations(['showPersonIndex','showPanePerson'])
  }
}
</script>
<style lang="less" scoped>
.bounce-enter-active {
  animation: bounce-in .1s;
}
.bounce-leave-active {
  animation: bounce-in .1s reverse;
}
.pane-left{
    position: relative;
    top: 0;
    width: 40%;
    height: 100%;
    display: inline-block;
    .manager{
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        pointer-events: auto;
        width: 100%;
        height: 100%;
        background: #f7f7f7;
    }
}
  @keyframes bounce-in {
    0% {
        left: -40%;
    }
    100% {
        left: 0;
    }
}
@media screen and (max-width:648px){
  .pane-left{
      position: absolute;
    width: 100%;
  }
    @keyframes bounce-in {
    0% {
        left: -100%;
    }
    100% {
        left: 0;
    }
}
}
@media screen and (min-width:1025px){
  .pane-left{
    width: 30%;
  }
    @keyframes bounce-in {
    0% {
        left: -30%;
    }
    100% {
        left: 0;
    }
}
}
@media screen and (min-width:1440px){
  .pane-left{
    width: 25%;
  }
  @keyframes bounce-in {
    0% {
        opacity: 0;
        left: -25%;
    }
    100% {
        opacity: 1;
        left: 0;
    }
}
}
</style>

