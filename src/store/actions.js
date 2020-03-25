/**
 * 模块公用的actions
 * */

import * as types from './mutation-types'

const Actions = {
  updateFormData ({ commit }, obj) {
    commit(types.UPDATE_FORM_VALUE, obj)
  },
  updateStateData ({ commit }, obj) {
    commit(types.UPDATE_STATE_VALUE, obj)
  },
  updateObjectData ({ commit }, obj) {
    commit(types.UPDATE_OBJ_DATA, obj)
  },
  updateItemData ({ commit }, obj) {
    commit(types.UPDATE_ITEM_DATA, obj)
  },
  abortAllRequests ({ state, commit }) {
    [...state.reqCancels.keys()].map(r => commit(types.ABORT_REQUEST, { item: r }))
  },
  selectOnChange ({ state, commit }, { item = 'selectStates', key, value }) {
    commit(types.SET_SELECT, { item, key, value })
  },
  barOnChange ({ state, commit }, { item, value }) {
    commit(types.SET_BAR, { item, value })
  },
  currentPageOnChange ({ commit }, current) {
    commit(types.SET_DATA, { item: 'currentPage', value: current })
  },
  pageSizeOnChange ({ commit }, size) {
    commit(types.SET_DATA, { item: 'pageSize', value: size })
  },
  closeSelect ({ commit }) {
    commit(types.SET_SELECT, { item: 'selectStates', value: { open: false } })
  }
}

export default Actions
