<template>
  <div class="">
    <input type="text" v-model="name">
    <input type="password"  v-model="password">
    <button class="btn-login" @click="login">登录</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      baseUri: 'http://127.0.0.1:8084/api',
      name: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$http.post('login', {
        name: this.name,
        password: this.password,
      }).then((res) => {
        if (res.body.code === 200) {
          this.$router.go(-1);
        } else {
          alert(res.body.msg);
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
