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
            <span>
                <div :class="`${item.UserTriangle}-outer`"></div>
                <div :class="`${item.UserTriangle}-inner`"></div>
            </span>
            <span class="msg">
                <span v-if="item.type==0" v-html="handleMsg(item)"></span>
                <span v-if="item.type==1">
                    <img class="img" @click="showBig" :src="item.message" alt="无法显示">
                    <my-picture v-if="Big" :src="item.message" @close="hideBig"></my-picture>
                </span>
                <div v-if="item.type==2" class="file">
                    <mu-icon value="insert_drive_file" color="blue" :size="40"/>
                    <div class="file-name">
                        <p class="textOver">{{updateMsg(item.message).fileName}}</p>
                        <p class="fileSize textOver">{{updateMsg(item.message).fileSize}}</p>
                    </div>
                    <a :href="updateMsg(item.message).src">
                        <mu-icon value="cloud_download" color="#999" :size="40"/>
                    </a>
                </div>
            </span>
            <span v-if="item.ZeroHour" :class="item.UserIconSlot" style="display:block;background:none;">
                <mu-circular-progress :size="20" color="rgba(76, 157, 226, 0.88)"/>
            </span>
            <span ref="bottom" @click="toggle" :class="item.UserIconSlot">
                <mu-icon :size="20" color="#eee" value="more_horiz"/>
            </span>
            <mu-popover :trigger="trigger" @close="handleClose" :open="open">
                <mu-menu>
                    <mu-menu-item @click.native="sendMsg(item)" title="发送消息" />
                    <mu-menu-item v-if="item.UserIconSlot==='more-right'" @click="withdraw" title="撤回消息" />
                </mu-menu>
            </mu-popover>
        </div>
    </div>
  </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
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
          Big:false
      }
  },
  mounted(){
      this.trigger = this.$refs.bottom
  },
  methods:{
      ...mapMutations(['setAjax','setMsgPerson','closeRightIndex']),
      ...mapActions(['getHistory','addTemporary']),
      showBig(){
          this.Big = true
      },
      hideBig(){
            this.Big = false
      },
      updateMsg(obj){
            ;let file =JSON.parse(obj)
            return file
      },
      toggle(){
          this.open = !this.open
      },
      handleMsg(item){
          let Rex = /(#)\{[\u4e00-\u9fa5]{1,}\}/g
          let msg = item.message
          let arr = item.message.match(Rex)
          if(Rex.test(item.message)){
              let chinese = /[\u4e00-\u9fa5]{1,}/g
              for(let i=0;i<arr.length;i++){
                //   匹配里面的中文
                let now = arr[i].match(chinese)
                let ele = `<img src='http://lhp313-1253555032.coscd.myqcloud.com/static/emoil/${now}.gif' alt = ${now}/>`
                msg = msg.replace(arr[i],ele)
              }
          }
            return msg
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
      },
      sendMsg(item){
        this.closeRightIndex()
        this.setAjax(true)
        this.addTemporary({user_id:item.User_id,that:this})
        this.setMsgPerson(item)
        this.getHistory(this)
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
            .triangle-left-outer{
                position: absolute;
                border-right: 10px solid #ccc;
                transform: rotate(20deg);
                border-top: 2px solid transparent; 
                border-bottom: 7px solid transparent;
                left: -9px;
                top: 5px;
                z-index: 10;
            }
            .triangle-left-inner{
                position: absolute;
                border-right: 10px solid #fff;
                transform: rotate(20deg);
                border-top: 2px solid transparent; 
                border-bottom: 7px solid transparent;
                left: -7px;
                top: 6px;
                z-index: 10;
            }
            .triangle-right-outer{
                position: absolute;
                border-left: 10px solid #ccc;
                transform: rotate(-20deg);
                border-top: 2px solid transparent; 
                border-bottom: 7px solid transparent;
                right: -9px;
                top: 5px;
                z-index: 10;
            }
            .triangle-right-inner{
                position: absolute;
                border-left: 10px solid #fff;
                transform: rotate(-20deg);
                border-top: 2px solid transparent; 
                border-bottom: 7px solid transparent;
                right: -7px;
                top: 6px;
                z-index: 10;
            }
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

