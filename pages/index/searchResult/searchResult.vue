<template>
	<view class="page" v-if="loadEnd">
		<block v-if="goodsList.length > 0">
			<view class="page_main">
				<goodsTwo :goodsList="goodsList"></goodsTwo>
			</view>

		</block>
		<block v-else>
			<view class="empty">
				<view class="empty_main">
					<view class="image">
						<image class="image" src="../../../static/images/index/search/search_result_empty.png" mode=""></image>
					</view>
					<view class="desc">换个词，说不定可行</view>
				</view>
			</view>
		</block>
		
		<view class="content_bottom" @click="loadMore">
			<u-loadmore :status="pageStatus" color="#CCCCCC" font-size="18" :icon="false" :loadText="loadText" />
		</view>
	</view>

</template>

<script>
	import goodsTwo from '@/component/common/goodsTwo.vue'
	export default {
		data() {
			return {
				keyword: '',
				goodsList: [],
				currPage: 1,
				totalPage: 1,
				pageStatus: 'loadmore', // 加载状态
				loadText: {
					loadmore: '加载更多',
					loading: '正在加载...',
					nomore: '别拉了，已经到底了~'
				},
				loadEnd: false
			};
		},
		components: {
			goodsTwo: goodsTwo
		},
		onLoad(option) {
			this.keyword = decodeURIComponent(this.$Route.query.keyword);
		},
		onShow() {
			this.getSearchList();
		},
		methods: {
			// 请求搜索结果 
			getSearchList() {
				// 检查是否登录
				if (this.token) {
					uni.showLoading({
						mask: false,
						title: '正在努力搜索'
					})
				}
				
				this.$api.index.SEARCH_GOODS_LIST({
					keyword: this.keyword
				}).then(res => {
					this.goodsList = res.data.list;
					this.totalPage = res.data.total_page;
					this.loadEnd = true;
					uni.hideLoading();
					if (this.currPage >= this.totalPage)
						this.pageStatus = 'nomore';
				})
			},
			// 上划加载更多
			loadMore() {
				if (this.currPage >= this.totalPage) return;
				// 模拟请求成功后的回调
					let currPage = this.currPage + 1;
					this.$api.index.SEARCH_GOODS_LIST({
						keyword: this.keyword,
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
			this.getSearchList();
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
		background: #FFFFFF;
	}

	.page {
		min-height: 100%;
		padding-bottom: 76rpx;
		position: relative;
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
		.page_main {
			padding: 24rpx;
			padding-bottom: 0rpx;
			
		}

		.empty {
			background: #FFFFFF;
			height: 100vh;
			padding-top: 380rpx;
			.empty_main {
				.image {
					width: 160rpx;
					height: 160rpx;
					margin: auto;
					margin-bottom: 80rpx;
					.image {
						width: 100%;
						height: 100%;
					}
				}
				.desc {
					text-align: center;
					font-size: 30rpx;
					color: #666666;
				}
			}
		}
	}
</style>
