<template>
  <div class="layout-container" id="layout-container">
    <!-- 绿色背景图 -->
    <div class="bgc">
      <div class="bgc-title">抗击新冠疫情公益互助</div>
      <div class="bgc-body">
        <span>邻里互助</span>
        <span>共克时疫</span>
      </div>
    </div>
    <div class="notice">
      <van-notice-bar
        scrollable
        text="公益服务禁止私人药物买卖 如遇诈骗请举报"
      />
    </div>
    <!-- 主页卡片 -->
    <div class="card">
      <van-tabs v-model="active">
        <van-tab title="求助信息"><needHelp /></van-tab>
        <van-tab title="帮助信息"><help /></van-tab>
      </van-tabs>
    </div>
    <!-- 药品卡片 -->
    <div class="drug-card">
      <!-- 我需要药卡片 -->
      <div class="drug-card-left" @click="openDrug(0)">
        <img
          src="../assets/drug.png"
          alt=""
          style="width: 60px; height: 60px; margin-right: -14px"
        />
        <div class="drugFont">
          <span>我需要药</span>
          <span>填写求助信息</span>
        </div>
      </div>
      <!-- 我有更多的药卡片 -->
      <div class="drug-card-right" @click="openDrug(1)">
        <img
          src="../assets/takeDrug.png"
          alt=""
          style="width: 60px; height: 60px; margin-right: -10px"
        />
        <div class="drugFont">
          <span>我有多的药</span>
          <span>填写帮助信息</span>
        </div>
      </div>
    </div>
    <!-- 导航栏 -->
    <div class="app-bottom">
      <van-tabbar>
        <van-tabbar-item @click="test()">
          <div class="myIcon">
            <van-icon name="manager-o" size="24" />
            <span>我的</span>
          </div>
        </van-tabbar-item>
        <van-tabbar-item @click="openShare()">
          <div class="myIcon">
            <van-icon name="share-o" size="24" />
            <span>分享</span>
          </div>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- 我的和分享界面弹出层 -->
    <van-popup
      v-model="shareShow"
      position="bottom"
      get-container="body"
      :style="{ height: '20%' }"
    >
      <div class="myshare">
        <van-button type="info" block round @click="preservationImg()"
          >保存图片</van-button
        >
        <div class="share">*点击保存图片 -> 去微信朋友圈 -> 选择图片发布</div>
      </div>
    </van-popup>
    <van-popup
      closeable
      close-icon-position="top-left"
      class="close-sheet"
      get-container="body"
      v-model="myShow"
      position="right"
      :style="{ width: '100%', height: ' 100%' }"
    >
      <myPage />
    </van-popup>
    <!-- 药片弹出层 -->
    <van-popup
      closeable
      close-icon-position="top-left"
      class="close-sheet"
      close-icon="arrow-left"
      get-container="body"
      v-model="drugCardShow"
      position="right"
      :style="{ width: '100%', height: ' 100%' }"
    >
      <drugCard @changeDrug="changeDrug" />
    </van-popup>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import drugCard from './components/drugCard.vue';
import needHelp from './components/needHelp.vue';
import help from './components/help.vue';
import myPage from '../views/my/index.vue';
export default {
  name: "app-layout",
  components: {
    myPage,
    needHelp,
    help,
    drugCard
  },
  data () {
    return {
      myShow: false,
      active: 0,
      drugCardShow: false,
      shareShow: false
      // allRole: allRole[localStorage.getItem('role')]
    };
  },
  mounted () {
    // const path = allRole[localStorage.getItem('role')][0].path
    // if (this.$route.path === '/') {
    //   this.$router.push(path)
    // }
  },
  methods: {
    preservationImg () {
      let body = document.getElementById('layout-container');
      html2canvas(body, {  //这里是拿到id为pdfDom的实例
        allowTaint: true,
      }).then(function (canvas) {
        let pageData = canvas.toDataURL(); // 这是获取到了base64编码
        console.log(pageData, "base644444");

        var eventPayload = {
          content: pageData,//图片base64格式，包含前缀：data:image/png;base64,
          fileName: "图形绘制.png",
          imageType: "png",
        };
        // console.log(eventPayload);
        var content = eventPayload.content;
        var imageType = eventPayload.imageType;
        var fileName = eventPayload.fileName;
        if (content) {
          // 接口返回的数据部分
          // 解析图片
          // 因接口直接返回了base64代码部分，所以不需要截取，如果含"data:image/png;base64," 则需要自己做截取处理
          var base64List = content.slice(22); //截取base64的"data:image/png;base64,"
          var raw = window.atob(base64List);
          var rawLength = raw.length;
          var uInt8Array = new Uint8Array(rawLength);
          for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
          }
          var blob = new Blob([uInt8Array], { type: "image/" + imageType });
          // //保存图片
          var aLink = document.createElement("a");
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent("click", true, true);
          aLink.download = fileName;
          aLink.href = URL.createObjectURL(blob);
          aLink.click();
        } else {
          console.log("没有base64代码");
        }
      });
    },
    openShare () {
      this.shareShow = true;

      // html2canvas(aaa, {
      //   useCORS: true, // 使用跨域
      //   backgroundColor: null // 没有背景色
      // }).then((canvas) => {
      //   canvas.id = 'screenshotCanvas';
      //   let url = canvas.toDataURL('image/png');
      //   console.log(url);
      // });
    },
    onSelect () {
      // Toast(option.name);
      this.showShare = false;

    },
    test () {
      this.myShow = true;
    },
    openDrug (index) {
      if (index == 0) {
        this.$store.commit('changeIndex', 0);
      } else {
        this.$store.commit('changeIndex', 1);
      }
      this.drugCardShow = true;
    },
    changeDrug (value) {
      this.drugCardShow = value;
    }
  }
};
</script>

<style lang="less" scoped>
.van-tabbar-item--active {
  color: #646566;
}
.van-button--block {
  width: 70%;
}
.van-popup--bottom {
  border-radius: 15px 15px 0 0;
}
.myshare {
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .share {
    margin-top: 30px;
    text-align: center;
    color: red;
  }
}

.app-bottom {
  padding-bottom: 60px;
  // padding-top: 60px;
}
.myIcon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    margin-top: 5px;
  }
}
.layout-container {
  // overflow: hidden;
  background-color: #f7f8fb;
  width: 100%;
  height: 100%;
  .bgc {
    position: relative;
    top: 0;
    height: 20%;
    width: 100%;
    background-color: #6eb78c;
    overflow: hidden;
    &-title {
      margin-top: 20px;
      margin-left: 5px;
      font-size: 24px;
      color: #fff;
      font-style: italic;
      font-weight: 500;
    }
    &-body {
      margin-left: 7px;
      margin-top: 10px;
      span {
        // display: inline-block;
        color: #e6f7ed;
      }
      span:nth-child(1) {
        margin-right: 15px;
        letter-spacing: 3px;
        // color: #e6f7ed;
      }
      span:nth-child(2) {
        letter-spacing: 3px;
        // color: #e6f7ed;
      }
    }
  }
  .card {
    margin-top: 10px;
    // padding: 5px 0 0 5px;
    border-radius: 15px 15px 0 0;
    background-color: #fff;
    width: 100%;
    /deep/ .van-tab {
      font-size: 16px;
    }
    /deep/ .van-tabs__line {
      background-color: #7fb58f;
      width: 60px;
    }
    /deep/ .van-tabs__content {
      padding-top: 14px;
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  .drug-card {
    justify-content: space-around;
    display: flex;
    width: 100%;
    position: absolute;
    top: 15%;
    &-left {
      display: flex;
      justify-content: space-around;
      align-items: center;
      // margin-left: 5%;
      border-radius: 12%;
      height: 100px;
      width: 47%;
      background-color: rgb(255, 255, 255);
      .drugFont {
        display: flex;
        flex-direction: column;
        span:nth-child(1) {
          font-size: 16px;
          font-weight: 500;
        }
        span:nth-child(2) {
          font-size: 13px;
          color: #9f9f9f;
        }
      }
    }
    &-right {
      display: flex;
      justify-content: space-around;
      align-items: center;
      // margin-right: 5%;
      border-radius: 12%;
      height: 100px;
      width: 47%;
      background-color: rgb(255, 255, 255);
      .drugFont {
        display: flex;
        flex-direction: column;
        span:nth-child(1) {
          font-size: 16px;
          font-weight: 500;
        }
        span:nth-child(2) {
          font-size: 13px;
          color: #9f9f9f;
        }
      }
    }
  }
}
.notice {
  margin-top: 18%;
}
</style>
