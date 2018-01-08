<template>
  <div class="login">
      <mu-paper class="login-border" :zDepth="1">
          <div class="title">登   录</div>
          <mu-text-field class="sign" label="账号" labelFloat/><br>
          <mu-text-field label="密码" labelFloat/>
          <div style="width:100%;height:40px;position:relative;">
              <button class="loginSubit">登录</button>
          </div>
      </mu-paper>
  </div>
</template>
<script>
export default {
  name:'login'
}
</script>
<style lang="less" scoped>
.login{
    position: relative;
    height: 100%;
    width: 100%;
    background: #eee;
    .login-border{
        position: relative;
        margin: 0 auto;
        top: 150px;
        width: 300px;
        height: auto;
        padding: 30px;
        .title{
            font-family: 华文彩云;
            text-align: center;
            color: red;
            font-size: 30px;
        }
        .loginSubit{
            position: relative;
            left: 20px;
            width: 80%;
            height: 30px;
            outline: none;
            color: #fff;
            background: #212121;
            border: none;
            border-radius: 15px;
            margin: 0 auto;
        }
    }
    
}
</style>
