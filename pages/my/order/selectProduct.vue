<template>
	<view class="content_main">

		<!-- 导航栏及标题 -->
		<u-navbar title="请选择退款商品" :is-back="true"></u-navbar>

		<view class="box_main" v-if="productList.length!=0">
			
			<view class="block_item" v-for="(item,index) in productList" :key="index" :style="index < productList.length-1?'':'border-bottom:0'">
			
			
				<view class="block_line">
			
					<view class="block_choose" @click="changeSingle(index)">
						<image src="/static/images/shopping/icon_true.png" v-if="item.checked"></image>
						<image src="/static/images/shopping/icon_false.png" v-else></image>
					</view>
			
					<view class="block_main">
			
						<view class="block_img" @click="changeSingle(index)">
							<image :src="item.image"></image>
						</view>
			
						<view class="block_info">
			
							<view class="info_title">{{item.product_name}}</view>
			
							<view class="info_tops">{{item.suk}}</view>
			
							<view class="info_main">
			
			
								<view class="info_num">
									X {{item.num}}
								</view>
			
								<view class="info_add">
									￥{{item.per_pay_price}}
								</view>
			
			
			
							</view>
			
						</view>
			
					</view>
			
				</view>
			
			</view>
			
		</view>

		<view class="box_bottom" v-if="productList.length!=0" :style="phoneModel=='iPhone X'?'height: 120rpx;':''">

			<view class="bottom_choose" @click="changeAll">
				<image src="/static/images/shopping/icon_true.png" v-if="checkedAll"></image>
				<image src="/static/images/shopping/icon_false.png" v-else></image>
				<text class="choose_color">全选</text>
			</view>

			<view class="bottom_all">
				<view class="bottom_button" @click="settlement">确定</view>
			</view>

		</view>

		<view class="box_img" v-if="productList.length==0"
			:style="'height: calc(100vh - 80rpx - ' + heightInfo + 'px);'">
			<view class="img_png">
				<image src="/static/images/shopping/shopping_no.png"></image>
				<view class="img_title">空空如也，啥也没有</view>
				<view class="img_address">
					
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneModel: uni.getStorageSync('phoneModel'),
				heightInfo: '', //顶部栏高度
				checkedAll: false, //全选
				orderId: '', //订单id
				productList: [], //商品数据
			}
		},
		onShow() {
			this.getOrderDetail();
		},
		onLoad(option) {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.orderId = this.$cache('orderId');//订单id
		},
		methods: {

			//获取订单列表
			getOrderDetail() {
				let that = this;
				uni.showLoading({
					title: '拼命加载中',
					mask: true
				});
				that.$api.my.API_MYORDERREFUNDPRODUCTLIST({
					order_id: that.orderId,
					refund_type:1
				}).then(res => {
					that.productList = res.data.list; //商品数据
					that.productList.forEach(item => {
						that.$set(item, 'checked', false);
					})
					uni.hideLoading();
				});
			},
			
			//点击图片单选
			changeSingle(index) {
				let that = this;
				let allCheckbox = that.productList.length;
				let isChecked = 0; //点击勾选的数量
				if (that.productList[index].checked) {
					that.productList[index].checked = false;
				} else {
					that.productList[index].checked = true;
				}
				//判断当个勾选 全选要不要勾选
				that.productList.forEach(item => {
					if (item.checked) {
						isChecked++;
					}
				})
				if (allCheckbox == isChecked) {
					that.checkedAll = true;
				} else {
					that.checkedAll = false;
				}
			},
			
			//全选
			changeAll(){
				let that = this;
				if (that.checkedAll) {
					that.checkedAll = false;
					that.productList.forEach(item => {
						that.$set(item, 'checked', false);
					})
				} else {
					that.checkedAll = true;
					that.productList.forEach(item => {
						that.$set(item, 'checked', true);
					})
				}
			},
			
			//确定选择
			settlement(){
				let that=this;
				let obj=[];
				that.productList.forEach(item=>{
					if (item.checked) {
						obj.push(item.id)
					}
				})
				if(obj.length==0){
					that.$u.toast("请选择退款商品");
					return
				}
				that.$jumpPage('/pages/my/order/batchRefund', {},"replace");
				that.$cache('productId', obj.join().toString());
			},

		}
	}
</script>

<style lang="scss">
	page{
		background: #EEEEEE;
	}
	
	.content_main {
		min-height: 100%;
		position: relative;
		width: 100%;
		background: #EEEEEE;

		.box_main {
			padding-bottom: 100rpx;
			width: 100%;

			.block_item {
				height: 195rpx;
				width: 100%;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
				padding-bottom: 8rpx;
				padding-top: 7rpx;
				background: #FFFFFF;
				padding: 0 24rpx;

				.block_line {
					display: flex;
					align-items: center;
					height: 180rpx;
					width: 100%;

					.block_choose {
						width: 24rpx;
						margin-right: 18rpx;
						height: 180rpx;
						display: flex;
						align-items: center;

						image {
							width: 24rpx;
							height: 24rpx;
						}

					}



					.block_main {
						display: flex;
						align-items: center;
						width: calc(100% - 40rpx);

						.block_img {
							width: 140rpx;
							height: 140rpx;

							image {
								width: 100%;
								height: 100%;
							}

						}

						.block_info {
							margin-left: 24rpx;
							width: 500rpx;
							height: 140rpx;
							padding-right: 20rpx;

							.info_title {
								height: 40rpx;
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;
								margin-bottom: 8rpx;
								ext-overflow: -o-ellipsis-lastline;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 1;
								line-clamp: 1;
								-webkit-box-orient: vertical;
							}

							.info_decline {
								height: 40rpx;
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #CCCCCC;
								margin-bottom: 8rpx;
								ext-overflow: -o-ellipsis-lastline;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 1;
								line-clamp: 1;
								-webkit-box-orient: vertical;
							}

							.info_tops {
								height: 30rpx;
								font-size: 22rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #999999;
								margin-bottom: 19rpx;
							}

							.info_main {
								display: flex;
								align-items: flex-end;
								justify-content: space-between;

								.info_num {
									height: 33rpx;
									font-size: 24rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #999999;
								}

								.info_add {
									height: 42rpx;
									font-size: 30rpx;
									font-family: PingFangSC-Semibold, PingFang SC;
									font-weight: 600;
									color: #E76234;
								}

							}

						}

					}

				}


			}
		}

		.box_bottom {
			position: absolute;
			height: 98rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			bottom: 0;
			position: fixed;
			background: #FFFFFF;
			padding: 16rpx 24rpx;

			.bottom_choose {
				display: flex;
				align-items: center;
				height: 100rpx;

				image {
					width: 24rpx;
					height: 24rpx;
				}

				.choose_color {
					margin-left: 54rpx;
					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				}

			}


			.bottom_all {
				display: flex;
				align-items: center;

				.bottom_num {
					margin-right: 53rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #212121;
					display: flex;
					align-items: center;

					.num_color {
						font-size: 26rpx;
						font-family: Adobe Heiti Std;
						font-weight: bold;
						color: #E76234;
					}

				}

				.bottom_button {
					height: 66rpx;
					width: 230rpx;
					background: #212121;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}

				.bottom_color {
					background: #CCCCCC;
				}

			}

		}

		.box_img {
			width: 100%;
			height: 100%;
			display: flex;
			justify-items: center;
			align-items: center;

			.img_png {
				width: 100%;
				text-align: center;

				image {
					width: 160rpx;
					height: 160rpx;

				}

				.img_title {
					width: 100%;
					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					margin: 0 auto;
					margin-top: 80rpx;
				}


				.img_address {
					width: 100%;
					margin-top: 80rpx;


					.add_button {
						height: 66rpx;
						background: #FFFFFF;
						border: 1px solid #212121;
						text-align: center;
						line-height: 66rpx;
						width: 230rpx;
						color: #333333;
						font-size: 24rpx;
						margin: 0 auto;
					}

				}

			}


		}
	}
</style>
