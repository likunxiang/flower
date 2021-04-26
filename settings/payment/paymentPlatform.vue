<template>
	<view class="content_main">

		<u-navbar title="支付收银台" :custom-back="$goback" :border-bottom="false"></u-navbar>

		<view class="content_box" :style="'height: calc(100vh - ' + heightInfo + 'px);'">

			<view class="box_price">

				<view class="price_time">支付剩余时间：<u-count-down :timestamp="orderData.left_pay_second" font-size="22"
						color="#999999" separator-size="22" separator-color="#999999"></u-count-down>
				</view>

				<view class="price_all">￥<text class="price_num font_family_din">{{orderData.total_pay_price}}</text>
				</view>

				<view class="price_title">请及时完成支付, 超时将自动取消订单</view>

			</view>

			<view class="box_mode">

				<view class="block_line" v-for="(item,index) in paymentData" :key="index">

					<view class="line_img">
						<image :src="item.imgPng"></image>{{item.name}}
					</view>

					<view class="line_checkbox">
						<u-checkbox shape="circle" size="24" v-model="item.checked" @change="changeClick"></u-checkbox>
					</view>

				</view>

			</view>
			
<!-- 			<view class="box_bank">
			
				<view class="info_img" style="background: #FFFFFF;">
					<image src="/settings/static/settings_card.png"></image>
				</view>
			
				<view class="info_name info_teShu">添加新的银行卡 <image src="/static/images/my/right.png">
				</view>
			
			</view> -->

		</view>

		<pageBottom title="确定" @footerBtnEvent="paymentItem"></pageBottom>

		<u-popup v-model="showLoading" mode="center" :mask="false" @close="closeLoading">
			<view class="loading_main">
				<u-loading mode="flower" size="48"></u-loading>
				<view class="loading_name">支付加载中...</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import pageBottom from '@/component/common/pageFooter.vue';
	export default {
		components: {
			pageBottom
		},
		data() {
			return {
				heightInfo: '', //标题栏高度
				phoneModel: uni.getStorageSync('phoneModel'),
				paymentData: [{
					name: "微信支付",
					imgPng: '/settings/static/payment_wx.png',
					checked: true,
				}], //支付类型
				orderData: {}, //订单数据
				timerInfo: "", //时间定时器
				typePage: '', //判断那边跳转
				showLoading: false, //加载
			}
		},
		onLoad(option) {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.typePage = option.typePage;
			if (option.orderData != undefined) {
				this.orderData = JSON.parse(option.orderData);
			}
		},
		onUnload() {
			clearInterval(this.timerInfo);
			this.showLoading = false;
			this.$cache('orderType', null);
		},
		methods: {
			
			//反正重复点击
			paymentItem(){
				let that = this;
				that.$u.throttle(that.paymentInfo, 2000)
			},

			//支付 目前只对接微信支付
			paymentInfo() {
				let that = this;
				let isOk=false;
				that.paymentData.forEach(item=>{
					if(item.checked){
						isOk=true;
					}
				})
				if(!isOk){
					that.$u.toast("请选择支付的方式!");
					return
				}
				clearInterval(that.timerInfo)
				that.$api.my.API_MYORDERPAY({
					pay_out_trade_no: that.orderData.pay_out_trade_no,
					type: 5,
				}).then(res => {
					let orderInfo = {
						appId: res.data.appId,
						timeStamp: res.data.timeStamp,
						nonceStr: res.data.nonceStr,
						package: res.data.package,
						signType: res.data.signType,
						paySign: res.data.paySign,
					};
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: orderInfo.timeStamp,
						nonceStr: orderInfo.nonceStr,
						package: orderInfo.package,
						signType: orderInfo.signType,
						paySign: orderInfo.paySign,
						success: function(res) {
							that.payStatus();
						},
						fail: function(err) {
							if(that.typePage==3){//判断返回还是跳转
								that.$goback();
							}else{
								that.$jumpPage('/pages/my/order/orderDetails', {
									orderId:that.orderData.order_id,
								}, 'replace');
							}
						},
						complete: () => {

						}
					});
				});
			},

			//关闭loading回调
			closeLoading() {
				let that = this;
				that.showLoading = false;
				clearInterval(this.timerInfo);
			},

			//判断支付状态
			payStatus() {
				let that = this;
				that.showLoading = true;
				that.timerInfo = setInterval(() => {
					that.$api.my.API_MYORDERPAYRESULT({
						out_trade_no: that.orderData.out_trade_no,
					}).then(res => {
						if (res.data.pay_status == 1) {
							setTimeout(function() {
								that.$jumpPage('/settings/payment/paymentSuccessful', {
									payPrice: that.orderData.total_pay_price,
									typePage: that.typePage
								}, 'replace');
							}, 1000);
							clearInterval(that.timerInfo);
							that.showLoading = false;
						}
					});
				}, 3000)
			},

			//选择支付方式
			changeClick(e) {
				let that = this;
				this.paymentData.forEach(item => {
					item.checked = false;
				})
				if (e.checked) {
					e.checked = true;
				} else {
					e.checked = false;
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background-color: #FFFFFF;
		height: 100%;

		.content_box {
			width: 100%;
			text-align: center;

			.box_price {
				height: 360rpx;
				width: 100%;

				.price_all {
					margin-top: 20rpx;
					height: 60rpx;

					.price_num {
						font-size: 48rpx;
						font-family: DIN Alternate;
						font-weight: bold;
						color: #212121;
					}

				}

				.price_time {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-top: 80rpx;
					height: 30rpx;
				}

				.price_title {
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					height: 30rpx;
					margin-top: 40rpx;
				}

			}

			.box_mode {
				border-top: 16rpx solid #eeeeee;
				padding-left: 60rpx; 
				padding-right: 48rpx; 
				
				.block_line:nth-child(1) {
					border-bottom: 0;
				}

				.block_line {
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					height: 98rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.line_img {
						display: flex;
						align-items: center;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;

						image {
							width: 64rpx;
							height: 64rpx;
							margin-right: 24rpx;
						}

					}

					.line_checkbox {}


				}

			}
			
			.box_bank{
				display: flex;
				align-items: center;
				height: 120rpx;
				padding-left: 60rpx;
				padding-right: 48rpx; 
				border-top: 16rpx solid #eeeeee;
				border-bottom: 16rpx solid #eeeeee;
				
				.info_img {
					width: 64rpx;
					height: 64rpx;
				
					image {
						width: 100%;
						height: 100%;
					}
				
				}
				
				.info_teShu {
					width: calc(100% - 118rpx);
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
				
				.info_name {
					margin-left: 24rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				
					image {
						width: 20rpx;
						height: 20rpx;
					}
				
				}
				
			}
			

		}

		.loading_main {
			width: 200rpx;
			height: 200rpx;
			background-color: rgba(0, 0, 0, 0.5);
			border-radius: 20rpx;
			text-align: center;
			padding: 40rpx 0;

			.loading_name {
				font-size: 28rpx;
				color: #fff;
				margin-top: 10rpx;
			}

		}

		::v-deep.u-drawer {
			z-index: 0 !important;
		}
	}
</style>
