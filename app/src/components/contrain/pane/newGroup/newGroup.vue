<template>
  <div class="manager">
        <mu-appbar title="新建群组">
            <mu-icon-button @click.native="showNewGroup" icon="close" slot="left"/>
        </mu-appbar>
        <div class="Profile-body">
                        <!-- 头像 -->
            <my-avatar :srcAvatar="`/static/image/group.png`"></my-avatar>
            <div class="createGroupName">
                <div class="GroupName-input">
                    <input v-model="groupName" class="group-content" />
                    <span @click="createGroup" class="submitButton">
                       <mu-icon value="done" /> 
                    </span>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import MyAvatar from '@/components/common/MyAvatar'
export default {
  name:'newGroup',
  components:{
      MyAvatar
  },
  data(){
      return {
          groupName:""
      }
  },
  methods:{
      ...mapMutations(['showNewGroup']),
      createGroup(){
          this.$store.dispatch('createGroup',{
               groupName:this.groupName, that:this 
          })
          this.groupName = ""
      }
  }
}
</script>
<style lang="less" scoped>
    .createGroupName{
        margin: 28px 5px 0 25px;
        .GroupName-input{
            border-bottom: 2px solid #00bfa5;
            padding: 8px 0;
            display: flex;
            .group-content{
                width: 100%;
                line-height: 20px;
                font-size: 14px;
                outline: none;
                border: none;
                background: none;
                
            }
            .submitButton{
                cursor: pointer;
                margin-right: 5px;
            }
        }
    }
</style>