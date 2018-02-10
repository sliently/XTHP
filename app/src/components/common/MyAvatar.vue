<template>
    <div class="user-avatar">
        <div style="width:200px;margin:0 auto;">
            <transition appear name="bounce">
                <mu-avatar :size="200" :src="srcAvatar">
                    <slot></slot>
                </mu-avatar>
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
      },
      showInput:{
          type:Function,
          default:function(){return}
      }
  },
  methods:{
  }
}
</script>
<style lang="less">
.user-avatar{
    position: relative;
    width: 100%;
    height: 240px;
    padding: 14px 0 10px 0;
    .mu-avatar{
        font-size: 10px;
        &:hover .show{
            display: block;
        }
        .show{
            z-index: 20;
            display:none;
            cursor:pointer;
            border-radius:50%;
            padding:68px;
            width:200px;
            height:200px;
            position:absolute;
            top:14px;
            background:rgba(0,0,0,.31);
        }
    }
    
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
