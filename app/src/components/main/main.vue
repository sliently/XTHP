<template>
  <div class="main">
      <my-contrain></my-contrain>
        <mu-dialog :open="voice" title="提示音" @close="changeVoice('false')">
          打开提示音，再次更改到设置下
          <mu-flat-button slot="actions" @click="changeVoice('false')" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="changeVoice('true')" label="确定"/>
        </mu-dialog>
  </div>
</template>
<script>
import MyContrain from '@/components/contrain/contrain'
import {mapMutations,mapActions,mapState} from 'vuex'
import favico from './favico'
import iNoity from '../common/js/iNoity'
export default {
  name:'Mains',
  components:{
      MyContrain
  },
  data(){
    return{
      iNoity:null,
      voice:false
    }
  },
  computed:{
    ...mapState(['msgPerson','Toast'])
  },
  created(){
      let isVoice = this.$cookies.get('isVoice')
      if(!isVoice){
        this.voice = true
      }
  },
  mounted(){
    let token = this.$cookies.get('user')
    this.setUserToken(token)
    this.getUserInfo(this)
    this.getTemporary(this)
    // // 初始化房间列表
    this.initRoom(this)
    favico.resetWhenDocVisibility()
    this.iNoity = new iNoity({audio:'/static/music/iNoity.wav'})
  },
  sockets:{
    connect(){
      let token = this.$cookies.get('user')
      this.setUserToken(token)
      this.getUserInfo(this)
      this.getTemporary(this)
      // // 初始化房间列表
      this.initRoom(this)
    },
    newMessage(info){
      // 是否有声音
      let isVoice = this.$cookies.get('isVoice')
      if(isVoice && isVoice==='true'){
        this.iNoity.player()
      }
        if (document.hidden) {
            favico.addBage();
        }
        if (info.isError) {
            console.log(info.errMsg)
            return
        }
        if(info.Temporary === false ){
          this.$store.commit('updateTemporary', {info,is:true})
        }else{
          this.$store.commit('setTemporary', info.Temporary)
        }
        if(this.msgPerson.room_id==null && this.msgPerson.msg_id==info.msg.fromUser.User_id){
          this.$store.commit('addHistory', info.msg)
        }
        if(this.msgPerson.msg_id==null && this.msgPerson.room_id==info.msg.toUser.Group_id){
          this.$store.commit('addHistory', info.msg)
        }
    },
    withdraw(info){
      if (this.msgPerson.msg_id==null) {
        this.$store.commit('deleteDialogue', info)
          if (info.room_id && info.room_id ==this.msgPerson.room_id) {
            this.$store.commit('deleteHistory', info)
            this.$store.commit('showToasts', { toast: true, msg: "对方撤回一条消息" })
          }
      }
      if (this.msgPerson.room_id==null) {
        this.$store.commit('deleteDialogue', info)
          if (info.user_id && info.user_id == this.msgPerson.msg_id) {
            this.$store.commit('deleteHistory', info)
            this.$store.commit('showToasts', { toast: true, msg: "对方撤回一条消息" })
          }
      }
  },
  },
  methods:{
    ...mapMutations(['setUserToken']),
    ...mapActions(['getUserInfo','getTemporary','initRoom']),
    changeVoice(val){
      this.voice = false
      this.$cookies.set('isVoice',val)
    }
  }
}
</script>
<style lang="less">
.main{
  width: 100%;
  height: 100%;
  background-image: url('http://lhp313-1253555032.coscd.myqcloud.com/static/mainBc.jpg');
  background-size: cover;
}
</style>
