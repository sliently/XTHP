<template>
  <div class="sendMessage">
      <mu-icon-button icon="tag_faces"/>
      <div class="inputSend">
          <mu-text-field :fullWidth="true"
                         iconClass="tag_faces"
                         underlineFocusClass="underline"
                    hintText="请输入表情或者文字"/>
      </div>
    <mu-icon-button icon="send"/>
  </div>
</template>
<script>
export default {
  name:"sendMessage"
}
</script>
<style lang="less" scoped>
.sendMessage{
    position: absolute;
    bottom: 0;
    height: 60px;
    width: 100%;
    line-height: 60px;
    background-color: rgb(238, 238, 238);
    .inputSend{
        position: relative;
        height: 100%;
        width: calc(~"100% - 120px");
        display: inline-block;
    }
}
</style>
<style lang="less">
.sendMessage{
    .inputSend{
        .tag_faces{
           color:#666; 
        }
        .underline{
            background-color:#666; 
        }
    }
    
}

</style>
