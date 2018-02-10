<template>
  <div class="HeaderTwo">
    <mu-appbar :title="msgPerson.msgName" :zDepth="0">
        <mu-avatar @click.native="getGroup" style="margin-left:10px;margin-right:10px;cursor: pointer;" slot="left" :src="msgPerson.msgAvatar"/>
        <mu-icon-button name="menu" @click="showHistoryMessage" icon="menu" iconClass="Header-menu" slot="left"/>
        <!-- <mu-icon-button icon="search" @click.native="showRightUser" iconClass="Header-colors" slot="right"/> -->
        <mu-icon-menu icon="more_vert" 
                    iconClass="Header-colors"
                    menuClass="header-menu"
                    style="color:#666;"
                    :anchorOrigin="{horizontal: 'right', vertical: 'top'}"
                    :targetOrigin="{horizontal: 'right', vertical: 'bottom'}" 
                    slot="right">
            <mu-menu-item @click="getGroup" title="用户信息"/>
            <mu-menu-item @click="deleteMsg" title="退出聊天" />
        </mu-icon-menu>
    </mu-appbar>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name:'HeaderTwo',
  computed:{
      ...mapState(['msgPerson'])
  },
  methods:{
      ...mapMutations(['showRightIndex','showRightUser','showHistoryMessage']),
      getGroup(){
          this.showRightIndex()
          this.$store.commit('setGroupAjax',true)
          this.$store.dispatch('getGroup',{that:this})
      },
      deleteMsg(){
          this.$store.dispatch('deleteMsg',this)
          this.$store.commit('closeRightIndex')
      }
  },
  watch:{
      msgPerson(){
          console.log(this.msgPerson)
      }
  }
}
</script>
<style lang="less" scoped>
.HeaderTwo{
    position: relative;
    width: 100%;
    top: 0;
    border-left:1px solid rgba(0,0,0,.2);
}
.mu-appbar{
    background: rgb(238, 238, 238);
    color:#333;
    
}
</style>
<style lang="less">
.HeaderTwo{
   .Header-colors{
        color: #777;
    }
    .mu-icon-button[name='menu']{
        color: #777;
        display: none;
    }
}
@media screen and (max-width:648px){
.HeaderTwo{
   .mu-icon-button[name='menu']{
        display: block;
    }
    .mu-avatar{
        display: none;
    }
}
}
</style>



