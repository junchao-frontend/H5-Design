<!-- 求助信息卡片 -->
<template>
  <div class="needHelp-container">
    <div v-for="(item, index) in helpInfoArr" :key="index">
      <div class="curd-item">
        <infoCard
          @changeKey="changeKey"
          :key="reload"
          :id="item.id"
          :drugInfo="item.drugInfo"
          :addTime="item.gitTime"
          :position="item.positionInfo"
          :instruction="item.instruction"
          :drugResult="item.drugResult"
          :isSolve="item.isSolve"
          :wexinValue="item.wexinValue"
          :phoneValue="item.phoneValue"
          :isEamine="item.isEamine"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { showHelp } from "../../api/drug";
import infoCard from '@/components/infoCard.vue';
export default {
  components: {
    infoCard
  },
  data () {
    return {
      helpInfoArr: [], // 求助信息
      reload: 0
    };
  },
  computed: {},
  created () { },
  mounted () {
    this.initData();// 获取求助信息
  },
  methods: {
    // 重新加载子组件
    changeKey () {
      this.initData();
      this.reload++;
    },
    initData () {
      showHelp().then(res => {
        if (res.data.code == 200) {
          var drugData = res.data.data;
          drugData.forEach(item => {
            item.drugResult = item.drugResult.split(',');
            // console.log(item)
          });
          this.helpInfoArr = drugData;
        }
      }).catch(error => {
        console.error(error);
      });
    }
  }
}
</script>

<style lang='less' scoped>
.curd-item {
  margin-bottom: 15px;
}
</style>
