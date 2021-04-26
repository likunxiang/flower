<template>
	<view class="page">
		<view class="content">
			<view class="goods" v-for="(item,index) in goodsList" :key="index"
				@click="$toUrl('/pages/index/goods/goods',{id:item.id})">
				<imageBox width="344rpx" height="344rpx" :imageUrl="item.image"></imageBox>
				<view class="info">
					<view class="name u-line-2">
						{{item.title}}
					</view>
					<view class="price">
						<view class="price_now font_family_din">
							<text class="icon">￥</text>
							<text class="text">{{item.price}}</text>
						</view>
						<view class="price_old">
							￥{{item.ot_price}}
						</view>
					</view>
					<view class="like">{{item.collect_num}}人感兴趣</view>
				</view>
			</view>
		</view>
		
		<view class="content_bottom" @click="loadMore">
			<u-loadmore :status="pageStatus" color="#CCCCCC" font-size="18" :icon="false" :loadText="loadText"  />
		</view>
	</view>
</template>

<script>
	import imageBox from '@/component/common/imageBox.vue'
	export default {
		data() {
			return {
				goodsList: [],
				currPage: 1,
				totalPage: 1,
				pageStatus: 'loadmore', // 加载状态
				loadText: {
					loadmore: '加载更多',
					loading: '正在加载...',
					nomore: '别拉了，已经到底了~'
				}
			}
		},
		onLoad() {
			this.getNewestList()
		},
		components: {
			imageBox: imageBox
		},
		methods: {
			// 热销榜单接口
			getNewestList() {
				this.$api.index.NEWEST({
					page: 1
				}).then(res => {
					this.goodsList = res.data.list;
					this.totalPage = res.data.total_page;
					uni.stopPullDownRefresh();
				});
			},
			// 上划加载更多
			loadMore() {
				if (this.currPage >= this.totalPage) return;
				// 模拟请求成功后的回调
					let currPage = this.currPage + 1;
					this.$api.index.NEWEST({
						page: currPage
					}).then(res => {

						this.goodsList = this.goodsList.concat(res.data.list);
						this.currPage = currPage;
						if (this.currPage >= this.totalPage) this.pageStatus = 'nomore';
						else this.pageStatus = 'loadmore';
					});
					// 1. list数组添加新数据
					// 2. 更新当前页码 currPage
					// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
			},
		},
		onPullDownRefresh() {
			this.getNewestList();
			this.currPage = 1;
		},
		onReachBottom() {
			if (this.currPage >= this.totalPage) return;
			this.pageStatus = 'loading';
			this.loadMore();
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}

	.page {
		min-height: 100%;
		padding: 24rpx;
		padding-bottom: 76rpx;
		position: relative;

		.content {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.goods {
				width: 344rpx;
				background: #FFFFFF;
				margin-bottom: 16rpx;

				image {
					width: 100%;
					height: 344rpx;
					background: #CCCCCC;
				}

				.info {
					padding: 16rpx;

					.name {
						font-size: 28rpx;
						color: #333333;
						margin-bottom: 24rpx;
						height: 80rpx;
						line-height: 40rpx;
					}

					.price {
						display: flex;
						align-items: flex-end;
						margin-bottom: 8rpx;
						overflow: hidden;

						.price_now {
							color: #E76234;
							margin-right: 24rpx;
							font-weight: 600;

							.icon {
								font-size: 24rpx;
							}

							.text {
								font-size: 36rpx;
							}
						}

						.price_old {
							font-size: 28rpx;
							color: #999999;
							text-decoration: line-through;
							margin-bottom: 2rpx;
						}
					}

					.like {
						font-size: 22rpx;
						color: #CCCCCC;
						text-align: right;
					}
				}
			}
		}
		.content_bottom {
			padding: 20rpx 0;
			position: absolute;
			bottom: 32rpx;
			left: 0rpx;
			width: 100%;
		
			::v-deep.u-line {
				margin: 0 !important;
				border: 0 !important;
				width: 0 !important;
			}
		
		}
	}
</style>
