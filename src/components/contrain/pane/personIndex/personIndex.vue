<template>
  <div v-if="ifAjax" class="personIndex">
      <!-- 头部 -->
        <mu-appbar title="个人信息">
            <mu-icon-button @click="showPersonIndex" icon="arrow_back" slot="left"/>
        </mu-appbar>
        <div class="person-contrain">
            <!-- 头像 -->
            <my-avatar :srcAvatar="self.UserAvatar"></my-avatar>
            <mu-paper class="person-name" :zDepth="1">
                <h3 class="title-name">姓名</h3>
                <div ref="contentName" class="content-name">
                    <div  class="content" :contenteditable="Name">{{self.UserName}}</div>
                    <div class="my-button">
                       <mu-icon value="mode_edit" @click="changeName"/>
                    </div>
                </div>
            </mu-paper>
            <mu-sub-header>个人信息</mu-sub-header>
            <mu-paper class="person-name" :zDepth="1">
                <h3 class="title-name">{{self.UserSlogan}}</h3>
                <div ref="content" class="content-name">
                    <div  class="content" :contenteditable="Content">7868678</div>
                    <div class="my-button">
                       <mu-icon value="mode_edit" @click="changeContent"/>
                    </div>
                </div>
            </mu-paper>
        </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import MyAvatar from '@/components/common/MyAvatar'
export default {
  name:"personIndex",
  data(){
      return{
        Name:false,
        Content:false
      }
  },
  components:{
    MyAvatar
  },
  computed:{
      ...mapState(['ifAjax','self','personIndex'])
  },
  methods:{
      ...mapMutations(['showPersonIndex']),
      changeName(){
          this.Name = true
          this.$refs.contentName.classList.add("change-content");
      },
      changeContent(){
          this.Content = true
          this.$refs.content.classList.add("change-content");
      }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../../common/mixin.less');

.personIndex{
    position: relative;
    width: 100%;
    height: 100%;
    .mu-appbar{
        background-color: #7cb342;
        .mu-appbar-title{
            font-size: 10px;  
        }
    }
    .person-contrain{
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
    .person-name{
        position: relative;
        padding: 14px 30px 10px;
        background-color: #fff;
        width: 100%;
        .title-name{
            width: 100%;
            margin-bottom: 16px;
            font-size: 14px;
            color: #7cb342;
        }
        .content-name{
            position: relative;
            width: 100%;
            padding: 8px 0;
            font-size: 14px;
            line-height: 20px;
            word-wrap: break-word;
            color: #696969;
            outline: none;
            overflow-y: auto;
            overflow-x: hidden;
            display: flex;
            .content{
                width: 100%;
                line-height: 20px;
                outline: none;
            }
        }
        .change-content{
            border-bottom: 2px solid #7cb342;
        }
    }
}
</style>
<style lang="less">
.personIndex{
    .button-colors{
        color:#7cb342;
    }
}
</style>

