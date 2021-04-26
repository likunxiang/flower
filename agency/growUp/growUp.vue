<template>
	<view class="page">
		<view class="card_box">
			<view class="card_show">
				<image :src="bg" mode="aspectFill"></image>
				<view class="card_main">
					<view class="card_desc"
						:style="'color: ' + (level === 0?'#666666':(level === 5?'#82441C':'#687184'))">
						{{consumeMoney}}
					</view>
					<view class="progress">
						<view class="progress_bg"
							:style="'background: ' + (level === 0?'#B8B8B8':(level === 5?'#B48562':'#919AA9'))">
							<view class="progress_reality"
								:style="'width:' + consumeMoney/nextLevel*100 + '%;background: ' + (level === 0?'#E4E4E4':(level === 5?'#EAC3A7':'#C8CFD9'))">
							</view>
						</view>
						<view class="progress_value"
							:style="'color: ' + (level === 0?'#666666':(level === 5?'#82441C':'#687184'))">
							距离升级成银卡会员还差{{nextLevel}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tips">如有退款，将扣减相应成长值；等级可能会降级。</view>
		<view class="order_list">
			<view class="empty" style="height: 500rpx;" v-if="orderList.length <= 0">
				<view class="image">
					<image src="/static/images/my/order/icon_book.png" mode="aspectFill"></image>
				</view>
				<view class="empty_text">一贫如洗的订单</view>
			</view>
			<view class="order_item" v-for="(item,index) in orderList" :key="index" v-else>
				<view class="left">
					<view class="order_no">订单号：{{item.out_trade_no}}</view>
					<view class="order_time">{{item.add_time_format1}}</view>
				</view>
				<view class="right" :class="{'right_red': item.type == 1}">{{item.type == 0?'+':'-'}}{{item.money}}</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				level: 0, // 会员等级
				orderList: [
					{
						out_trade_no: '12345646',
						add_time_format1: '2021-02-19 16:29:04',
						money: '1.00',
						type: 0, // 0是+，1是-
					},
					{
						out_trade_no: '12345646',
						add_time_format1: '2021-02-19 16:29:04',
						money: '1.00',
						type: 1, // 0是+，1是-
					}
				], // 订单列表
				consumeMoney: '', // 当前成长值
				nextLevel: '', // 下一级需要成长值
				loadEnd: false, // 请求是否完成
				bg: '/static/images/member/vip_bg.png', // 卡片背景
				currPage: 1,
				totalPage: 1,
			};
		},
		onLoad() {
			this.getGrowValue();
		},
		methods: {
			getGrowValue() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				this.$api.member.GROW_VALUE({

				}).then(res => {
					this.orderList = res.data.list;
					this.level = res.data.level;
					this.consumeMoney = res.data.consume_money;
					this.nextLevel = res.data.level_consume_money;
					this.loadEnd = true;
					if (this.level == 0) {
						this.bg = '/static/images/member/empty_general_bg.png';
					} else if (this.level == 5) {
						this.bg = '/static/images/member/empty_member_bg.png';
					} else {
						this.bg = '/static/images/member/empty_silver_bg.png';
					}
					uni.hideLoading();
				})
			},
			// 上划加载更多
			loadMore() {
				// 模拟请求成功后的回调
				setTimeout(() => {
					let currPage = this.currPage + 1;
					this.$api.index.GROW_VALUE({
						page: currPage
					}).then(res => {

						this.orderList = this.orderList.concat(res.data.list);
						this.currPage = currPage;
						this.$refs.loadRefresh.completed();
					})
					// 1. list数组添加新数据
					// 2. 更新当前页码 currPage
					// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
				}, 800);
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}

	.page {
		padding: 24rpx;

		.card_box {
			width: 100%;
			height: 218rpx;
			display: flex;
			justify-content: center;

			.card_show {
				width: 636rpx;
				height: 100%;
				position: relative;

				image {
					width: 100%;
					height: 100%;
				}

				.card_main {
					position: absolute;
					left: 0rpx;
					top: 0rpx;
					width: 636rpx;
					height: 218rpx;
					padding: 42rpx;

					.card_desc {
						font-size: 52rpx;
						color: #82441C;
						font-weight: bold;
						margin-bottom: 23rpx;
					}

					.progress {
						.progress_bg {
							width: 300rpx;
							height: 10rpx;
							background: #B48562;
							border-radius: 6rpx;
							margin-bottom: 13rpx;

							.progress_reality {
								width: 0rpx;
								height: 10rpx;
								background: #EAC3A7;
								border-radius: 6rpx;
							}
						}

						.progress_value {
							font-size: 22rpx;
							color: #82441C;
						}
					}
				}
			}
		}

		.tips {
			height: 44rpx;
			line-height: 44rpx;
			text-align: center;
			font-size: 22rpx;
			color: #999999;
			font-family: PingFangSC-Regular, PingFang SC;
			background-image: linear-gradient(to right, #FCFCFC, #F6F6F6,#EEEEEE,#F5F5F5);
		}

		.order_list {
			padding: 24rpx 32rpx 48rpx;
			background: #FFFFFF;

			.empty {
				background: #FFFFFF;
				padding-top: 20%;

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

			.order_item {
				padding-bottom: 24rpx;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 24rpx;

				.left {
					.order_no {
						font-size: 22rpx;
						color: #666666;
						margin-bottom: 8rpx;
						font-family: PingFangSC-Regular, PingFang SC;
					}

					.order_time {
						font-size: 22rpx;
						color: #CCCCCC;
					}
				}

				.right {
					font-size: 30rpx;
					color: #333333;
				}
				.right_red {
					font-size: 30rpx;
					color: #E76234;
				}
			}
		}
	}
</style>
