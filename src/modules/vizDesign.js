// BEGIN caodan 19-07-05 10:49
// DESCRIPTION: 可视化设计模块
// END
import * as types from './vizDesignTypes'
import _ from 'lodash'
const state = {
  leftList: [], // 左侧可拖拽列表
  dataList: [] // 拖拽到画布上的列表
}
const getters = {
  getLeftList: state => state.leftList,
  getDataList: state => state.dataList
}
const mutations = {
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
