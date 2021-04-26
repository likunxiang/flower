<template>
	<view class="content_main">

		<u-navbar title="我的优惠劵" :custom-back="$goback" :border-bottom="false"></u-navbar>

		<view class="content_top">
			<u-tabs-swiper ref="uTabs" :list="topData" @change="tabsChange" :is-scroll="false" font-size="28"
				:current="current" active-color="#212121" inactive-color="#999999" bar-height="4" bar-width="80">
			</u-tabs-swiper>
		</view>


		<view class="content_box" :style="'height: calc(100vh - 80rpx - ' + heightInfo + 'px);'">
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
				style="height: 100%;">
			
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<couponsNews :couponsData="couponsDataUse" :typePage="typePage"></couponsNews>
					</scroll-view>
				</swiper-item>
			
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<couponsNews :couponsData="couponsDataNot" :typePage="typePage"></couponsNews>
					</scroll-view>
				</swiper-item>
			</swiper>

		</view>

	</view>
</template>

<script>
	import couponsNews from '@/component/my/coupons/coupons_news.vue'
	export default {
		components: {
			couponsNews,
		},
		data() {
			return {
				heightInfo: "", //标题栏高度
				typePage: '', //判断那个页面跳过来
				topData: [{
					name: '可使用',
				}, {
					name: '不使用',
				}], //顶部数据
				current: 0, //tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, //swiper组件的current值，表示当前那个swiper-item是活动的
				couponsDataUse: [], //优惠劵数据 可使用
				couponsDataNot: [], //优惠劵数据 不使用
			}
		},
		onLoad(option) {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.typePage = option.typePage;
			let objData= JSON.parse(option.couponsData)
			if (objData) {
				if (objData.usable.length !=0) { //可用
					objData.usable.forEach(item => {
						this.$set(item, 'type', 0);
						this.couponsDataUse.push(item)
					})
				}
				if (objData.unusable.length !=0) { //不可用
					objData.unusable.forEach(item => {
						this.$set(item, 'type', 1);
						this.couponsDataNot.push(item)
					})
				}
			}
		},
		methods: {


			// tabs通知swiper切换
			tabsChange(index) {
				let that = this;
				that.swiperCurrent = index;
			},

			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},

			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let that = this;
				let current = e.detail.current;
				that.$refs.uTabs.setFinishCurrent(current);
				that.swiperCurrent = current;
				that.current = current;
			},


		}
	}
</script>

<style lang="scss">
	
	page {
		background-color: #EEEEEE;
	}
	
	
	.content_main {
		background-color: #EEEEEE;
		min-height: 100%;

		.content_top {
			height: 76rpx;
			
			::v-deep.u-tabs {
				height: 76rpx;
			}
			
		}

		.content_box {

		}

	}
</style>
