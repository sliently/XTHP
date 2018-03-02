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
#app {
  font-family: 'Roboto Mono', monospace;
  font-family: 'Dosis', sans-serif;
  font-family: 'Kavivanar', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
}
a{
  color: #1ea6e8;
}
</style>
