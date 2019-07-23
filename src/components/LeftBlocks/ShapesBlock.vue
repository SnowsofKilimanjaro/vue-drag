<template>
<div class="tool-container">
<div class="shapes tool">
      <div class="header" @click="changeShapesSwitch">
        <div class="text">
          <span class="title">Shapes</span>
          <span class="description">(click + drag)</span>
        </div>
        <div class="fold">
          <svg class="icon icon-M fill-dark undefined">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-down">
              <svg id="icon-arrow-down" viewBox="0 0 32 32" width="100%" height="100%">
                <title>arrow-down</title>
                <path d="M9.88 10.453l6.12 6.107 6.12-6.107 1.88 1.88-8 8-8-8z"></path>
              </svg>
            </use>
          </svg>
        </div>
      </div>
      <div v-show="shapesIsOpen">
        <div class="color-select">
          <template>
            <span class="blue shapes" @click="changeColor($event)">
            <template v-if="shapesColor === 'blue' ">
              <svg class="icon icon-M fill-white undefined">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tick">
                  <svg id="icon-tick" viewBox="0 0 32 32" width="100%" height="100%">
                    <title>tick</title>
                    <path fill="white" d="M12 21.6l-5.6-5.6-1.867 1.867 7.467 7.467 16-16-1.867-1.867-14.133 14.133z"></path>
                  </svg>
                </use>
              </svg>
            </template>
          </span>
            <span class="yellow shapes" @click="changeColor($event)">
            <template v-if="shapesColor === 'yellow' ">
              <svg class="icon icon-M fill-white undefined">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tick">
                  <svg id="icon-tick" viewBox="0 0 32 32" width="100%" height="100%">
                    <title>tick</title>
                    <path fill="white" d="M12 21.6l-5.6-5.6-1.867 1.867 7.467 7.467 16-16-1.867-1.867-14.133 14.133z"></path>
                  </svg>
                </use>
              </svg>
            </template>
          </span>
            <span class="red shapes" @click="changeColor($event)">
            <template v-if="shapesColor === 'red' ">
              <svg class="icon icon-M fill-white undefined">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tick">
                  <svg id="icon-tick" viewBox="0 0 32 32" width="100%" height="100%">
                    <title>tick</title>
                    <path fill="white" d="M12 21.6l-5.6-5.6-1.867 1.867 7.467 7.467 16-16-1.867-1.867-14.133 14.133z"></path>
                  </svg>
                </use>
              </svg>
            </template>
          </span>
            <span class="black shapes" @click="changeColor($event)">
            <template v-if="shapesColor === 'black' ">
              <svg class="icon icon-M fill-white undefined">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tick">
                  <svg id="icon-tick" viewBox="0 0 32 32" width="100%" height="100%">
                    <title>tick</title>
                    <path fill="white" d="M12 21.6l-5.6-5.6-1.867 1.867 7.467 7.467 16-16-1.867-1.867-14.133 14.133z"></path>
                  </svg>
                </use>
              </svg>
            </template>
          </span>
            <span class="grey shapes" @click="changeColor($event)">
            <template v-if="shapesColor === 'grey' ">
              <svg class="icon icon-M fill-white undefined">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tick">
                  <svg id="icon-tick" viewBox="0 0 32 32" width="100%" height="100%">
                    <title>tick</title>
                    <path fill="white" d="M12 21.6l-5.6-5.6-1.867 1.867 7.467 7.467 16-16-1.867-1.867-14.133 14.133z"></path>
                  </svg>
                </use>
              </svg>
            </template>
          </span>
            <span class="white shapes" @click="changeColor($event)">
            <template v-if="shapesColor === 'white' ">
              <svg class="icon icon-M fill-white undefined">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tick">
                  <svg id="icon-tick" viewBox="0 0 32 32" width="100%" height="100%">
                    <title>tick</title>
                    <path fill="white" d="M12 21.6l-5.6-5.6-1.867 1.867 7.467 7.467 16-16-1.867-1.867-14.133 14.133z"></path>
                  </svg>
                </use>
              </svg>
            </template>
          </span>
          </template>
        </div>
        <div class="tool-select-three hand">
          <span id="square" :class="theTool === 'square' ? 'bgGreen' : 'bgWhite'" @click.stop="changeTool($event)">
            <svg class="icon icon-M fill-undefined undefined">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-square">
                <svg id="icon-square" viewBox="0 0 32 32" width="100%" height="100%">
                  <title>square</title>
                  <path :fill="theTool === 'square' ? 'white' : color[shapesColor]" d="M24 8v16h-16v-16h16zM26.667 5.333h-21.333v21.333h21.333v-21.333z"></path>
                </svg>
              </use>
            </svg>
          </span>
          <span id="rectangle" :class="theTool === 'rectangle' ? 'bgGreen' : 'bgWhite'" @click.stop="changeTool($event)">
            <svg class="icon icon-M fill-undefined undefined">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-rectangle">
                <svg id="icon-rectangle" viewBox="0 0 32 32" width="100%" height="100%">
                  <title>rectangle</title>
                  <path :fill="theTool === 'rectangle' ? 'white' : color[shapesColor]" d="M26.667 9.333v13.333h-21.333v-13.333h21.333zM29.333 6.667h-26.667v18.667h26.667v-18.667z"></path>
                </svg>
              </use>
            </svg>
          </span>
          <span id="circular" :class="theTool === 'circular' ? 'bgGreen' : 'bgWhite'" @click.stop="changeTool($event)">
            <svg class="icon icon-M fill-undefined undefined">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-circle">
                <svg id="icon-circle" viewBox="0 0 32 32" width="100%" height="100%">
                  <title>circle</title>
                  <path :fill="theTool === 'circular' ? 'white' : color[shapesColor]" d="M16 5.333c5.867 0 10.667 4.8 10.667 10.667s-4.8 10.667-10.667 10.667-10.667-4.8-10.667-10.667 4.8-10.667 10.667-10.667zM16 2.667c-7.333 0-13.333 6-13.333 13.333s6 13.333 13.333 13.333 13.333-6 13.333-13.333-6-13.333-13.333-13.333v0z"></path>
                </svg>
              </use>
            </svg>
          </span>
        </div>
        <div class="tool-select-three-two hand">
          <span id="polygon" :class="['polygon',theTool === 'polygon' ? 'bgGreen' : 'bgWhite']" @click.stop="changeTool($event)">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 1697 1024">
              <g id="icomoon-ignore"> </g>
              <path :stroke="theTool === 'polygon' ? 'white' : color[shapesColor]" :fill="theTool === 'polygon' ? '#45d695' : 'white'" stroke-width="100" stroke-miterlimit="10" stroke-linecap="butt" stroke-linejoin="miter" d="M519.589 18.286h667.429l484.571 493.714-493.714 493.714h-658.286l-493.714-493.714 493.714-493.714z"></path>
            </svg>
          </span>
          <span id="reTriangle" :class="['polygon',theTool === 'reTriangle' ? 'bgGreen' : 'bgWhite']" @click.stop="changeTool($event)">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 1024 1024">
              <g id="icomoon-ignore"></g>
              <path :stroke="theTool === 'reTriangle' ? 'white' : color[shapesColor]" :fill="theTool === 'reTriangle' ? '#45d695' : 'white'" stroke-width="100" stroke-miterlimit="10" stroke-linecap="butt" stroke-linejoin="miter" d="M506.253 67.211l495.785 889.578-980.076-17.187 484.278-872.391z"></path>
            </svg>
          </span>
          <span class="empty"></span>
        </div>
      </div>
    </div>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      shapesIsOpen: true
    }
  },
  computed: {
    ...mapGetters(
      {
        shapesColor: 'vizDesign/getShapesColor',
        theTool: 'vizDesign/getTool',
        color: 'vizDesign/getColor'

      }
    )

  },
  methods: {
    changeShapesSwitch () {
      this.shapesIsOpen = !this.shapesIsOpen
    },
    changeTool (event) {
      this.$emit('changeTool', event)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
