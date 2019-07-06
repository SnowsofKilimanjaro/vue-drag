<template>
  <ul>
    <li v-for="item in leftList" :key="item.id" draggable="true" @dragstart="drag">{{ item.name }}</li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      // leftList: this.$store.state.vizDesign.leftList
    }
  },
  mounted () {
    let leftList = [
      {
        id: 1,
        name: 'drag me to right 1'
      },
      {
        id: 2,
        name: 'drag me to right 2'
      },
      {
        id: 3,
        name: 'drag me to right 3'
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
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  li {
    line-height: 32px;
  }
}
</style>
