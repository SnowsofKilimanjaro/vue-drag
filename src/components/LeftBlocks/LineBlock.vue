<template>
  <div class="tool-container">
    <div class="lines tool">
      <div class="header" @click="changeLinesSwitch">
        <div class="text">
          <span class="title">箭头、线</span>
          <span class="description">(click + drag)</span>
        </div>
        <div class="fold">
          <svg class="icon icon-M fill-dark undefined">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-down">
              <svg id="icon-arrow-down" viewBox="0 0 32 32" width="100%" height="100%">
                <title>arrow-down</title>
                <path d="M9.88 10.453l6.12 6.107 6.12-6.107 1.88 1.88-8 8-8-8z" />
              </svg>
            </use>
          </svg>
        </div>
      </div>
      <div v-show="linesIsOpen">
        <div class="color-select">
          <template>
            <span class="blue lines" @click="changeColor($event)">
              <template v-if="linesColor === 'blue' ">
                <svg class="icon icon-M fill-white undefined">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tick">
                    <svg id="icon-tick" viewBox="0 0 32 32" width="100%" height="100%">
                      <title>tick</title>
                      <path
                        fill="white"
                        d="M12 21.6l-5.6-5.6-1.867 1.867 7.467 7.467 16-16-1.867-1.867-14.133 14.133z"
                      />
                    </svg>
                  </use>
                </svg>
              </template>
            </span>
            <span class="yellow lines" @click="changeColor($event)">
              <template v-if="linesColor === 'yellow' ">
                <svg class="icon icon-M fill-white undefined">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tick">
                    <svg id="icon-tick" viewBox="0 0 32 32" width="100%" height="100%">
                      <title>tick</title>
                      <path
                        fill="white"
                        d="M12 21.6l-5.6-5.6-1.867 1.867 7.467 7.467 16-16-1.867-1.867-14.133 14.133z"
                      />
                    </svg>
                  </use>
                </svg>
              </template>
            </span>
            <span class="red lines" @click="changeColor($event)">
              <template v-if="linesColor === 'red' ">
                <svg class="icon icon-M fill-white undefined">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tick">
                    <svg id="icon-tick" viewBox="0 0 32 32" width="100%" height="100%">
                      <title>tick</title>
                      <path
                        fill="white"
                        d="M12 21.6l-5.6-5.6-1.867 1.867 7.467 7.467 16-16-1.867-1.867-14.133 14.133z"
                      />
                    </svg>
                  </use>
                </svg>
              </template>
            </span>
            <span class="black lines" @click="changeColor($event)">
              <template v-if="linesColor === 'black' ">
                <svg class="icon icon-M fill-white undefined">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tick">
                    <svg id="icon-tick" viewBox="0 0 32 32" width="100%" height="100%">
                      <title>tick</title>
                      <path
                        fill="white"
                        d="M12 21.6l-5.6-5.6-1.867 1.867 7.467 7.467 16-16-1.867-1.867-14.133 14.133z"
                      />
                    </svg>
                  </use>
                </svg>
              </template>
            </span>
            <span class="grey lines" @click="changeColor($event)">
              <template v-if="linesColor === 'grey' ">
                <svg class="icon icon-M fill-white undefined">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tick">
                    <svg id="icon-tick" viewBox="0 0 32 32" width="100%" height="100%">
                      <title>tick</title>
                      <path
                        fill="white"
                        d="M12 21.6l-5.6-5.6-1.867 1.867 7.467 7.467 16-16-1.867-1.867-14.133 14.133z"
                      />
                    </svg>
                  </use>
                </svg>
              </template>
            </span>
            <span class="white lines" @click="changeColor($event)">
              <template v-if="linesColor === 'white' ">
                <svg class="icon icon-M fill-white undefined">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tick">
                    <svg id="icon-tick" viewBox="0 0 32 32" width="100%" height="100%">
                      <title>tick</title>
                      <path
                        fill="white"
                        d="M12 21.6l-5.6-5.6-1.867 1.867 7.467 7.467 16-16-1.867-1.867-14.133 14.133z"
                      />
                    </svg>
                  </use>
                </svg>
              </template>
            </span>
          </template>
        </div>
        <div class="tool-select-two hand">
          <span
            id="solidArrowLine"
            :class="theTool === 'solidArrowLine' ? 'bgGreen' : 'bgWhite'"
            @click="changeTool($event)"
          >
            <svg class="line icon-undefined fill-undefined undefined">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-line-with-arrow">
                <svg id="icon-line-with-arrow" viewBox="0 0 262 32" width="100%" height="100%">
                  <title>line-with-arrow</title>
                  <path
                    :fill="theTool === 'solidArrowLine' ? 'white' : color[linesColor]"
                    d="M256 19.079l6.4-3.079-6.4-3.079v-0.121h-0.251l-22.149-10.656v10.656h-233.6v6.4h233.6v10.656l22.149-10.656h0.251v-0.121z"
                  />
                </svg>
              </use>
            </svg>
          </span>
          <span
            id="dottedArrowLine"
            :class="theTool === 'dottedArrowLine' ? 'bgGreen' : 'bgWhite'"
            @click="changeTool($event)"
          >
            <svg class="line icon-undefined fill-undefined undefined">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#icon-dashed-line-with-arrow"
              >
                <svg
                  id="icon-dashed-line-with-arrow"
                  viewBox="0 0 262 32"
                  width="100%"
                  height="100%"
                >
                  <title>dashed-line-with-arrow</title>
                  <path
                    :fill="theTool === 'dottedArrowLine' ? 'white' : color[linesColor]"
                    d="M256 19.079l6.4-3.079-6.4-3.079v-0.121h-0.251l-22.149-10.656v10.656h-11.2v6.4h11.2v10.656l22.149-10.656h0.251v-0.121zM196.8 19.2v-6.4h16v6.4h-16zM171.2 19.2v-6.4h16v6.4h-16zM145.6 19.2v-6.4h16v6.4h-16zM120 19.2v-6.4h16v6.4h-16zM94.4 19.2v-6.4h16v6.4h-16zM68.8 19.2v-6.4h16v6.4h-16zM43.2 19.2v-6.4h16v6.4h-16zM17.6 19.2v-6.4h16v6.4h-16zM8 19.2h-8v-6.4h8v6.4z"
                  />
                </svg>
              </use>
            </svg>
          </span>
        </div>
        <div class="tool-select-two hand">
          <span
            id="waveLine"
            :class="theTool === 'waveLine' ? 'bgGreen' : 'bgWhite'"
            @click="changeTool($event)"
          >
            <svg class="line icon-undefined fill-undefined undefined">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#icon-wavy-line-with-arrow"
              >
                <svg
                  id="icon-wavy-line-with-arrow"
                  viewBox="0 0 216 32"
                  width="100%"
                  height="100%"
                >
                  <title>wavy-line-with-arrow</title>
                  <path
                    :fill="theTool === 'waveLine' ? 'white' : color[linesColor]"
                    d="M153.171 27.737c2.193-2.356 4.54-5.929 6.999-10.45 2.398-4.298 4.399-7.357 6.303-9.419 1.862-2.029 3.124-2.521 3.942-2.534 0.793-0.012 2.028 0.419 3.869 2.413 1.9 2.044 3.894 5.119 6.291 9.529l0.758 1.392h10.668v9.76l24-11.547-24-11.547v8h-7.512c-2.218-3.935-4.323-7.066-6.287-9.206-2.25-2.437-4.837-4.172-7.866-4.127-3.005 0.045-5.564 1.831-7.793 4.26-2.185 2.393-4.541 5.969-7.038 10.439l-0.015 0.027c-2.353 4.339-4.318 7.356-6.212 9.363-1.818 1.941-3.079 2.392-3.949 2.38-0.911-0.012-2.256-0.54-4.206-2.54-1.998-2.038-4.118-5.058-6.667-9.298-2.65-4.466-5.133-8.031-7.413-10.417-2.328-2.423-4.948-4.171-7.963-4.214-3.058-0.043-5.665 1.675-7.93 4.129-2.187 2.384-4.527 5.997-6.98 10.573-2.541 4.39-4.648 7.462-6.637 9.506-1.935 2.001-3.248 2.47-4.121 2.458-0.874-0.012-2.157-0.519-4.002-2.531-1.902-2.060-3.879-5.115-6.24-9.418l-0.022-0.039c-2.555-4.473-4.967-8.048-7.201-10.44-2.285-2.434-4.885-4.194-7.91-4.237-3.048-0.043-5.673 1.665-7.98 4.106-2.241 2.385-4.662 6.005-7.221 10.596-2.452 4.408-4.493 7.483-6.438 9.528-1.879 1.989-3.165 2.448-4.028 2.436-0.885-0.013-2.197-0.531-4.098-2.555-1.95-2.064-3.999-5.124-6.453-9.425-2.575-4.588-5.031-8.21-7.323-10.598-2.376-2.46-5.059-4.128-8.158-4.087-3.061 0.040-5.76 1.74-8.199 4.17-2.382 2.385-4.975 5.953-7.743 10.426l4.536 2.805c2.663-4.31 4.88-7.382 6.972-9.454 2.035-2.027 3.474-2.602 4.503-2.615 0.991-0.012 2.349 0.489 4.253 2.46 1.986 2.042 4.047 5.109 6.512 9.51l0.011 0.018c2.555 4.473 4.967 8.048 7.201 10.441 2.286 2.434 4.885 4.193 7.91 4.236 3.048 0.043 5.674-1.665 7.98-4.106 2.241-2.385 4.662-6.004 7.221-10.596 2.453-4.408 4.493-7.483 6.438-9.528 1.88-1.989 3.165-2.448 4.028-2.436 0.885 0.012 2.197 0.53 4.098 2.554 1.949 2.063 3.995 5.12 6.447 9.415 2.455 4.466 4.79 8.043 6.974 10.437 2.243 2.446 4.821 4.217 7.857 4.26 3.037 0.043 5.682-1.655 8.030-4.084 2.288-2.38 4.782-5.991 7.44-10.579l0.023-0.038 0.021-0.040c2.354-4.405 4.322-7.471 6.218-9.511 1.824-1.976 3.082-2.425 3.935-2.413 0.897 0.012 2.237 0.541 4.193 2.576 2.001 2.071 4.124 5.142 6.676 9.45l0.009 0.015c2.653 4.406 5.139 7.924 7.423 10.278 2.333 2.393 4.95 4.108 7.95 4.15 3.043 0.042 5.645-1.642 7.916-4.066z"
                  />
                </svg>
              </use>
            </svg>
          </span>
          <span
            id="dottedLine"
            :class="theTool === 'dottedLine' ? 'bgGreen' : 'bgWhite'"
            @click="changeTool($event)"
          >
            <svg class="line icon-undefined fill-undefined undefined">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-dashed-line">
                <svg id="icon-dashed-line" viewBox="0 0 1200 32" width="100%" height="100%">
                  <title>dashed-line</title>
                  <path
                    :fill="theTool === 'dottedLine' ? 'white' : color[linesColor]"
                    d="M0 32h33.333v-32h-33.333v32zM100 32h66.667v-32h-66.667v32zM233.333 32h66.667v-32h-66.667v32zM366.667 32h66.666v-32h-66.666v32zM500 32h66.667v-32h-66.667v32zM633.333 32h66.667v-32h-66.667v32zM766.667 32h66.666v-32h-66.666v32zM900 32h66.667v-32h-66.667v32zM1033.333 32h66.667v-32h-66.667v32zM1166.667 32h33.333v-32h-33.333v32z"
                  />
                </svg>
              </use>
            </svg>
          </span>
        </div>
        <div class="tool-select-two hand">
          <span
            id="ruler"
            :class="['span-hand',theTool === 'ruler' ? 'bgGreen' : 'bgWhite']"
            @click.stop="changeTool($event)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="60"
              height="60"
              viewBox="0 0 5178 1024"
            >
              <g id="icomoon-ignore" />
              <path
                :fill="theTool === 'ruler' ? 'white' : color[linesColor]"
                d="M3277.28 339.925v344.15h1286.038v307.925l452.831-470.944-470.944-489.056 18.113 362.263z"
              />
              <path
                :fill="theTool === 'ruler' ? 'white' : color[linesColor]"
                d="M1918.793 665.962v-289.812h-1286.038v-344.15l-470.944 489.056 489.056 470.944v-326.038z"
              />
            </svg>
          </span>
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
      linesIsOpen: true
    }
  },
  computed: {
    ...mapGetters({
      linesColor: 'vizDesign/getLinesColor',
      color: 'vizDesign/getColor',
      theTool: 'vizDesign/getTool'
    })
  },
  methods: {
    changeLinesSwitch () {
      this.linesIsOpen = !this.linesIsOpen
    },
    changeColor (event) {
      let ele = event.target
      let className = ele.className
      let theColor = className.split(' ')[0]
      let graph = className.split(' ')[1]
      switch (graph) {
        case 'shapes':
          this.$store.commit('setShapesColor', theColor)
          break
        case 'equipment':
          this.$store.commit('setEquipmentColor', theColor)
          break
        case 'players':
          this.$store.commit('setPlayersColor', theColor)
          break
        case 'lines':
          this.$store.commit('vizDesign/setLinesColor', theColor)
          break
      }
    },
    changeTool (event) {
      this.$emit('changeTool', event)
    //   let ele = event.target
    //   let eleType = ele.nodeName.toLowerCase()
    //   let theTool
    //   if (eleType === 'span') {
    //     theTool = ele.id === this.theTool ? '' : ele.id
    //   } else if (eleType === 'svg') {
    //     theTool = ele.parentNode.id === this.theTool ? '' : ele.parentNode.id
    //   } else if (eleType === 'path') {
    //     theTool =
    //       ele.parentNode.parentNode.id === this.theTool
    //         ? ''
    //         : ele.parentNode.parentNode.id
    //   }
    //   this.$store.commit('vizDesign/setTool', theTool)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
