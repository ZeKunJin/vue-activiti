<template>
  <div class="basic-node-layout">
    <a class="node-block-container notifier">
      <div class="header">
        {{ content.name }}
        <a-icon type="close" @click.prevent="remove" />
      </div>
      <div class="container">nodeId: {{ content.nodeId }}</div>
    </a>

    <create-button @select="onSelect" />
  </div>
</template>

<script>
import Vue from 'vue'
import bus from '../../bus'
import CreateButton from '../../CreateButton'
import { Icon } from 'ant-design-vue'
Vue.use(Icon)

export default {
  props: {
    content: {
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
    CreateButton
  },

  methods: {
    onSelect(type) {
      const { content: node, activiti_id } = this
      bus.$emit('insert', { node, type, activiti_id })
    },

    remove() {
      const { content: node, activiti_id } = this
      bus.$emit('remove', { node, activiti_id })
    }
  }
}
</script>

<style lang="less" scoped>
.basic-node-layout {
  position: relative;
  text-align: center;

  .node-block-container {
    width: 256px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    background-color: #ffffff;
    text-align: left;
    margin: auto;
    display: block;
    color: rgba(0, 0, 0, 0.65);

    .container {
      padding: 10px 16px;
    }
  }

  .notifier {
    .header {
      width: 100%;
      border-radius: 4px 4px 0 0;
      background-color: #1890ff;
      color: #ffffff;
      line-height: 24px;
      height: 24px;
      padding: 0 8px;
      font-size: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
