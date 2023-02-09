import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 130424LRTTS001 焙烧cems code
// 130424LRTTS002 隧道窑 code
export default new Vuex.Store({
  state: {
    drugIndex: 0
  },
  getters: {
    currentDrugIndex: state => state.drugIndex,
    currentCode: state => state.code,
    showReal: state => state.showReal,
    shimoActive: state => state.shimoActive,
  },
  mutations: {
    changeIndex (state, index) {
      state.drugIndex = index
    },
    setShimoActive (state, shimoActive) {
      state.shimoActive = shimoActive
    }
  }
})
