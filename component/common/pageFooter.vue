<template>
  <view :class="'footer ' + (phoneModel?'footer_x':'')" :style="'position:' + location + (backGround?';background:' + backGround:'')" @click="footerBtnEvent" v-if="btnStatus">
    <view class="btn">{{title}}</view>
  </view>
  
  <view :class="'footer ' + (phoneModel?'footer_x':'')" :style="'position:' + location" v-else>
    <view class="btn btn_disable">{{titleDisable}}</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        phoneModel: uni.getStorageSync('phoneModel'),
      }
    },
    props: {
      // 可点击时的文案
      title: {
        type: String,
        default: '确定'
      },
      // 不可点击时的文案
      titleDisable: {
        type: String,
        default: '不可点击'
      },
      // 按钮的状态
      btnStatus: {
        type: Boolean,
        default: true
      },
      // 定位方式
      location: {
        type: String,
        default: 'absolute'
      },
	  // 背景色 ，为空时无背景色
	  backGround: {
		  type: String,
		  default: ''
	  }
    },
    methods: {
      footerBtnEvent() {
        this.$emit('footerBtnEvent');
      }
    }
  }
</script>

<style lang="scss">
  .page {
    min-height: 100%;
    position: relative;
  }
  .footer {
    width: 100%;
    padding: 32rpx 24rpx;
    position: absolute;
    bottom: 0rpx;
    left: 0rpx;
    .btn {
      width: 100%;
      height: 66rpx;
      line-height: 66rpx;
      text-align: center;
      font-size: 24rpx;
      color: #FFFFFF;
      background: #212121;
    }
    .btn_disable {
      background: #CCCCCC;
    }
  }
  .footer_x {
    height: 166rpx;
  }
</style>