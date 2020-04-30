import Activiti from '../index'
import { START, APPROVER, ROUTE, NOTIFIER, CONDITION, UNKNOWN } from './node-types'

const nodeId = (length = 8) => {
  return Number(
    Math.random()
      .toString()
      .substr(3, length) + Date.now()
  ).toString(36)
}

const nameFilter = type => {
  switch (type) {
    case START: return '发起人'
    case APPROVER: return '审核人'
    case NOTIFIER: return '抄送人'
    case CONDITION: return '条件'
  }
}

export default class Node {
  constructor(type = UNKNOWN, name = nameFilter(type), properties = {}, childNode = {}, conditionNodes = []) {
    this.nodeId = nodeId()
    this.type = type
    this.name = name
    this.properties = properties
    this.childNode = childNode

    switch (type) {
      case ROUTE:
        this.conditionNodes = [new Activiti(CONDITION), new Activiti(CONDITION)]
        break
      default:
        this.conditionNodes = conditionNodes
        break
    }
  }
}
