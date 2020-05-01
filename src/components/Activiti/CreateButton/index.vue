<template>
  <div class="tool-tip-layout">
    <a-popover placement="right">
      <template slot="content">
        <div style="width: 256px; text-align: center">
          <a-row>
            <a-col :span="8">
              <div style="margin-bottom: 8px">
                <a-button @click="onSelect(APPROVER)" shape="circle" icon="bulb" size="large" />
              </div>Approver
            </a-col>
            <a-col :span="8">
              <div style="margin-bottom: 8px">
                <a-button
                  @click="onSelect(NOTIFIER)"
                  shape="circle"
                  icon="carry-out"
                  size="large"
                />
              </div>Notifier
            </a-col>
            <a-col :span="8">
              <div style="margin-bottom: 8px">
                <a-button
                  @click="onSelect(ROUTE)"
                  shape="circle"
                  icon="branches"
                  size="large"
                />
              </div>Route
            </a-col>
          </a-row>
        </div>
      </template>

      <a-button type="primary" shape="circle" icon="plus" size="large" />
    </a-popover>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Popover, Row, Col } from 'ant-design-vue'
import {
  APPROVER,
  NOTIFIER,
  ROUTE
} from '../node-types'

Vue.use(Button)
  .use(Popover)
  .use(Row)
  .use(Col)

export default {
  data() {
    return {
      APPROVER,
      NOTIFIER,
      ROUTE
    }
  },

  methods: {
    onSelect(type) {
      this.$emit('select', type)
    }
  }
}
</script>
