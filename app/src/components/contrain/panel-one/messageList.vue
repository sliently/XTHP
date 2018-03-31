<template>
  <div class="list">
        <my-search></my-search>
        <!-- 列表 -->
        <div class="message-list">
            <mu-list>
                <template v-for="item in dialogue">
                    <mu-list-item @click="getMsg(item)" :title="item.UserName">
                        <mu-avatar :src="item.UserAvatar" slot="leftAvatar"/>   
                        <span slot="describe">
                            <span class="con" style="color: rgba(0, 0, 0, .5)">{{item.message?item.message:"开始对话"}}</span>
                        </span>
                        <div slot="after">
                            <span class="time">{{item.time?ConTime(item.time):(new Date().getHours()+":" +new Date().getMinutes())}}</span>
                            <mu-badge :content="`${item.unread==0?'':item.unread}`" secondary/>
                        </div>
                    </mu-list-item>
                    <mu-divider/>
                </template>
            </mu-list>
        </div>
  </div>
</template>
<script>
import ConTime from '../../common/js/time'
import {mapState,mapMutations,mapActions} from "vuex"
import MySearch from "../../common/search"
export default {
  name:"messageList",
  props:{
      message:{
          type:Object,
          default:null
      }
  },
  components:{
    MySearch  
  },
  computed:{
      ...mapState(['dialogue'])
  },
  methods:{
      ...mapMutations(['setAjax','setMsgPerson','closeRightIndex','showHistoryMessage']),
      ...mapActions(['getHistory']),
      getMsg(item){
          this.showHistoryMessage()
          this.closeRightIndex()
          this.setAjax(true)
          this.setMsgPerson(item)
          this.$store.commit('unread',item)
          this.getHistory(this)
      },
      ConTime(obj){
          return ConTime(obj)
      }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../common/mixin.less');
.list{
    width: 100%;
    height:calc(~"100% - 64px");
}
.message-list{
    width: 100%;
    height: calc(~"100% - 49px");
    overflow: auto;
    // 滚动条样式
    &::-webkit-scrollbar {//滚动条的宽度
        .scrollbar
    }
    &::-webkit-scrollbar-thumb {
        .scrollbar-thumb
    }
    .time{
        font-size: 12px;
        height: 20px;
        line-height: 20px;
    }
    .con{
        display: inline-block;
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>



