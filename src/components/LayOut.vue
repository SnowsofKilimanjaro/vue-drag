<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <div class="left">
        <LeftList></LeftList>
      </div>
      <div class="center" id="canvas-container" @drop="drop" @dragover="allowDrop">
        <div class="drag-blocks-container" >
          <!-- <div
          class="drag-block"
          v-for="(item,index) in dataList"
          :key="item.id"
          >-->
          <drag-block
            v-for="(item,index) in dataList"
            :key="item.id"
            v-bind:drag-block-data="item"
            :drag-block-data-index="index"
          ></drag-block>
          <!-- </div> -->
        </div>

        <canvas :height="canvasHeight" :width="canvasWidth"></canvas>
      </div>
      <div class="right">444</div>
    </el-main>
  </el-container>
</template>

<script>
import LeftList from './LeftList'
import DragBlock from './DragBlock'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    LeftList,
    DragBlock
  },
  data () {
    return {
      canvasHeight: 0,
      canvasWidth: 0
    }
  },
  mounted () {
    this.canvasHeight = document.getElementById('canvas-container').clientHeight
    this.canvasWidth = document.getElementById('canvas-container').clientWidth
  },
  watch: {
    dataList (newValue, oldValue) {
      this.calcCanvasHeightAndWidth()
    }
  },
  computed: {
    ...mapGetters({
      dataList: 'vizDesign/getDataList'
    }),
    getBlocksContainerStyle () {
      return {
        height: this.canvasHeight + 'px',
        width: this.canvasWidth + 'px'
      }
    }
  },
  methods: {
    ...mapActions({
      addToDataList: 'vizDesign/addToDataList'
    }),
    calcCanvasHeightAndWidth () {
      let maxX = this.dataList[0].x
      let maxY = this.dataList[0].y
      let blockHeight = this.dataList[0].blockHeight
      let blockWidth = this.dataList[0].blockWidth
      this.dataList.map((item, index) => {
        if (item.x > maxX) {
          maxX = item.x
          blockWidth = item.blockWidth
        }
        if (item.y > maxY) {
          maxY = item.y
          blockHeight = item.blockHeight
        }
      })
      let tempWidth = maxX + blockWidth
      let tempHeight = maxY + blockHeight
      if (this.canvasWidth < tempWidth) {
        this.canvasWidth = tempWidth
      }
      if (this.canvasHeight < tempHeight) {
        this.canvasHeight = tempHeight
      }
    },
    drop (ev) {
      ev.preventDefault()
      let dragId = ev.dataTransfer.getData('dragId')
      let newObj = {
        id: new Date().getTime(),
        dragId,
        name: 'drag' + dragId,
        x: ev.offsetX,
        y: ev.offsetY,
        blockHeight: 200,
        blockWidth: 100
      }
      this.addToDataList(newObj)
      // this.dataList.push(newObj)
      // console.log(this.dataList)
    },
    allowDrop (ev) {
      ev.preventDefault()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './layout.scss';
</style>
