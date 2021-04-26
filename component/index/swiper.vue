<template>
	<view class="swiper_box">
		<view>
			<swiper class="swiper-item" :current="currentId" @change="getCurrent" @transition="stopAutoPlay" @animationfinish="openAutoPlay" :indicator-dots="true" :autoplay="autoplay"
			 :interval="3000" :duration="500" circular="true">
				<swiper-item class="swiper-item" :item-id="index" v-for="(item,index) in swiperList" :key="index" @click.stop="$toUrl(item.wxa_url,{id: item.app_url})">
					<imageBox width="100%" height="600rpx" :imageUrl="item.pic"></imageBox>
				</swiper-item>
	
			</swiper>
		</view>
		<view class="swiper_text">
			<view class="dot_box u-flex u-row-center">
				<view :class="'swiper_dot ' + (index == currentId?'active':'')" v-for="(item,index) in swiperList" :key="index" ></view>
			</view>
			<swiper class="swiper_text_box" :current="currentId" @change="getCurrent" @transition="stopAutoPlay" @animationfinish="openAutoPlay" circular="true" :autoplay="autoplay" :duration="500" >
				<swiper-item class="swiper_text_box_item" :item-id="index" v-for="(item,index) in swiperList" :key="index" @click.stop="$jumpPage(item.wxa_url,{id: item.id})">
					<view class="swiper_big_title u-line-1">{{swiperList[currentId].name}}</view>
					<view class="swiper_title u-line-1">{{swiperList[currentId].subtitle}}</view>
				</swiper-item>
			</swiper>
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
			swiperList: {
				type: Array,
				default: () => {
					return {}
				}
			},
			autoplay: {
				type: Boolean,
				default: true
			}
		},
		components: {
			imageBox: imageBox
		},
		methods: {
			getCurrent(e) {
				this.currentId = e.detail.current;
			},
			stopAutoPlay() {
				this.$emit('stopAutoPlay');
			},
			openAutoPlay() {
				this.$emit('openAutoPlay');
			},
		}
	}
</script>

<style scoped lang="scss">
	.swiper_box {
		position: relative;
		width: 100%;
		height: 600rpx;
		background: #FFFFFF;
		.swiper-item {
			width: 100%;
			height: 600rpx;
		}
	
		.swiper_text {
			position: absolute;
			left: 80rpx;
			bottom: -54rpx;
			width: 590rpx;
			height: 180rpx;
			background-image: url(../../static/images/index/swiper_text_bg.png);
			background-size: 590rpx 180rpx;
			background-repeat: no-repeat;
			text-align: center;
			padding: 0 24rpx;
			.swiper_text_box {
				width: 100%;
				height: 140rpx;
				text-align: center;
				.swiper_text_box_item {
					padding-top: 32rpx;
					.swiper_big_title {
						font-size: 36rpx;
						color: #333333;
						font-weight: 500;
						margin-bottom: 8rpx;
					}
					
					.swiper_title {
						font-size: 24rpx;
						color: #666666;
					}
				}
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
	
	
	}
</style>
