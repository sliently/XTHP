<template>
  <div v-if="backShow" class="back-bottom" :style="propsStyle" @click="movebottom">
    <slot>
      <div class="back-bottom-default">
          <mu-icon-button icon="keyboard_arrow_down"/>
      </div>
    </slot>
  </div>
</template>
<script>
import {backBottom} from './js/assist'
export default {
    name:"backBottom",
    data () {
        return {
        backShow: true
        }
    },
    props: {
        scrollRef:{
            type:Function,
            default:function(){
                return document.getElementsByTagName("body")
            }
        },
        height: {
            type:Function,
            default:function(){
                return 200
            }
        },
        bottom: {
            ype: Number,
            default: 25
        },
        right: {
            type: Number,
            default: 30
        },
        durations: {
            type: Number,
            default: 500
        },
        callBack: {
            type: Function,
            default: () => {
            }
        }
    },
    computed: {
        propsStyle () {
        return {
            right: `${this.right}px`,
            bottom: `${this.bottom}px`
        }
        }
    },
    methods: {
        movebottom () {
            backBottom(this.durations,this.scrollRef(),this.height(), this.callBack)
        },
        scrollListener () {
            this.backShow = this.scrollRef().scrollTop < this.height()
        }
    },
    mounted () {
        this.scrollRef().addEventListener('scroll', this.scrollListener, false)
        this.scrollRef().addEventListener('resize', this.scrollListener, false)
    },
    beforeDestroy () {
        this.scrollRef().removeEventListener('scroll', this.handleScroll, false)
        this.scrollRef().removeEventListener('resize', this.handleScroll, false)
    }
}
</script>
<style lang="less" scoped>
.back-bottom {
  position: absolute;
  z-index: 25;
  cursor: pointer;
  display: block;
  border-radius: 4px;
    &-default {
    background-color: rgba(255,255,255,.6);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
    transition: all .2s ease-in-out;
    display: block;
  }
}
</style>
