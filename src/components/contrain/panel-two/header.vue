<template>
  <div class="HeaderTwo">
    <mu-appbar :title="group.GroupName" :zDepth="0">
        <mu-avatar @click.native="showRightIndex" style="margin-left:10px;margin-right:10px;cursor: pointer;" slot="left" :src="group.GroupAvatar"/>
        <mu-icon-button name="menu" @click="showHistoryMessage" icon="menu" iconClass="Header-menu" slot="left"/>
        <mu-icon-button icon="search" @click.native="showRightUser" iconClass="Header-colors" slot="right"/>
        <mu-icon-menu icon="more_vert" 
                    iconClass="Header-colors"
                    menuClass="header-menu"
                    style="color:#666;"
                    :anchorOrigin="{horizontal: 'right', vertical: 'top'}"
                    :targetOrigin="{horizontal: 'right', vertical: 'bottom'}" 
                    slot="right">
            <mu-menu-item @click="showRightIndex" title="用户信息"/>
            <mu-menu-item title="退出聊天" />
        </mu-icon-menu>
    </mu-appbar>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name:'HeaderTwo',
  computed:{
      ...mapState(['group'])
  },
  methods:{
      ...mapMutations(['showRightIndex','showRightUser','showHistoryMessage'])
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



