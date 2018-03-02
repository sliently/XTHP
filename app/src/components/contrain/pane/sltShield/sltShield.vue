<template>
  <div class="sltShield">
            <!-- 头部 -->
        <mu-appbar title="屏蔽对象">
            <mu-icon-button @click.native="showSltShield" icon="arrow_back" slot="left"/>
        </mu-appbar>
        <div class="sltShield-contrain">
            <mu-sub-header>屏蔽用户后，你将接收不到对方的消息</mu-sub-header>
                <mu-list>
                    <template v-for="item in user_Shield">
                        <mu-list-item @click.native="dltShields(item)" :title="item.UserName">
                            <mu-avatar :src="item.UserAvatar" slot="leftAvatar"/>   
                            <span slot="describe">
                                <span style="color: rgba(0, 0, 0, .5)">{{item.userAgent+"  "+item.UserSlogan}}</span>
                            </span>
                        </mu-list-item>
                        <mu-divider/>
                    </template>
                </mu-list>
        </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name:'sltShield',
  computed:{
      ...mapState(['user_Shield'])
  },
  methods:{
      ...mapMutations(['showSltShield']),
      dltShields(info){
          this.$store.dispatch('dltShield',{
            data:{
                token: this.$store.state.user_token,
                friend_id:info.User_id},
            that:this})
      }
  }
}
</script>
<style lang="less">
@import url('../../../../common/mixin.less');
.sltShield{
    position: relative;
    height: 100%;
    width: 100%;
}
.sltShield-contrain{
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: calc(~"100% - 64px");
    // 滚动条样式
    &::-webkit-scrollbar {//滚动条的宽度
        .scrollbar
    }
    &::-webkit-scrollbar-thumb {
        .scrollbar-thumb
    }
}
</style>
