<template>
  <div class="node-layout">
    <component :is="value.type" :content="value" :activiti_id="activiti_id" />

    <node
      v-if="value.childNode && value.childNode.nodeId"
      :value="value.childNode"
      :activiti_id="activiti_id"
    />
  </div>
</template>

<script>
import Start from './Start'
import Approver from './Approver'
import Notifier from './Notifier'
import Route from './Route'
import Condition from './Condition'

export default {
  name: 'Node',

  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },

    activiti_id: {
      type: String,
      default: ''
    }
  },

  components: {
    Start,
    Approver,
    Notifier,
    Route,
    Condition
  }
}
</script>

<style lang="less" scoped>
.node-layout {
  text-align: left;
}
</style>
