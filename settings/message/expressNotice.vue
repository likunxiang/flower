<template>
	<view class="page">
		<view class="express_item" v-for="(express,index) in 3" :key="index">
			<view class="express_title">2021年02月01日 09:46:17</view>
			<view class="express_box">
				<view class="express_header">
					<view class="icon_title">
						<view class="image">
							<u-icon name="logistics" custom-prefix="custom-icon" size="32" color="#212121"></u-icon>
						</view>
						<view class="title">物流已更新</view>
					</view>
					<view class="order_num">
						订单号：DA1234567890000A
					</view>
				</view>
				<view class="express_main">
					<view class="goods_item" v-for="(goods,index) in 3" :key="index">
						<view class="image">
							<image src="" mode=""></image>
						</view>
						<view class="goods_info">
							<view class="goods_name u-line-2">
								三程名比年置联由强式重传山并断能小型通各资引思元连反斯养住目关王叫三程名比年置联由强式重传山并断能小型通各资引思元连反斯养住目关王
							</view>
							<view class="goods_num">
								x1 件
							</view>
						</view>
					</view>
					
				</view>
				<view class="express_footer">
					<view class="btn">
						查看物流
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
				type: ''
			};
		},
		onLoad(options) {
			this.type = options.type;
			this.getMessageList();
		},
		methods: {
			// 请求消息列表
			getMessageList() {
				this.$api.my.MESSAGE_CENTER({
					type: this.type
				}).then(res => {
					this.messageList = res.data.list;
					this.totalPage = res.data.total_page;
					if (this.currPage >= this.totalPage) 
						this.pageStatus = 'nomore';
					uni.stopPullDownRefresh();
				})
			},
			// 上划加载更多
			loadMore() {
				// 模拟请求成功后的回调
				setTimeout(() => {
					let currPage = this.currPage + 1;
					this.$api.index.MESSAGE_CENTER({
						page: currPage
					}).then(res => {
		
						this.messageList = this.messageList.concat(res.data.list);
						this.currPage = currPage;
						this.$refs.loadRefresh.completed();
					})
					// 1. list数组添加新数据
					// 2. 更新当前页码 currPage
					// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
				}, 800);
			},
		},
		onPullDownRefresh() {
			this.getMessageList();
			this.currPage = 1;
		},
		onReachBottom() {
			if (this.currPage >= this.totalPage) return;
			this.pageStatus = 'loading';
			setTimeout(() => {
				this.loadMore();
				if (this.currPage >= this.totalPage) this.pageStatus = 'nomore';
				else this.pageStatus = 'loading';
			}, 2000);
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}

	image {
		width: 100%;
		height: 100%;
	}

	.page {
		padding: 24rpx;

		.express_item {
			margin-bottom: 24rpx;
			.express_title {
				font-size: 22rpx;
				color: #999999;
				margin-bottom: 16rpx;
				text-align: center;
			}

			.express_box {
				background: #FFFFFF;
				padding: 0 24rpx;

				.express_header {
					display: flex;
					padding: 24rpx 0;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					font-size: 26rpx;
					color: #333333;
					.icon_title {
						display: flex;
						align-items: center;
						.image {
							width: 32rpx;
							height: 32rpx;
							margin-right: 14rpx;
						}
					}
				}
				.express_main {
					
					.goods_item {
						display: flex;
						padding: 16rpx 0;
						border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
						.image {
							flex-grow: 0;
							flex-shrink: 0;
							width: 160rpx;
							height: 160rpx;
							background: #CCCCCC;
							margin-right: 14rpx;
						}
						.goods_info {
							.goods_name {
								font-size: 26rpx;
								color: #999999;
								line-height: 37rpx;
								margin-bottom: 41rpx;
							}
							.goods_num {
								font-size: 26rpx;
								color: #999999;
								line-height: 37rpx;
								text-align: right;
							}
						}
					}
				}
				.express_footer {
					padding-top: 16rpx;
					padding-bottom: 35rpx;
					display: flex;
					justify-content: flex-end;
					.btn {
						width: 160rpx;
						height: 50rpx;
						line-height: 48rpx;
						text-align: center;
						background: #FFFFFF;
						border: 1rpx solid #212121;
						font-size: 24rpx;
						color: #333333;
					}
				}
			}
		}

	}
</style>
