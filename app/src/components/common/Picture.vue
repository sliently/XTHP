<template>
  <div class="Picture">
      <div class="paneImgTitle">
                <!-- 头部 -->
        <mu-appbar title="图片">
            <mu-avatar slot="left" :src="avatar"/>
            <mu-icon-button icon="zoom_in" @click.native="zoomIn" slot="right"></mu-icon-button>
            <mu-icon-button icon="zoom_out" @click.native="zoomOut" slot="right"></mu-icon-button>
            <mu-icon-button icon="close" @click="close" slot="right"></mu-icon-button>
        </mu-appbar>
      </div>
      <div class="paneBody">
          <div ref="paneImg" :style="`transform:scale(${big})`" class="paneImgs">
              <img :src="src" alt="无法显示">
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name:"myPicture",
  data(){
      return{
         big:0.9 
      }
  },
  props:{
      src:{
          type:String,
          default:null
      },
      avatar:{
          type:String,
          default:null
      }
  },
    methods:{
        zoomIn(){
            if(this.big>5){
                return
            }
            this.big = this.big+0.3
        },
        zoomOut(){
            if(this.big<0.6){
                return
            }
            this.big = this.big-0.3
        },
        close(){
            return this.$emit('close')
        }
    }
}
</script>
<style lang="less" scoped>
.Picture{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    background: hsla(0,0%,100%,.86);
    .mu-appbar{
        background-color: rgba(255, 255, 255, 0.98);
        color: #4b4b4b;
    }
    .paneBody{
        width: 100%;
        height: calc(~"100% - 64px");
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content:center;
        .paneImgs{
            max-width: 500px;
            transition: all .25s ease-in-out;
            img{
                width: 100%;
            }
        }
    }
}
</style>

