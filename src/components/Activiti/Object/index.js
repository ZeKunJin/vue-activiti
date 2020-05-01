import Node from './Node'
import { START } from '../node-types'

const defaultEquals = (a, b) => {
  return a.nodeId === b.nodeId
}

const activitiId = (length = 8) => {
  return Number(
    Math.random()
      .toString()
      .substr(3, length) + Date.now()
  ).toString(36)
}

export default class Activiti {
  constructor(type = START, equalsFn = defaultEquals) {
    this.activitiId = activitiId()
    this.count = 1
    this.equalsFn = equalsFn
    this.node = new Node(type)
  }

  push(element) {
    const { type, name, properties, childNode, conditionNodes } = element
    const node = new Node(type, name, properties, childNode, conditionNodes)
    const current = this.getElementAt(this.count - 1)
    current.childNode = node
    this.count++
  }

  insert(element, position) {
    if (position > this.count) {
      this.push(element)
    } else {
      const { type, name, properties, childNode, conditionNodes } = element
      const node = new Node(type, name, properties, childNode, conditionNodes)

      if (!position) {
        node.childNode = this.node
        this.node = node
      } else {
        const previous = this.getElementAt(position - 1)
        const current = previous.childNode
        node.childNode = current
        previous.childNode = node
      }
    }
    this.count++
  }

  remove(node) {
    const index = this.indexOf(node)
    this.removeAt(index)
  }

  indexOf(node) {
    let current = this.node
    for (let i = 0; i < this.count && current.nodeId; i++) {
      if (this.equalsFn(node, current)) {
        return i
      }
      current = current.childNode
    }
    return -1
  }

  getElementAt(index) {
    if (index > -1 && index < this.count) {
      let node = this.node
      for (let i = 0; i < index && node; i++) {
        node = node.childNode
      }
      return node
    } else {
      return undefined
    }
  }

  removeAt(index) {
    if (index > -1 && index < this.count) {
      let current = this.node
      if (index < 1) {
        this.node = current.childNode
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.childNode
        previous.childNode = current.childNode
      }
      this.count--
      return current
    }
    return undefined
  }

  exist(node) {
    return node && node.nodeId
  }

  size() {
    return this.count
  }

  isEmpty() {
    return this.count < 1
  }
}
