<template>
<div class="msgGroup">
    <div v-show="isMsgPerson" style="text-align:center;">
        <div style="position:relative;top:40px;">
            <mu-circular-progress :size="35" :strokeWidth="3"/>
            <div>努力加载中......</div>
        </div>
    </div>
    <div v-show="!isMsgPerson" class="group">
        <mu-paper :zDepth="1">
            <my-avatar :srcAvatar="group.GroupAvatar">
                <div v-if="self.User_id==group.GroupAdmin" @click="changeAvatar" class="show">
                    <input @change="changeImage" ref="imgInput" type="file" accept="image/*" style="display:none;">
                    <img style="pointer-events: none;" src="/static/image/camm.png" alt="不能显示">
                </div>
            </my-avatar>
            <div class="groupWord">
                <div ref="contentName" class="group-title">
                    <div ref="groupName" class="content" :contenteditable="isName">{{group.GroupName}}</div>
                    <div class="my-button" v-if="self.User_id==group.GroupAdmin">
                        <span ref="changeName" @click="changeName">
                            <mu-icon value="mode_edit"  />
                        </span>
                        <span style="display:none;" ref="submitName" @click="submitName">
                            <mu-icon value="done"/>
                        </span>
                    </div>
                </div>
                <div class="group-time">{{group.GroupTime}}</div>
            </div>
        </mu-paper>
        <mu-paper class="groupNum" :zDepth="1">
            <div class="groupWord">
                <div class="group-title">{{group.GroupAdmin?"公告":'个人信息'}}</div>
                <div class="group-time" ref="contentNotice">
                    <div ref="groupNotice" class="content" :contenteditable="isNotice">{{group.GroupNotice?group.GroupNotice:'暂无'}}</div>
                    <div class="my-button" v-if="self.User_id==group.GroupAdmin">
                        <span ref="changeNotice" @click="changeNotice">
                            <mu-icon value="mode_edit"/>
                        </span>
                        <span style="display:none;" ref="submitNotice" @click="submitNotice">
                            <mu-icon value="done"/>
                        </span>
                    </div>
                </div>
            </div>
        </mu-paper>
        <mu-paper v-if="group.GroupAdmin" class="groupNum" :zDepth="1">
            <div class="title">管理</div>
            <div class="list-body">
                <div class="list-item" @click="showRightInvite">
                    <div class="iconAvatar">
                        <mu-avatar icon="link" backgroundColor="green" :size="50"/>
                    </div>
                    <div class="list-item-chat">
                        <div  class="chat-title">
                           <span>邀请链接</span> 
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="iconAvatar">
                        <mu-avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517042775119&di=af5eb822bc9f74738e3d06fcd73b97f7&imgtype=0&src=http%3A%2F%2Fwww.jdsc.com.cn%2Fuploadfile%2F2011%2F0318%2F20110318042847859.jpg" :size="50"/>
                    </div>
                    <div class="list-item-chat">
                        <div class="chat-title">
                           <span>{{}}</span> 
                        </div>
                        <mu-badge content="admin"/>
                    </div>
                </div>
            </div>
        </mu-paper>
        <mu-paper v-if="group.GroupAdmin?false:true" class="groupNum signOut" :zDepth="1">
            <div class="groupWord">
                <div style="padding:5px;">
                <mu-icon :color="group.sltShield?'rgba(64, 183, 57, 0.78)':'#999'" value="block" :size="30"/>
                </div>
                <div @click="Shield_user" class="out" :style="group.sltShield?'color:rgba(64, 183, 57, 0.78)':'color:#999'">{{group.sltShield?'解除屏蔽':'屏蔽用户'}}</div>
            </div>
        </mu-paper>
        <mu-paper class="groupNum signOut" :zDepth="1">
            <div class="groupWord">
                <div style="padding:5px;">
                <img src="/static/image/signout.png" alt="退出">  
                </div>
                <div @click="deleteMsg" class="out">{{group.GroupAdmin?'退出群组':'删除对话'}}</div>
            </div>
        </mu-paper>
    </div>
</div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import MyAvatar from '@/components/common/MyAvatar'
export default {
  name:'Group',
  components:{
      MyAvatar
  },
  data(){
      return {
          isName:false,
          isNotice:false
      }
  },
  computed:{
      ...mapState(['group','isMsgPerson','self'])
  },
  methods:{
    ...mapMutations(['showRightInvite','showToasts']),
        changeAvatar(){
          return this.$refs.imgInput.click();
      },
      changeImage(){
            var file = this.$refs.imgInput.files[0];
            this.$store.dispatch('groupImg',{
            'that':this,
            'file':{file,name:file.name}})
      },
      changeName(){
          this.isName = true
          this.$refs.contentName.classList.add("change");
          this.$refs.changeName.style.display="none";
          this.$refs.submitName.style.display="block";
      },
      submitName(){
          this.isName = false
          this.$refs.contentName.classList.remove("change");
          this.$refs.changeName.style.display="block";
          this.$refs.submitName.style.display="none";
          this.$store.dispatch('changeNotice',{isNoticeName:true,that:this,msg:this.$refs.groupName.innerText})
          this.showToasts({toast:true,msg:"成功修改"})
      },
      changeNotice(){
          this.isNotice = true
          this.$refs.contentNotice.classList.add("change");
          this.$refs.changeNotice.style.display="none";
          this.$refs.submitNotice.style.display="block";
      },
      submitNotice(){
          this.isNotice = false
          this.$refs.contentNotice.classList.remove("change");
          this.$refs.changeNotice.style.display="block";
          this.$refs.submitNotice.style.display="none";
          this.$store.dispatch('changeNotice',{isNoticeName:false,that:this,msg:this.$refs.groupNotice.innerText})
          this.showToasts({toast:true,msg:"成功修改"})
      },
     deleteMsg(){
        this.$store.dispatch('deleteMsg',this)
        this.$store.commit('closeRightIndex')
      },
      Shield_user(){
          this.$store.dispatch('Shield_user',this)
      }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../../common/mixin.less');
.msgGroup{
    width: 100%;
    height: 100%;
}
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
        font-size: 14px;
        color: #999;
        .title{
            width: 100%;
            height: 30px;
            font-size: 14px;
            color: #666;
            padding-top: 10px; 
            padding-left:30px; 
        }
        .list-body{
            margin-top: 10px;
            width: 100%;
            .list-item{
                width: 100%;
                height: 70px;
                display: flex;
                cursor: pointer;
                &:hover{
                    background: rgba(0,0,0,.1);
                }
                .iconAvatar{
                    padding: 10px 20px 10px 30px; 
                }
                .list-item-chat{
                    padding: 10px 10px 10px 0; 
                    width: 100%;
                    height: 70px;
                    font-size: 17px;
                    align-items: center;
                    color: #333;
                    display: flex;
                    .chat-title{
                        line-height: 30px;
                        display: flex;
                        width: 80%;
                        span{
                            flex-grow: 1;
                        }
                    }

                }
            }
        }
    }
    .groupWord{
        width: 100%;
        height: 100px;
        padding: 10px 30px 10px 30px;
        .group-title{
            width: 100%;
            height: 40px;
            color: #666;
            font-size: 14px;
            padding: 8px 0;
            display: flex;
            .content{
                width: calc(~"100% - 24px");
                height: 100%;
                outline: none;
            }
            .my-button{
                cursor: pointer;
            }
        }
        .change{
            border-bottom: 2px solid #7cb342;
        }
        .group-time{
            width: 100%;
            height: 40px;
            color: #999;
            font-size: 14px;
            padding: 8px 0;
            display: flex;
            .content{
                width: calc(~"100% - 24px");
                height: 100%;
                outline: none;
            }
            .my-button{
                cursor: pointer;
            }
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


