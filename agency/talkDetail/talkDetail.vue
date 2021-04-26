<template>
	<view class="content_main">


		<view class="content_box">

			<view class="box_block" v-for="(item,index) in responeData" :key="index">
				
				<view class="block_top">
					
					<view class="top_title">{{item.response_title}}</view>
					
					<view class="top_time">{{item.response_time_format}}</view>
					
				</view>
				
				<view class="block_main">
					
					<view class="block_title">
						
						<view class="block_item" v-for="(nameitem,nameindex) in item.response_mark_str_arr" :key="nameindex">
							<view class="item_name_key">{{nameitem.key}}</view>
							<view class="item_name_value">{{nameitem.value}}</view>
						</view>
						
						
					</view>
					
					<view class="block_img" v-if="item.response_image_arr[0]">
						
						<view class="img_png" v-for="(imgitem,imgindex) in item.response_image_arr" :key="imgindex">
							<image :src="imgitem"></image>
						</view>
						
						
					</view>

					
				</view>
				
			</view>


		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				productId:'',//售后id
				responeData:[],//协商详情
			}
		},
		onLoad(option) {
			this.productId = this.$Route.query.id;
			this.getRefundResponeDetail();
		},
		methods: {
			
			
			//获取售后协商详情
			getRefundResponeDetail() {
				let that = this;
				that.$api.my.API_MYREFUNDRESPONSEDETAIL({
					order_product_id: that.productId,
				}).then(res => {
					that.responeData=res.data.list;
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	
	page{
		background: #EEEEEE;
	}
	.content_main {
		background: #EEEEEE;
		height: 100%;

		.content_box {
			padding-top: 16rpx;
			.box_block{
				padding: 20rpx 24rpx;
				background: #FFFFFF;
				margin-bottom: 16rpx;
				
				.block_top{
					height: 102rpx;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					
					.top_title{
						font-size: 30rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #333333;
						margin-bottom: 8rpx;
						
						
					}
					
					.top_time{
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
					}
					
				}
				
				.block_main{
					padding: 16rpx 0;
					
					.block_title{
						
						
						.block_item{
							margin-bottom: 16rpx;
							display: flex;
							.item_name_key {
								width: 130rpx;
								margin-right: 24rpx;
								font-size: 26rpx;
								color: #333333;
								text-align: right;
							}
							.item_name_value {
								font-size: 26rpx;
								color: #666666;
							}
							
						}

					}
					
					.block_img{
						margin-top: 20rpx;
						width: 100%;
						display: flex;
						
						.img_png{
							width: 160rpx;
							height: 120rpx;
							margin-right: 24rpx;

							
							image{
								width: 100%;
								height: 100%;
							}
							
						}
						
					}
					
				}
			}

		}



	}
</style>
