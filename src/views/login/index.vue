<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="header">Login</div>
      <div class="form-wrapper">
        <van-form @submit="onSubmit" v-model="userInfo">
          <van-field
            v-model="userInfo.account"
            name="用户名"
            placeholder="account"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="userInfo.password"
            type="password"
            name="密码"
            placeholder="password"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 15px">
            <van-button round block type="info" native-type="submit" class="btn"
              >Login</van-button
            >
          </div>
        </van-form>
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
      <register @closePopup="closePopup" />
    </van-popup>
  </div>
</template>

<script>
import { toLogin } from '@/api/user';
import register from './register.vue';
export default {
  components: {
    register
  },
  data () {
    return {
      registShow: false,
      userInfo: {
        account: '',
        password: ''
      }
    };
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
    register () {
      // console.log(1);
      this.registShow = true;
    },
    closePopup () {
      console.log(1);
      this.registShow = false;
    },
    onSubmit () {
      let data = {
        account: this.userInfo.account,
        password: this.userInfo.password
      };
      toLogin(data).then(res => {
        if (res.data.code !== 200) {
          Promise.reject(res.data.message);
        } else {
          console.log(res.data);
          this.$toast.success('登陆成功');
          let userId = res.data.data.id;
          let token = res.data.data.token;
          let userInfo = res.data.data.userInfo;
          sessionStorage.setItem('userId', userId);
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
          setTimeout(() => {
            this.$router.push('/');
          });
        }
      });
    },
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
  border: none;
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
