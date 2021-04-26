<template>
	<view class="page" v-if="loadEnd">
		<!-- <view class="tab_box">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" height="72" font-size='28'
				active-color='#333333' inactive-color='#212121' bar-width='72' bar-height='2'></u-tabs>
		</view> -->

		<view class="main">
			<view class="empty" style="height: 100vh;" v-if="orderList.length == 0">
				<view class="image">
					<image src="/static/images/my/order/icon_book.png" mode="aspectFill"></image>
				</view>
				<view class="empty_text">一贫如洗的订单</view>
			</view>

			<view class="order_list" v-else>
				<view class="order_item" v-for="(item,index) in orderList" :key="index"
					@click="$toUrl('/agency/refundDetail/refundDetail',{id: item.order_product_id})">
					<view class="order_header">
						<view class="order_time">
							<view class="order_time_detail">
								<view class="title">申请时间:</view>
								<view class="specific">{{item.add_time_format1}}</view>
							</view>
							<view class="order_status">{{item.myorder_status_str}}</view>
						</view>
						<view class="order_time">
							<view class="order_time_detail">
								<view class="title">申请人:</view>
								<view class="specific">{{item.user.nickname}}</view>
								<view class="icon_copy" @click.stop="copyText(item.user.nickname)">
									<u-icon name="copy" custom-prefix="custom-icon" size="24" color="#212121"></u-icon>
								</view>
							</view>
						</view>

						<view class="order_time">
							<view class="order_time_detail">
								<view class="title">订单编号:</view>
								<view class="specific">{{item.out_trade_no}}</view>
								<view class="icon_copy" @click.stop="copyText(item.out_trade_no)">
									<u-icon name="copy" custom-prefix="custom-icon" size="24" color="#212121"></u-icon>
								</view>
							</view>
						</view>

					</view>
					<view class="order_main">
						<view :class="'goods_item ' + (gIndex < item.order_product.length - 1?'mb_16':'')"
							v-for="(goods,gIndex) in item.order_product" :key="gIndex">
							<view class="image">
								<image :src="goods.image" mode="aspectFill"></image>
							</view>
							<view class="goods_info">
								<view class="name_num_price">
									<view class="name u-line-2">{{goods.product_name}}</view>
									<view class="num_price font_family_din">
										<view class="price">￥{{goods.per_pay_price}}</view>
										<view class="num">X {{goods.num}}</view>
									</view>
								</view>
								<view class="attr">
									{{goods.suk}}
								</view>

							</view>
						</view>
					</view>
					<view class="order_footer">
						<view class="order_footer_date">
							<view class="total_num">共 {{item.product_count}} 件产品</view>
							<view class="total_price font_family_din">合计:￥{{item.refund_price}}</view>
						</view>
						<view class="order_footer_operation" v-if="item.status == 0">

							<view class="btn_bottom_empty mr_16"
								@click.stop="openRefund(item.out_trade_no,item.refund_no)">同意退款</view>
							<view class="btn_bottom_full" @click.stop="refusedRefund(item.out_trade_no,item.refund_no)">
								拒绝退款</view>
						</view>
					</view>
				</view>

			</view>
		</view>

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
				list: [{
					name: '处理中'
				}, {
					name: '处理记录'
				}],
				current: 0,
				orderList: [],
				currPage: 1, //
				totalPage: 1, // 
				isRefund: false, // 控制是否弹出售后信息弹窗
				addressVal: '', // 收货地址
				recipientVal: '', // 收件人
				telVal: '', // 电话号码
				orderNo: '', // 订单编号 -- 退款
				refundNo: '', // 退款编号 -- 退款
				loadEnd: false
			};
		},
		onShow() {
			this.getOrderList()
		},
		methods: {
			change(index) {
				this.current = index;
				this.currPage = 1;
				this.getOrderList();
			},
			//获取订单列表 处理中
			getOrderList() {
				uni.showLoading({
					title: '拼命加载中',
					mask: true
				});
				this.$api.my.API_MYREFUNDLIST({
					request_type: 1,
					type: this.current,
				}).then(res => {
					this.orderList = res.data.list;
					this.totalPage = res.data.total_page;
					this.loadEnd = true;
					uni.hideLoading();
				});
			},
			copyText: function(value) {
				let text = value;
				uni.setClipboardData({
					data: text,
					success(res) {
						uni.getClipboardData({
							success(res) {

							}
						});
					}
				})
			},
			openRefund(orderNo, refundNo) {
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
								this.getOrderList()
							}
						}
					});

				});
			},
			//拒绝退款
			refusedRefund(orderNo, refundNo) {
				this.$api.member.REFUND_AUDIT({
					out_trade_no: orderNo,
					refund_no: refundNo,
					audit_type: 2
				}).then(res => {
					uni.showModal({
						title: '操作成功',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								this.getOrderList()
							}
						}
					});
				});
			},
			// 查看物流
			checkLogistics() {

			},
			// 上划加载更多
			loadMore() {
				// 模拟请求成功后的回调
				setTimeout(() => {
					let currPage = this.currPage + 1;

					this.$api.my.API_MYREFUNDLIST({
						page: currPage,
						type: this.current,
					}).then(res => {

						this.orderList = this.orderList.concat(res.data.list);
						this.currPage = currPage;
					})
					// 1. list数组添加新数据
					// 2. 更新当前页码 currPage
					// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
				}, 800);
			},
		},
		onReachBottom() {
			if (this.currPage < this.totalPage) {
				this.loadMore();
			};
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}

	.page {
		.tab_box {
			position: sticky;
			top: 0rpx;
		}

		.main {
			.empty {
				background: #FFFFFF;
				padding-top: 45%;

				.image {
					width: 160rpx;
					height: 160rpx;
					margin: 0 auto 80rpx;

					image {
						width: 160rpx;
						height: 160rpx;
					}
				}

				.empty_text {
					text-align: center;
					font-size: 30rpx;
					color: #666666;
				}
			}

			.order_list {
				padding: 16rpx 0;

				.order_item {
					padding: 24rpx;
					padding-bottom: 0rpx;
					background: #FFFFFF;
					margin-bottom: 16rpx;

					.order_header {
						border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

						.order_time {
							display: flex;
							align-items: center;
							flex-grow: 1;
							margin-bottom: 16rpx;

							.order_time_detail {
								display: flex;
								flex-grow: 1;

								.title {
									font-size: 26rpx;
									color: #333333;
									width: 150rpx;
								}

								.specific {
									font-size: 26rpx;
									color: #999999;
								}

								.icon_copy {
									width: 24rpx;
									height: 24rpx;
									margin-left: 16rpx;

									image {
										width: 100%;
										height: 100%;
									}
								}
							}

							.order_status {
								flex-grow: 0;
								flex-shrink: 0;
								font-size: 26rpx;
								color: #E76234;
								font-weight: 600;
							}
						}
					}

					.order_main {
						padding-top: 16rpx;
						padding-bottom: 24rpx;
						border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

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

					.order_footer {
						padding: 24rpx 0;

						.order_footer_date {
							display: flex;
							justify-content: flex-end;

							.total_num {
								font-size: 26rpx;
								color: #999999;
								margin-right: 24rpx;
							}

							.total_price {
								font-size: 26rpx;
								color: #333333;
							}
						}

						.order_footer_operation {

							display: flex;
							justify-content: flex-end;
							align-items: center;

							.mr_16 {
								margin-right: 16rpx;
							}

							.btn_bottom_empty {
								margin-top: 24rpx;
								width: 160rpx;
								height: 50rpx;
								line-height: 48rpx;
								text-align: center;
								background: #FFFFFF;
								border: 1rpx solid #212121;
								font-size: 24rpx;
								color: #333333;
							}

							.inventory {
								margin-top: 24rpx;
								font-size: 26rpx;
								color: #E76234;
								margin-right: 16rpx;
							}

							.btn_bottom_full {
								margin-top: 24rpx;
								width: 160rpx;
								height: 50rpx;
								background: #212121;
								line-height: 50rpx;
								text-align: center;
								font-size: 24rpx;
								color: #FFFFFF;
							}

							.income {
								margin-top: 24rpx;
								font-size: 26rpx;
								color: #E76234;

								.income_text {}

								.income_num {
									font-weight: bold;
								}
							}


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
	}
</style>
