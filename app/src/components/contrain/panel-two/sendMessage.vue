<template>
  <div class="sendMessage">
      <my-emoil v-if="tag_faces" @addEmoil="addEmoil"></my-emoil>
      <mu-icon-button @click="toggleTag_face" icon="tag_faces"/>
      <div class="inputSend">
          <mu-text-field :fullWidth="true"
                        v-model="message"
                         iconClass="tag_faces"
                         underlineFocusClass="underline"
                         ref="msgInput"
                         @keyup.enter.native="sendMessage(0)"
                    hintText="表情或者文字/ctrl+v粘贴图片"/>
      </div>
    <div style="position:relative;display:inline-block;">
        <div ref="send" class="hideSend">
           <mu-icon-button  @click="sendMessage(0)" icon="send"/> 
        </div>
        <div ref="add" class="showAdd">
           <mu-icon-button @click="toggleAdd" icon="add"/> 
        </div>
        <transition name="bounce">
            <div v-show="add" class="add">
                <div @click="sendFolder" class="file">
                    <mu-avatar backgroundColor="blue" icon="folder"/> 
                    <input ref="folder" @change="sendMessage(2)" class="fileMsg" type="file"> 
                </div>
                <div @click="sendImg" class="file">
                    <mu-avatar backgroundColor="red" icon="photo"/> 
                    <input ref="fileImg" @change="sendMessage(1)" class="fileMsg" type="file" accept="image/*">  
                </div>
            </div>
        </transition>
    </div> 
  </div>
</template>
<script>
import {getFileSize} from '@/common/js/help'
import pasteFun from './clipboardData'
import MyEmoil from '../../common/emoil'
export default {
  name:"sendMessage",
  components:{
      MyEmoil
  },
  data(){
      return {
          message:"",
          add:false,
          tag_faces:false
      }
  },
  mounted(){
      this.$refs.msgInput.$el.addEventListener('paste',(e)=>{
          pasteFun(e,(data)=>{
              this.sendMessage(1,data)
          })
      })
  },
  beforeDestroy(){
    //   this.$refs.msgInput.$el.removeEventListener('paste')
  },
  methods:{
      addEmoil(val){
          this.toggleTag_face()
          this.message+=val
      },
      toggleTag_face(){
          this.tag_faces = !this.tag_faces
      },
      sendMessage(type,files){
          if(this.message.length==0 && type==0){
              return
          }
          let message
          if(type==1 || type ==2){
              this.add = false
              let file
              if(type==1){
                  file =  this.$refs.fileImg.files[0] || files
              }else{
                  file = this.$refs.folder.files[0]
              }
              let fileName = file.name
              let fileSize = getFileSize(file.size)
              message = {file,fileName,fileSize}
          }
          if(type==0){
              message = this.message
          }
          this.$store.dispatch('sendMessage',{message,type,that:this})
          this.message = ""
      },
      sendImg(){
          return this.$refs.fileImg.click()
      },
      sendFolder(){
          return this.$refs.folder.click()
      },
      toggleAdd(){
          this.add = !this.add
      }
  },
  watch:{
      message(val,old){
          if(this.message.length==0){
              this.$refs.add.style.display = "block"
              this.$refs.send.style.display = "none"
          }else{
              this.$refs.send.style.display = "block"
              this.$refs.add.style.display = "none"
          }
      }
  }
}
</script>
<style lang="less" scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.sendMessage{
    position: absolute;
    bottom: 0;
    height: 60px;
    width: 100%;
    line-height: 60px;
    background-color: rgb(238, 238, 238);
    .inputSend{
        position: relative;
        height: 100%;
        width: calc(~"100% - 120px");
        display: inline-block;
    }
    .hideSend{
        display: none;
    }
    .showAdd{
        display: block;
    }
    .add{
        position:absolute;
        top:-120px;
        z-index:2313;
        .file{
            position: relative;
            cursor: pointer;
            margin-top: 10px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 0px 8px 10px rgb(46, 22, 22);
            .fileMsg{
                position: absolute;
                top:0;
                left: 0;
                display: none;
            }
        }
    }
}
</style>
<style lang="less">
.sendMessage{
    position: relative;
    .inputSend{
        .tag_faces{
           color:#666; 
        }
        .underline{
            background-color:#666; 
        }
    }
    
}

</style>
