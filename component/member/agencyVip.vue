<template>
	<view>
		<!-- 代理会员中心 -->
		<view class="agency_vip">
			<view class="my_earnings" @click="$toUrl('/agency/myIncome/myIncome')">
				<view class="title">
					<view class="">我的收入(元)</view>
					<view class="image" @click.stop="changeEye">
						<u-icon class="icon" custom-prefix="custom-icon" :name="eye?'openeyes':'closeeyes'" size="24" color="#212121"></u-icon>
					</view>
				</view>
				<view class="earnings_num">
					<text class="icon">{{eye?'￥':''}}</text>
					<text class="font_family_din">{{eye?(memberInfo.income_amount || 0):'*** ***'}}</text>
				</view>
			</view>

			<view class="sale_work">
				<view class="title">零售单工作台</view>
				<view class="menu_list">
					<view class="menu_item" v-for="(item,index) in agencyMenuList" :key="index"
						@click="toUrl(item.status)">
						<view class="num font_family_din">{{item.num || 0}}</view>
						<view class="menu_title">{{item.title || 0}}</view>
						<view class="line" v-if="index < agencyMenuList.length - 1"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 代理会员中心 end -->

		<!-- 售后信息弹窗 -->
		<u-popup v-model="isRefund" mode="bottom" width="100%">
			<view class="content_lay">
				<view class="content_tips">
					恭喜您已成为葵花子的金卡/黑卡/经销商用户，初次使用需要设置您的售后地址，方便您后期进行订单管控。感谢配合。
				</view>
				<view class="content_title">
					<view class="text">填写售后信息</view>
				</view>
				<view class="input_district">
					<view class="input_box">
						<view class="input_title">
							收件地址
						</view>
						<input class="input" type="text" :value="addressVal" placeholder="省/市/区/门牌号"
							@input='inputAddress' />
					</view>
					<view class="input_box">
						<view class="input_title">
							收件人
						</view>
						<input class="input" type="text" :value="recipientVal" placeholder="收件人姓名"
							@input='inputTecipient' />
					</view>
					<view class="input_box">
						<view class="input_title">
							电话
						</view>
						<input class="input" type="text" :value="telVal" placeholder="联系人电话" @input='inputTel' />
					</view>
				</view>
				<view class="content_footer">
					<view class="footer_empty" @click="closeRefundLay">取消</view>
					<view class="footer_btn" @click="saveInfo">确定</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eye: true,
				isRefund: true, // 控制是否弹出售后信息弹窗
				addressVal: '', // 收货地址
				recipientVal: '', // 收件人
				telVal: '', // 电话号码
				orderStatus: '0'
			}
		},
		props: {
			agencyMenuList: {
				type: Array,
				default: () => {
					return {}
				}
			},
			// 会员中心所有数据
			memberInfo: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		computed: {
			incomeeye() {
				return this.$store.state.incomeeye;
			}
		},
		mounted() {
		},
		methods: {
			changeEye() {
				this.eye = !this.eye;
			},
			toUrl(status) {
				this.orderStatus = status
				
				// 先判断是否需要填写售后地址
				if (false) {
					this.openRefund()
				} else {
					if (status === '10') {
						this.$jumpPage('/agency/orderRefund/orderRefund');
					} else if (status === '1'){
						this.$jumpPage('/agency/failedOrder/failedOrder');
					} else {
						this.$jumpPage('/agency/order/order', {
							status: this.orderStatus
						});
					};
				}
				
			},
			openRefund() {
				// TODO 参数未传
				this.isRefund = true;
			},
			inputAddress(e) {
				this.addressVal = e.detail.value;
			},
			inputTecipient(e) {
				this.recipientVal = e.detail.value;
			},
			inputTel(e) {
				this.telVal = e.detail.value;
			},
			closeRefundLay() {
				this.isRefund = false;
			},
			saveInfo() {
				if (this.addressVal && this.recipientVal && this.telVal) {
					let refundAddress = {};
					refundAddress.address = this.addressVal;
					refundAddress.phone = this.telVal;
					refundAddress.addressee = this.recipientVal;
					uni.setStorageSync('refundAddress', refundAddress);
					this.closeRefundLay();
					this.$jumpPage('/agency/order/order', {
						status: "2"
					});
				} else {
					uni.showToast({
						title: '还有信息没有填写',
						icon: 'none'
					});
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.agency_vip {
		margin-bottom: 16rpx;

		.my_earnings {
			width: 100%;
			height: 143rpx;
			padding: 24rpx 60rpx;
			background: url(../../static/images/member/earnings_bg.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin-bottom: 8rpx;

			.title {
				display: flex;
				align-items: center;
				font-size: 22rpx;
				color: #666666;
				margin-bottom: 12rpx;
				font-family: PingFangSC-Regular, PingFang SC;

				.image {
					width: 40rpx;
					height: 24rpx;
					margin-left: 16rpx;

					.icon {
						width: 24rpx;
						height: 24rpx;
					}
				}
			}

			.earnings_num {
				color: #8C6233;
				font-weight: 600;
				font-size: 46rpx;

				.icon {
					font-size: 30rpx;
				}
			}
		}

		.sale_work {
			background: #FFFFFF;

			.title {
				padding: 24rpx;
				font-size: 26rpx;
				color: #333333;
				font-weight: 500;
			}

			.menu_list {
				display: flex;
				align-items: center;

				.menu_item {
					flex: 1;
					text-align: center;
					padding: 24rpx 0;
					position: relative;

					.num {
						font-size: 36rpx;
						color: #333333;
						font-weight: bold;
						margin-bottom: 8rpx;
					}

					.menu_title {
						font-size: 24rpx;
						color: #333333;
						font-family: PingFangSC-Regular, PingFang SC;
					}

					.line {
						position: absolute;
						right: 0;
						top: 50%;
						margin-top: -20rpx;
						width: 1rpx;
						height: 40rpx;
						background: rgba(0, 0, 0, .1);
					}
				}
			}
		}

	}
	.content_lay {
		height: 790rpx;
		background: #FFFFFF;
	
		.content_tips {
			padding: 60rpx 40rpx 0;
			text-align: justify;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
		}
	
		.content_title {
			padding: 60rpx 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
	
			.text {
				font-size: 36rpx;
				color: #333333;
			}
	
			.icon {
				width: 26rpx;
				height: 26rpx;
	
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	
		.input_district {
			padding: 0 30rpx;
			margin-bottom: 40rpx;
	
			.input_box {
				padding: 24rpx 30rpx;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
				display: flex;
				align-items: center;
	
				.input_title {
					font-size: 28rpx;
					color: #333333;
					width: 144rpx;
				}
	
				.input {
					flex: 1;
					font-size: 28rpx;
				}
			}
		}
	
		.content_footer {
			padding: 0 24rpx;
			display: flex;
			justify-content: space-between;
	
			.footer_empty {
				width: 340rpx;
				height: 66rpx;
				line-height: 66rpx;
				background: #FFFFFF;
				border: 0px solid #212121 !important;
				position: relative;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
			}
	
			.footer_empty::after {
				position: absolute;
				content: '';
				width: 200% !important;
				height: 200% !important;
				left: 0;
				top: 0;
				border: 2rpx solid #212121;
				transform: scale(0.5);
				transform-origin: 0 0;
			}
	
			.footer_btn {
				width: 340rpx;
				height: 66rpx;
				line-height: 66rpx;
				text-align: center;
				font-size: 24rpx;
				color: #FFFFFF;
				background: #212121;
			}
		}
	
	
	}
</style>
