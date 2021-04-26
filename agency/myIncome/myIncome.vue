<template>
	<view class="page" v-if="loadEnd">

		<!-- 头部 -->
		<view class="page_header">
			<!-- 头部背景图片 -->
			<image class="header_bg" src="../static/earnings_bg.png" mode="aspectFill"></image>
			<!-- 头部背景图片 end -->
			<u-navbar title="我的收入"  :border-bottom="false" background='{background: transparent}' :is-fixed="false"></u-navbar>

			<view class="add_earnings">
				<view class="add_value">
					<text class="icon">￥</text>
					<text class="text font_family_din">3,045,600.00</text>
				</view>
				<view class="add_title">累计可提现收益</view>
			</view>

			<view class="earnings_type">
				<view class="item">
					<view class="button" @click="$toUrl('/agency/extractApply/extractApply')">去提现</view>
				</view>
			</view>
		</view>

		<view class="promotion_box">
			<view class="promotion_item" @click="$toUrl('/agency/earningsDetail/earningsDetail',{ navIns: 0 })">
				<view class="text">待结算</view>
				<view class="num font_family_din">
					<text class="icon">￥</text>
					<text class="num ">{{memberInfo.invitation_balance || 0}}</text>
				</view>
				<view class="line"></view>
			</view>
			<view class="promotion_item"
				@click="$toUrl('/agency/earningsDetail/earningsDetail',{ navIns: 0 })">
				<view class="text">已结算</view>
				<view class="num font_family_din">
					<text class="icon">￥</text>
					<text class="num ">{{memberInfo.invitation_balance || 0}}</text>
				</view>
				<view class="line"></view>
			</view>
			<view class="promotion_item" @click="$toUrl('/agency/earningsDetail/earningsDetail',{ navIns: 1 })">
				<view class="text">已提现</view>
				<view class="num font_family_din">
					<text class="icon">￥</text>
					<text class="num ">{{memberInfo.invitation_balance || 0}}</text>
				</view>
			</view>
		</view>

		<view class="main">
			<view class="main_title">
				<view :class="'main_item ' + (navIns == 0?'main_item_active':'')" @click="changeNav(0)">
					<view class="order">待结算</view>
					<view class="line" v-if="navIns == 0"></view>
				</view>
				<view :class="'main_item ' + (navIns == 1?'main_item_active':'')" @click="changeNav(1)">
					<view class="member">已结算</view>
					<view class="line" v-if="navIns == 1"></view>
				</view>
				<view :class="'main_item ' + (navIns == 2?'main_item_active':'')" @click="changeNav(2)">
					<view class="member">已流失</view>
					<view class="line" v-if="navIns == 2"></view>
				</view>
			</view>

			<!-- // 待结算 -->
			<view class="main_list_order">
				<block v-if="orderList.length === 0">
					<view class="empty" style="height: 500rpx;">
						<view class="image">
							<image src="/static/images/my/order/icon_book.png" mode="aspectFill"></image>
						</view>
						<view class="empty_text">一贫如洗的订单</view>
					</view>
				</block>
				<block v-else>
					<view class="main_list_item" v-for="(item,index) in orderList" :key="index">
						<view class="order_info">
							<view class="left">
								<view class="image_box">
									<image class="image" src="" mode=""></image>
								</view>
								<view class="order_text">
									<view class="user_name">
										Ivan Frazier
									</view>
									<view class="order_no">订单编号：231546654654584315</view>
									<view class="order_time">下单时间：2021-02-26 18:54:19</view>
								</view>
							</view>
							<view class="right">
								待到账
							</view>
						</view>
						<view class="order_money">
							<view class="order_money_item">
								<view class="num"><text class="icon">￥</text><text class="font_family_din">1,230,00.00</text></view>
								<view class="title">订单金额</view>
							</view>
							<view class="line"></view>
							<view class="order_money_item">
								<view class="num"><text class="icon">￥</text><text>1,230,00.00</text></view>
								<view class="title">佣金</view>
							</view>
						</view>
					</view>
				</block>
			</view>

			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navIns: 0,
				loadEnd: false,
				orderList: [], // 待到账列表
				memberList: [], // 已结算列表
				loseList: [], // 已流失订单
				earningBg: '/agency/static/earnings_bg.png'
			};
		},
		onLoad(options) {
			this.navIns = this.$Route.query.navIns;
			uni.showLoading({
				title: '加载中'
			});
			this.getOrderList();
			this.getMemberList();
		},
		methods: {
			changeNav(val) {
				this.navIns = val;
			},
			// 请求推广订单列表 接口
			getOrderList() {
				this.$api.member.PROMOTION_ORDER({

				}).then(res => {
					this.loadEnd = true;
					this.orderList = res.data.list;
				})
			},
			// 请求推广订单列表 接口
			getMemberList() {
				this.$api.member.PROMOTION_MEMBER({

				}).then(res => {
					this.loadEnd = true;
					this.memberList = res.data.list;
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}

	.page {
		padding-top: 1rpx;

		.page_header {
			width: 100%;
			position: relative;
			padding-bottom: 56rpx;
			.header_bg {
				position: absolute;
				z-index: -1;
				width: 100%;
				height: 100%;
			}
			.add_earnings {
				margin-top: 60rpx;
				text-align: center;
				color: #212121;
				font-weight: bold;
				margin-bottom: 24rpx;
			
				.add_value {
					margin-bottom: 8rpx;
			
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
			
			.earnings_type {
				display: flex;
			
				.item {
					flex: 1;
					text-align: center;
			
			
					.button {
						width: 160rpx;
						height: 50rpx;
						font-size: 24rpx;
						color: #333333;
						line-height: 48rpx;
						border-radius: none;
						background: #FFFFFF;
						border: 1rpx solid #212121;
						margin: auto;
					}
				}
			}
		}

		.promotion_box {
			width: 100%;
			background: #FFFFFF;
			display: flex;
			margin-bottom: 16rpx;

			.promotion_item {
				flex: 1;
				text-align: center;
				color: #333333;
				padding: 40rpx 0;
				position: relative;
				.text {
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					margin-bottom: 16rpx;
				}
				.num {
					font-size: 28rpx;
					color: #666666;
					font-weight: bold;

				}

				.line {
					position: absolute;
					right: 0rpx;
					top: 50%;
					margin-top: -50rpx;
					width: 1rpx;
					height: 100rpx;
					background: rgba(0, 0, 0, .1);
				}
			}
		}

		

		.main {
			.main_title {
				width: 100%;
				height: 80rpx;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
				background: #FFFFFF;
				display: flex;

				.main_item {
					flex: 1;
					text-align: center;
					font-size: 24rpx;
					color: #666666;
					line-height: 80rpx;
					position: relative;

					.line {
						position: absolute;
						left: 50%;
						bottom: 0rpx;
						margin-left: -36rpx;
						width: 72rpx;
						height: 2rpx;
						background: #212121;
					}
				}

				.main_item_active {
					font-weight: 500;
					color: #333333;
				}
			}

			.main_list_order {
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

				.main_list_item {
					padding: 0 30rpx;
					margin-bottom: 16rpx;
					background: #FFFFFF;
					.order_info {
						padding: 40rpx 10rpx 16rpx;
						background: #FFFFFF;
						display: flex;
						font-size: 22rpx;
						border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
						.left {
							flex-grow: 1;
							display: flex;
							.image_box {
								width: 64rpx;
								height: 64rpx;
								margin-right: 24rpx;
								flex-grow: 0;
								flex-shrink: 0;
								.image {
									width: 64rpx;
									height: 64rpx;
									border-radius: 50%;
									background: #CCCCCC;
								}
							}
							.order_text {
								flex-grow: 1;
								.user_name {
									font-size: 22rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #333333;
									margin-bottom: 21rpx;
								}
								.order_no {
									font-size: 22rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #999999;
									margin-bottom: 8rpx;
								}
								.order_time {
									font-size: 22rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #999999;
								}
							}
						}
						.right {
							flex-grow: 0;
							flex-shrink: 0;
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #E76234;
						}
					}
					.order_money {
						display: flex;
						position: relative;
						.order_money_item {
							flex: 1;
							padding: 24rpx 0;
							text-align: center;
							.num {
								font-size: 22rpx;
								color: #666666;
								margin-bottom: 8rpx;
								.icon {
									
									font-family: PingFangSC-Regular, PingFang SC;
								}
							}
							.title {
								font-size: 22rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #999999;
							}
						}
						.line {
							position: absolute;
							left: 50%;
							top: 39rpx;
							width: 1rpx;
							height: 40rpx;
							background: rgba(0, 0, 0, 0.1);
						}
					}
					
				}

			}

			.main_list_member {
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

				.main_list_item {
					padding: 24rpx;
					padding-left: 60rpx;
					padding-right: 40rpx;
					background: #FFFFFF;
					display: flex;
					align-items: center;
					font-size: 22rpx;

					.image {
						width: 64rpx;
						height: 64rpx;
						margin-right: 40rpx;
						flex-grow: 0;
						flex-shrink: 0;

						image {
							width: 64rpx;
							height: 64rpx;
							border-radius: 50%;
							background: #CCCCCC;
						}
					}

					.user_info {
						flex-grow: 1;
						font-size: 22rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.left {
							flex-grow: 1;

							.nickname {
								color: #333333;
								margin-bottom: 16rpx;
							}

							.tel {
								color: #999999;
							}
						}

						.right {
							flex-grow: 0;
							flex-shrink: 0;
							color: #333333;
						}
					}

				}

				.margin_bottom_1 {
					margin-bottom: 1rpx;
				}
			}
		}
	}
</style>
