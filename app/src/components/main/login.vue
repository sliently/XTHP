<template>
  <div class="login">
      <div class="pane-login">
          <div class="pane-logo">
              <img src="http://lhp313-1253555032.coscd.myqcloud.com/static/logo.png" alt="logo">
          </div>
          <transition name="bounce" mode="out-in">
            <div v-if="sign" key="login" class="signpad">
                <div class="sign-controls">
                    <mu-text-field hintText="邮箱"
                                type="email"
                                :fullWidth="true"
                                v-model="user_email"
                                icon="email"/>
                </div>
                <div class="sign-controls">
                    <mu-text-field hintText="密码"
                                type="password"
                                :fullWidth="true"
                                v-model="user_psw"
                                icon="https"/>
                </div>
                <div class="sign-action">
                    <mu-flat-button label="注册" @click.native="toggle"/>&nbsp;
                    <mu-raised-button label="登录" @click="login" primary/>
                </div>
            </div>
            <div v-else key="create" class="signpad">
                <div class="sign-controls">
                    <mu-text-field hintText="邮箱"
                                type="email"
                                :fullWidth="true"
                                v-model="user_email"
                                icon="email"/>
                </div>
                <div class="sign-controls">
                    <mu-text-field hintText="名字"
                                type="text"
                                :fullWidth="true"
                                v-model="user_name"
                                icon="people"/>
                </div>
                <div class="sign-controls">
                    <mu-text-field hintText="密码"
                                type="password"
                                :fullWidth="true"
                                v-model="user_psw"
                                icon="https"/>
                </div>
                <div class="sign-action">
                    <mu-raised-button label="注册" @click.enter="create" primary/>&nbsp;
                    <mu-flat-button label="登录" @click.native="toggle" />
                </div>
            </div>
          </transition>
      </div>
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
          sign:true
      }
  },
  methods:{
      toggle(){
          this.sign=!this.sign
      },
      create(){
          if(this.user_email.length=='' && this.user_psw=='' && this.user_name==''){
               let hint = "不能为空"
            this.$store.commit('showToasts',{toast:true,msg:hint})
              return
          }
          let re = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
          if(!re.test(this.user_email)){
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
                  if(data.errMsg=='ERROR1002'){
                    let hint = "该邮箱被注册"
                    that.$store.commit('showToasts',{toast:true,msg:hint})      
                  }
                  console.log(data.errMsg)
                  return
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
      }
  },
  watch:{
      user_token(curVal,oldVal){
          this.$router.push('/')
      }
  }
}
</script>
<style lang="less">
.bounce-enter-active {
  animation: bounce-out .3s;
}
.bounce-leave-active {
  animation: bounce-in .3s ;
}
@keyframes bounce-in {
  0% {
    opacity: 1;
    transform: translateX(0)
  }
  100% {
    opacity: 0;
    transform: translateX(-300px)
  }
}
@keyframes bounce-out {
  0% {
    opacity: 0;
    transform: translateX(300px)
  }
  100% {
    opacity: 1;
    transform: translateX(0)
  }
}                                                               
.login{
    position: relative;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,.298039);
    display: flex;
    justify-content: center;
    .pane-login{
        margin:0 auto;
        max-width: 400px;
        width: 90%;
        height: auto;
        padding-top: 50px;
        .signpad{
            background: #fff;
            border-radius: 10px;
            padding: 20px 30px;
            width: 100%;
            .sign-controls{
                width: 100%;
                .mu-text-field{
                    border: 2px solid rgba(76, 75, 75, 0.21);
                }
            }
            .sign-action{
                display: flex;
                justify-content: flex-end;
                margin-top: 30px;
                padding: 5px 10px;
            }
        }
        .pane-logo{
            text-align: center;
            img{
                max-width: 300px;
                width: 60%;
            }
        }
    }
}
</style>
