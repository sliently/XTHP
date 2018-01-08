<template>
    <div class="manager">
        <mu-appbar title="群组信息">
            <mu-icon-button @click="closeRightIndex" icon="close" slot="left"/>
        </mu-appbar>
        <div class="Profile-body">
            <!-- 群组信息 -->
            <my-group></my-group>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
import MyGroup from './group'
export default {
  name:'rightIndex',
  components:{
      MyGroup
  },
  methods:{
      ...mapMutations(['closeRightIndex'])
  }
}
</script>
<style lang="less" scoped>
    .manager{
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        pointer-events: auto;
        width: 100%;
        height: 100%;
        background: #f5f5f5;
}
</style>

