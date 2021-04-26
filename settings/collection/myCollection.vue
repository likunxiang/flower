<template>
	<view class="content_main">

		<u-navbar title="我的收藏" :custom-back="$goback"></u-navbar>

		<view class="content_box" v-if="collectionData.length !=0">

			<collectionNews :collectionData="collectionData" @refresh="deleteInfo"></collectionNews>

		</view>

		<view class="content_img" v-else :style="'height: calc(100vh  - ' + heightInfo + 'px)'">

			<view class="order_img">

				<view class="img_png">
					<image src="/settings/static/collection_no.png"></image>
					<view class="img_title">众多好物，收藏看看？</view>
				</view>

			</view>

		</view>

		<view class="content_bottom" @click="loadMore">
			<u-loadmore :status="pageStatus" color="#CCCCCC" font-size="18" :icon="false" :loadText="loadText" />
		</view>
	</view>
</template>

<script>
	import collectionNews from '@/settings/components/collection/collection_news.vue';
	export default {
		components: {
			collectionNews,
		},
		data() {
			return {
				heightInfo: '', //顶部栏高度
				collectionData: [], //收藏数据
				pageNum: 1, //滚动刷新
				totalPage: 1,
				pageStatus: 'loadmore', // 加载状态
				loadText: {
					loadmore: '加载更多',
					loading: '正在加载...',
					nomore: '别拉了，已经到底了~'
				}
			}
		},
		onShow() {
			this.getCollection();
		},
		onLoad() {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
		},
		onReachBottom() {
			if (this.pageNum >= this.totalPage) {
				return;
			}
			this.pageStatus = 'loading';
			this.loadMore();
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.pageNum = 1;
				this.getCollection();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {

			//获取我的收藏列表数据
			getCollection() {
				let that = this;
				uni.showLoading({
					title: '拼命加载中',
					mask: true
				});
				that.$api.my.API_COLLECTLIST({
					page: that.pageNum,
				}).then(res => {
					that.collectionData = res.data.list;
					that.totalPage = res.data.total_page;
					if (that.pageNum >= that.totalPage){
						that.pageStatus = 'nomore';
					}
					uni.hideLoading();
				});
			},

			//滚动到底部请求
			loadMore() {
				let that = this;
				if (that.pageNum >= that.totalPage) {
					return;
				}
				let pageNum = that.pageNum + 1;
				that.$api.my.API_COLLECTLIST({
					page: pageNum,
				}).then(res => {
					that.collectionData = that.collectionData.concat(res.data.list);
					that.pageNum = pageNum;
					if (that.pageNum >= that.totalPage) {
						that.pageStatus = 'nomore'
					} else {
						that.pageStatus = 'loadmore';
					}
				});
			},

			//删除收藏
			deleteInfo(index) {
				let that = this;
				that.collectionData.splice(index, 1);
			},

			//跳转商品详情
			jumpPage(index) {
				let that = this;
				that.$jumpPage('/pages/index/goods/goods', {
					id: that.collectionData[index].product_id
				});
			}

		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background-color: #FFFFFF;
		min-height: 100%;
		width: 100%;
		position: relative;

		.content_box {
			padding-bottom: 180rpx;
		}

		.content_img {
			width: 100%;
			height: 100%;
			display: flex;
			justify-items: center;
			align-items: center;

			.img_png {
				width: 100%;
				text-align: center;

				image {
					width: 160rpx;
					height: 160rpx;

				}

				.img_title {
					width: 100%;
					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					margin: 0 auto;
					margin-top: 80rpx;
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
