<template>
	<view class="page">
		<view class="add_income">
			<view class="add_value">
				<view class="num">
					<text class="icon">￥</text>
					<text class="text font_family_din">3,045,600.00</text>
				</view>
				<view class="title">
					提现中
				</view>
			</view>
			<view class="add_value">
				<view class="num">
					<text class="icon">￥</text>
					<text class="text font_family_din">3,045,600.00</text>
				</view>
				<view class="title">
					提现中
				</view>
			</view>
			<view class="line">
				
			</view>
		</view>
		
		<view class="income_detail">
			<view class="big_title">
				记录明细
			</view>
			<view class="income_detail_list">
				<view :class="'item ' + (index < 3 - 1?'border_bottom':'')" v-for="(item,index) in 3" :key="index">
					<view class="left">
						<view class="title">申请中</view>
						<view class="time">2021-02-26 18:54:19</view>
					</view>
					<view class="right">
						<view class="num">￥20,123,00.00</view>
						<view class="service_charge">手续费：￥23.00</view>
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
				
			};
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
		.page {
			.add_income {
				padding: 0rpx 24rpx;
				color: #333333;
				font-weight: bold;
				background: #FFFFFF;
				margin-bottom: 40rpx;
				display: flex;
				position: relative;
				.line {
					position: absolute;
					left: 50%;
					top: 39rpx;
					width: 1rpx;
					height: 100rpx;
					background: rgba(0, 0, 0, 0.1);
				}
				.add_value {
					flex: 1;
					text-align: center;
					padding: 40rpx 0;
					.num {
						margin-bottom: 16rpx;
						.icon {
							font-size: 26rpx;
						}
									
						.text {
							font-size: 36rpx;
							font-weight: bold;
						}
					}
					.title {
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
					}
					
				}
			}
		
			.income_detail {
				.big_title {
					padding-left: 40rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
					margin-bottom: 16rpx;
				}
				.income_detail_list {
					background: #FFFFFF;
					padding: 0 30rpx;
					.border_bottom {
						border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					}
					.item {
						padding: 24rpx;
						padding-left: 10rpx;
						padding-right: 10rpx;
						display: flex;
						align-items: center;
						.left {
							flex-grow: 0;
							flex-shrink: 0;
							margin-right: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							.title {
								color: #333333;
								font-size: 22rpx;
								margin-bottom: 6rpx;
							}
							.time {
								font-size: 22rpx;
								color: #999999;
							}
						}
						.right {
							flex-grow: 1;
							text-align: right;
							.num {
								font-size: 26rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #E76234;
							}
							.service_charge {
								font-size: 22rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #999999;
							}
						}
					}
				}
			}
		
		}
	}
</style>
