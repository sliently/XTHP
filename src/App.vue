<template>
  <div id="app">
    <!-- 容器 -->
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
}
</style>
