<template>
  <div class="register-container">
    <div class="login-wrapper">
      <div class="header">Register</div>
      <div class="form-wrapper">
        <van-form @submit="onSubmit" v-model="userInfo">
          <van-field
            v-model="userInfo.account"
            name="account"
            placeholder="account"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="userInfo.phone"
            name="phone"
            placeholder="phone"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-model="userInfo.password"
            type="password"
            name="password"
            placeholder="password"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 15px">
            <van-button round block type="info" native-type="submit" class="btn"
              >注册</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from '../../api/user';
export default {
  components: {},
  data () {
    return {
      userInfo: {
        account: '',
        phone: '',
        password: ''
      }
    };
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
    onSubmit () {
      let data = this.userInfo;
      // console.log(data);
      registerUser(data).then(res => {
        console.log(res);
        if (res.data.code !== 200) {
          Promise.reject(res.data.message);
        } else {
          this.$toast.success('注册成功');
          this.userInfo = {
            account: '',
            phone: '',
            password: ''
          };
          this.$emit('closePopup');
        }
      });
    },
  }
}
</script>

<style lang='less' scoped>
.register-container {
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
