<template>
  <div class="setup">
            <!-- 头部 -->
        <mu-appbar title="设置">
            <mu-icon-button @click="showSetUp" icon="arrow_back" slot="left"/>
        </mu-appbar>
        <div class="setUp-contrain">
            <mu-paper class="setUp-paper" @click.native="showPersonIndex" :zDepth="1">
                <mu-avatar  :src="self.UserAvatar" :size="100"/>
                <div class="setUp-paper-body">
                    <div class="title">
                        <span>{{self.UserName}}</span>
                    </div>
                    <div class="setUp-body">
                        <span ref="links">{{self.UserSlogan}}</span>
                    </div>
                </div>
            </mu-paper>
            <mu-sub-header>设置选项</mu-sub-header>
            <mu-paper class="setUpCheck" :zDepth="1">
                <div class="setUp-item" @click="showSetUpNotice">
                    <div class="rrzlm">
                        <mu-icon value="add_alert" :size="24"/>
                    </div>
                    <div class="_10xEB">
                        <span>通知</span>
                    </div>
                </div>
                <div class="setUp-item" @click="showToasts">
                    <div class="rrzlm">
                        <mu-icon value="wallpaper" :size="24"/>
                    </div>
                    <div class="_10xEB">
                        <span>对话壁纸</span>
                    </div>
                </div>
                <div class="setUp-item" @click="getSltShield">
                    <div class="rrzlm">
                        <mu-icon value="block" :size="24"/>
                    </div>
                    <div class="_10xEB">
                        <span>屏蔽对象</span>
                    </div>
                </div>
                <div class="setUp-item" @click="showToasts">
                    <div class="rrzlm">
                        <mu-icon value="help" :size="24"/>
                    </div>
                    <div class="_10xEB">
                        <span>帮助</span>
                    </div>
                </div>
            </mu-paper>
        </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name:'setUp',
computed:{
    ...mapState(['self'])
},
methods:{
    ...mapMutations(['showSetUp','showPersonIndex','showSetUpNotice','showSltShield']),
    showToasts(){
        this.$store.commit('showToasts',{toast:true,msg:"功能尚未完善"})
    },
    getSltShield(){
        this.showSltShield()
        this.$store.dispatch('getShield',this)
    }
}
}
</script>
<style lang="less" scoped>
@import url('../../../../common/mixin.less');
.setup{
    position: relative;
    height: 100%;
    width: 100%;
}
    .setUp-contrain{
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
        .setUp-paper{
            width: 100%;
            height: 120px;
            padding: 10px 30px;
            cursor: pointer;
            .setUp-paper-body{
                float: right;
                width: calc(~"100% - 100px");
                height: 100%;
                font-size: 18px;
                padding-left: 20px;
                word-break: break-all;
                word-wrap: break-word;
                .title{
                    width: 100%;
                    padding-top: 20px;
                    height: 50px;
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
        .setUpCheck{
            width: 100%;
            height: auto;
            margin: 10px 0;
            .setUp-item{
                width: 100%;
                height: 60px;
                display: flex;
                align-items: center;
                color: #4b4b4b;
                cursor: pointer;
                &:hover{
                    background: rgba(0, 0, 0, .09)
                }
                .rrzlm{
                    display: flex;
                    flex: none;
                    justify-content: center;
                    width: 80px;
                }
                ._10xEB{
                    color: #111;
                    padding-right: 30px;
                    font-size: 20px;
                    align-items: center;
                    display: flex;
                    flex: 1 1 auto;
                    height: 100%;
                    overflow: hidden;
                }
            }
        }
    }
</style>

