<template>
	<view class="content_main">

		<u-navbar title="物流信息" :custom-back="$goback" :border-bottom="false"></u-navbar>

		<view class="content_box" :style="'height: calc(100vh - 140rpx - ' + heightInfo + 'px);'">

			<view class="box_product">

				<view class="product_top">订单号：{{order_info.out_trade_no}}</view>

				<view class="product_main">

					<view class="product_img">

						<scroll-view scroll-x="true">
							<view class="u-flex">
								<view class="product_png" style="flex-shrink: 0;" v-for="(item,index) in order_product_list" :key="index">
									<image :src="item.image"></image>
								</view>
							</view>
						</scroll-view>

					</view>

					<view class="product_all">
						共 {{order_product_count}} 件
					</view>

				</view>

			</view>

			<view class="box_num">

				当前订单已拆分{{delivery_split_count}}个包裹

			</view>

			<view class="box_address" v-for="(item,index) in delivery_split_list" :key="index">

				<view class="address_top">

					<view class="top_name">
						<view class="name_tops">包裹{{index+1}}</view>
						<image src="/settings/static/icon_transited.png"  v-if="item.delivery_status=='在途'"></image>
						<image src="/settings/static/icon_express.png"  v-else-if="item.delivery_status=='派件'"></image>
						<image src="/static/images/order_ok.png"  v-else-if="item.delivery_status=='签收'"></image>
						<view class="name_title">{{item.delivery_status}}</view>
					</view>

					<view class="top_tops" @click="jumpPage(index)">
						查看详情<u-icon name="rightBack" custom-prefix="custom-icon" size="20" color="#CCCCCC"></u-icon>
					</view>

				</view>

				<view class="address_main">

					<view class="address_title">物流公司：{{item.delivery_name}}</view>

					<view class="address_title">最新进度：{{item.delivery_new_str}}</view>

				</view>

			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				heightInfo: "", //标题栏高度
				typePage: '', //跳转请求判断
				orderId: '', //物流id
				order_info: {
					out_trade_no: "", //订单编号
					delivery_id: '', //分包id
				},
				order_product_list: [], //商品信息
				order_product_count: '', //商品数量
				delivery_split_count: '', //拆分几个
				delivery_split_list: [], //拆分进度表
			}
		},
		onLoad(option) {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.orderId = option.orderId;
			this.getDeliveryList();
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {

			//获取物流数据
			getDeliveryList() {
				let that = this;
				that.$api.my.API_DELIVERYQUERYLIST({
					order_id: Number(that.orderId),
				}).then(res => {
					that.order_info = res.data.order_info;
					that.order_product_list = res.data.order_product_list; //商品信息
					that.order_product_count = res.data.order_product_count; //商品数量
					that.delivery_split_count = res.data.delivery_split_count; //拆分几个
					that.delivery_split_list = res.data.delivery_split_list; //拆分进度表
				});
			},
			
			//跳转物流详情
			jumpPage(val) {
				let that = this;
				this.$jumpPage('/settings/message/logisticsNews',{orderId:that.orderId,deliveryId:that.delivery_split_list[val].id});
			},

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #EEEEEE;
	}

	.content_main {
		height: 100%;
		background: #EEEEEE;

		.content_box {
			padding: 16rpx 24rpx;

			.box_product {
				width: 100%;
				height: 273rpx;
				background: #FFFFFF;
				padding: 24rpx 24rpx 18rpx 24rpx;

				.product_top {
					height: 37rpx;
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 37rpx;
					margin-bottom: 33rpx;
				}

				.product_main {
					display: flex;
					align-items: center;
					width: 100%;

					.product_img {
						width: calc(100% - 110rpx);
						height: 160rpx;

						.product_png {
							width: 160rpx;
							height: 160rpx;
							margin-right: 24rpx;

							image {
								width: 160rpx;
								height: 160rpx;
							}

						}

					}

					.product_all {
						width: 110rpx;
					}

				}

			}

			.box_num {
				width: 100%;
				height: 60rpx;
				background: #FFFFFF;
				margin-top: 16rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			.box_address {
				width: 100%;
				background: #FFFFFF;
				margin-top: 16rpx;
				padding: 24rpx;

				.address_top {
					height: 60rpx;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					display: flex;
					justify-content: space-between;

					.top_name {
						display: flex;

						.name_tops {
							font-size: 22rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
						}

						.name_title {
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #333333;
						}

						image {
							width: 36rpx;
							height: 36rpx;
							margin: 0 16rpx;
						}


					}

					.top_tops {
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						
						::v-deep.u-icon{
							margin-left: 10rpx;
						}

					}

				}

				.address_main {
					margin-top: 24rpx;

					.address_title {
						font-size: 22rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						margin-bottom: 16rpx;
					}

				}

			}


		}

	}
</style>
