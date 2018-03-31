<template>
  <div class="main">
      <my-picture v-if="isImgBig" :src="ImgBig.src" :avatar="ImgBig.avatar" @close="closeImgBig"></my-picture>
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
import MyPicture from '@/components/common/Picture'
export default {
  name:'Mains',
  components:{
      MyContrain,MyPicture
  },
  data(){
    return{
      iNoity:null,
      voice:false
    }
  },
  computed:{
    ...mapState(['msgPerson','Toast','isImgBig','ImgBig'])
  },
  created(){
    console.log(this.$options)
      let isVoice = this.$cookies.get('isVoice')
      let isNoity = this.$cookies.get('isNoity')
      if(isNoity==null){
        this.$cookies.set('isNoity','true')
      }
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
    this.$socket.on('connect',()=>{
      this.con_socket()
    })
    this.$socket.on('newMessage',(info)=>{
      this.newMessage_socket(info)
    })
    this.$socket.on('withdraw',(info)=>{
      this.withdraw_socket(info)
    })
  },
  methods:{
    ...mapMutations(['setUserToken','closeImgBig']),
    ...mapActions(['getUserInfo','getTemporary','initRoom']),
    changeVoice(val){
      this.voice = false
      this.$cookies.set('isVoice',val)
    },
    con_socket(){
      let token = this.$cookies.get('user')
      this.setUserToken(token)
      this.getUserInfo(this)
      this.getTemporary(this)
      // // 初始化房间列表
      this.initRoom(this)
    },
    newMessage_socket(info){
      // 是否有声音
      let isVoice = this.$cookies.get('isVoice')
      if(isVoice && isVoice==='true'){
        this.iNoity.player()
      }
      // 是否有桌面提示
      let isNoity = this.$cookies.get('isNoity')
      if(isNoity && isNoity==='true'){
        // 是否显示消息
        let isPreview = this.$cookies.get('isPreview')
        let message = (isPreview && isPreview ==='true')?info.msg.message:'您收到一条新消息'
        try {
          this.iNoity.notify({
            icon:info.msg.fromUser.UserAvatar,
            body:message,
            title:info.msg.fromUser.UserName,
            onclick:function(e){
              window.open('https://haiping313.cn')
            }
          })
        } catch (error) {
          console.log("不支持")
        }
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
          this.$store.commit('addHistory', {info:info.msg})
        }
        if(this.msgPerson.msg_id==null && this.msgPerson.room_id==info.msg.toUser.Group_id){
          this.$store.commit('addHistory', {info:info.msg})
        }
    },
    withdraw_socket(info){
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
  }
  }
}
</script>
<style lang="less">
.main{
  width: 100%;
  height: 100%;
  background-image: url('https://lhp313-1253555032.coscd.myqcloud.com/static/mainBc.jpg');
  background-size: cover;
}
</style>
