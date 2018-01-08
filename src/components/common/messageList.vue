<template>
  <div>
      <!-- 搜索框 -->
        <div class="search-input">
            <mu-text-field :icon="searchInput" 
            :fullWidth="true" 
            iconClass="search-icon"
            @focus="focusIcon"
            @blur="blurIcon"
            :underlineShow="false"
            hintText="搜索或开始新的对话"/>
        </div>
        <!-- 列表 -->
        <div class="message-list">
            <mu-list>
                <mu-list-item title="Mike Li">
                    <mu-avatar src="static/image/12.jpg" slot="leftAvatar"/>   
                    <span slot="describe">
                        <span style="color: rgba(0, 0, 0, .5)">你swq好啊</span>
                    </span>
                    <div value="chat_bubble" slot="right">
                        <span class="time">12:20</span>
                        <mu-badge content="12" slot="after"/>
                    </div>
                </mu-list-item>
                <mu-divider/>
            </mu-list>
        </div>
  </div>
</template>
<script>
export default {
  name:"messageList",
    data(){
      return {
          searchInput:'search'
      }
  },
  props:{
      message:{
          type:Object,
          default:null
      }
  },
  methods:{
      focusIcon(){
          this.searchInput="arrow_back"
      },
      blurIcon(){
          this.searchInput="search"
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
</style>
<style lang="less">
.search-input{
    .search-icon{
        color:#666;
    }
}
</style>


