// BEGIN caodan 19-07-05 10:49
// DESCRIPTION: 可视化设计模块
// END
import * as types from './vizDesignTypes'
import _ from 'lodash'
const state = {
  leftList: [], // 左侧可拖拽列表
  dataList: [], // 拖拽到画布上的列表
  linesColor: 'black', // 线的颜色
  shapesColor: 'yellow', // 画形状的线
  color: { // 所有颜色对应的色值
    green: '#45d695',
    blue: '#3f95dc',
    yellow: '#ecc434',
    red: '#e54f3a',
    black: '#2f313c',
    grey: '#d5d5d5',
    white: '#ffffff'
  },
  tool: '',
  selectType: null, // 当前选中内容的类型
  textValue: '' // 选择双向箭头时，输入的值
}
const getters = {
  getLeftList: state => state.leftList,
  getDataList: state => state.dataList,
  getLinesColor: state => state.linesColor,
  getShapesColor: state => state.shapesColor,
  getColor: state => state.color,
  getTool: state => state.tool,
  getSelectType: state => state.selectType,
  getTextValue: state => state.textValue
}
const mutations = {
  setLinesColor (state, newColor) {
    state.linesColor = newColor
  },
  setTool (state, newTool) {
    state.tool = newTool
  },
  changeSelectType (state, newSelectType) {
    state.selectType = newSelectType
  },
  setTextValue (state, newTextValue) {
    state.textValue = newTextValue
  },
  [types.SET_LEFT_LIST]: (state, leftList) => {
    state.leftList = leftList
  },
  [types.ADD_TO_DATA_LIST]: (state, obj) => {
    state.dataList.push(obj)
  },
  [types.UPDATE_DATA_LIST_ATTR]: (state, params) => {
    let { index, attrs } = params
    let newDataList = _.cloneDeep(state.dataList)
    newDataList[index] = { ...newDataList[index], ...attrs }
    state.dataList = newDataList
    // this.dataList[index].show = false;
    // Vue.set(state.dataList, index, state.dataList[index]);
  }
}
const actions = {
  setLeftList ({ commit }, data) {
    commit(types.SET_LEFT_LIST, data)
  },
  addToDataList ({ commit }, obj) {
    commit(types.ADD_TO_DATA_LIST, obj)
  },
  updateAttr ({ commit }, params) {
    commit(types.UPDATE_DATA_LIST_ATTR, params)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
