<template>
  <div class="setUp-notice">
                  <!-- 头部 -->
        <mu-appbar title="通知">
            <mu-icon-button @click.native="showSetUpNotice" icon="arrow_back" slot="left"/>
        </mu-appbar>
        <mu-sub-header>设置仅在本机有效</mu-sub-header>
        <div class="notice-checkbox-group">
            <div class="check-content">
               <mu-checkbox v-model="voice" @change="setVoice" label="声音" /> 
            </div>
            <div class="check-content">
               <mu-checkbox label="桌面弹窗" /> 
            </div>
            <div class="check-content">
               <mu-checkbox label="显示消息预览" /> 
            </div>
        </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  name:'setUpNotice',
  data(){
      return {
          isVoice:this.$cookies.get('isVoice') || 'true'
        //   Notification:this.$cookies.get('isVoice') || false
      }
  },
  computed:{
      voice:{
        get(){
            if(this.isVoice && this.isVoice ==='true'){
                return true
            }else{
                return false
            }
        },
        set(val){
            this.isVoice = val
        }
      }
  },
  methods:{
      ...mapMutations(['showSetUpNotice']),
      setVoice(val){
          this.$cookies.set('isVoice',val)
      }
  }
}
</script>
<style lang="less" scoped>
.notice-checkbox-group{
    padding:26px 0 0 30px;
    .check-content{
        margin-bottom: 10px;
    }
}
</style>


