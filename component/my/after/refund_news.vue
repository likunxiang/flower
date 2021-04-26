<template>
	<view>
		<u-popup v-model="showLogisticsNo" mode="bottom" @close="closeFrm" :mask-close-able="false">
			<view class="logistics_main">
		
				<view class="logistics_top">
					<view class="top_name">填写退货物流信息</view>
					<u-icon name="close" custom-prefix="custom-icon" size="36" color="#212121" @click="closeFrm"></u-icon>
				</view>
		
				<view class="logistics_content">
		
					<view class="logistics_line">
						<view class="line_name">物流公司</view>
						<view class="line_input">
							<u-input type="text" style="width: 100%;" :border="false"  v-model="refundInfo.logisticsName" maxlength="20"
								placeholder="请输入物流公司" placeholder-style="font-size: 28rpx;color: #999999;" />
						</view>
					</view>
					
					<view class="logistics_line">
						<view class="line_name">物流单号</view>
						<view class="line_input">
							<u-input type="text" style="width: 100%;" :border="false" v-model="refundInfo.logisticsNum" maxlength="20"
								placeholder="请输入物流单号" placeholder-style="font-size: 28rpx;color: #999999;" />
						</view>
					</view>		
		
				</view>
		
				<view class="logistics_bottom">
					<view>提交</view>
				</view>
		
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	export default {
		props:["showLogisticsNo","refundId"],
		data() {
			return {
				refundInfo:{
					logisticsName:'',//物流公司
					logisticsNum:'',//物流单号
				}
			}
		},
		methods: {
			
			//关闭单号弹窗
			closeFrm(){
				let that=this;
				that.$emit("close")
			},
			
		}
	}
</script>


<style lang="scss" scoped>
	
	.logistics_main {
		width: 100%;
		padding-bottom: 40rpx;
	
		.logistics_top {
			padding: 0 40rpx;
			height: 92rpx;
			margin-top: 25rpx;
			display: flex;
			justify-content: space-between;
			align-items: end;
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
	
			.top_name {
				font-size: 36rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
			}
	
		}
	
		.logistics_content {
			margin-top: 24rpx;
			margin-left: 60rpx;
			margin-right: 60rpx;
	
			.logistics_line {
				height: 90rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
	
				.line_name {
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					width: 112rpx;
				}
	
				.line_input {
					margin-left: 32rpx;
					width: calc(100% - 160rpx);
				}
	
			}
	
		}
	
		.logistics_bottom {
			margin-top: 80rpx;
			margin-left: 24rpx;
			margin-right: 24rpx;
			height: 66rpx;
			background: #212121;
			color: #FFFFFF;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			align-items: center;
			display: flex;
			justify-content: space-around;
			margin-top: 40rpx;
		}
	
	}
	
</style>
