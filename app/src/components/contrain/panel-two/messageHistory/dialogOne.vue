<template>
<div class="message-list" ref="dd">
     <mu-refresh-control :refreshing="isNewMsg || isAjax" :trigger="trigger" @refresh="getMany"/>    
    <mu-toast v-show="toast" message="无更多消息" @close="$store.commit('hideToast')"/>
    <div v-show="!isAjax" class="message-item" ref="scroll">
        <div style="width:100%;height:40px;padding:10px 0;">
            <div v-show="!isNewMsg" class="getMany" @click="getMany">更多消息</div>
        </div>
        <template v-for="(item,index) in handleMessage">
            <my-msg-menu ref="msg" :item="item"></my-msg-menu>
        </template>
    </div>
</div>
</template>
<script>
import {mapGetters, mapState} from 'vuex'
import MyMsgMenu from './message-menu'
export default {
  name:'dialogOne',
  components:{
      MyMsgMenu
  },
  computed:{
      ...mapGetters(['handleMessage']),
      ...mapState(['isAjax','isNewMsg','toast']),
  },
  mounted(){
    this.trigger = this.$el
  },
  data(){
      return {
        handle:[],
        trigger:null,
        current:null,
        open:true
      }
  },
  methods:{
      scrollTo(){
        if(this.current == null){
            this.$refs.dd.scrollTop = this.$refs.scroll.scrollHeight
            return
        }
        this.$refs.dd.scrollTop = this.$refs.scroll.scrollHeight-this.current
        this.current = null
        return
      },
      getMany(){
            this.$store.commit('setNewMsg', true)
            this.current = this.$refs.scroll.scrollHeight
            this.$store.commit('setNum')
            this.$store.dispatch('getHistory',this)
      }
  },
  watch:{
      handleMessage(val,oldVal){
        setTimeout(() => {
           this.scrollTo()
        }, 20)
      }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../../common/mixin.less');
.message-list{
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 3;
        // 滚动条样式
    &::-webkit-scrollbar {//滚动条的宽度
        .scrollbar
    }
    &::-webkit-scrollbar-thumb {
        .scrollbar-thumb
    }
    .message-item{
        position: relative;
        .getMany{
            margin: 0 auto;
           width:80px;
           height:30px;
           padding:5px;
           border-radius:5px;
           background:#cccccc;
           color: #fff;
           font-size: 10px;
           text-align: center;
           cursor: pointer;
        }
    }
    
}
        
</style>
