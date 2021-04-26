<template>
	<view class="middle">
		<view class="navbanner" >
			<view class="navbanner_list" v-for="(item,index) in navBanner" :key="index" @click="jumpPage(item.url)">
				<u-icon class="navbanner_image" :name="item.iconName" custom-prefix="custom-icon" size="46" color="#333333"></u-icon>
				<view class="navbanner_text">{{item.title}}</view>
			</view>
		</view>
		<view class="module_entrance">
			<view class="welfare" @click="jumpPage('/pages/index/welfareGo/welfareGo')">
				<image class="image" src="../../static/images/index/welfare.png" mode="aspectFit"></image>
			</view>
			<view class="vip_center" @click="jumpPage('/agency/joinMember/joinMember')">
				<image class="image" src="../../static/images/index/vip_center.png" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navBanner: [
					{
						title: '精选品牌',
						iconName: 'handpick',
						url: '/pages/index/choiceness/choiceness',
					},
					{
						title: '最新到货',
						iconName: 'arrival',
						url: '/pages/index/newest/newest',
					},
					{
						title: '热销榜单',
						iconName: 'hotlist',
						url: '/pages/index/hotRanking/hotRanking',
					},
					{
						title: '种草专场',
						iconName: 'seeding',
						url: '/pages/index/seedingList/seedingList',
					},
				]
			}
		},
		props: {
			
		},
		methods: {
			// 跳转页面
			jumpPage(url,params,type) {
				this.$jumpPage(url,params,type);
			},
		}
	}
</script>

<style scoped lang="scss">
	.middle {
		padding: 40rpx 24rpx;
		background: #FFFFFF;
		.navbanner {
			display: flex;
			.navbanner_list {
				flex: 1;
				text-align: center;
				padding-top: 40rpx;
				padding-bottom: 40rpx;
				.navbanner_image {
					height: 46rpx;
					text-align: center;
					margin: auto;
				}
				.navbanner_text {
					font-size: 22rpx;
					color: #333333;
					margin-top: 16rpx;
					text-align: center;
				}
			}
		}
		.module_entrance {
			padding: 0 16rpx;
			display: flex;
			.welfare {
				width: 370rpx;
				height: 160rpx;
				margin-right: 16rpx;
				.image {
					width: 100%;
					height: 100%;
				}
			}
			.vip_center {
				width: 284rpx;
				height: 160rpx;
				.image {
					width: 100%;
					height: 100%;
				}
			}
			
		}
	}
</style>
