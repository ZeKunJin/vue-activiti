<template>
  <div class="basic-node-layout">
    <table class="route">
      <tr>
        <td v-for="item in content.conditionNodes" :key="item.nodeId">
          <a class="node-block-container condition">
            <div class="header">{{ item.node.name }}</div>
            <div class="container">nodeId: {{ item.node.nodeId }}</div>
          </a>

          <create-button @select="onSelect" />

          <node :value="item.node.childNode" />
        </td>
      </tr>
    </table>

    <create-button @select="onSelect" />
  </div>
</template>

<script>
import bus from '@/utils/bus'
import CreateButton from '../../CreateButton'

export default {
  props: {
    content: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  components: {
    CreateButton
  },

  methods: {
    onSelect(type) {
      const { content: node } = this
      bus.$emit('insert', { node, type })
    }
  }
}
</script>

<style lang="less" scoped>
.basic-node-layout {
  position: relative;
  text-align: center;

  .route {
    width: 100%;
    margin: auto;
    padding: 0;
    th {
      vertical-align: top;
      position: relative;
      padding: 0;
    }
  }

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

  .condition {
    .header {
      width: 100%;
      border-radius: 4px 4px 0 0;
      background-color: #52c41a;
      color: #ffffff;
      line-height: 24px;
      height: 24px;
      padding: 0 8px;
      font-size: 10px;
    }
  }
}
</style>
