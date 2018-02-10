<template>
  <div id="app">
    <!-- 容器 -->
    <mu-toast v-if="$store.state.Toast.toast" :message="$store.state.Toast.msg" @close="$store.commit('hideToasts')"/>
    <router-view></router-view>
  </div>
</template>

<script>
import MyMain from '@/components/main/main'
export default {
  name: 'app',
  components:{
    MyMain
  }
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: '简蝶语';
  src: url('http://lhp313-1253555032.coscd.myqcloud.com/font/简蝶语.ttf');
}
#app {
  font-family: 简蝶语;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
}
</style>
