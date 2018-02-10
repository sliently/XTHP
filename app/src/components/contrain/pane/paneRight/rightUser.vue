<template>
  <div class="manager">
        <mu-appbar title="用户列表">
            <mu-icon-button @click="closeRightIndex" icon="close" slot="left"/>
        </mu-appbar>
        <div class="Profile-body">
        </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name:'rightUser',
  computed:{
      ...mapState(['rightUser'])
  },
  methods:{
      ...mapMutations(['closeRightIndex'])
  }
}
</script>
<style lang="less" scoped>

</style>

