<template>
  <VueDragResize
    :isActive="isActive"
    :w="dragBlockData.blockWidth"
    :h="dragBlockData.blockHeight"
    :isResizable="false"
    :parentW="100000000"
    :parentH="100000000"
    :x="dragBlockData.x"
    :y="dragBlockData.y"
    :z="getZindex"
    :parentLimitation="true"
    @dragging="onDragging"
    dragHandle=".item-title"
    @dragstop="dragstop"
    @clicked="handleBlockClick"
  >
    <div class="item-container" :id="dragBlockData.id">
      <div class="item-title">drag me</div>
      <div class="item-content">
        <el-button type="primary"   @click.stop.prevent="handleButtonClick">{{ dragBlockData.name }}</el-button>
      </div>
      <div>
        <el-checkbox-group v-model="checkList" @change="handleCheckChange" >
          <el-checkbox value='A' label="复选框 A"></el-checkbox>
          <el-checkbox value='A' label="复选框 B"></el-checkbox>
          <el-checkbox value='A' label="复选框 C"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
       {{ dragBlockData.description }}
      </div>
    </div>
  </VueDragResize>
</template>

<script>
import VueDragResize from '../common/drag-comp/vue-drag-resize.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      isActive: false,
      checkList: [],
      zIndex: 0
    }
  },
  computed: {
    // tool () {
    //   return this.data
    // }
    ...mapGetters({
      theTool: 'vizDesign/getTool'
    }),
    getZindex () { //
      let zIndex = 0
      if (!this.theTool && this.canUpBlockZ) {
        // if (this.mouseDown) {
        zIndex = 1
      }
      // }
      return zIndex
    }

  },
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
      this.isActive = true
      let obj = {
        index: this.dragBlockDataIndex,
        attrs: {
          x: dragObj.left,
          y: dragObj.top
        }
      }
      this.updateAttr(obj)
    },
    dragstop (dragObj) {
      this.isActive = false
    },
    handleBlockClick (event) {
      // event.stopPropagation()
      // let el1 = event.currentTarget
      // let el2 = event.target
      // if (el1 === el2) {
      console.log(event, 'block')
      // } else {
      // }
    },
    handleButtonClick (event) {
      // 阻止冒泡
      event.stopPropagation()
      // 阻止默认事件
      event.preventDefault()
      console.log(event, 'button')
    },
    handleCheckChange (value) {
      console.log(value, 'value')
      console.log(this.checkList, 'checkList')
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
    },
    mouseDown: {
      type: Boolean,
      default: false
    },
    canUpBlockZ: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.item-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .item-title {
    line-height: 30px;
    background-color: #b3c0d1;
  }
}
.inactive {
  border: 1px solid #b3c0d1;
}
.active {
  border: 1px solid #409eff;
  &::before {
    outline: none !important;
  }
}
</style>
