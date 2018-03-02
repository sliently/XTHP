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
               <mu-checkbox  v-model="noticy" @change="setNoity" label="桌面弹窗" /> 
            </div>
            <div class="check-content">
               <mu-checkbox v-model="preview" @change="setPreview" label="显示消息预览" /> 
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
          isVoice:this.$cookies.get('isVoice') || 'true',
          isNoity:this.$cookies.get('isNoity') || 'true',
          isPreview:this.$cookies.get('isPreview') || 'true'
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
      },
      noticy:{
        get(){
            if(this.isNoity && this.isNoity ==='true'){
                return true
            }else{
                return false
            }
        },
        set(val){
            this.isNoity = val
        }  
      },
      preview:{
          get(){
            if(this.isPreview && this.isPreview ==='true'){
                return true
            }else{
                return false
            }
        },
        set(val){
            this.isPreview = val
        }  
      }
  },
  methods:{
      ...mapMutations(['showSetUpNotice']),
      setVoice(val){
          this.$cookies.set('isVoice',val)
      },
      setNoity(val){
          this.$cookies.set('isNoity',val)
      },
      setPreview(val){
          this.$cookies.set('isPreview',val)
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


