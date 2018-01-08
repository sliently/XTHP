<template>
  <div class="pane-left">
      <transition name="bounce">
        <div v-if="personIndex" class="manager">
            <my-person-index></my-person-index>
        </div>
      </transition>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import MyPersonIndex from './personIndex/personIndex'
export default {
  name:"paneLeft",
  components:{
      MyPersonIndex
  },
  computed:{
      ...mapState(['personIndex'])
  },
  methods:{
      ...mapMutations(['showPersonIndex'])
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

