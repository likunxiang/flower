<template>
	<view>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in addressData" :key="index" :right-options="options"
				@click="deleteAddress(index)">

				<view class="item_line">

					<view class="line_name" @click="jumpPage(0,index)">

						<view class="name_title">
							<text class="title_tops u-line-1">{{item.name}}</text> <text
								style="margin-left: 23rpx;font-size: 26rpx;">{{item.phone}}</text>
							<text class="title_default" v-if="item.is_default==1">默认</text>
							<text class="title_current" v-if="addressId==item.id">当前地址</text>
						</view>

						<view class="name_tops">{{item.province}}{{item.city}}{{item.district}}{{item.detail}}
						</view>

					</view>

					<view class="line_img" @click="jumpPage(1,index)">
						<u-icon name="edit" custom-prefix="custom-icon" size="24"></u-icon>
					</view>

				</view>


			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	export default {
		props: ["addressData", "typePage", "addressId"],
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#F1444D',
					}
				}]
			}
		},
		methods: {

			//删除收货地址
			deleteAddress(index) {
				let that = this;
				uni.showModal({
					content: '确定删除?',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							that.$api.my.API_ADDRESSDEL({
								address_id: that.addressData[index].id,
							}).then(res => {
								uni.showToast({
									title: '删除成功!!!'
								});
								that.$emit("refresh" ,index)
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},


			//跳转新增地址或我的
			jumpPage(val, index) {
				let that = this;
				switch (val) {
					case 0:
						if (that.typePage != 0) {
							that.$cache('addressId', that.addressData[index].id);
							that.$goback();
						}
						break;
					case 1:
						that.$jumpPage('/settings/address/addAddress', {
							addressData: JSON.stringify(that.addressData[index])
						});
						break;
					case 2:
						that.$jumpPage('/settings/address/addAddress');
						break;
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	
	.item_line {
		width: 100%;
		height: 140rpx;
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 24rpx 24rpx;
		// border-top: 8rpx solid rgba(0, 0, 0, 0.1);
		background: #FFFFFF;
	
	
		.line_name {
			width: calc(100% - 32rpx);
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			height: 100%;
			margin-left: 36rpx;
	
			.name_title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #212121;
				align-items: center;
				display: flex;
				margin-bottom: 10rpx;
	
				.title_tops {
					max-width: 115rpx;
				}
	
				.title_default {
					width: 80rpx;
					height: 30rpx;
					background: #EEEEEE;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					text-align: center;
					margin-left: 24rpx;
				}
	
				.title_current {
					width: 112rpx;
					height: 30rpx;
					background: #212121;
					text-align: center;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					margin-left: 30rpx;
				}
	
			}
	
			.name_tops {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical;
			}
	
	
		}
	
		.line_img {
			width: 24rpx;
			height: 100%;
			margin-left: 23rpx;
			align-items: center;
			display: flex;
		}
	
	}
	
</style>
