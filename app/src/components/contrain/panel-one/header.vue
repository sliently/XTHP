<template>
  <div class="Header">
    <mu-appbar :zDepth="0">
        <mu-avatar @click.native="showPersonIndex" style="margin-left:10px;cursor: pointer;" slot="left" :src="self.UserAvatar"/>
        <!-- <mu-icon-button icon="message" iconClass="Header-colors" slot="right"/> -->
        <mu-icon-button @click.native="getOnLine" icon="people" iconClass="Header-colors" slot="right"></mu-icon-button>
        <mu-icon-menu icon="more_vert" 
                    iconClass="Header-colors"
                    menuClass="header-menu"
                    style="color:#666;"
                    :anchorOrigin="{horizontal: 'right', vertical: 'top'}"
                    :targetOrigin="{horizontal: 'right', vertical: 'bottom'}" 
                    slot="right">
            <mu-menu-item title="创建群组" @click.native="showNewGroup" />
            <mu-menu-item title="用户资料" @click.native="showPersonIndex" />
            <mu-menu-item title="设置" @click.native="showSetUp"/>
            <mu-menu-item @click="exitUser" title="退出" />
        </mu-icon-menu>
        <mu-icon-button name="close" @click="showHistoryMessage" icon="close" iconClass="Header-colors" slot="right"/>
    </mu-appbar>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name:'HeaderOne',
  computed:{
      ...mapState(['self'])
  },
  methods:{
      ...mapMutations(['showNewGroup',
                    'showPersonIndex',
                    'showHistoryMessage',
                    'deleteUserToken',
                    'showPanePerson',
                    'showSetUp']),
      exitUser(){
          this.$socket.emit('exitUser',this.self.User_id,(info)=>{
              console.log(1)
          })
          this.deleteUserToken()
          this.$cookies.remove('user')
          this.$router.push('/Login')
      },
      getOnLine(){
          this.showPanePerson()
          this.$store.dispatch('getOneLine',this)
      }
  }
}
</script>
<style lang="less" scoped>
    .mu-appbar{
        background: rgb(238, 238, 238);
    }
</style>
<style lang="less">
.Header{
   .Header-colors{
        color: #777;
    }
    .mu-icon-button[name='close']{
        display: none;
    }
}
@media screen and (max-width: 648px){
    .Header{
        .mu-icon-button[name='close'] {
            display: block;
        }
    }
}
</style>



