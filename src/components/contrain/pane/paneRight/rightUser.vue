<template>
  <div class="manager">
        <mu-appbar title="用户列表">
            <mu-icon-button @click="closeRightIndex" icon="close" slot="left"/>
        </mu-appbar>
        <div class="Profile-body">
            <my-message-list></my-message-list>
        </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import MyMessageList from '@/components/common/messageList'
export default {
  name:'rightUser',
  computed:{
      ...mapState(['rightUser'])
  },
  components:{
      MyMessageList
  },
  methods:{
      ...mapMutations(['closeRightIndex'])
  }
}
</script>
<style lang="less" scoped>

</style>

