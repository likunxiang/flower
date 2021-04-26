<template>
	<view class="content_main">

		<u-navbar title="协商详情" :custom-back="$goback"></u-navbar>

		<view class="content_box">

			<view class="box_block" v-for="(item,index) in responeData" :key="index">
				
				<view class="block_top">
					
					<view class="top_title">{{item.response_title}}</view>
					
					<view class="top_time">{{item.add_time}}</view>
					
				</view>
				
				<view class="block_main">
					
					<view class="block_title">
						
						<view class="block_item" v-for="(nameitem,nameindex) in item.response_content.response_mark_str_arr" :key="nameindex">
							<view class="item_name">{{nameitem.key}}</view>
							<view class="item_tops">{{nameitem.value}}</view>
						</view>
						
						
					</view>
					
					<view class="block_img" v-if="item.response_content.response_image_arr.length !=0">
						
						<view class="img_png" v-for="(imgitem,imgindex) in item.response_content.response_image_arr" :key="imgindex" @click="seeImg(index,imgindex)">
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
				refundId:'',//售后id
				responeData:[],//协商详情
			}
		},
		onLoad(option) {
			this.refundId=option.refundId;
			this.getRefundResponeDetail();
		},
		methods: {
			
			
			//获取售后协商详情
			getRefundResponeDetail() {
				let that = this;
				that.$api.my.API_MYREFUNDRESPONSEDETAIL({
					refund_id: that.refundId,
				}).then(res => {
					that.responeData=res.data.list;
				});
			},
			
			//预览照片
			seeImg(index,imgIndex){
				let that = this;
				console.log(that.responeData[index].response_content.response_image_arr[imgIndex])
				uni.previewImage({
					count: 1,
					urls: [that.responeData[index].response_content.response_image_arr[imgIndex]],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log(data)
							uni.saveImageToPhotosAlbum({
								filePath: data.path,
								success: function() {
									console.log('save success');
								}
							});
						},
						fail: function(err) {
							console.log(err)
						}
					},
					success: (res) => {
						console.log('成功', res);
					},
					fail: (res) => {
						console.log('失败', res);
					}
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
			
			.box_block{
				padding: 20rpx 24rpx;
				background: #FFFFFF;
				margin-top: 16rpx;
				
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
						width: 100%;
						
						.block_item{
							margin-bottom: 16rpx;
							display: flex;
							width: 100%;
							
							.item_name{
								font-size: 26rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #333333;
								width: 130rpx;
								margin-right: 40rpx;
							}
							
							.item_tops{
								font-size: 26rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #666666;
								width: calc(100% - 180rpx);
							}
							
						}

					}
					
					.block_img{
						margin-top: 40rpx;
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
