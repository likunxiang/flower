<template>
	<view class="content_Top">
		<!-- 导航栏 -->
		<!-- <u-navbar :is-back="false" title-size="40rpx" title-bold="true" title-color="#333333" title="葵花市场"
			:border-bottom="false" :is-fixed="true"></u-navbar> -->
		<!-- 导航栏 end -->

		<!-- 搜索框 -->
		<view style="height: 80rpx;">
			<view class="search_box" @click="jumpPage('/pages/index/search/search')">
				<view class="box">
					<u-icon class="image" name="search" custom-prefix="custom-icon" size="24" color="#999999"></u-icon>
					<view class="text">搜索：品牌、商品</view>
				</view>
			</view>
		</view>

		<!-- 占位 -->

		<!-- 占位 end -->
		<!-- 搜索框 end -->
		<!-- 广告 -->
		<view class="slogan_box">

			<!-- 广告通知组件 -->
			<advertising :notifys='notifys' ref="advertising"></advertising>
			<!-- 广告通知组件 end -->
		</view>
		<!-- 广告 end -->
		<!-- 轮播图 -->
		<indexSwiper :swiperList="swiperList" :autoplay="autoplay" @stopAutoPlay="stopAutoPlay"
			@openAutoPlay="openAutoPlay"></indexSwiper>
		<!-- 轮播图 end -->
		<!-- 模块入口 -->
		<moduleEntrance></moduleEntrance>
		<!-- 模块入口 end -->


		<!-- 展示内容 -->
		<indexShow :brand="brand" :goodsList="goodsList" @imageError="imageError"></indexShow>
		<!-- 展示内容 end -->

		<view class="content_bottom" @click="loadMore">
			<u-loadmore :status="pageStatus" color="#CCCCCC" font-size="18" :icon="false" :loadText="loadText" />
		</view>
	</view>
</template>

<script>
	import swiper from '@/component/index/swiper.vue'
	import moduleEntrance from '@/component/index/moduleEntrance.vue'
	import indexShow from '@/component/index/indexShow.vue'
	import advertising from '@/component/index/advertising.vue'
	export default {
		data() {
			return {
				slogan: '2021春季最新YSL预售已开启，限时抢购！', // 广告语
				swiperList: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						bigTitle: '青春焕颜·全新上市0',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东',
						bg: '../../static/images/index/swiper_text_bg.png'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						bigTitle: '青春焕颜·全新上市1',
						title: '身无彩凤双飞翼，心有灵犀一点通',
						bg: '../../static/images/index/swiper_text_bg.png'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						bigTitle: '青春焕颜·全新上市2',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
						bg: '../../static/images/index/swiper_text_bg.png'
					}
				],
				currentId: 1,
				autoplay: true,
				notifys: [], // 滚动通知
				brand: [], // 品牌
				currPage: 1,
				totalPage: 2, // 总页数
				goodsList: [], // 好物列表
				updataTime: '', // 最后一次更新时间
				pageStatus: 'loadmore',
				loadText: {
					loadmore: '加载更多',
					loading: '正在加载...',
					nomore: '别拉了，已经到底了~'
				}
			}
		},
		components: {
			indexSwiper: swiper,
			moduleEntrance: moduleEntrance,
			indexShow: indexShow,
			advertising: advertising
		},
		onShow() {
			this.getIndexData();
			this.getGoodsList();
			this.$refs.advertising.change();
			this.autoplay = true;
		},
		onLoad() {
			
		},
		methods: {
			imageError(index) {
				let errImg = '/static/images/image_error.png';
				let brand = this.brand;
				this.$set(this.brand[index], 'brand_logo', errImg);
			},
			// 跳转页面
			jumpPage(url, params, type) {
				this.$jumpPage(url, params, type);
			},
			// 首页接口请求
			getIndexData() {
				this.$api.index.INDEX({

				}).then(res => {
					this.swiperList = res.data.banner;
					this.notifys = res.data.notifys;
					this.brand = res.data.brand;
				})
			},
			// 首页列表接口
			getGoodsList() {
				this.$api.index.GOODS_LIST({

				}).then(res => {
					this.goodsList = res.data.list;
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
				this.$api.index.GOODS_LIST({
					page: currPage
				}).then(res => {
					this.currPage = currPage;
					this.goodsList = this.goodsList.concat(res.data.list);

					if (this.currPage >= this.totalPage) this.pageStatus = 'nomore';
					else this.pageStatus = 'loadmore';
				})
				// 1. list数组添加新数据
				// 2. 更新当前页码 currPage
				// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
			},
			stopAutoPlay() {
				this.autoplay = false;
			},
			openAutoPlay() {
				this.autoplay = true;
			}
		},
		onPullDownRefresh() {

			this.getIndexData();
			this.getGoodsList();
			this.currPage = 1;
		},
		onReachBottom() {
			if (this.currPage >= this.totalPage) return;
			this.pageStatus = 'loading';
			this.loadMore();

		},
		onHide() {
			this.$refs.advertising.clearTimer();
			this.autoplay = false;
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}

	.content_Top {
		position: relative;

		.search_box {
			width: 750rpx;
			// height: 80rpx;
			padding: 14rpx 55rpx 14rpx;
			background: #FFFFFF;
			position: fixed;
			top: 0rpx;
			left: 0rpx;
			z-index: 99;

			.box {
				height: 56rpx;
				background: #FFFFFF;
				border: 1rpx solid #CCCCCC;
				display: flex;
				align-items: center;
				padding: 0 32rpx;

				.image {
					width: 24rpx;
					height: 24rpx;
					margin-right: 40rpx;
				}

				.text {
					font-size: 24rpx;
					color: #CCCCCC;
				}
			}
		}

		.slogan_box {
			width: 100%;
			height: 56rpx;
			color: #333333;
			font-size: 22rpx;
			text-align: center;
			font-weight: 500;
			background: linear-gradient(180deg, #F8F8F8 0%, #EEEEEE 100%);
		}

		.page_footer {
			padding: 20rpx 0rpx;
			font-size: 18rpx;
			color: #CCCCCC;
		}

		.content_bottom {
			padding: 20rpx 0;

			::v-deep.u-line {
				margin: 0 !important;
				border: 0 !important;
				width: 0 !important;
			}

		}

	}
</style>
