<template>
  <VueDragResize
    :w="dragBlockData.blockWidth"
    :h="dragBlockData.blockHeight"
    :isResizable="false"
    :parentW="100000000"
    :parentH="100000000"
    :x="dragBlockData.x"
    :y="dragBlockData.y"
    :parentLimitation="true"
    v-on:dragging="onDragging"
  >{{ dragBlockData.name }}</VueDragResize>
</template>

<script>
import VueDragResize from 'vue-drag-resize'
import { mapActions } from 'vuex'
export default {
  components: {
    VueDragResize
  },
  watch: {
    dragBlockData (newValue, oldValue) {
      console.log(newValue)
    }
  },
  updated () {
    console.log(this.dragBlockData)
  },
  methods: {
    ...mapActions({
      updateAttr: 'vizDesign/updateAttr'
    }),
    onDragging (dragObj) {
      console.log(dragObj)
      let obj = {
        index: this.dragBlockDataIndex,
        attrs: {
          x: dragObj.left,
          y: dragObj.top
        }
      }
      this.updateAttr(obj)
    }
  },
  props: {
    dragBlockData: {
      type: Object,
      default: null
    },
    dragBlockDataIndex: {
      type: Number,
      default: -1
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
