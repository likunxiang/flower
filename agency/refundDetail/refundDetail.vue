<template>
	<view class="content_main" :style="refundDetail.status == 0?'padding-bottom: 140rpx':''" v-if="loadEnd || true">

		<view class="content_box">

			<view class="status_box">
				<view class="icon">
					<u-icon class="image" name="close" custom-prefix="custom-icon" size="36" color="#212121"
						v-if="refundDetail.status == 6 || refundDetail.status == 3"></u-icon>
					<u-icon class="image" name="timing" custom-prefix="custom-icon" size="36" color="#212121"
						v-else-if="refundDetail.status == 0"></u-icon>
					<u-icon class="image" name="finished" custom-prefix="custom-icon" size="36" color="#212121"
						v-else-if="refundDetail.status == 2"></u-icon>
				</view>
				<view class="status_text">
					<view class="title">{{refundDetail.status_str}}</view>
					<view class="desc" v-if="refundDetail.status == 0">退款申请中，请尽快处理</view>
					<view class="desc" v-else-if="refundDetail.status == 6">你已同意订单退款</view>
					<view class="desc" v-else-if="refundDetail.status == 3">退款已撤销</view>
					<view class="desc" v-else-if="refundDetail.status == 2">你已拒绝订单退款</view>
				</view>
			</view>

			<view class="box_address" @click="$toUrl('/agency/talkDetail/talkDetail',{id: refundId})">

				<view>协商详情</view>

				<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#212121"></u-icon>

			</view>

			<view class="box_product">

				<view :class="'goods_item ' + (gIndex < refundDetail.order_product.length - 1?'mb_16':'')"
					v-for="(goods,gIndex) in refundDetail.order_product" :key="gIndex">
					<view class="image">
						<image :src="goods.image" mode="aspectFill"></image>
					</view>
					<view class="goods_info">
						<view class="name_num_price">
							<view class="name u-line-2">{{goods.product_name}}</view>
							<view class="num_price font_family_din">
								<view class="price">￥{{goods.product_attr_unique_price}}</view>
								<view class="num">X {{goods.num}}</view>
							</view>
						</view>
						<view class="attr">
							{{goods.suk}}
						</view>

					</view>
				</view>

			</view>

			<view class="box_bottom">

				<view class="service_num">
					<view class="num_info mb_16"><text class="info_title">售后编号:</text>{{refundDetail.refund_no}}</view>
					<view class="num_info mb_16"><text class="info_title">售后类型:</text>{{refundDetail.refund_type_str}}
					</view>
					<view class="num_info mb_16"><text class="info_title">退款金额:</text>￥{{refundDetail.refund_price}}
					</view>
					<view class="num_info mb_16"><text class="info_title">退款原因:</text>{{refundDetail.reason}}</view>
					<view class="num_info mb_16"><text class="info_title">退款说明:</text>{{refundDetail.desc}}</view>
					<view class="num_info"><text class="info_title">申请时间:</text>{{refundDetail.add_time_format1}}</view>
				</view>


			</view>

		</view>

		<view class="content_bottom" :style="phoneModel=='iPhone X'?'height: 140rpx;':''"
			v-if="refundDetail.status == 0">
			<view class="bottom_button_empty" @click="openRefund">同意退款</view>
			<view class="bottom_button" @click="refusedRefund">拒绝退款</view>
		</view>

		<!-- 售后信息弹窗 -->
		<u-popup v-model="isRefund" mode="bottom" width="100%" :safe-area-inset-bottom="true">
			<view class="content_lay">
				<view class="content_title">
					<view class="text">填写售后信息</view>
					<view class="icon" @click="closeRefundLay">
						<u-icon class="image" name="close" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
					</view>
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
					<view class="footer_btn" @click="saveInfo">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 售后信息弹窗 end -->

		<!-- 拒绝退款弹窗 TODO-->
		<u-popup v-model="isRefuse" mode="center" width="560" :safe-area-inset-bottom="true" border-radius="16">
			<view class="refuse_lay">
				<view class="refuse_header">
					<view class="title">拒绝退款原因</view>
					<view class="textarea_box">
						<textarea class="textarea" :value="refuseValue" placeholder="请输入拒绝退款理由，限30字内" />
					</view>
				</view>
				<view class="refuse_footer">
					<view class="cancel_btn" @click="cancelRefuse">取消</view>
					<view class="sure_btn" @click="sureRefuse">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 拒绝退款弹窗 end -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				refundId: '',
				phoneModel: uni.getStorageSync('phoneModel'),
				numList: [{
					name: '提交申请'
				}, {
					name: '客服审核'
				}, {
					name: '退款'
				}],
				current: 0, //当前处于那个步骤
				refundDetail: {},
				isRefund: false, // 控制是否弹出售后信息弹窗
				addressVal: '', // 收货地址
				recipientVal: '', // 收件人
				telVal: '', // 电话号码
				orderNo: '', // 订单编号
				refundNo: '', // 退单编号
				loadEnd: false,
				isRefuse: false, // 控制是否弹出拒绝弹窗
				refuseValue: '', // 拒绝退款内容
			}
		},
		onLoad() {
			this.refundId = this.$Route.query.id;
			this.getRefundDetail();
		},
		methods: {
			//获取售后记录详细
			getRefundDetail() {
				uni.showLoading({
					title: '拼命加载中',
					mask: true
				});
				this.$api.my.API_MYREFUNDDETAIL({
					order_product_id: this.refundId,
					request_type: 1
				}).then(res => {
					this.refundDetail = res.data.order_refund_info;
					this.orderNo = this.refundDetail.out_trade_no;
					this.refundNo = this.refundDetail.refund_no;
					this.loadEnd = true;
					uni.hideLoading();
				});
			},
			//跳转设置
			jumpPage(val) {
				switch (val) {
					case 0: //协商详情
						this.$jumpPage('/pages/my/after/consultDetails');
						break;
				};

			},
			openRefund() {
				// TODO 参数未传
				uni.showModal({
					content: '同意退款',
					success: (res) => {
						if (res.confirm) {
							// this.isRefund = true;
							this.orderNo = orderNo;
							this.refundNo = refundNo;
							this.agreeRefund()
						}
					}
				});

				// 获取缓存中的售后地址
				// let refundAddress = uni.getStorageSync('refundAddress');
				// this.addressVal = refundAddress.address || '';
				// this.recipientVal = refundAddress.addressee || '';
				// this.telVal = refundAddress.phone || '';
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
					this.agreeRefund();
					this.closeRefundLay();
				} else {
					uni.showToast({
						title: '还有信息没有填写',
						icon: 'none'
					});
				}
			},
			// 同意退款 
			agreeRefund() {
				this.$api.member.REFUND_AUDIT({
					// address: this.addressVal,
					// phone: this.telVal,
					// addressee: this.recipientVal,
					out_trade_no: this.orderNo,
					refund_no: this.refundNo,
					audit_type: 1
				}).then(res => {
					uni.showModal({
						title: '操作成功',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								this.getRefundDetail();
							}
						}
					});

				});
			},
			// 取消 拒绝退款 
			cancelRefuse() {
				this.isRefuse = false
			},
			// 确定 拒绝退款
			sureRefuse() {
				this.$api.member.REFUND_AUDIT({
					out_trade_no: this.orderNo,
					refund_no: this.refundNo,
					audit_type: 2
				}).then(res => {
					this.isRefuse = false
					uni.showModal({
						title: '操作成功',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								this.getRefundDetail();
							}
						}
					});
				});
			},
			//拒绝退款
			refusedRefund() {
				this.isRefuse = true

			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}


	.content_main {
		background: #EEEEEE;
		min-height: 100%;
		position: relative;

		.content_box {
			padding-top: 16rpx;

			.status_box {
				padding: 24rpx 40rpx;
				background: #FFFFFF;
				display: flex;

				.icon {
					width: 36rpx;
					height: 36rpx;
					margin-right: 24rpx;

					.image {
						width: 100%;
						height: 100%;
					}
				}

				.status_text {
					.title {
						font-size: 30rpx;
						color: #333333;
						margin-bottom: 8rpx;
					}

					.desc {
						font-size: 22rpx;
						color: #CCCCCC;
					}
				}
			}

			.box_remind {
				height: 157rpx;
				width: 100%;


				image {
					width: 100%;
					height: 157rpx;
				}


			}

			.box_address {
				height: 94rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 25rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-top: 16rpx;
				background: #FFFFFF;

				image {
					width: 18rpx;
					height: 18rpx;
					color: #333333;
				}

			}

			.box_product {
				width: 100%;
				margin-top: 16rpx;
				background: #FFFFFF;
				padding: 24rpx;

				.mb_16 {
					margin-bottom: 16rpx;
				}

				.goods_item {
					display: flex;

					.image {
						flex-grow: 0;
						flex-shrink: 0;
						width: 160rpx;
						height: 160rpx;
						margin-right: 24rpx;

						image {
							width: 100%;
							height: 100%;
							background: #CCCCCC;
						}
					}

					.goods_info {
						flex-grow: 1;

						.name_num_price {
							display: flex;
							line-height: 50rpx;
							margin-bottom: 22rpx;

							.name {
								width: 320rpx;
								font-size: 28rpx;
								color: #333333;
								margin-right: 16rpx;
							}

							.num_price {
								text-align: right;
								flex: 1;

								.price {
									font-size: 28rpx;
									font-weight: bold;
									color: #666666;
								}

								.num {
									font-size: 24rpx;
									font-weight: bold;
									color: #666666;
								}
							}
						}

						.attr {
							font-size: 24rpx;
							color: #999999;
						}
					}
				}
			}

			.box_bottom {
				background: #FFFFFF;
				margin-top: 16rpx;

				.service_num {
					padding: 24rpx;


					.num_info {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;

						.info_title {
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #333333;
							margin-right: 40rpx;
						}


					}

					.mb_16 {
						margin-bottom: 16rpx;
					}

				}

				.product_service {
					width: 100%;
					height: 72rpx;
					background: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 20rpx 0;
					border-top: 1rpx solid rgba(0, 0, 0, 0.1);

					.service_layer:nth-child(1) {
						border-right: 1rpx solid rgba(0, 0, 0, 0.1);
					}

					.service_layer {
						width: 352rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;

						.layer_top {
							display: flex;
							align-items: center;

							image {
								width: 36rpx;
								height: 36rpx;
								margin-right: 10rpx;
							}

						}


					}

				}

			}



		}

		.content_bottom {
			width: 100%;
			height: 100rpx;
			position: absolute;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding: 0 26rpx;
			position: fixed;
			background: #fff;
			font-size: 24rpx;

			.bottom_button_empty {
				width: 200rpx;
				height: 66rpx;
				line-height: 64rpx;
				text-align: center;
				background: #FFFFFF;
				border: 1rpx solid #212121;
				color: #333333;
				margin-right: 24rpx;
			}

			.bottom_button {
				width: 200rpx;
				height: 66rpx;
				text-align: center;
				line-height: 66rpx;
				text-align: center;
				border: 1rpx solid #000000;
				background: #000000;
				color: #FFFFFF;
			}

		}

		.content_lay {
			height: 577rpx;
			background: #FFFFFF;

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

				.footer_btn {
					width: 702rpx;
					height: 66rpx;
					line-height: 66rpx;
					text-align: center;
					font-size: 24rpx;
					color: #FFFFFF;
					background: #212121;
				}
			}


		}

		.refuse_lay {
			width: 560rpx;
			background: #FFFFFF;
			border-radius: 16rpx;

			.refuse_header {
				padding: 40rpx 34rpx 37rpx;

				.title {
					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					margin-bottom: 24rpx;
					text-align: center;
				}

				.textarea_box {
					height: 188rpx;
					background: #FFFFFF;
					border-radius: 4rpx;
					border: 0rpx solid #999999 !important;
					padding: 24rpx;
					position: relative;

					.textarea {
						width: 100%;
						height: 100%;
						font-size: 30rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						text-align: justify;
						color: #CCCCCC;
					}

				}

				.textarea_box::after {
					position: absolute;
					content: '';
					width: 200% !important;
					height: 200% !important;
					left: 0;
					top: 0;
					border: 2rpx solid #999999;
					transform: scale(0.5);
					transform-origin: 0 0;
				}
			}

			.refuse_footer {
				border-top: 1rpx solid #E5E5E5;
				display: flex;
				width: 100%;
				line-height: 100rpx;
				text-align: center;

				.cancel_btn {
					flex: 1;
					border-right: 1rpx solid #E5E5E5;
					font-size: 36rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
				}

				.sure_btn {
					flex: 1;
					font-size: 36rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #333333;
				}
			}
		}

	}
</style>
