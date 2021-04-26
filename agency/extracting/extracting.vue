<template>
	<view class="page">
		<view class="add_income">
			<view class="add_value">
				<text class="icon">￥</text>
				<text class="text">3,045,600.00</text>
			</view>
			<view class="add_title">总提现中(元)</view>
		</view>
		
		<view class="income_detail">
			<view class="big_title">
				记录明细
			</view>
			<view class="income_detail_list">
				<view :class="'item ' + (index < 3 - 1?'border_bottom':'')" v-for="(item,index) in 3" :key="index">
					<view class="left">
						<view class="title">申请提现</view>
						<view class="time">2021-02-26 18:54:19</view>
					</view>
					<view class="center">
						<view class="title">预计到账</view>
						<view class="time">2021-02-27 18:54:19</view>
					</view>
					<view class="right">￥20,123,00.00</view>
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
				padding: 40rpx 0;
				text-align: center;
				color: #333333;
				font-weight: bold;
				background: #FFFFFF;
				margin-bottom: 40rpx;
			
				.add_value {
					margin-bottom: 16rpx;
			
					.icon {
						font-size: 30rpx;
					}
			
					.text {
						font-size: 52rpx;
					}
				}
			
				.add_title {
					font-size: 22rpx;
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
						padding-right: 18rpx;
						display: flex;
						align-items: center;
						.left,.center {
							width: 218rpx;
							margin-right: 24rpx;
							.title {
								color: #000000;
								font-size: 22rpx;
								margin-bottom: 8rpx;
							}
							.time {
								font-size: 22rpx;
								color: #999999;
							}
						}
						.center {
							
						}
						.right {
							flex: 1;
							text-align: right;
							font-size: 26rpx;
							color: #E76234;
						}
					}
				}
			}
		
		}
	}
</style>
