<template>
  <div class="left-container">
    <div class="drag-container">
      <ul>
        <li
          v-for="item in leftList"
          :key="item.id"
          :id="item.id"
          draggable="true"
          @dragstart="drag"
        >{{ item.name }}</li>
      </ul>
    </div>
    <LineBlock @changeTool='changeTool'></LineBlock>
    <!-- <ShapesBlock @changeTool='changeTool'></ShapesBlock> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LineBlock from './LeftBlocks/LineBlock'
// import ShapesBlock from './LeftBlocks/ShapesBlock'
export default {
  data () {
    return {
      // linesIsOpen: true
      // leftList: this.$store.state.vizDesign.leftList
    }
  },
  components: {
    LineBlock
    // ShapesBlock
  },
  mounted () {
    let leftList = [
      {
        id: 1,
        name: 'drag me to right 1',
        type: 'solidArrowLine',
        description: '只支持实线箭头'
      },
      {
        id: 2,
        name: 'drag me to right 2',
        type: 'dottedArrowLine',
        description: '只支持虚线箭头'

      },
      {
        id: 3,
        name: 'drag me to right 3',
        type: 'waveLine',
        description: '只支持波浪线'

      },
      {
        id: 4,
        name: 'drag me to right 4',
        type: 'dottedLine',
        description: '只支持虚线'

      },
      {
        id: 5,
        name: 'drag me to right 5',
        type: 'ruler',
        description: '只支持双向箭头'

      }
    ]
    this.setLeftList(leftList)
  },
  computed: {
    ...mapGetters({
      leftList: 'vizDesign/getLeftList'
    })
  },
  methods: {
    ...mapActions({
      setLeftList: 'vizDesign/setLeftList'
    }),
    drag (ev) {
      ev.dataTransfer.setData('dragId', ev.target.id)
    },
    changeTool (event) {
      this.$emit('changeTool', event)
    }
  }
}
</script>

<style lang="scss">
@import './LeftList.scss';
</style>
