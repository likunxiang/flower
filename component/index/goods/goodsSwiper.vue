<template>
	<view class="swiper_box">
		<swiper class="swiper-item" :current="currentId" @change="getCurrent" :indicator-dots="false" :autoplay="autoplay"
		 :interval="3000" :duration="500" circular="true">
			<swiper-item class="swiper-item" :item-id="index" v-for="(item,index) in swiperImage" :key="index">
				<imageBox width="100%" height="730rpx" :imageUrl="item"></imageBox>
			</swiper-item>
			
		</swiper>
		<view class="dot_box u-flex u-row-center">
			<view :class="'swiper_dot ' + (index == currentId?'active':'')" v-for="(item,index) in swiperImage" :key="index" ></view>
		</view>
	</view>
</template>

<script>
	import imageBox from '@/component/common/imageBox.vue'
	export default {
		data() {
			return {
				currentId: 0,
			}
		},
		props: {
			swiperImage: {
				type: Array,
				default: () => {
					return
				}
			},
			// 轮播同自动滚动开关
			autoplay: {
				type: Boolean,
				default: false
			}
		},
		components: {
			imageBox: imageBox
		},
		methods: {
			getCurrent(e) {
				this.currentId = e.detail.current;
			},
		}
	}
</script>

<style scoped lang="scss">
	.swiper_box {
		width: 100%;
		height: 729rpx;
		position: relative;
		.swiper-item {
			width: 100%;
			height: 729rpx;
		}
		.dot_box {
			width: 100%;
			left: 0;
			position: absolute;
			bottom: 29rpx;
			margin: auto;
		
			.swiper_dot {
				width: 10rpx;
				height: 6rpx;
				border-radius: 3rpx;
				margin-right: 8rpx;
				background: #eeeeee;
			}
		
			.active {
				width: 30rpx;
				border-radius: 6rpx;
				background: #212121;
			}
		}
	}
</style>
