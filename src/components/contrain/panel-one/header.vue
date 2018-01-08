<template>
  <div class="Header">
    <mu-appbar :zDepth="0">
        <mu-avatar @click.native="showPersonIndex" style="margin-left:10px;cursor: pointer;" slot="left" src="static/image/11.jpg"/>
        <mu-icon-button icon="message" iconClass="Header-colors" slot="right"/>
        <mu-icon-button icon="people" iconClass="Header-colors" slot="right"></mu-icon-button>
        <mu-icon-menu icon="more_vert" 
                    iconClass="Header-colors"
                    menuClass="header-menu"
                    style="color:#666;"
                    :anchorOrigin="{horizontal: 'right', vertical: 'top'}"
                    :targetOrigin="{horizontal: 'right', vertical: 'bottom'}" 
                    slot="right">
            <mu-menu-item title="创建群组"/>
            <mu-menu-item title="用户资料" />
            <mu-menu-item title="退出" />
        </mu-icon-menu>
        <mu-icon-button name="close" @click="showHistoryMessage" icon="close" iconClass="Header-colors" slot="right"/>
    </mu-appbar>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  name:'HeaderOne',
  methods:{
      ...mapMutations(['showPersonIndex','showHistoryMessage'])
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



