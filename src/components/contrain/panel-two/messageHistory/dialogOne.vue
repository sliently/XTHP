<template>
  <mu-list>
      <div class="dialog">
          <mu-list-item :disableRipple="true">
            <mu-avatar src="/static/image/11.jpg" slot="leftAvatar"/>
            <span slot="title">
                <span class="content" style="color: rgba(0, 0, 0, .9)">很好</span>
            </span>
        </mu-list-item>
      </div>
            <div class="dialog">
          <mu-list-item :disableRipple="true">
            <mu-avatar src="/static/image/11.jpg" slot="rightAvatar"/>
            <span slot="after">
                <span class="content" style="color: rgba(0, 0, 0, .9)">很好</span>
            </span>
        </mu-list-item>
      </div>
  </mu-list>
</template>
<script>
export default {
  name:'dialogOne'
}
</script>
<style lang="less" scoped>
.dialog{
    margin-top: 10px;
    font-size: 16px;
    .content{
        display: inline-block;
        padding: 1.5vh;
        background: #fff;
        border-radius: 10px;
    }
}
        
</style>
