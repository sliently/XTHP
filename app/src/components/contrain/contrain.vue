<template>
    <div class="Layout-container">
        <my-pane></my-pane>
        <my-pane-one></my-pane-one>
        <my-pane-two></my-pane-two>
    </div>
</template>
<script>
import MyPane from './pane'
import MyPaneOne from './PaneOne'
import MyPaneTwo from './PaneTwo'
export default {
  name:'contrain',
  components:{
      MyPane,
      MyPaneOne,
      MyPaneTwo
  }
}
</script>
<style lang="less">
.Layout-container {
    height: 100%;
    overflow: hidden;
    display: flex;
    margin: auto;
    position: relative;
    background-color: #fefefe;
    border-radius: 4px;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.06), 0 2px 5px 0 rgba(0,0,0,.2);
}


@media screen and (min-width: 1200px){
   .Layout-container {
        width: 1118px;
        height: -webkit-calc(~"100% - 38px");
        margin: 0 auto;
        top: 19px;
        border-radius: 3px;
    } 
}
@media screen and (min-width: 1320px){
    .Layout-container {
        width: 1276px;
    }
}
@media screen and (min-width: 1440px){
    .Layout-container {
        width: 1380px;
    }
}
</style>

