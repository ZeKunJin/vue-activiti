<template>
  <div class="node-layout">
    <component
      :is="value.type"
      :content="value"
      :activiti_id="activiti_id"
      :backgroundColor="backgroundColor"
    />

    <node
      v-if="value.childNode && value.childNode.nodeId"
      :value="value.childNode"
      :activiti_id="activiti_id"
      :backgroundColor="backgroundColor"
    />
  </div>
</template>

<script>
import Start from './Start'
import Approver from './Approver'
import Notifier from './Notifier'
import Route from './Route'
import Condition from './Condition'
import End from './End'

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
    },

    backgroundColor: {
      type: String,
      default: '#ffffff'
    }
  },

  components: {
    Start,
    Approver,
    Notifier,
    Route,
    Condition,
    End
  }
}
</script>

<style lang="less" scoped>
.node-layout {
  text-align: left;
}
</style>
