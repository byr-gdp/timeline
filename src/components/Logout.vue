<template>
  <div class="">
    <button @click="logout">退出</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      baseUri: 'http://127.0.0.1:8084/api',
      msg: '正在退出登录...',
    };
  },
  methods: {
    logout() {
      this.$http.post('logout').then((res) => {
        this.msg = res.body.msg;
        this.$router.replace('/');
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
