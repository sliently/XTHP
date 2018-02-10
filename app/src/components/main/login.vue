<template>
  <div class="login">
      <transition name="bounce" mode="out-in">
        <mu-paper v-if="hh" class="login-border" :zDepth="1">
            <div class="title">登   录</div>
            <mu-text-field class="sign" type="email" @blur="watchUser" label="账号" :errorText="errs" v-model="user_email" labelFloat/><br>
            <mu-text-field label="密码" type="password" v-model="user_psw" labelFloat/>
            <div style="width:100%;height:40px;position:relative;">
                <button class="loginSubit" @click.enter="login">登录</button>
            </div>
            <div style="position:absolute;bottom:10px;right:10px;">
                <mu-icon-button @click="toggle" icon="autorenew"/> 
            </div>
        </mu-paper>
        <mu-paper v-else class="login-border" :zDepth="1">
            <div class="title">注  册</div>
            <mu-text-field class="sign" label="账号" @blur="watchUser" :errorText="errs" v-model="user_email" labelFloat/><br>
            <mu-text-field class="sign" label="name" v-model="user_name" labelFloat/><br>
            <mu-text-field label="密码" type="password" v-model="user_psw" labelFloat/>
            <div style="width:100%;height:40px;position:relative;">
                <button class="loginSubit" @click.enter="create">注册</button>
            </div>
            <div style="position:absolute;bottom:10px;right:10px;">
                <mu-icon-button @click="toggle" icon="autorenew"/> 
            </div>
        </mu-paper>
      </transition>
  </div>
</template>
<script>
export default {
  name:'login',
  data(){
      return{
          user_email:'',
          user_psw:'',
          user_token:null,
          user_name:'',
          hh:true,
          errs:""
      }
  },
  methods:{
      toggle(){
          this.hh=!this.hh
      },
      create(){
          if(this.user_email.length=='' && this.user_psw=='' && this.user_name==''){
               let hint = "不能为空"
            this.$store.commit('showToasts',{toast:true,msg:hint})
              return
          }
          let re = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
          if(!re.test(this.user_email)){
              this.errs = "请输入正确邮箱"
              let hint = "请输入正确邮箱"
            this.$store.commit('showToasts',{toast:true,msg:hint})
              return
          }
          let that = this
          this.$socket.emit('createUser',{
            password: this.user_psw,
            nickname:this.user_name,
            email: this.user_email
          },function(data){
              if(data.isError){
                  console.log(data.errMsg)
              }
            let hint = "注册成功"
            that.$store.commit('showToasts',{toast:true,msg:hint})
            that.$cookies.set('user',data.token)
            that.user_token=that.$cookies.get('user')
          })
      },
      login(){
          let re = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
          if(!re.test(this.user_email)){
              this.errs = "请输入正确邮箱"
              let hint = "请输入正确邮箱"
                this.$store.commit('showToasts',{toast:true,msg:hint})
              return
          }
          let that = this
          this.$socket.emit('verifyUser',{
            password: this.user_psw,
            email: this.user_email
          },function(data){
              if(data.isError){
                  console.log(data.errMsg)     
                    let hint = "账号或密码错误"
                    that.$store.commit('showToasts',{toast:true,msg:hint})
                  return
              }
            that.$cookies.set('user',data.token)
            that.user_token=that.$cookies.get('user')
          })
      },
      watchUser(){
          let re = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
          if(re.test(this.user_email)){
              this.errs = ""
          }else{
              this.errs = "请输入正确邮箱"
          }
      }
  },
  watch:{
      user_token(curVal,oldVal){
          this.$router.push('/')
      }
  }
}
</script>
<style lang="less" scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}                                                               
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
            cursor: pointer;
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
