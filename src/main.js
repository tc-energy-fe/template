import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { currency, miss } from '@/utils/currency'

import { Tree, Table, TableColumn, Pagination, Select, Loading, MessageBox, Dialog, Menu, Submenu, MenuItem, DatePicker } from 'element-ui'
import 'css/element-ui.scss'
import EgUi from 'tc-ui-lib'
import 'tc-ui-lib/lib/style.css'

// 按需引入element-ui组件
Vue.use(Tree)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(DatePicker)
window.ElAlert = MessageBox.alert
window.ElConfirm = MessageBox.confirm

Vue.filter('currency', currency)
Vue.filter('miss', miss)

// 按需引入tc-ui组件
Vue.use(EgUi)

// 按需引入echarts
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

window.isEmpty = function (value) {
  return value === undefined || value === null
}

window.colorArr = ['#3d7dff', '#67c23a', '#ff7a8b', '#edac3a']

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
