<template>
	<view class="page">
		<view class="banner">
			<imageBox width="100%" height="300rpx" :imageUrl="backgroundImage"></imageBox>
			<!-- <view class="info">
				明星同款 兰蔻全新美丽人生香水
			</view> -->
		</view>

		<goodsOne :goodsList="goodsList" :showSale="true" :showRank="true"></goodsOne>
		
		<view class="content_bottom" @click="loadMore">
			<u-loadmore :status="pageStatus" color="#CCCCCC" font-size="18" :icon="false" :loadText="loadText"  />
		</view>
	</view>
</template>

<script>
	import goodsOne from '@/component/common/goodsOne.vue'
	import imageBox from '@/component/common/imageBox.vue'
	export default {
		data() {
			return {
				goodsList: [],
				backgroundImage: '', // 背景图 
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
		components: {
			goodsOne: goodsOne,
			imageBox: imageBox
		},
		onLoad() {
			this.getHotGoodsList();
		},
		methods: {
			// 热销榜单接口
			getHotGoodsList() {
				this.$api.index.HOT_RANKING({
					page: 1
				}).then(res => {
					this.goodsList = res.data.list;
					this.totalPage = res.data.total_page;
					this.backgroundImage = res.data.background_image;
					if (this.currPage >= this.totalPage)
						this.pageStatus = 'nomore';
					uni.stopPullDownRefresh();
				});
			},
			// 上划加载更多
			loadMore() {
				if (this.currPage >= this.totalPage) return;
				// 模拟请求成功后的回调
					let currPage = this.currPage + 1;
					this.$api.index.HOT_RANKING({
						page: currPage
					}).then(res => {

						this.goodsList = this.goodsList.concat(res.data.list);
						this.currPage = currPage;
						
						if (this.currPage >= this.totalPage) this.pageStatus = 'nomore';
						else this.pageStatus = 'loadmore';
					})
					// 1. list数组添加新数据
					// 2. 更新当前页码 currPage
					// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
			},
		},
		onPullDownRefresh() {
			this.getHotGoodsList();
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
		padding: 24rpx;
		padding-bottom: 76rpx;
		position: relative;
		min-height: 100%;
		.banner {
			width: 100%;
			height: 300rpx;
			position: relative;
			margin-bottom: 24rpx;

			image {
				width: 100%;
				height: 100%;
				background: #CCCCCC;
			}

			.info {
				position: absolute;
				width: 100%;
				bottom: 0rpx;
				left: 0rpx;
				padding: 24rpx;
				background: rgba(33, 33, 33, .3);
				font-size: 28rpx;
				color: #FFFFFF;
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
