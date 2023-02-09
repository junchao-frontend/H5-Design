<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="header">Login</div>
      <div class="form-wrapper">
        <input
          type="text"
          name="account"
          placeholder="account"
          class="input-item"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          class="input-item"
        />
        <div class="btn">Login</div>
      </div>
      <div class="msg">
        Don't have account?
        <a @click="register()">Sign up</a>
      </div>
    </div>
    <van-popup
      closeable
      close-icon-position="top-left"
      class="close-sheet"
      close-icon="arrow-left"
      get-container="body"
      v-model="registShow"
      position="right"
      :style="{ width: '100%', height: ' 100%' }"
    >
      <register />
    </van-popup>
  </div>
</template>

<script>
import register from './register.vue';
export default {
  components: {
    register
  },
  data () {
    return {
      registShow: false
    };
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
    register () {
      // console.log(1);
      this.registShow = true;
    }
  }
}
</script>

<style lang='less' scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.login-wrapper {
  background-color: #fff;
  width: 200px;
  height: 400px;
  border-radius: 15px;
  padding: 0 50px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 120px;
}

.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}

.input-item:placeholder {
  text-transform: uppercase;
}

.btn {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
}

.msg {
  text-align: center;
  line-height: 88px;
}

a {
  text-decoration-line: none;
  color: #abc1ee;
}
</style>
