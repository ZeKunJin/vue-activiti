<template>
  <div class="node-layout">
    <component :is="value.type" :content="value" />

    <node v-if="value.childNode && value.childNode.nodeId" :value="value.childNode" />
  </div>
</template>

<script>
import Start from './Start'
import Approver from './Approver'
import Notifier from './Notifier'
import Route from './Route'

export default {
  name: 'Node',

  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  components: {
    Start,
    Approver,
    Notifier,
    Route
  }
}
</script>

<style lang="less" scoped>
.node-layout {
  text-align: left;
}
</style>
