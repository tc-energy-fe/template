/**
 * @param data [Array] 原始数组, 元素中应包含 Id, Name, Level, Path[, ParentId]
 *          Path: '/' or '/1000/' or '/1000/1100/'
 * @param options [Object]
 *          customProps [Object] 自定义键名 eg. {Id: 'GroupId', Name: 'GroupName', ParentId: 'FatherGroupId'}
 *          rootId [Number, Array] !!暂未实现多rootId
 *          rootLevel [Number]
 * @return [Array]
 * */

const defaultProps = {
  Id: 'Id',
  Name: 'Name',
  ParentId: 'ParentId',
  Level: 'Level',
  Path: 'Path'
}

const initTree = function (data, { rootLevel = 0, rootId, customProps } = { rootLevel: 0, customProps: {} }, fn) {
  let props = Object.assign({}, defaultProps, customProps)

  // 判断数据是否为数组并且不为空
  if (!data || !Array.isArray(data)) return null
  if (data.length === 0) return null

  let rootList = []
  let _tempList = []
  let treeListObj = {}

  // 开始生成树形数据
  data.forEach(item => {
    let groupId = item[props.Id]
    if (item.Level === rootLevel || groupId === rootId) {
      // 筛选根节点
      rootList.push(item)
    } else {
      let parentId = item[props.ParentId]
      if (parentId === undefined || parentId === null) {
        // 为元素添加父节点Id
        let pathArr = item.Path.split('/')
        parentId = Number(pathArr[pathArr.length - 2])
        item[props.ParentId] = parentId
      }
      let parent = treeListObj[parentId]
      // 判断查找对象中是否包含元素的父节点
      if (parent) {
        treeListObj[parentId].children.push(item)
      } else {
        _tempList.push(item)
      }
    }
    // 处理元素的字段
    if (fn && fn instanceof Function) {
      fn(item)
    } else {
      item.value = groupId
      item.label = item[props.Name]
    }
    if (!item.children || !Array.isArray(item.children)) item.children = []
    // 将元素放入查找对象
    treeListObj[groupId] = item
  })

  console.log('tree:', rootList)
  if (_tempList.length > 0) {
    // 如果临时数组_tempList中包含元素，则说明原始数组并不是按照父节点一定在子节点前面的规则排列的, 或者有多余的节点。
    // 这种情况在本项目中暂时不会出现，若需要兼容其他情况，只需利用_tempList进行嵌套循环。
    // console.error('算法出错！')
    console.log('remainder:', _tempList)
    // throw new Error('算法出错！')
  }

  return rootList
}

export default initTree
