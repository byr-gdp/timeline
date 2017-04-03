<template>
  <div id="app">
    <header class="mod-header">
      <img src="./assets/timeline.png" class="logo">
      <span class="logo-desc">随时随地记录想法</span>
    </header>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="stylus">
body
  margin 0
  padding-top 40px

.mod-header
  position fixed
  top 0
  left 0
  right 0
  height 40px
  background-color #1e2327
  color #fff
  text-align center

  .logo
    width 30px
    height 30px
    margin-top 5px

  .logo-desc
    display inline-block
    line-height 40px
    height 40px
    vertical-align top
    margin-left 8px
    font-weight 300
</style>
