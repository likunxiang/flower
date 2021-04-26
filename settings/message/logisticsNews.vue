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

				<view class="num_top">
					运单号：{{order_info.delivery_id}}
					 <u-icon name="copy" custom-prefix="custom-icon" size="36" @click="copyBtn"></u-icon>
				</view>

				<view class="num_main">

					<view class="num_address">
						{{order_info.delivery_from}} <u-icon name="forget" custom-prefix="custom-icon" size="48"></u-icon> {{order_info.delivery_to}}
					</view>

					<view class="num_state">
						<u-icon name="logistics" custom-prefix="custom-icon" size="32" v-if="order_info.delivery_status !='签收'"></u-icon>
						<u-icon name="finished" custom-prefix="custom-icon" size="32" v-else></u-icon>
						{{order_info.delivery_status}}
					</view>

				</view>

			</view>

			<view class="box_address">
				<u-time-line>
					<u-time-line-item nodeTop="2" v-for="(item,index) in deliveryData" :key="index">
						<!-- 此处自定义了左边内容，用一个图标替代 -->
						<template v-slot:node>
							<view class="node_list">
								<view class="u-time">
									<view>{{item.date}}</view>
									<view>{{item.minute}}</view>
								</view>
								<view class="u-node" v-if="item.status=='在途'">
									<!-- 此处为uView的icon组件 -->
									<image src="/settings/static/icon_transited.png"></image>
								</view>
								
								<view class="u-node" v-else-if="item.status=='派件'">
									<!-- 此处为uView的icon组件 -->
									<image src="/settings/static/icon_express.png"></image>
								</view>
								
								<view class="u-node u-nodeTs" v-else-if="item.status=='签收'">
									<!-- 此处为uView的icon组件 -->
									<u-icon name="checkbox-mark" color="#EEEEEE" size="28"></u-icon>
								</view>
								
								<view class="u-nodeIcon" v-else></view>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-title">{{item.status}}</view>
								<view class="u-order-desc">{{item.context}}</view>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
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
				orderId:'',//物流id
				order_info:{
					delivery_from: "",
					delivery_id: "",
					delivery_status: "",
					delivery_to: "",
					out_trade_no: "",
				},//订单信息
				order_product_list:[],//商品信息
				order_product_count:'',//共几件
				deliveryData:[],//物流信息
			}
		},
		onLoad(option) {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.orderId=option.orderId;
			if(option.deliveryId !=undefined){
				this.deliveryId=option.deliveryId;
			}
			this.getDelivery();
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {

			//获取物流数据
			getDelivery() {
				let that = this;
				that.$api.my.API_DELIVERYQUERY({
					order_id:Number(that.orderId),
					order_delivery_id:that.deliveryId
				}).then(res => {
					that.order_info=res.data.order_info;
					that.order_product_list=res.data.order_product_list;
					that.order_product_count=res.data.order_product_count;
					that.deliveryData=res.data.data;
				});
			},
			
			//复制粘贴
			copyBtn() {
				let that = this;
				uni.setClipboardData({
					data: that.order_info.delivery_id,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '复制成功'
								});
							}
						});
					}
				});
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
							
							image{
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
				height: 191rpx;
				background: #FFFFFF;
				margin-top: 16rpx;
				padding: 24rpx 24rpx;

				.num_top {
					height: 61rpx;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					display: flex;
					align-items: flex-start;
					
					::v-deep.u-icon{
					   margin-left: 24rpx;	
					}

				}

				.num_main {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 95rpx;

					.num_address {
						display: flex;
						align-items: center;
						font-size: 30rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						
						::v-deep.u-icon{
						   margin:0 24rpx;	
						}

					}

					.num_state {
						display: flex;
						align-items: center;
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						
						::v-deep.u-icon{
						   margin-right: 15rpx;
						}

					}

				}

			}

			.box_address {
				width: 100%;
				background: #FFFFFF;
				margin-top: 8rpx;
				padding: 78rpx 24rpx;
				padding-left: 115rpx;
				
				::v-deep.u-time-axis::before{
					border-left: 2px solid #ddd;
				}
				
				
				.node_list{
					display: flex;
					position: absolute;
					left: -110rpx;
					
					.u-time {
						font-size: 22rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						text-align: right;
						width: 80rpx;
					}
					
					.u-node {
						width: 36rpx;
						height: 36rpx;
						border-radius: 100rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background: #d0d0d0;
						margin-left: 13rpx;
						
						image{
							width: 36rpx;
							height: 36rpx;
						}
						
					}
					
					.u-nodeTs{
						background: #333333;
					}
					
					.u-nodeIcon {
						width: 18rpx;
						height: 18rpx;
						border-radius: 100rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background: #d0d0d0;
						margin-left: 22rpx;
						
						image{
							width: 36rpx;
							height: 36rpx;
						}
						
					}
					
				}



				.u-order-title {
					color: #333333;
					font-weight: bold;
					font-size: 32rpx;
					margin-bottom: 8rpx;
				}

				.u-order-desc {
					color: rgb(150, 150, 150);
					font-size: 28rpx;
					margin-bottom: 6rpx;
				}

				.u-order-time {
					color: rgb(200, 200, 200);
					font-size: 26rpx;
				}

			}


		}

	}
</style>
