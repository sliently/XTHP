<template>
  <div class="personIndex">
      <!-- 头部 -->
        <mu-appbar title="个人信息">
            <mu-icon-button @click="showPersonIndex" icon="arrow_back" slot="left"/>
        </mu-appbar>
        <div class="person-contrain">
            <!-- 头像 -->
            <my-avatar :srcAvatar="self.UserAvatar">
                <div @click="changeAvatar" class="show">
                    <input @change="changeImage" ref="imgInput" type="file" accept="image/*" style="display:none;">
                    <img style="pointer-events: none;" src="/static/image/camm.png" alt="不能显示">
                </div>
            </my-avatar>
            <mu-paper class="person-name" :zDepth="1">
                <h3 class="title-name">姓名</h3>
                <div ref="contentName" class="content-name">
                    <div ref="UserName" class="content" :contenteditable="Name">{{self.UserName}}</div>
                    <div class="my-button">
                        <span ref="changeName">
                            <mu-icon value="mode_edit" @click="changeName"/>
                        </span>
                        <span style="display:none;" ref="submitName">
                            <mu-icon value="done" @click="submitName" />
                        </span>
                    </div>
                </div>
            </mu-paper>
            <mu-sub-header>个人信息</mu-sub-header>
            <mu-paper class="person-name" :zDepth="1">
                <h3 class="title-name">个性签名</h3>
                <div ref="content" class="content-name">
                    <div ref="UserSlogan" class="content" :contenteditable="Content">{{self.UserSlogan}}</div>
                    <div class="my-button">
                        <span ref="changeContent">
                            <mu-icon value="mode_edit" @click="changeContent"/>
                        </span>
                        <span style="display:none;" ref="submitContent">
                            <mu-icon value="done" @click="submitContent" />
                        </span>
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
  watch:{
      self(curVal,oldVal){
          console.log(curVal,oldVal);
      }
  },
  methods:{
      ...mapMutations(['showPersonIndex','showToasts']),
      changeAvatar(){
          return this.$refs.imgInput.click();
      },
      changeName(){
          this.Name = true
          this.$refs.contentName.classList.add("change-content");
          this.$refs.changeName.style.display="none";
          this.$refs.submitName.style.display="block";
      },
      submitName(){
          this.Name = false
          this.$refs.contentName.classList.remove("change-content");
          this.$refs.changeName.style.display="block";
          this.$refs.submitName.style.display="none";
          this.$store.dispatch('changeUser',{isName:true,that:this,message:this.$refs.UserName.innerText})
          this.showToasts({toast:true,msg:"成功修改"})
      },
      changeContent(){
          this.Content = true
          this.$refs.content.classList.add("change-content");
          this.$refs.changeContent.style.display="none";
          this.$refs.submitContent.style.display="block";
      },
        submitContent(){
            this.Content = false
          this.$refs.content.classList.remove("change-content");
          this.$refs.changeContent.style.display="block";
          this.$refs.submitContent.style.display="none";
          this.$store.dispatch('changeUser',{isName:false,that:this,message:this.$refs.UserSlogan.innerText})
          this.showToasts({toast:true,msg:"成功修改"})
        },
      changeImage(){
        var file = this.$refs.imgInput.files[0];
        this.$store.dispatch('inputImage',{
            'that':this,
            'file':{file,name:file.name}})
        // var reader = new FileReader();
        // reader.readAsDataURL(file);
        // let that = this;
        // reader.onload = function(e){
        // }
      },
      hideInput(){
          document.getElementsByClassName('show')[0].style.display="none";
      },
      showInput(){
           document.getElementsByClassName('show')[0].style.display="block";
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
                width: calc(~"100% - 24px");
                line-height: 20px;
                outline: none;
            }
            .my-button{
                width: 24px;
                height: 29px;
                cursor: pointer;
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

