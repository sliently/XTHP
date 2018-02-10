<template>
  <div class="pane">
      <my-pane-left></my-pane-left><div class="pane-center"></div><my-pane-right></my-pane-right>
  </div>
</template>
<script>
import MyPaneLeft from './pane/pane-left'
import MyPaneRight from './pane/pane-right'
export default {
  name:"pane",
  components:{
    MyPaneLeft,
    MyPaneRight
  }
}
</script>
<style lang="less" scoped>
.pane{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 30;
  pointer-events:none;
}
.pane-center{
  display: inline-block;
  width: 0;
  height: 100%;
}
@media screen and (min-width: 1025px){
  .pane-center{
    width: 40%;
  }
}
@media screen and (min-width: 1440px){
  .pane-center{
    width: 50%;
  }
}

</style>

