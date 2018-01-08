<template>
  <div class="main">
      <my-contrain></my-contrain>
  </div>
</template>
<script>
import MyContrain from '@/components/contrain/contrain'
export default {
  name:'Mains',
  components:{
      MyContrain
  }
}
</script>
<style lang="less">
.main{
  width: 100%;
  height: 100%;
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513002182803&di=f90c63984d01c12e20848e240f49ec40&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20160113%2Ftooopen_sy_154232264811.jpg');
  background-size: cover;
}
</style>
