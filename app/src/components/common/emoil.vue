<template>
  <div class="emoil">
      <div v-for="x in emoil" class="img" @click="addEmoil(x.value)" :style="`background:url('${x.src}') 0px 0px no-repeat;`"></div>
  </div>
</template>
<script>
import emoils from './js/emoil'
export default {
  name:"emoil",
  data(){
      return {
          emoil:emoils
      }
  },
  methods:{
      addEmoil(val){
          this.$emit('addEmoil',val)
      }
  }
}
</script>
<style lang="less" scoped>
.emoil{
    position: absolute;
    bottom: 48px;
    width: 100%;
    height: auto;
    background-color: #eee;
    z-index: 500;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-wrap:wrap;
    padding: 4px;
    .img{
        margin: 2px;
        width: 28px;
        height: 28px;
    }
}
</style>

