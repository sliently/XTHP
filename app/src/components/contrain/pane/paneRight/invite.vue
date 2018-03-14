<template>
      <div class="manager">
        <mu-appbar title="邀请链接">
            <mu-icon-button @click="closeRightIndex" icon="close" slot="left"/>
        </mu-appbar>
        <div class="Profile-body">
            <mu-paper class="invite-paper" :zDepth="1">
                <mu-avatar  :src="group.GroupAvatar" :size="100"/>
                <div class="invite-paper-body">
                    <div class="title">
                        <span>{{group.GroupName}}</span>
                    </div>
                    <div class="invite-body">
                        <span ref="links">{{updateGG(group.invite)}}</span>
                    </div>
                </div>
            </mu-paper>
            <mu-sub-header>任何人都能通过链接加入房间</mu-sub-header>
            <mu-paper class="UserProfile-margin" :zDepth="1">
                <div @click="updadeLink" class="profile-button">
                    <mu-icon value = "cached" :size="35" />
                    <span>更新链接</span>
                </div>
                 <mu-divider/>
                <div :data-clipboard-text="`${invite}${group.invite}`"
                    id="btn"
                    class="profile-button">
                    <mu-icon value="content_copy" :size="35" />
                    <span>复制链接</span>
                </div>
                 <mu-divider/>
                <div class="profile-button">
                    <mu-icon value = "mail" :size="35" />
                    <span>发送链接</span>
                </div>
            </mu-paper>
        </div>
    </div>
</template>
<script>
import Clipboard from 'clipboard'
import {mapState,mapMutations,mapGetters} from 'vuex'
export default {
  name:'inviteMsg',
  data(){
      return {
          invite:"https://haiping313.cn/invite/"
      }
  },
  computed:{
      ...mapState(['group','self']),
      msg(){
          return this.invite + this.group.invite
      }
  },
  created(){
      this.onCopy()
  },
  methods:{
      ...mapMutations(['closeRightIndex','showToasts']),
      updadeLink(){
          if(this.group.GroupAdmin == this.self.User_id){
              this.$store.dispatch('updateLink',{that:this})
              return
          }
          let hint = "非管理员不能更新"
          this.showToasts({toast:true,msg:hint})
      },
      onCopy(){
          var clipboard = new Clipboard('#btn');
        clipboard.on('success', (e)=> {
            let hint = "复制成功"
            this.$store.commit('showToasts',{toast:true,msg:hint})
            e.clearSelection();
        });
        clipboard.on('error', (e)=> {
            let hint = "复制失败"
            this.$store.commit('showToasts',{toast:true,msg:hint})
        });
      },
      updateGG(obj){
          return `http://123.207.239.16/invite/${obj}`
      }
  }
}
</script>
<style lang="less" scoped>
    .mu-appbar{
        background-color: #eeeeee;
        color: #333;
    }
    .Profile-body{
        position: relative;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        .invite-paper{
            width: 100%;
            height: 120px;
            padding: 10px 30px;
            cursor: pointer;
            .invite-paper-body{
                float: right;
                width: calc(~"100% - 100px");
                height: 100%;
                font-size: 18px;
                padding-left: 20px;
                word-break: break-all;
                word-wrap: break-word;
                .title{
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                }
                .invite-body{
                    width: 100%;
                    height: 70px;
                    color: #1ea6e8;
                    font-size: 15px;
                }
            }
        }
        .UserProfile-margin{
            margin-top: 20px;
            .profile-button{
                line-height: 64px;
                height: 64px;
                width: 100%;
                padding: 0 20px;
                font-size: 16px;
                color:rgb(136, 136, 136);
                display: flex;
                align-content: center;
                cursor: pointer;
                &:hover{
                    background:#f4f5f5;
                }
                .mu-icon {
                    margin: 14px 9px;
                    margin-right: 20px; 
                }
            }
        }
        
    }
</style>

