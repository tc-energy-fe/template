/*
* 模块公用的mutations
* */
import router from '@/router'
import * as types from './mutation-types'
import ERROR_CODE from '@/api/error-code'

const Mutations = {
  [types.SET_DATA] (state, { item, value }) {
    if (state.hasOwnProperty(item)) {
      state[item] = value
    }
  },
  [types.UPDATE_FORM_VALUE] (state, { item, value }) {
    if (state.hasOwnProperty(item)) {
      state[item] = value
    }
  },
  [types.UPDATE_STATE_VALUE] (state, { item, value }) {
    if (state.hasOwnProperty(item)) {
      state[item] = value
    }
  },
  [types.UPDATE_OBJ_DATA] (state, { obj, item, value }) {
    if (state.hasOwnProperty(obj)) {
      if (state[obj].hasOwnProperty(item)) {
        state[obj][item] = value
      }
    }
  },
  [types.UPDATE_ITEM_DATA] (state, { obj, item, value }) {
    if (state.hasOwnProperty(obj)) {
      if (state[obj].hasOwnProperty(item)) {
        if (value instanceof Object) {
          state[obj][item] = Object.assign({}, state[obj][item], value)
        }
      }
    }
  },
  [types.ADD_REQUEST] (state, { item, value }) {
    state.requests.set(item, value)
  },
  [types.ABORT_REQUEST] (state, { item }) {
    let reqCancel = state.reqCancels.get(item)
    if (reqCancel) {
      reqCancel()
    }
  },
  [types.ADD_REQUEST_CANCEL] (state, { item, value }) {
    state.reqCancels.set(item, value)
  },
  [types.SET_LOADING_STATUS] (state, { item, value }) {
    if (state.hasOwnProperty(item)) {
      state[item] = value
    }
  },
  [types.CHECKOUT_FAILURE] (state, err) {
    console.log(err)
    if (err.code === -2) {
      ElAlert('未登录或者登录信息过期！', '提示').then(() => {
        router.push('/login')
      })
    } else if (err.code === -15) {
      ElAlert('账号异地登录！', '错误').then(() => {
        router.push('/login')
      })
    } else if (!err.hasOwnProperty('code')) {
      ElAlert('数据错误或数据异常！', '错误').then(() => {})
    } else if (!err.abort) {
      let code = err.code.toString()
      let errorMsg = err.msg || err.desc || ERROR_CODE.default[code] || `未知错误${code}`
      ElAlert(errorMsg, '错误').then(() => {})
    }
  },
  [types.CHECKOUT_SUCCEED] (state, stateCode) {
    if (stateCode === 0) {
      ElAlert('执行成功!', '提示').then(() => {})
    }
  }
}

export default Mutations
