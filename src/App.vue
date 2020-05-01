<template>
  <div id="app">
    <activiti :activitiResource="activitiResource" @refresh="onRefresh" />
  </div>
</template>

<script>
import Activiti from '@/components/Activiti'
import ActivitiObject from '@/components/Activiti/Object'

export default {
  name: 'App',

  components: {
    Activiti
  },

  data() {
    return {
      activitiResource: new ActivitiObject()
    }
  },

  methods: {
    onRefresh(e) {
      this.activitiResource = e
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  padding: 24px;
}
</style>
