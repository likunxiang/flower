<template>
	<view class="page">
		<view class="top_line"></view>
		<view class="content">
			<view class="padlr_24">
				<view class="header">
					<view class="title">{{seedingDetail.title}}</view>
					<view class="time">{{seedingDetail.add_time_format1}}</view>
				</view>
			</view>
			<view class="padlr_24">
				<view class="article_text">
					<u-parse :html="seedingDetail.content" :selectable="true"></u-parse>
				</view>
			</view>
			
			<!-- <view class="padlr_24">
				<view class="article_text">今天和大家推荐的是奇亚籽。它膳食纤维丰富，能预防便秘，另外它富含n-3系列脂肪酸，能预防心脏病。</view>
			</view>
			<view class="article_banner" >
				<image src="" mode=""></image>
			</view>
			<view class="padlr_24">
				<view class="article_text">亚麻籽的确富含膳食纤维，10克亚麻籽可以提供1克水溶性膳食纤维和3克不溶性膳食纤维，这些膳食纤维可以增加粪便体积，所以吃亚麻籽可能会改善便秘，不过几乎没有相关研究。另外亚麻籽也富含n-3系列脂肪酸，主要是a-亚麻酸；也有研究发现，吃亚麻籽能显著降低总胆固醇和坏胆固醇，这么分析可以说对预防心脏病有帮助。不过亚麻籽要做熟了吃，因为生的亚麻籽含有生氰糖苷，容易引起中毒，可以炒熟、碾碎拌凉菜或撒粥里，吃的量10克左右就好。</view>
			</view> -->
		</view>

		<pageFooter title="查看推荐商品" @footerBtnEvent="openGoodsLay"></pageFooter>

		<u-popup v-model="goodsShow" mode="bottom" width="100%" :safe-area-inset-bottom="true">
			<view class="lay_content">
				<view class="lay_title">
					<view class="lay_title_item"></view>
					<view class="lay_title_item title">推荐商品</view>
					<view class="lay_title_item close" @click="closeGoodsLay">关闭</view>
				</view>
				<view>
					<scroll-view scroll-y="true" class="goods_content">
						<goodsOne :goodsList="seedingDetail.product_list"></goodsOne>
					</scroll-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import goodsOne from '@/component/common/goodsOne.vue'
	import pageFooter from '@/component/common/pageFooter.vue'
	export default {
		data() {
			return {
				articleId: 0,
				goodsShow: false,
				goodsList: [],
				seedingDetail: {}
			}
		},
		onLoad(options) {
			this.articleId = options.id;
			this.getSeedingDetail();
		},
		components: {
			goodsOne: goodsOne,
			pageFooter: pageFooter
		},
		methods: {
			// 热销榜单接口
			getSeedingDetail() {
				this.$api.index.SEEDING_DETAIL({
					article_id: this.articleId
				}).then(res => {
					this.seedingDetail = res.data;
				})
			},
			openGoodsLay() {
				this.goodsShow = true;
			},
			closeGoodsLay() {
				this.goodsShow = false;
			}
		}
	}
</script>

<style lang="scss">
	.page {
		background: #FFFFFF;
		min-height: 100%;
		padding-bottom: 130rpx;
		position: relative;

		.top_line {
			width: 100%;
			height: 8rpx;
			background: #EEEEEE;
		}

		.content {
			background: #FFFFFF;
			padding: 24rpx;

			.padlr_24 {
				padding-left: 24rpx;
				padding-right: 24rpx;
			}

			.header {
				padding-bottom: 16rpx;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
				margin-bottom: 24rpx;

				.title {
					font-size: 30rpx;
					color: #333333;
					margin-bottom: 16rpx;
					font-weight: 400;
				}

				.time {
					font-size: 22rpx;
					color: #999999;
				}
			}

			.article_text {
				font-size: 26rpx;
				color: #999999;
				line-height: 37rpx;
				margin-bottom: 24rpx;
				text-align: justify;
			}

			.article_banner {
				width: 702rpx;
				height: 300rpx;
				margin-bottom: 24rpx;

				image {
					width: 702rpx;
					height: 300rpx;
					background: #CCCCCC;
				}
			}
		}

		// 弹窗部分
		.lay_content {
			background: #EEEEEE;
			padding: 0 24rpx;

			.lay_title {
				width: 100%;
				height: 88rpx;
				display: flex;
				align-items: center;
				margin-bottom: 24rpx;

				.lay_title_item {
					flex: 1;
				}

				.title {
					color: #333333;
					font-size: 32rpx;
					text-align: center;
				}

				.close {
					font-size: 28rpx;
					color: #666666;
					text-align: right;
				}
			}

			.goods_content {
				height: 648rpx;
			}
		}
	}
</style>
