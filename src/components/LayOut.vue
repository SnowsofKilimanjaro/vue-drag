<template>
  <el-container>
    <el-header>
      <Header @clearCanvas="clearCanvas" @toDelete="toDelete"></Header>
    </el-header>
    <el-main>
      <div class="left">
        <LeftList @changeTool="changeTool"></LeftList>
      </div>
      <div class="center" id="canvas-container" @drop="drop" @dragover="allowDrop">
        <div
          class="drag-blocks-container"
          :style="getBlocksContainerStyle"
          @mousemove="canvasMove($event)"
        >
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
            :mouse-down="mouseDown"
            :canUpBlockZ="canUpBlockZ"
          ></drag-block>
          <!-- </div> -->
        </div>

        <canvas
          :height="canvasHeight"
          ref="canvas"
          :width="canvasWidth"
          @mousedown="canvasDown($event)"
          @mousemove="canvasMove($event)"
          @mouseup="canvasUp($event)"
        ></canvas>
      </div>
      <div class="right">444</div>
    </el-main>
  </el-container>
</template>

<script>
import LeftList from './LeftList'
import DragBlock from './DragBlock'
import Line from '../common/tool/line'
import Header from './Header'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    LeftList,
    DragBlock,
    Header
  },
  data () {
    return {
      canvasHeight: 0,
      canvasWidth: 0,
      mouseDown: false,
      edgeColor: 'white',
      canUpBlockZ: true,
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 0,
        y: 0
      },
      otherStack: [], // 存放已经画好的线比如 line 用于画别的内容的时候 重绘已经画的好的
      playerStack: [], // 存放其他内容
      isOn: false // 标记当前光标是不是在某个移动块上
    }
  },
  mounted () {
    this.canvasHeight = document.getElementById('canvas-container').clientHeight
    this.canvasWidth = document.getElementById('canvas-container').clientWidth
  },
  watch: {
    dataList (newValue, oldValue) {
      this.calcCanvasHeightAndWidth()
    },
    textValue (newValue, oldValue) {
      if (this.selectObj instanceof Line && this.selectObj.type === 'ruler') {
        this.selectObj.text = this.textValue
        this.canvas
          .getContext('2d')
          .clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.reDraw()
        this.selectObj.drawEdges()
      }
    }
  },
  computed: {
    ...mapGetters({
      dataList: 'vizDesign/getDataList',
      tool: 'vizDesign/getTool',
      linesColor: 'vizDesign/getLinesColor',
      color: 'vizDesign/getColor',
      textValue: 'vizDesign/getTextValue',
      theTool: 'vizDesign/getTool',
      leftList: 'vizDesign/getLeftList'
    }),
    getBlocksContainerStyle () {
      return {
        height: this.canvasHeight + 'px',
        width: this.canvasWidth + 'px'
      }
    },
    canvas () {
      return this.$refs.canvas
    }
  },
  methods: {
    ...mapActions({
      addToDataList: 'vizDesign/addToDataList'
    }),
    // 动态计算画布的宽高
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
      this.reDraw()
    },
    // 根据 id 获取 leftlist中的数据
    getItemById (id) {
      for (let index = 0; index < this.leftList.length; index++) {
        const element = this.leftList[index]
        if (element.id.toString() === id) {
          return element
        }
      }
    },
    drop (ev) {
      ev.preventDefault()
      let dragId = ev.dataTransfer.getData('dragId')
      let dragItem = this.getItemById(dragId)
      let newObj = {
        id: new Date().getTime(),
        dragId,
        name: 'drag' + dragId,
        x: ev.offsetX,
        y: ev.offsetY,
        blockHeight: 200,
        blockWidth: 100,
        isExpand: true,
        handleWidth: 100,
        handleHeight: 30,
        type: dragItem.type,
        description: dragItem.description
      }
      this.addToDataList(newObj)
      // this.dataList.push(newObj)
      // console.log(this.dataList)
    },
    allowDrop (ev) {
      ev.preventDefault()
    },
    changeTool (event) {
      let ele = event.target
      let eleType = ele.nodeName.toLowerCase()
      let theTool
      if (eleType === 'span') {
        theTool = ele.id === this.theTool ? '' : ele.id
      } else if (eleType === 'svg') {
        theTool = ele.parentNode.id === this.theTool ? '' : ele.parentNode.id
      } else if (eleType === 'path') {
        theTool =
          ele.parentNode.parentNode.id === this.theTool
            ? ''
            : ele.parentNode.parentNode.id
      }
      this.$store.commit('vizDesign/setTool', theTool)
    },
    // 根据当前坐标判断选中内容
    getSelectObj (x, y) {
      let arr = []
      for (let obj of this.otherStack) {
        obj.draw()
        if (obj.inRange(x, y)) {
          arr.push(obj)
        }
      }
      let thisObj = {}
      if (arr.length === 1) {
        thisObj = arr[0]
      } else if (arr.length > 1) {
        thisObj = arr[0]
      }
      return thisObj
    },
    // BEGIN caodan 19-07-11 16:33
    // DESCRIPTION:  判断当前块儿类型是否匹配
    // END
    isSameType (type) {
      if (this.theTool === type) {
        return true
      }
      return false
    },
    // BEGIN caodan 19-07-11 16:59
    // DESCRIPTION: 在鼠标按下时，鼠标位置在块儿上的处理
    // END
    opreDownOnBlock (block, x, y) {
      let isSameType = this.isSameType(block.type) // 判断移动块儿与选中的线类型是否匹配
      this.reDraw()
      if (isSameType) {
        this.mouseDown = true // 如果匹配可以画线
        this.start = this.end = { x, y } // 获取当前光标位置 并初始化 start 和 end
      } else {
        this.mouseDown = false // 如果不匹配，按下无效
      }
    },
    // BEGIN caodan 19-07-11 17:01
    // DESCRIPTION: 处理鼠标按下时，鼠标位置不再移动块儿上
    // END
    opreOutBlock (x, y) {
      let ctx = this.canvas.getContext('2d')
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      let thisObj = this.getSelectObj(x, y)
      if (JSON.stringify(thisObj) === '{}') {
        // 如果没有选中的线
        this.selectObj = {}
        this.mouseDown = false
        this.$store.commit('vizDesign/setTextValue', '')
        this.$store.commit('vizDesign/changeSelectType', null) // 当前没有选中内容，所以将选中内容置空
      } else {
        // 有选中内容
        // this.$store.commit('vizDesign/changeSelectState', true)
        if (thisObj.type === 'ruler') {
          this.$store.commit('vizDesign/setTextValue', thisObj.text)
        }
        thisObj.drawEdges()
        this.selectObj = thisObj
        this.mouseDown = true
        this.start = this.end = { x, y } // 获取当前光标位置 并初始化 start 和 end
        this.$store.commit('vizDesign/changeSelectType', thisObj.type) // 将当前选中内容的类型存到store 中
      }
    },
    // BEGIN caodan 19-07-11 16:30
    // DESCRIPTION: 判断鼠标是否可以按下 前提： 鼠标位置在块儿上且类型匹配，或者不再块儿上但是在线上
    // END
    canMoveDown (event) {
      let { x, y } = this.canvasMousePos(event)
      let block = this.hasOnBlock(x, y)
      if (block) {
        // 光标位置在移动块儿上
        this.opreDownOnBlock(block, x, y)
      } else {
        // 如果光标位置不再移动块儿上，
        this.opreOutBlock(x, y)
      }
    },

    // BEGIN caodan 19-07-10 14:42
    // DESCRIPTION: 鼠标按下需要判断是否选中某个已经存在画布上的内容
    // END
    canvasDown (event) {
      this.canMoveDown(event)
    },
    // getScrollTop () {
    //   let scrollTop = 0
    //   if (document.documentElement && document.documentElement.scrollTop) {
    //     scrollTop = document.documentElement.scrollTop
    //   } else if (document.body) {
    //     scrollTop = document.body.scrollTop
    //   }
    //   return scrollTop
    // },
    //  获取位置信息
    canvasMousePos (event) {
      // let x = (document.documentElement.scrollLeft || document.body.scrollLeft) + (event.clientX || event.pageX)
      // let y = (event.clientY || event.pageY) + this.getScrollTop()
      // return {
      //   x: x - canvas.offsetLeft,
      //   y: y - canvas.offsetTop
      // }
      return {
        x: event.offsetX,
        y: event.offsetY
      }
    },
    // BEGIN caodan 19-07-11 11:48
    // DESCRIPTION: 判断光标是否移动到了移动块儿上，如果移动到了，判断该块支持不支持画该类型的线
    // END
    hasOnBlock (eventX, eventY) {
      let block = null
      for (let index = 0; index < this.dataList.length; index++) {
        let element = this.dataList[index]
        let {
          blockHeight,
          blockWidth,
          isExpand,
          handleWidth,
          handleHeight,
          x,
          y
        } = element
        if (isExpand) {
          // 判断当前移动块展开还时收起状态
          if (
            eventX >= x &&
            eventX <= x + blockWidth &&
            eventY >= y &&
            eventY <= y + blockHeight
          ) {
            // if (this.theTool === type) {
            this.isOn = true
            block = element
            // }
          }
        } else {
          if (
            eventX >= x &&
            eventX <= x + handleWidth &&
            eventY >= y &&
            eventY <= y + handleHeight
          ) {
            this.isOn = true
            block = element
          }
        }
      }
      this.isOn = false
      return block
    },
    // BEGIN caodan 19-07-11 11:40
    // DESCRIPTION:  1.光标移动时判断是否移动了某个移动块上
    //               2.如果有判断该块儿支持不支持该画选中类型的线，如果支持，光标对应箭头右下角出现该类型的线
    //               3.如果不支持该类型的线，则光标设置为拒绝图标
    // END
    onMove (event) {
      // 获取当前光标相对于画布的所在位置
      // let evPosition = this.canvasMousePos(event)
    },
    // 根据不同类型返回不同光标形状
    getCursorUrlByType (type) {
      switch (type) {
        case 'solidArrowLine':
          return 'url(' + process.env.BASE_URL + 'solid-line.png),auto'
        case 'dottedArrowLine':
          return 'url(' + process.env.BASE_URL + 'dotted-arrow.png),auto'
        case 'waveLine':
          return 'url(' + process.env.BASE_URL + 'wave-line.png),auto'
        case 'dottedLine':
          return 'url(' + process.env.BASE_URL + 'dotted-line.png),auto'
        case 'ruler':
          return 'url(' + process.env.BASE_URL + 'ruler.png),auto'

        default:
          break
      }
    },
    // BEGIN caodan 19-07-11 17:19
    // DESCRIPTION: 鼠标移动到块儿上时，光标显示样式 选择了线类型才会调用此方法
    // END
    opreMoveOnBlock (block) {
      if (this.theTool && block.type !== this.theTool) {
        this.canvas.style.cursor =
          'url(' + process.env.BASE_URL + 'not-allowed.png),auto'
      } else {
        let cursorUrl = this.getCursorUrlByType(block.type)
        this.canvas.style.cursor = cursorUrl
      }
    },
    // BEGIN caodan 19-07-11 17:29
    // DESCRIPTION: 鼠标在移动块儿外时，光标显示样式 选择了线类型才会调用此方法
    // END
    opreMoveOutBlock () {
      if (!this.mouseDown) {
        this.canvas.style.cursor =
          'url(' + process.env.BASE_URL + 'not-allowed.png),auto'
      } else {
        let tool = this.tool
        let canvas = this.canvas
        let ctx = canvas.getContext('2d')
        this.end = this.canvasMousePos(event)
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        let id = new Date().getTime()
        if (
          tool === 'solidArrowLine' ||
          tool === 'dottedArrowLine' ||
          tool === 'waveLine' ||
          tool === 'dottedLine' ||
          tool === 'ruler'
        ) {
          let lineColor = this.color[this.linesColor]
          this.obj = new Line(
            ctx,
            id,
            tool,
            this.start,
            this.end,
            lineColor,
            this.edgeColor
          )
          this.reDraw() // 绘制已经绘制好的线
          this.obj.draw() // 绘制当前线
          this.obj.drawEdges() // 绘制线两边的选中框
        }
      }
    },
    // BEGIN caodan 19-07-11 17:51
    // DESCRIPTION: 如果没有选择线类型，则根据是否按下过鼠标以及按下时是否选中了线，来移动线位置
    // END 注意 移动线的时候如果当前在块儿内，移动块的zindex 不能比canvas的zindex  高
    moveSelectedLine (event, block) {
      if (this.mouseDown && JSON.stringify(this.selectObj) !== '{}') {
        // 如果当前选中了线
        this.end = this.canvasMousePos(event)
        if (this.selectObj instanceof Line) {
          this.selectObj.move(
            this.end.x - this.start.x,
            this.end.y - this.start.y
          )
        }
        let canvas = this.canvas
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.reDraw()
        this.selectObj.drawEdges()
        if (block) {
          this.canUpBlockZ = false
        } else {
          this.canUpBlockZ = true
        }
      }
    },
    // BEGIN caodan 19-07-10 14:35
    // DESCRIPTION: 光标移动有两种可能 ：1. tool存在则判定为 画 2.tool 不存在 如果有选中 则判定为移动
    // END 光标移动时判断 判断是否可画线 1.判断光标是否在拖拽块上
    canvasMove (event) {
      let mouseDown = this.mouseDown
      let tool = this.tool
      let { x, y } = this.canvasMousePos(event)
      let block = this.hasOnBlock(x, y)
      if (tool) {
        if (block) {
          this.opreMoveOnBlock(block)
        } else {
          if (!mouseDown) {
            this.canvas.style.cursor =
              'url(' + process.env.BASE_URL + 'not-allowed.png),auto'
          } else {
            this.opreMoveOutBlock()
          }
        }
      } else {
        // this.moveSelectedLine(event, block) //移动线的功能暂时去掉
        this.canvas.style.cursor = 'default'
      }
    },
    // BEGIN caodan 19-07-11 19:42
    // DESCRIPTION:  画线时，如果鼠标放开 如果当前位置在某个移动块上执行该方法
    // END
    isUpOnBlock () {
      let diffX = Math.abs(this.end.x - this.start.x)
      let diffY = Math.abs(this.end.y - this.start.y)
      let len = Math.sqrt(diffX * diffX + diffY * diffY)
      if (this.obj instanceof Line && len > 10) {
        // 规定线的长度的最短值
        this.otherStack.push(this.obj)
        this.selectObj = this.obj
        this.$store.commit('vizDesign/changeSelectType', this.selectObj.type)
      } else {
        this.canvas
          .getContext('2d')
          .clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.reDraw()
      }
      this.obj = {}
      this.start = {
        x: 0,
        y: 0
      }
      this.end = {
        x: 0,
        y: 0
      }
    },
    // BEGIN caodan 19-07-10 14:43
    // DESCRIPTION: 鼠标放开时，需判断画的内容有没有达到规定
    // END
    canvasUp (event) {
      let { x, y } = this.canvasMousePos(event)
      let block = this.hasOnBlock(x, y)
      if (JSON.stringify(this.obj) !== '{}' && block) {
        this.isUpOnBlock()
        this.mouseDown = false
      }
      // else if (this.end.x !== this.start.x || this.end.y !== this.start.y) { //去掉移动线的功能
      //   if (this.selectObj instanceof Line) {
      //     this.selectObj.cache.start.x = this.selectObj.start.x
      //     this.selectObj.cache.start.y = this.selectObj.start.y
      //     this.selectObj.cache.end.x = this.selectObj.end.x
      //     this.selectObj.cache.end.y = this.selectObj.end.y
      //     this.mouseDown = false
      //   }
      // }
    },
    reDraw () {
      for (let obj of this.otherStack) {
        obj.draw()
      }
      for (let obj of this.playerStack) {
        obj.draw()
      }
    },
    // 清空画布
    clearCanvas () {
      this.otherStack = []
      this.playerStack = []
      this.canvas
        .getContext('2d')
        .clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.reDraw()
    },
    // 根据 id 获取当前选中内容的下标
    getIndexByID (array) {
      for (let index = 0; index < array.length; index++) {
        if (array[index].id === this.selectObj.id) {
          return index
        }
      }
      return -1
    },
    // 删除某个选中内容
    toDelete () {
      let linesType = [
        'solidArrowLine',
        'dottedArrowLine',
        'waveLine',
        'dottedLine',
        'ruler'
      ]
      let index = -1
      let isOther = false
      if (linesType.includes(this.selectObj.type)) {
        index = this.getIndexByID(this.otherStack)
        isOther = true
      } else {
        index = this.getIndexByID(this.playerStack)
      }
      if (isOther) {
        this.$store.commit('vizDesign/changeSelectType', null)
        this.otherStack.splice(index, 1)
      } else if (index > -1) {
        this.playerStack.splice(index, 1)
      }
      // this.$store.commit('vizDesign/changeSelectState', false)
      this.selectObj = {}
      this.canvas
        .getContext('2d')
        .clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.reDraw()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './layout.scss';
</style>
