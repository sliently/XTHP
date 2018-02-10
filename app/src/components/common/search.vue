<template>
      <!-- 搜索框 -->
        <div ref="search" class="search-input">
            <mu-text-field :icon="searchInput" 
            :fullWidth="true" 
            :iconClass="iconColor"
            @focus="focusIcon"
            @blur="blurIcon"
            v-model="query"
            :underlineShow="false"
            hintText="搜索或开始新的对话"/>
        </div>
</template>
<script>
import {debounce} from './js/util'
export default {
name:"MySearch",
data(){
      return {
          searchInput:'search',
          iconColor:'search-icon',
          query:''
      }
  },
  created(){
    //   延迟提交
      this.$watch('query',debounce((newVal)=>{
          this.$emit('query', newVal)
      },500))
  },
methods:{
    focusIcon(){
          this.searchInput="arrow_back"
          this.$refs.search.classList.add("search-input-active")
          this.iconColor = 'search-icon-active'
      },
      blurIcon(){
          this.searchInput="search"
          this.$refs.search.classList.remove("search-input-active")
          this.iconColor = 'search-icon'
      }
    }     
}
</script>
<style lang="less" scoped>
.search-input{
    border: 1px solid #eee;
    height: 49px;
    line-height: 49px;
    
}
.search-input-active{
    box-shadow: 0 2px 3px rgba(0,0,0,.07);
}
</style>
<style lang="less">
.search-input{
    .search-icon{
        color:#666;
    }
    .search-icon-active{
        color:rgba(27, 155, 177, 0.79);
    }
}
</style>