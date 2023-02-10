<template>
  <div class="my-container">
    <div class="titleItem">
      <div class="images">
        <img src="./people.png" alt="" />
      </div>
      <div class="user">
        <div class="test">{{ userInfo.account }}</div>
        <div class="username">
          <div>手机号: {{ userInfo.phone }}</div>
        </div>
      </div>
    </div>
    <div class="my-handle">
      <van-cell title="用户ID" :value="userInfo.id" />
      <van-cell title="退出登录" is-link @click="quit" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      userInfo: {}
    };
  },
  computed: {
  },
  mounted () {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  },
  methods: {
    quit () {
      this.$dialog
        .confirm({
          title: "退出确认",
          message: "确定要退出当前账号吗？",
        })
        .then(() => {
          sessionStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
.my-handle {
  margin-top: 30px;
}
.my-container {
  margin-bottom: -60px;
  height: 100vh;
  width: 100%;
  background-color: #f6f6f6;
  .service {
    margin: 10px 0;
  }
  .install {
    margin-top: 10px;
  }
  .titleItem {
    // width: 100%;
    // position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    height: 150px;
    background: #fff;
    align-items: center;
    padding-left: 28px;
    .images {
      background-color: #ededed;
      border-radius: 10px;
    }
    .user {
      width: 100%;
      display: flex;
      margin-left: 20px;
      flex-direction: column;
      .test {
        margin-bottom: 7px;
        font-size: 18px;
        font-weight: 600;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }
      .username {
        font-size: 12px;
        color: #878787;
        display: flex;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        justify-content: space-between;
        .arrow {
          margin-right: 5px;
        }
      }
    }
  }
}

img {
  height: 50px;
  width: 50px;
}
</style>
