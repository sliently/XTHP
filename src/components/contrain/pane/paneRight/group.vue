<template>
  <div class="group" v-if="ifAjax">
    <mu-paper :zDepth="1">
        <my-avatar :srcAvatar="group.GroupAvatar"></my-avatar>
        <div class="groupWord">
            <div class="group-title">{{group.GroupName}}</div>
            <div class="group-time">{{group.GroupTime}}</div>
        </div>
    </mu-paper>
    <mu-paper class="groupNum" :zDepth="1">
        <div class="groupWord">
            <div class="group-title">公告</div>
            <div class="group-time">{{group.GroupNotice}}</div>
        </div>
    </mu-paper>
    <mu-paper class="groupNum signOut" :zDepth="1">
        <div class="groupWord">
            <div style="padding:5px;">
              <img src="/static/image/signout.png" alt="">  
            </div>
            <div class="out">退出</div>
        </div>
    </mu-paper>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import MyAvatar from '@/components/common/MyAvatar'
export default {
  name:'group',
  components:{
      MyAvatar
  },
  computed:{
      ...mapState(['ifAjax','group'])
  }
}
</script>
<style lang="less" scoped>
@import url('../../../../common/mixin.less');
.group{
    position: relative;
    width: 100%;
    height: calc(~"100% - 64px");
    overflow: auto;
    -webkit-overflow-scrolling : touch;
     // 滚动条样式
    &::-webkit-scrollbar {//滚动条的宽度
        .scrollbar
    }
    &::-webkit-scrollbar-thumb {
        .scrollbar-thumb
    }
    .groupNum{
        margin-top: 10px;
        .mu-list-item{
            padding: 10px 30px;
        }
    }
    .groupWord{
        width: 100%;
        height: 80px;
        padding: 10px 30px 10px 30px;
        .group-title{
            width: 100%;
            height: 30px;
            color: #666;
            font-size: 14px;
            padding: 5px 0;
        }
        .group-time{
            width: 100%;
            height: 30px;
            color: #999;
            font-size: 14px;
            padding: 5px 0;
        }
    }
    .signOut{
        cursor: pointer;
        .groupWord{
            height: 60px;
            display: flex;
            .out{
                width: 100%;
                color: rgb(215, 0, 0);
                font-size: 20px;
                line-height: 40px;
                padding-left: 20px;
            }
        }
        &:hover{
            background: rgba(0,0,0,.1);
        }
    }
}
</style>


