<template>
	<view class="page">
		<view class="top_line"></view>
		<view class="content">
			<view class="brand" v-for="(item,index) in seedingList" :key="index"
				@click="$toUrl('/pages/index/seeding/seeding',{id:item.id})">
				<imageBox width="100%" height="400rpx" :imageUrl="item.image"></imageBox>
				<view class="info">{{item.title}}</view>
			</view>
		</view>
		
		<view class="content_bottom" @click="loadMore">
			<u-loadmore :status="pageStatus" color="#CCCCCC" font-size="18" :icon="false" :loadText="loadText" />
		</view>
	</view>
</template>

<script>
	import imageBox from '@/component/common/imageBox.vue'
	export default {
		data() {
			return {
				seedingList: [],
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
			this.getSeedingList();
		},
		components: {
			imageBox: imageBox
		},
		methods: {
			// 热销榜单接口
			getSeedingList() {
				this.$api.index.SEEDING_LIST({
					page: 1
				}).then(res => {
					this.seedingList = res.data.list;
					this.totalPage = res.data.total_page;
					if (this.currPage >= this.totalPage)
						this.pageStatus = 'nomore';
					uni.stopPullDownRefresh();
				})
			},
			// 上划加载更多
			loadMore() {
				if (this.currPage >= this.totalPage) return;
				// 模拟请求成功后的回调
					let currPage = this.currPage + 1;
					this.$api.index.SEEDING_LIST({
						page: currPage
					}).then(res => {

						this.seedingList = this.seedingList.concat(res.data.list);
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
			this.getSeedingList();
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
	.page {
		min-height: 100%;
		padding-bottom: 76rpx;
		position: relative;
		.top_line {
			height: 1rpx;
			background: #EEEEEE;
			width: 100%;
		}

		.content {
			padding: 24rpx;
			padding-bottom: 0rpx;
			.brand {
				width: 100%;
				height: 400rpx;
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
