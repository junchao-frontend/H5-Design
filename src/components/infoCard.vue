<!-- 求助信息卡片 -->
<template>
  <div class="infoCard-Container">
    <div class="infoCard">
      <!-- 药品信息盒子 -->
      <div class="infoCard-drug">
        <div class="infoCard-drug-font">需要</div>
        <div class="infoCard-drug-drug">{{ drugInfo }}</div>
      </div>
      <!-- 发布时间 -->
      <div class="infoCard-time">
        {{ new Date(addTime).toLocaleString() }}
      </div>
      <!-- 发布位置 -->
      <div class="infoCard-position"><span>位置</span>{{ position }}</div>
      <!-- 发布描述 -->
      <div class="infoCard-describe">
        <div style="color: #848484; margin-right: 10px">描述</div>
        <div>
          <van-tag
            v-for="(item, index) in drugResult"
            :key="index"
            round
            type="primary"
            >{{ item }}</van-tag
          >
        </div>
      </div>
      <!-- 提供帮助/需要这个药 -->
      <div v-if="!isSolve" class="infoCard-btn">
        <van-button type="primary" @click="provideHelp()">提供帮助</van-button>
      </div>
      <!-- 是否已解决 -->
      <div v-if="isSolve && !isEamine" class="infoCard-solve">待审核</div>
      <div v-if="isSolve && isEamine" class="infoCard-solve">已解决</div>
    </div>
  </div>
</template>

<script>
import { editHelpInfo } from '../api/drug';
export default {
  components: {},
  props: ['id', 'drugInfo', 'addTime', 'position', 'instruction', 'drugResult', 'isSolve', 'isEamine', 'wexinValue', 'phoneValue'],
  data () {
    return {
    };
  },
  computed: {},
  created () { },
  mounted () {
    // console.log(this.drugResult);
  },
  methods: {
    provideHelp () {
      this.$dialog.confirm({
        title: '联系方式',
        message: `<div class="test1">
                      <div>以下是对方留下的联系方式您可以通过该方式联系TA</div>
                      <div>微信号: <span style="color:blue">${this.wexinValue}</span></div>
                      <div>手机号: <span style="color:blue">${this.phoneValue}</span></div>
                  </div>`,
        allowHtml: true
      })
        .then(() => {
          // console.log(this.drugDesc);
          var data = {
            id: this.id,
            isSolve: !this.isSolve
          };
          editHelpInfo(data).then(res => {
            // console.log(res);
            if (res.data.code == '200') {
              this.$emit('changeKey');
            }
          });
          // on confirm
          // this.isSolve = !this.isSolve;
          // this.isEamine = !this.isEamine;
        })
        .catch(() => {
          // on cancel
        });
    }
  }
}
</script>
<style lang='less' scoped>
/deep/ .van-dialog__message {
  padding: 0;
  line-height: 0;
}
.infoCard {
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e3e4;
  &-drug {
    margin-top: 10px;
    display: flex;
    align-items: center;
    &-font {
      font-size: 16px;
      font-weight: bold;
      margin-right: 8px;
    }
    &-drug {
      font-size: 16px;
      color: #848484;
    }
    margin-bottom: 12px;
  }
  &-time {
    font-size: 14px;
    margin-bottom: 12px;
    color: #848484;
  }
  &-position {
    font-size: 14px;
    span {
      color: #848484;
      margin-right: 10px;
    }
    margin-bottom: 12px;
  }
  &-describe {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    .van-tag--primary {
      padding: 3px 8px;
      color: rgb(194, 190, 190);
      background-color: #f5f7f8;
    }
  }
  &-btn {
    position: relative;
    width: 100px;
    left: 230px;
    /deep/ .van-button--normal {
      height: 30px;
      padding: 0px 10px;
    }
  }
}
</style>
