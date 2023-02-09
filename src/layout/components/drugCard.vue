<template>
  <div class="drug-container">
    <van-tabs v-model="drugIndex" @click="onClick">
      <van-tab title="我需要药">
        <div class="needDrug">
          <van-form
            @submit="onSubmitDrug"
            @failed="onFailedDrug"
            v-model="drugForm"
          >
            <div class="needDrug-font">
              <p>所需药物<span style="color: red; margin-left: 3px">*</span></p>
            </div>
            <van-field
              v-model="drugForm.drugInfo"
              placeholder="填写药物名称"
              :rules="[{ required: true, message: '请输入需要的药物' }]"
            />
            <div class="needDrug-font">
              <p>
                求助者所在位置<span style="color: red; margin-left: 3px">*</span
                ><span
                  @click="needPositionCli()"
                  style="color: #7fb58f; margin-left: 20px"
                  ><van-icon name="aim" />定位</span
                >
              </p>
            </div>
            <van-field
              v-model="drugForm.positionInfo"
              placeholder="填写所在位置"
              :rules="[{ required: true, message: '请填写所在位置' }]"
            />
            <div class="needDrug-font">
              <p>
                求助者微信号<span style="color: red; margin-left: 3px">*</span>
              </p>
            </div>
            <van-field
              v-model="drugForm.wexinValue"
              placeholder="填写微信号"
              :rules="[{ required: true, message: '请填写微信号' }]"
            />
            <div class="needDrug-font">
              <p>
                求助者手机号<span style="color: red; margin-left: 3px">*</span>
              </p>
            </div>
            <van-field
              v-model="drugForm.phoneValue"
              placeholder="填写手机号"
              :rules="[{ required: true, message: '请填写手机号' }]"
            />
            <div class="needDrug-font">
              <p>求助说明</p>
            </div>
            <van-field
              v-model="drugForm.instruction"
              placeholder="请简单描述你需要的帮助，如具体药品名称。"
            />
            <div class="needDrug-font">
              <p style="color: #c8c9cc">添加标签便于精准求助</p>
              <van-checkbox-group
                v-model="drugForm.drugResult"
                direction="horizontal"
              >
                <van-checkbox name="发烧">发烧</van-checkbox>
                <van-checkbox name="流涕">流涕</van-checkbox>
                <van-checkbox name="老人">老人</van-checkbox>
                <van-checkbox name="孕妇">孕妇</van-checkbox>
                <van-checkbox name="儿童">儿童</van-checkbox>
                <van-checkbox name="残障人士">残障人士</van-checkbox>
              </van-checkbox-group>
            </div>
            <div class="sbt-btn">
              <van-button round block type="info" native-type="submit"
                >提交</van-button
              >
            </div>
          </van-form>
        </div>
      </van-tab>
      <van-tab title="我有多的药">
        <div class="needDrug">
          <van-form
            @submit="onSubmitPro"
            v-model="proDrugForm"
            @failed="onFailedDrug"
          >
            <div class="needDrug-font">
              <p>
                可以提供的药物<span style="color: red; margin-left: 3px"
                  >*</span
                >
              </p>
            </div>
            <van-field
              v-model="proDrugForm.proDrugInfo"
              placeholder="填写提供药物名称"
              :rules="[{ required: true, message: '请输入提供的药物' }]"
            />
            <div class="needDrug-font">
              <p>药物来源</p>
            </div>
            <div class="needDrug-font">
              <van-checkbox-group
                v-model="proDrugForm.sourceResult"
                direction="horizontal"
              >
                <van-checkbox name="药店">药店</van-checkbox>
                <van-checkbox name="医院">医院</van-checkbox>
                <van-checkbox name="网购">网购</van-checkbox>
                <van-checkbox name="他人赠予">他人赠予</van-checkbox>
                <van-checkbox name="其他">其他</van-checkbox>
              </van-checkbox-group>
            </div>
            <div class="needDrug-font">
              <p>
                帮助者所在位置<span style="color: red; margin-left: 3px">*</span
                ><span
                  @click="needPositionCli()"
                  style="color: #7fb58f; margin-left: 20px"
                  ><van-icon name="aim" />定位</span
                >
              </p>
            </div>
            <van-field
              v-model="proDrugForm.proPositionInfo"
              placeholder="填写所在位置"
              :rules="[{ required: true, message: '请填写所在位置' }]"
            />
            <div class="needDrug-font">
              <p>
                帮助者微信号<span style="color: red; margin-left: 3px">*</span>
              </p>
            </div>
            <van-field
              v-model="proDrugForm.proWexinValue"
              placeholder="填写微信号"
              :rules="[{ required: true, message: '请填写微信号' }]"
            />
            <div class="needDrug-font">
              <p>
                帮助者手机号<span style="color: red; margin-left: 3px">*</span>
              </p>
            </div>
            <van-field
              v-model="proDrugForm.proPhoneValue"
              placeholder="填写手机号"
              :rules="[{ required: true, message: '请填写手机号' }]"
            />
            <div class="needDrug-font">
              <p>帮助说明</p>
            </div>
            <van-field
              v-model="proDrugForm.proInstruction"
              placeholder="请简单描述你能提供的帮助。"
            />
            <div class="sbt-btn">
              <van-button
                round
                block
                type="info"
                native-type="submit"
                @click="gitProForm()"
                >提交</van-button
              >
            </div>
          </van-form>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 定位弹出层 -->
    <van-popup
      closeable
      close-icon-position="top-left"
      class="close-sheet"
      get-container="body"
      v-model="positionShow"
      position="right"
      :style="{ width: '100%', height: ' 100%' }"
    >
      <Map @getPosition="getPosition" />
    </van-popup>
  </div>
</template>

<script>
import { addNeedInfo } from '../../api/drug.js';
import { addProvideInfo } from '../../api/proDrug';
import Map from './map.vue';
import { mapState } from 'vuex';
export default {
  components: {
    Map
  },
  data () {
    return {
      drugForm: {
        wexinValue: '',
        phoneValue: '',
        instruction: '',
        drugInfo: '',
        positionInfo: '',
        drugResult: [], // 需要药的标签
      },
      // 下面是提供药的
      proDrugForm: {
        proDrugInfo: '',
        proPositionInfo: '',
        proWexinValue: '',
        proPhoneValue: '',
        proInstruction: '',
        sourceResult: [], // 药物来源
      },
      positionShow: false
    };
  },
  computed: {
    ...mapState([
      'drugIndex',
    ]),
    drugIndex: {
      get () {
        return this.$store.state.drugIndex;
      },
      set (val) {
        this.$store.state.drugIndex = val;
      }
    }

  },
  created () { },
  mounted () { },
  methods: {
    // 格式化时间
    timestampToTime (times) {
      let time = times[1];
      let mdy = times[0];
      mdy = mdy.split('/');
      let month = parseInt(mdy[0]);
      let day = parseInt(mdy[1]);
      let year = parseInt(mdy[2]);
      return year + '-' + month + '-' + day + ' ' + time;
    },
    // 提交不通过出发
    onFailedDrug (error) {
      // error 可以打印看看，错误信息集合
      if (error.errors[0]) { // 
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        });
      }
    },
    //提交帮助信息表单
    gitProForm () {
      // console.log(this.proPositionInfo)
    },
    // 获取当前位置
    getPosition (value) {
      this.positionShow = false;
      if (this.drugIndex == 0) {
        this.drugForm.positionInfo = value;
      } else {
        this.proDrugForm.proPositionInfo = value;
      }
    },
    onClick (name, title) {
      if (title == '我需要药') {
        this.$store.commit('changeIndex', 0);
      } else {
        this.$store.commit('changeIndex', 1);
      }
    },
    //提交求助信息表单
    onSubmitDrug (values) {
      let time = new Date();
      //isSolve 是否解决了这个求助信息
      this.drugForm.isSolve = false;
      // isEamine 后台是否审核通过了这个求助
      this.drugForm.isEamine = false;
      this.drugForm.gitTime = this.timestampToTime(time.toLocaleString('en-US', { hour12: false }).split(" "));
      var dataInfo = { ...this.drugForm };
      // console.log(dataInfo)
      dataInfo.drugResult = dataInfo.drugResult.join() || '';
      if (!values) return;
      addNeedInfo(dataInfo).then(res => {
        if (res.data.code == 200) {
          this.$toast.success('添加成功');
          this.$emit('changeDrug', false);
          this.drugForm = {};
          location.reload();
        }
        // console.log(res)
      }).catch(error => {
        console.log(error);
      });
    },
    // 提交帮助信息
    onSubmitPro (values) {
      var dataInfo = { ...this.proDrugForm };
      dataInfo.sourceResult = dataInfo.sourceResult.join() || '';
      if (!values) return;
      console.log(dataInfo);
      addProvideInfo(dataInfo).then(res => {
        if (res.data.code == 200) {
          this.$toast.success('添加成功');
          this.$emit('changeDrug', false);
          this.proDrugForm = {};
        }
        // console.log(res)
      }).catch(error => {
        console.log(error);
      });
    },
    needPositionCli () {
      this.positionShow = true;
    }
  }
}
</script>

<style lang='less' scoped>
.sbt-btn {
  margin-top: 25px;
  .van-button--round {
    border-radius: 0;
  }
  .van-button--info {
    margin: 0 auto;
    width: 300px;
    height: 40px;
    background-color: #72bc91;
    border: 1px solid #72bc91;
  }
}
.drug-container {
  .van-icon {
    color: #72bc91;
  }
  .van-tabs {
    margin-top: 50px;
  }
  /deep/ .van-tabs__line {
    background-color: #7fb58f;
    width: 60px;
  }
}
.needDrug {
  .needDrug-font {
    margin-top: 30px;
    margin-left: 15px;
  }
  /deep/ .van-cell {
    margin-left: 15px;
    padding: 8px 10px;
    color: rgb(197, 190, 190);
    border: 1px solid rgb(251, 241, 241);
  }
}
</style>
