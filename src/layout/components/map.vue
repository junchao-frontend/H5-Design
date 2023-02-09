<template>
  <div class="map-container">
    <div id="container" class="container"></div>
    <van-cell-group>
      <van-cell title="当前位置:" :label="curPosition" />
    </van-cell-group>
    <!-- <h5 id="status"></h5> -->
    <!-- 地图搜索 -->
    <div class="select">
      <el-select
        v-model="keywords"
        filterable
        remote
        reserve-keyword
        placeholder="请输入搜索地点"
        :remote-method="remoteMethod"
        :loading="loading"
        :clearable="true"
        size="mini"
        @change="currentSelect"
        style="width: 380px"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item"
          class="one-text"
        >
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{
            item.district
          }}</span>
        </el-option>
      </el-select>
    </div>
    <div style="width: 70px; margin: 3px auto">
      <van-button @click="gitPosition()" type="primary" size="small" block
        >确定</van-button
      >
    </div>
  </div>
</template>
 
<script>
// import AMap from 'AMap'
import AMapLoader from "@amap/amap-jsapi-loader"
window._AMapSecurityConfig = {
  // 安全密钥
  securityJsCode: "c8e83d01b8bb1db6c6efdeda54e3b75f",
}
export default {
  name: "TestIndex",
  props: ['difference'],
  data () {
    return {
      // 当前位置
      curPosition: '',
      address: '',
      // 地图实例
      map: null,
      // 标记点
      marker: "",
      geoCoder: null,
      longit: '', // 经度
      latit: '',  // 纬度
      // 搜索提示
      AutoComplete: null,
      // 搜索关键字
      keywords: "",
      // 位置信息
      form: {
        lng: "",
        lat: "",
        address: "",
        //地区编码
        adcode: "",
      },
      // 搜索节流阀
      loading: false,
      // 搜索提示信息
      options: [],
      curForm: {
        lng: '',
        lat: ''
      }
    }
  },
  methods: {
    onComplete (data) {
      // const that = this
      // console.log(this)
      // data是具体的定位信息
      console.log('data是具体的定位信息', data)
      // 这里使用that而不是this，如果使用this，则无法在其他地方获取到这里的经纬度
      this.curForm.lng = data.position.lng
      this.curForm.lat = data.position.lat
      this.initMap()
    },
    onError () {
      // 定位出错
      console.log('定位失败')
    },
    // 获取经纬度信息
    initPosition () {
      AMapLoader.load({
        // 你申请的Key
        key: "9036f1b13a48be99c9b111fed7a63280",
        version: "2.0",
        AMapUI: {
          version: '1.1',
          plugins: ['overlay/SimpleMarker']
        },
        // 需要用到的插件
        plugins: ["AMap.Geocoder", "AMap.AutoComplete", "AMap.Geolocation"],
      })
        .then((AMap) => {
          var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          })
          geolocation.getCurrentPosition()
          AMap.Event.addListener(geolocation, 'complete', this.onComplete)
          AMap.Event.addListener(geolocation, 'error', this.onError)
        })
        .catch((err) => {
          // 错误
          console.log(err)
        })
    },
    initMap () {
      AMapLoader.load({
        // 你申请的Key
        key: "9036f1b13a48be99c9b111fed7a63280",
        version: "2.0",
        AMapUI: {
          version: '1.1',
          plugins: ['overlay/SimpleMarker']
        },
        // 需要用到的插件
        plugins: ["AMap.Geocoder", "AMap.AutoComplete", "AMap.Geolocation"],
      })
        .then((AMap) => {

          this.map = new AMap.Map("container", {
            viewMode: "3D", //是否为3D地图模式
            zoom: 16, //初始化地图级别
            center: [this.curForm.lng, this.curForm.lat], //初始化地图中心点位置
          })
          this.map.getCenter()


          //地址逆解析插件
          this.geoCoder = new AMap.Geocoder({
            city: "010", //城市设为北京，默认：“全国”
            radius: 1000, //范围，默认：500
          })
          // console.log(this.curForm)
          // this.marker = new window.AMap.Marker({
          //   map: this.map,
          //   position: [this.curForm.lng, this.curForm.lat],
          // })
          this.form = this.curForm
          this.setMapMarker()
          this.AutoComplete = new AMap.AutoComplete({ city: "全国" })

          //点击获取经纬度;
          this.map.on("click", (e) => {
            // 获取经纬度
            this.form.lng = e.lnglat.lng
            this.form.lat = e.lnglat.lat
            // 清除点
            this.removeMarker()
            // 标记点
            this.setMapMarker()
          })
        })
        .catch((err) => {
          // 错误
          console.log(err)
        })
    },

    // 标记点
    setMapMarker () {
      // 自动适应显示想显示的范围区域
      this.map.setFitView()
      this.marker = new window.AMap.Marker({
        map: this.map,
        position: [this.form.lng, this.form.lat],
      })
      // 逆解析地址
      this.toGeoCoder()
      this.map.setFitView()
      this.map.add(this.marker)
      setTimeout(() => {
        this.curPosition = this.form.address
        this.$toast.clear()
      }, 1000)
    },
    // 清除点
    removeMarker () {
      if (this.marker) {
        this.map.remove(this.marker)
      }
    },

    // 逆解析地址
    toGeoCoder () {
      let lnglat = [this.form.lng, this.form.lat]
      this.geoCoder.getAddress(lnglat, (status, result) => {
        if (status === "complete" && result.regeocode) {
          this.form.address = result.regeocode.formattedAddress
        }
      })
      // console.log(this.form.address)
    },
    // 搜索
    remoteMethod (query) {
      console.log(query)
      if (query !== "") {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.AutoComplete.search(query, (status, result) => {
            this.options = result.tips
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    // 选中提示
    currentSelect (val) {
      // 清空时不执行后面代码
      if (!val) {
        return
      }
      this.form = {
        lng: val.location.lng,
        lat: val.location.lat,
        address: val.district + val.address,
        adcode: val.adcode,
      }
      // 清除点
      this.removeMarker()
      // 标记点
      this.setMapMarker()
    },
    // 确定位置按钮
    gitPosition () {
      this.$emit('getPosition', this.curPosition)
    }
  },
  mounted () {
    this.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: '加载中..',
    })
    setTimeout(() => {
      this.initPosition()
      // this.initMap()
    }, 1000)
  },
};
</script>
 
<style lang="less">
.container {
  width: 100%;
  height: 650px;
}
.select {
  // margin-top: 30px;
  padding: 0 8px;
  /* width: 300px; */
}
</style>