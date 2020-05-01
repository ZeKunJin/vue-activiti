<template>
  <div>
    <div class="activiti-layout">
      <node :value="activitiResource.node" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import bus from '@/utils/bus'
import Node from './Node'

export default {
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
    bus.$on('insert', this.onInsert)
  },

  methods: {
    onInsert(e) {
      const { type, node } = e
      const index = this.activitiResource.indexOf(node)
      this.activitiResource.insert({ type }, index + 1)
      this.$emit('refresh', this.activitiResource)
    }
  }
}
</script>
