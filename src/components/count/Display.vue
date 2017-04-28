<template>
    <div>
        <h3>Count is {{$store.state.count}}</h3>
    </div>
</template>

<script>
  import Vuex from 'vuex'
  export default {
    computed: Vuex.mapGetters([
      'countValue'
    ])
  }
</script>