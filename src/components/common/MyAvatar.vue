<template>
    <div class="user-avatar">
        <div style="width:200px;margin:0 auto;">
            <transition appear name="bounce">
                <mu-avatar :size="200" :src="srcAvatar"/>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
  name:'MyAvatar',
  props:{
      srcAvatar:{
          type:String,
          default:""
      }
  }
}
</script>
<style lang="less" scoped>
.user-avatar{
    position: relative;
    width: 100%;
    height: 240px;
    padding: 14px 0 10px 0;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
