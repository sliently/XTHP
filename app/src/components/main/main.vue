<template>
  <div class="main">
      <my-contrain></my-contrain>
  </div>
</template>
<script>
import MyContrain from '@/components/contrain/contrain'
import {mapMutations,mapActions,mapState} from 'vuex'
import favico from './favico'
export default {
  name:'Mains',
  components:{
      MyContrain
  },
  computed:{
    ...mapState(['msgPerson','Toast'])
  },
  mounted(){
    let token = this.$cookies.get('user')
    this.setUserToken(token)
    this.getUserInfo(this)
    this.getTemporary(this)
    // // 初始化房间列表
    this.initRoom(this)
    favico.resetWhenDocVisibility()
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
}
  },
  methods:{
    ...mapMutations(['setUserToken']),
    ...mapActions(['getUserInfo','getTemporary','initRoom'])
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
