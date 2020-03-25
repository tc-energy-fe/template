
export const categoryId = {
  electricity: 1,
  water: 2,
  gas: 3,
  air: 4,
  heat: 5
}
export const categoryName = {
  1: '电',
  2: '水',
  3: '气',
  4: '压缩空气',
  5: '热力'
}
export const weather = {
  0: '霾 ',
  1: '雾',
  2: '雪',
  3: '雨',
  4: '阴',
  5: '晴'
}
export const dateTypeId = {
  year: 0,
  month: 1,
  day: 2
}
export const dateTypeName = {
  0: 'year',
  1: 'month',
  2: 'day'
}
export const timeName = {
  year: '年',
  month: '月',
  day: '日',
  time: '时'
}
export const timeTypeName = {
  0: '年',
  1: '月',
  2: '日',
  3: '时'
}
export const taskCode = {
  0: '成功',
  1: '设备不存在',
  2: '设备离线',
  3: '网络错误',
  4: '无返回数据',
  5: '不支持',
  6: '未实现',
  7: '设备忙',
  8: '权限错误',
  9: '超时',
  10: '错误指令',
  11: '网关离线',
  255: '未知错误'
}
export const categoryUnit = {
  1: 'kWh',
  2: 't',
  3: 'm³',
  4: 'Nm³',
  5: 't'
}

export default {
  categoryId,
  categoryName,
  weather,
  dateTypeId,
  dateTypeName,
  timeName,
  timeTypeName,
  taskCode,
  categoryUnit,
  schemeType
}
