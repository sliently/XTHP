<template>
  <!-- <div>{{$route.params.id}}</div> -->
</template>
<script>
export default {
  name:'invite',
  created(){
      let invite = this.$route.params.id
      let token = this.$cookies.get('user')
      this.$socket.emit('invite',{invite,token},(info)=>{
          if (info.isError) {
            console.log(info.errMsg)
            return
            }
            if(info.isOk){
                this.$router.push('/')
                return
            }
      })
  },
}
</script>
