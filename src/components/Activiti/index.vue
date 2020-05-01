<template>
  <div>
    <div class="activiti-layout">
      <node
        :value="activitiResource.node"
        :activiti_id="activitiResource.activitiId"
        :backgroundColor="backgroundColor"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import bus from '@/utils/bus'
import Node from './Node'
import Activiti from './index'
import { CONDITION } from './node-types'

export default {
  name: 'Activiti',

  props: {
    defaultValue: {
      type: Object,
      default: () => {
        return {}
      }
    },

    activitiResource: {
      type: Object,
      default: () => {
        return {}
      }
    },

    backgroundColor: {
      type: String,
      default: '#ffffff'
    }
  },

  components: {
    Node
  },

  mounted() {
    Vue.component('node', Node)
    Vue.component('activiti', Activiti)
    bus.$on('insert', this.onInsert)
    bus.$on('remove', this.onRemove)
    bus.$on('replace', this.onReplace)
  },

  methods: {
    onInsert(e, refresh = true) {
      const { type, node, activiti_id } = e
      const {
        activitiResource: { activitiId }
      } = this
      if (activiti_id === activitiId) {
        const index = this.activitiResource.indexOf(node)
        this.activitiResource.insert({ type }, index + 1)
      }

      if (refresh) {
        this.$emit('refresh', this.activitiResource)
      }
    },

    onRemove(e, refresh = true) {
      const { node, activiti_id } = e
      const { activitiResource } = this
      const { activitiId } = activitiResource
      if (activiti_id === activitiId) {
        const { type } = node
        switch (type) {
          case CONDITION:
            break
          default:
            this.activitiResource.remove(node)
            break
        }
      }

      if (refresh) {
        this.$emit('refresh', this.activitiResource)
      }
    },

    onReplace(e) {
      const { node, replaceNode } = e
      let index = this.activitiResource.indexOf(node)
      if (index > -1) {
        let current = replaceNode
        while (current && current.nodeId) {
          this.activitiResource.insert(current, index)
          current = current.childNode
          index++
        }
        this.onRemove(e, false)
      }
      this.$emit('refresh', this.activitiResource)
    }
  }
}
</script>

<style lang="less" scoped>
.activiti-layout {
  position: relative;
  z-index: 9;
}
</style>
