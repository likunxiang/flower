<template>
	<view :class="'page ' + (isShowFooter?'padb_154':'')">
		<view class="tab_box">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" height="72" font-size='28'
				active-color='#333333' inactive-color='#212121' bar-width='72' bar-height='2'></u-tabs>
		</view>

		<view class="main">
			<view class="empty" style="height: calc( 100vh - 72rpx);" v-if="orderList.length <= 0">
				<view class="image">
					<image src="/static/images/my/order/icon_book.png" mode="aspectFill"></image>
				</view>
				<view class="empty_text">一贫如洗的订单</view>
			</view>

			<view class="order_list" v-else>
				<view class="order_item" v-for="(item,index) in orderList" :key="index" @click="$toUrl('/agency/orderDetail/orderDetail',{id: item.id})">
					<view class="order_header">
						<view class="order_time">
							<view class="order_time_detail">
								<view class="title">下单时间:</view>
								<view class="specific">{{item.add_time_format1}}</view>
							</view>
							<view class="order_status">{{item.myorder_status_str}}</view>
						</view>
						<view class="order_time">
							<view class="order_time_detail">
								<view class="title">下单账户:</view>
								<view class="specific">{{item.phone}}</view>
								<view class="icon_copy" @click.stop="copyText(item.phone)">
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
						<view :class="'goods_item ' + (gIndex < item.order_product.length - 1?'mb_16':'')" v-for="(goods,gIndex) in item.order_product"
							:key="gIndex">
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
							<view class="total_num">共 {{item.order_product_count}} 件产品</view>
							<view class="total_price font_family_din">合计:￥{{item.pay_price}}</view>
						</view>
						<view class="order_footer_operation">
							
							<block v-if="item.myorder_status == 2">
								<view class="btn_bottom_empty" v-if="item.stock_canship" @click.stop="shipments(id)">立即发货</view>
								<block v-else>
									<view class="inventory">库存不足</view>
									<!-- <view class="btn_bottom_full" @click="replenishment(item.out_trade_no)">立即补货</view> -->
								</block>
							</block>
							<view class="btn_bottom_empty" v-else-if="item.delivery_split_count > 0" @click.stop="checkLogistics">查看物流</view>
							<view class="income" v-else-if="item.myorder_status == 4">
								<text class="income_text">已到账收入:</text>
								<text class="income_num font_family_din">￥{{item.pay_price}}</text>
							</view>
							<!-- <block v-else-if="true">
								<view class="btn_bottom_empty mr_16" @click="agreeRefund">同意退款</view>
								<view class="btn_bottom_full" @click="refusedRefund">拒绝退款</view>
							</block> -->
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="page_footer" v-if="isShowFooter && current == 2">
			<view :class="'footer ' + (phoneModel?'x_class':'')">
				<view class="btn_bottom_empty mr_16" @click="shipmentsAll">一键发货</view>
				<!-- <view class="btn_bottom_full">一键补货</view> -->
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '全部'
				}, {
					name: '未成功'
				}, {
					name: '待发货'
				}, {
					name: '待收货'
				}, {
					name: '已完成'
				},{
					name: '已移交'
				}],
				current: 0,
				isShowFooter: false, // TODO
				phoneModel: uni.getStorageSync('phoneModel'),
				addressVal: '', // 收货地址
				recipientVal: '', // 收件人
				telVal: '', // 电话号码
				currPage: 1, // 
				totalPage: 1, // 
				orderList: [], // 订单列表
				lastOrderId: '', // 当前页最后一单的id

			};
		},
		onLoad(options) {
			if(options.status) {
				this.current = options.status;
				this.currPage = 1;
			}
			this.getOrderList();
		},
		methods: {
			getOrderList() {
				this.$api.member.AGENCY_ORDER({
					status: this.current,
					page: 1,
					order_id: this.lastOrderId || ''
				}).then( res => {
					this.totalPage = res.data.total_page;
					this.orderList = res.data.list;
					if (res.data.list.length) {
						this.lastOrderId = res.data.list[res.data.list.length - 1].id;
					};
				})
			},
			change(index) {
				this.current = index;
				this.currPage = 1;
				this.getOrderList();
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
			
			// 立即发货
			shipments(oredeNo) {
				this.$api.member.SHIPMENTS({
					out_trade_no: oredeNo
				}).then(res => {
							
					uni.showModal({
						title: '发货成功',
						showCancel: false,
						success: () => {
							this.getOrderList()
						}
					});
				})
			},
			// 一键发货
			shipmentsAll() {
				this.$api.member.SHIPMENTSALL({
				}).then(res => {
							
					uni.showModal({
						title: '发货成功',
						showCancel: false,
						success: () => {
							this.getOrderList()
						}
					});
				})
			},
			// 立即补货 传id为单件补货，不传为一键补货
			replenishment(id) {
				
			},
			// 上划加载更多
			loadMore() {
				// 模拟请求成功后的回调
					let currPage = this.currPage + 1;
					
					this.$api.member.AGENCY_ORDER({
						status: this.current,
						page: currPage,
						order_id: this.lastOrderId || ''
					}).then(res => {
			
						this.orderList = this.orderList.concat(res.data.list);
						this.currPage = currPage;
						if (res.data.list.length) {
							this.lastOrderId = res.data.list[res.data.list.length - 1].id
						};
					})
					// 1. list数组添加新数据
					// 2. 更新当前页码 currPage
					// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
			},
		},
		onReachBottom() {
			if (this.currPage >= this.totalPage) return;
			this.loadMore();
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}

	.padb_154 {
		padding-bottom: 154rpx;
	}

	.page {
		.page_footer {
			position: fixed;
			left: 0rpx;
			width: 100%;
			height: 114rpx;
			bottom: 0rpx;

			.footer {
				position: absolute;
				bottom: 0rpx;
				left: 0rpx;
				width: 100%;
				height: 114rpx;
				background: #FFFFFF;
				display: flex;
				justify-content: flex-end;
				padding: 24rpx;

				.mr_16 {
					margin-right: 16rpx;
				}

				.btn_bottom_empty {
					width: 160rpx;
					height: 66rpx;
					line-height: 64rpx;
					text-align: center;
					background: #FFFFFF;
					border: 1rpx solid #212121;
					font-size: 24rpx;
					color: #333333;
				}

				.btn_bottom_full {
					width: 160rpx;
					height: 66rpx;
					background: #212121;
					line-height: 66rpx;
					text-align: center;
					font-size: 24rpx;
					color: #FFFFFF;
				}
			}

			.x_class {
				height: 144rpx;
			}
		}

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
									margin-right: 40rpx;
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

		
	}
</style>
