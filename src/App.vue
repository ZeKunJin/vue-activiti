<template>
  <div id="app">
    <flow :defaultValue="defaultValue" />
  </div>
</template>

<script>
import Flow from '@/components/Flow'
import Activiti from '@/object/Activiti'

export default {
  name: 'App',

  components: {
    Flow
  },

  data() {
    return {
      defaultValue: new Activiti()
    }
  }
}
</script>
