<template>
  <div class="message-contrain">
    <div :style="item.UserAvatarSlot">
        <mu-avatar :src="item.UserAvatar"></mu-avatar>
    </div>
    <div class="message-box" :style="item.UserNameSlot">
        <span class="userName">
            <span>{{item.UserName}}</span>
            <span class="time">{{item.time}}</span>
        </span>
        <div class="message-content">
            <span class="msg">
                <span v-if="item.type==0" v-html="msg"></span>
                <span v-if="item.type==1">
                    <img class="img" @click="showBig" :src="item.message" alt="无法显示">
                    <my-picture v-if="Big" :src="item.message" @close="hideBig"></my-picture>
                </span>
                <div v-if="item.type==2 && file!=null" class="file">
                    <mu-icon value="insert_drive_file" color="blue" :size="40"/>
                    <div class="file-name">
                        <p class="textOver">{{file.fileName}}</p>
                        <p class="fileSize textOver">{{file.fileSize}}</p>
                    </div>
                    <a :href="file.src">
                        <mu-icon value="cloud_download" color="#999" :size="40"/>
                    </a>
                </div>
            </span>
            <span ref="bottom" @click="toggle" :class="item.UserIconSlot">
                <mu-icon :size="20" color="#eee" value="more_horiz"/>
            </span>
            <mu-popover :trigger="trigger" @close="handleClose" :open="open">
                <mu-menu>
                    <mu-menu-item title="发送消息" />
                    <mu-menu-item v-if="item.UserIconSlot==='more-right'" @click="withdraw" title="撤回消息" />
                </mu-menu>
            </mu-popover>
        </div>
    </div>
  </div>
</template>
<script>
import {IsURL} from '@/common/js/help'
import MyPicture from '@/components/common/Picture'
export default {
  name:'msgMenu',
  components:{
      MyPicture
  },
  props:{
      item:{
          type:Object,
          default:null
      },
      scroll:{
          type:Element,
          default:null
      }
  },
  data(){
      return{
          open:false,
          trigger:null,
          msg:null,
          file:null,
          Big:false
      }
  },
  created(){
      this.updateMsg()
  },
  mounted(){
      this.trigger = this.$refs.bottom
  },
  methods:{
      showBig(){
          this.Big = true
      },
      hideBig(){
            this.Big = false
      },
      updateMsg(){
          if(this.item.type==1){
              return
          }
          if(this.item.type==2){
              this.file =JSON.parse(this.item.message)
              return
          }
          let Rex = /(#)\{[\u4e00-\u9fa5]{1,}\}/g
          this.msg = this.item.message
          let arr = this.item.message.match(Rex)
          if(Rex.test(this.item.message)){
              let chinese = /[\u4e00-\u9fa5]{1,}/g
              for(let i=0;i<arr.length;i++){
                //   匹配里面的中文
                let now = arr[i].match(chinese)
                let ele = `<img src='http://lhp313-1253555032.coscd.myqcloud.com/static/emoil/${now}.gif' alt = ${now}/>`
                this.msg = this.msg.replace(arr[i],ele)
              }
          }
        //   this.msg = this.item.message
        //   let Rex = IsURL()
        //   if(false){
        //       let href
        //       if(Rex.exec(msg)[1]){
        //           href = Rex.exec(msg)[0]
        //       }else{
        //           href = 'http://'+Rex.exec(msg)[0]
        //       }
        //       let rep ="<a href="+href+" target='_blank'>"+Rex.exec(msg)[0]+"</a>"
        //       this.msg = msg.replace(Rex,rep)
        //   }else{
        //       this.msg = msg
        //   }
      },
      toggle(){
          this.open = !this.open
      },
      handleClose(e){
          this.open = false
      },
      handle(){
          this.open = false
      },
      withdraw(){
          this.handleClose()
          let isRoom
          let _id = this.item._id
          if(this.$store.state.msgPerson.room_id == null){
              isRoom = {isRoom:false,msg_id:this.$store.state.msgPerson.msg_id,user_id:this.$store.state.self.User_id}
          }
          if(this.$store.state.msgPerson.msg_id==null){
              isRoom = {isRoom:true,msg_id:this.$store.state.msgPerson.room_id}
          }
          this.$socket.emit('withdraw',{isRoom,_id,token:this.$store.state.user_token},(info)=>{
              if(info.isError){
                  console.log(info.msgErr)
                  return
              }
              console.log(info)
              if(info.withdraw){
                  let msgs="撤回成功"
                  this.$store.commit('deleteDialogue', info)
                  this.$store.commit('deleteHistory',info)
                  this.$store.commit('showToasts',{toast:true,msg:msgs})
              }else{
                  let msgs="超过两分钟的消息不能撤回"
                  this.$store.commit('showToasts',{toast:true,msg:msgs})
              }
          })
      }
  },
  filters:{
      emoil(val){
          if(!val)return ''
      }
  }
}
</script>
<style lang="less" scoped>
.message-contrain{
    width: 100%;
    padding: 5px 6px 10px 12px;
    display: flex;
    &:hover{
        font-size: 14px;
        .message-box .userName .time{
            display: inline-block;
        }
        .message-box .message-content{
            .more-right{
                display: block;
            }
            .more-left{
                display: block;
            }
        } 
    }
    .mu-avatar{
        margin-top: 5px;
    }
    .message-box{
        width: calc(~"100% - 40px");
        padding: 0 10px;
        .userName{
            padding: 0 2px;
            display: block;
            font-size: 14px;
            color: #5f6265;
            .time{
                font-size: 7px;
                display: none;
            }
        }
        .message-content{
            position: relative;
            display: inline-flex;
            max-width: 90%;
            align-items: flex-end;
            .msg{
                position: relative;
                word-break: break-all;
                background: #fff;
                text-align: left;
                padding: 6px 12px;
                min-height: 35px;
                border: 1px solid #ccc;
                border-radius: 8px;
                .img{
                    width: 100%;
                    max-width: 300px;
                }
                .file{
                    padding: 5px;
                    display: flex;
                    .file-name{
                        width: 120px;
                        padding: 0 10px;
                        .textOver{
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .fileSize{
                            font-size: 14px;
                            padding-top: 5px;
                        }
                    }
                }
            }
            .more-left{
                position: absolute;
                right: -25px;
                display: none;
                cursor: pointer;
                width: 20px;
                height: 20px;
                border-radius: 3px;
                background: #b1a9a9;
            }
            .more-right{
                position: absolute;
                display: none;
                cursor: pointer;
                width: 20px;
                height: 20px;
                left: -25px;
                border-radius: 3px;
                background: #b1a9a9;
            }
        }
    }
}
</style>

