<template>
  <div>
    <div class="activiti-layout">
      <node :value="activitiResource.node" :activiti_id="activitiResource.activitiId" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import bus from '@/utils/bus'
import Node from './Node'
import Activiti from './index'

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
    }
  },

  components: {
    Node
  },

  mounted() {
    Vue.component('node', Node)
    Vue.component('activiti', Activiti)
    bus.$on('insert', this.onInsert)
  },

  methods: {
    onInsert(e) {
      const { type, node, activiti_id } = e
      const {
        activitiResource: { activitiId }
      } = this
      if (activiti_id === activitiId) {
        const index = this.activitiResource.indexOf(node)
        this.activitiResource.insert({ type }, index + 1)
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
