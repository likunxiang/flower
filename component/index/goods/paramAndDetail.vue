<template>
	<view class="com_main">
		<view class="tab_box">
			<!-- <u-tabs :list="list" :is-scroll="false" :current="current" @change="change" height="80" font-size='24'
				active-color='#333333' inactive-color='#666666' bar-width='80' bar-height='2'></u-tabs> -->
			<view class="tab_item" :class="{'tab_item_active': current == index}" v-for="(item,index) in list" :key="index" @click="change(index)">
				<view class="">{{item.name}}</view>
				<view class="active" v-if="current == index"></view>
			</view>

		</view>
		<scroll-view :scroll-y="true" :scroll-top="scrollTop">
			<view class="param_box">
				<block v-if="checkMore">
					<view class="param_item" v-for="(item,index) in affiliates" :key="index">
						<view class="title">{{item.key}}</view>
						<view class="content">{{item.value}}</view>
					</view>
				</block>
				<block v-else>
					<view class="param_item" v-for="(item,index) in affiliates" v-if="index<4" :key="index">
						<view class="title">{{item.key}}</view>
						<view class="content">{{item.value}}</view>
					</view>
				</block>
			</view>
			<view class="check_more" @click="checkMoreMain" v-if="affiliates.length>4">
				<view class="text">{{checkMore?'收起':'查看更多'}}</view>
				<u-icon class="icon" name="bottonBack" custom-prefix="custom-icon" size="24" color="#CCCCCC" v-if="!checkMore"></u-icon>
				<u-icon class="icon_return" name="bottonBack" custom-prefix="custom-icon" size="24" color="#CCCCCC" v-else></u-icon>
			</view>
			<view class="goods_detail">
				<u-parse :html="detail" @imgtap="stop"></u-parse>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '商品'
				}, {
					name: '详情'
				}],
				parmaList: [{
						title: '品牌',
						content: '颜如意'
					},
					{
						title: '品牌',
						content: '颜如意'
					},
					{
						title: '品牌',
						content: '颜如意'
					},
					{
						title: '品牌',
						content: '颜如意'
					},
					{
						title: '品牌',
						content: '颜如意'
					},
					{
						title: '品牌',
						content: '颜如意'
					},
				],
				scrollTop: '0',
				checkMore: false, // 查看更多
			}
		},
		props: {
			// 商品详情
			detail: {
				type: String,
				default: ''
			},
			// tab定位
			current: {
				type: Number,
				default: 0
			},
			// 参数数据
			affiliates: {
				type: Array,
				default: () => {
					return
				}
			},
		},
		methods: {
			change(index) {
				this.$emit('change', index);
			},
			goTop() {
				this.scrollTop = 0;
			},
			checkMoreMain() {
				this.checkMore = !this.checkMore;
			},
			// 禁止点击图片预览
			stop(e) {
				e.ignore() 
			}
		}
	}
</script>

<style scoped lang="scss">
	.com_main {
		background: #FFFFFF;

		.tab_box {
			position: sticky;
			top: -1rpx;
			z-index: 99;
			display: flex;
			text-align: center;
			background: #FFFFFF;

			.tab_item {
				font-size: 24rpx;
				color: #999999;
				position: relative;
				height: 80rpx;
				line-height: 80rpx;
				flex: 1;
				.active {
					position: absolute;
					left: 50%;
					margin-left: -40rpx;
					bottom: 0rpx;
					width: 80rpx;
					height: 2rpx;
					background: #212121;
				}
			}
			.tab_item_active {
				color: #333333;
			}
		}

		.param_box {
			overflow: hidden;

			.param_item {
				display: flex;
				padding: 24rpx;

				.title {
					width: 148rpx;
					font-size: 24rpx;
					color: #333333;
					font-weight: 500;
					flex-grow: 0;
					flex-shrink: 0;
				}

				.content {
					flex-grow: 1;
					font-size: 24rpx;
					color: #666666;
				}
			}
		}

		.check_more {
			padding: 24rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.text {
				font-size: 22rpx;
				color: #CCCCCC;
				margin-right: 8rpx;
			}

			.icon {
				width: 24rpx;
				height: 24rpx;
			}

			.icon_return {
				width: 24rpx;
				height: 24rpx;
				transform: rotate(180deg);
			}
		}

		.goods_detail {
			background: #FFFFFF;
			width: 750rpx !important;
			overflow: hidden;
			position: relative;
			p {
				background:red;
			}
			img {
				max-width: 750rpx;
			}
		}
	}
</style>
