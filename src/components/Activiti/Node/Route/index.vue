<template>
  <div class="basic-node-layout">
    <table class="route" :style="`background-color: ${backgroundColor}`">
      <tr>
        <td v-for="(item, index) in content.conditionNodes" :key="item.nodeId">
          <div class="condition-row-line top" :style="!index ? 'left: 50%;' : ''" />
          <div class="condition-col-line" />
          <activiti :activitiResource="item" :backgroundColor="backgroundColor" />

          <div class="condition-row-line bottom" :style="!index ? 'left: 50%;' : ''" />
        </td>
      </tr>
    </table>

    <create-button @select="onSelect" />
  </div>
</template>

<script>
import bus from '../../bus'
import CreateButton from '../../CreateButton'

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
    },

    backgroundColor: {
      type: String,
      default: '#ffffff'
    }
  },

  components: {
    CreateButton
  },

  mounted() {
    bus.$on('removeCondition', this.onRemoveCondition)
  },

  methods: {
    onSelect(type) {
      const { content: node, activiti_id } = this
      bus.$emit('insert', { node, type, activiti_id })
    },

    onRemoveCondition(e) {
      const { content } = this
      const { activiti_id } = e
      const index = this.getConditionAt(activiti_id)
      if (index > -1) {
        this.content.conditionNodes.splice(index, 1)
      }

      if (content.conditionNodes.length < 2) {
        const [conditionNode] = content.conditionNodes

        if (
          conditionNode.node &&
          conditionNode.node.childNode &&
          conditionNode.node.childNode.nodeId
        ) {
          const { activiti_id } = this
          const { childNode: replaceNode } = conditionNode.node
          bus.$emit('replace', { node: content, activiti_id, replaceNode })
        } else {
          const { activiti_id } = this
          bus.$emit('remove', { node: content, activiti_id })
        }
      }
    },

    getConditionAt(activiti_id) {
      for (let i = 0; i < this.content.conditionNodes.length; i++) {
        if (this.content.conditionNodes[i].activitiId === activiti_id) {
          return i
        }
      }

      return -1
    }
  }
}
</script>

<style lang="less" scoped>
.above {
  position: relative;
  z-index: 9;
}

.basic-node-layout {
  position: relative;
  text-align: center;

  .route {
    position: relative;
    width: 100%;
    margin: auto;
    padding: 0;
    margin-top: -2px;
    z-index: 9;

    td {
      vertical-align: top;
      position: relative;
      padding: 0;
    }
    td::before {
      content: '';
      display: block;
      width: 2px;
      height: 64px;
      background-color: #bebebe;
      margin: auto;
      position: relative;
      z-index: 9;
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
}

.condition-col-line {
  width: 2px;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #bebebe;
  left: 50%;
  transform: translate(-50%; 0);
  z-index: 0;
}

.condition-row-line {
  width: 50%;
  height: 2px;
  background-color: #bebebe;
  position: absolute;
}

.top {
  top: 0;
}

.bottom {
  bottom: 0;
}
</style>
