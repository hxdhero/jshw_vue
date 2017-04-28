<template>
    <div class="content">
        <Display></Display>
        <Increment></Increment>
    </div>
</template>
<script>
  import Display from './Display.vue'
  import Increment from './Increment.vue'
  import store from '../../vuex/store' // import 我们刚刚创建的 store

  export default{
    components: {
      Display,
      Increment,
    },
    store
  }
</script>