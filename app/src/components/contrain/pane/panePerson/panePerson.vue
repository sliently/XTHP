<template>
  <div class="manager">
        <mu-appbar title="在线用户">
            <mu-icon-button @click.native="showPanePerson" icon="close" slot="left"/>
        </mu-appbar>
        <div ref="query" class="Profile-body">
            <my-search @query="queryPer"></my-search>
            <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="onlLineQuery" />
            <div class="message-list">
                <mu-list v-if="!refreshing">
                    <template v-for="item in offline">
                        <mu-list-item @click.native="getMsg(item)" :title="item.UserName">
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
  </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import MySearch from '@/components/common/search'
export default {
  name:'rightUser',
  data(){
      return {
          queryPers:[],
          trigger:null,
          refreshing:false
      }
  },
    mounted () {
    this.trigger = this.$refs.query
  },
  computed:{
      ...mapState(['panePerson','onLine']),
      offline(){
          return this.queryPers.length!=0?this.queryPers:this.onLine
      }
  },
  components:{
    MySearch
  },
  methods:{
        ...mapMutations(['showPanePerson','setAjax','setMsgPerson','closeRightIndex',]),
      ...mapActions(['getHistory','addTemporary','getOneLine']),
      getMsg(item){
          this.showPanePerson()
          this.closeRightIndex()
          this.setAjax(true)
          this.addTemporary({user_id:item.User_id,that:this})
          this.setMsgPerson(item)
          this.getHistory(this)
      },
      onlLineQuery(){
          this.refreshing = false
      },
      queryPer(val){
          this.$socket.emit('queryPer',val,(info)=>{
            if (info.isError) {
                console.log(info.errMsg)
                return
            }
            this.refreshing = false
            this.queryPers = info.queryPer
          })
      }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../../common/mixin.less');
.Profile-body{
    position: relative;
    width: 100%;
    height: calc(~"100% - 64px");
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
}
</style>