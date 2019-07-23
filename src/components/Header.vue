<template>
    <div class="operation">
      <template >
        <div class="clear" @mouseenter="enter" @mouseleave="leave">
          <div class="theIcon" @click="handleClearCanvas">
            <svg class="icon icon-M fill-undefined undefined">
              <use xlink:href="#icon-delete-all">
                <svg id="icon-delete-all" viewBox="0 0 32 32" width="100%" height="100%">
                  <title>delete-all</title>
                  <path :fill="svgColor" d="M8 25.333c0 1.467 1.2 2.667 2.667 2.667h10.667c1.467 0 2.667-1.2 2.667-2.667v-16h-16v16zM25.333 5.333h-4.667l-1.333-1.333h-6.667l-1.333 1.333h-4.667v2.667h18.667v-2.667z"></path>
                </svg>
              </use>
            </svg>
          </div>
          <div class="text" @click="handleClearCanvas">清空画布</div>
        </div>
      </template>
      <template v-if="selectType">
        <div class="clear" @mouseenter="enter" @mouseleave="leave" @click="deleteObj">
          <div class="theIcon">
            <svg class="icon icon-M fill-undefined undefined">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-remove-circle-outline">
                <svg id="icon-remove-circle-outline" viewBox="0 0 32 32" width="100%" height="100%">
                  <title>remove-circle-outline</title>
                  <path :fill="svgColor" d="M9.333 14.667v2.667h13.333v-2.667h-13.333zM16 2.667c-7.36 0-13.333 5.973-13.333 13.333s5.973 13.333 13.333 13.333 13.333-5.973 13.333-13.333-5.973-13.333-13.333-13.333zM16 26.667c-5.88 0-10.667-4.787-10.667-10.667s4.787-10.667 10.667-10.667 10.667 4.787 10.667 10.667-4.787 10.667-10.667 10.667z"></path>
                </svg>
              </use>
            </svg>
          </div>
          <div class="text">删除</div>
        </div>
        <div class="rotate" v-if="showRotate">
          <div class="theIcon" @click="rotateObj">
            <svg class="icon icon-M fill-undefined undefined">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-rotate">
                <svg id="icon-rotate" viewBox="0 0 32 32" width="100%" height="100%">
                  <title>rotate</title>
                  <path d="M9.787 8.547l-8.64 8.653 8.653 8.64 8.653-8.64-8.667-8.653zM4.92 17.2l4.88-4.88 4.867 4.88-4.88 4.88-4.867-4.88zM25.813 8.853c-2.333-2.347-5.413-3.52-8.48-3.52v-4.32l-5.653 5.653 5.653 5.653v-4.32c2.387 0 4.773 0.907 6.6 2.733 3.64 3.64 3.64 9.56 0 13.2-1.827 1.827-4.213 2.733-6.6 2.733-1.293 0-2.587-0.28-3.787-0.813l-1.987 1.987c1.8 0.987 3.787 1.493 5.773 1.493 3.067 0 6.147-1.173 8.48-3.52 4.693-4.68 4.693-12.28 0-16.96z"></path>
                </svg>
              </use>
            </svg>
          </div>
          <div class="text" @click="rotateObj">Rotate</div>
        </div>
        <template v-if="selectType === 'ruler'">
          <input v-model="textValue" placeholder="请输入"  maxlength="10"/>
        </template>
      </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    // clearCanvas: {
    //   type: Function,
    //   default: null
    // }
  },
  data () {
    return {
      svgColor: 'black'

      // get () {
      //   return this.value
      // },
      // set (value) {
      //   this.$store.commit('vizDesign/setTextValue', value)
      // }
    }
  },
  computed: {
    ...mapGetters({
      selectType: 'vizDesign/getSelectType'
    }),
    showRotate () {
      let linesType = ['solidArrowLine', 'dottedArrowLine', 'waveLine', 'dottedLine', 'ruler']
      if (linesType.includes(this.selectType)) {
        return false
      }
      return true
    },
    textValue: {
      get () {
        return this.$store.state.vizDesign.textValue
      },
      set (value) {
        this.$store.commit('vizDesign/setTextValue', value)
      }
    }
  },
  watch: {
  },
  methods: {
    handleClearCanvas () {
      // this.$parent.clearCanvas()
      this.$emit('clearCanvas')
    //   if (this.clearCanvas) {
    //     this.clearCanvas()
    //   }
    },
    deleteObj () {
      this.$emit('toDelete')
    },
    rotateObj () {

    },
    enter () {
      this.svgColor = '#d1495b'
    },
    leave () {
      this.svgColor = 'black'
    }
  }
}
</script>

<style lang="scss" scoped>
@import './Header.scss';
</style>
