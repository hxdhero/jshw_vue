<template>
    <div v-if="show">
        <header class="bar bar-nav">
            <router-link class="button button-link button-nav pull-left" to="/">
                <span class="icon icon-left"></span>
                返回
            </router-link>
            <h1 class="title">线路详情{{this.$store.state.name}}</h1>
        </header>
        <div class="content">
            这是一条神奇的线路...
        </div>
    </div>
</template>
<script>

  export default{
    data(){
      return {
        show: true,
      }
    },
    beforeRouteEnter (to, from, next){
      next()
    },
    created(){
      console.log("LineDetail created!")
      console.log(this.$store.state)
      this.fetchData()
      $.showIndicator()
    },
    methods: {
      fetchData(){
        console.log("fetch data")
        this.$http.post(
            serverHead+"/test",
            this.he)
            .then((respSuc) => {
              console.log(respSuc.body)
              this.$store.commit("setName",respSuc.body.name)
              $.hideIndicator()
              this.show=true
            }, (respFail) => {
            })
      }
    }
  }
</script>
1264E970849F5D9B
1266732E888187BEA053BFFED5C073E1
12C041F38147201FD6E68236BD8D70B99990A6495845ADC6