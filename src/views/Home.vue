<template>
    <div>
        <header class="bar bar-nav">
            <h1 class='title'>金山户外网</h1>
        </header>
        <nav class="bar bar-tab">
            <router-link class="tab-item external active" to="/home" replace>
                <span class="icon icon-home"></span>
                <span class="tab-label">线路</span>
            </router-link>
            <router-link class="tab-item external" to="/user" replace>
                <span class="icon icon-me"></span>
                <span class="tab-label">用户</span>
            </router-link>
            <router-link class="tab-item external" to="/about" replace>
                <span class="icon icon-star"></span>
                <span class="tab-label">联系我们</span>
            </router-link>
        </nav>
        <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
  export default{
    data() {
      return {}
    },
    methods: {
      fa: function () {
        this.$store.commit("doLine")
      },
      fb: function () {
      }
    }
  }
</script>
<style>
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-active {
        opacity: 0;
    }
</style>