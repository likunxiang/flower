<template>
	<view class="content_main">

		<u-navbar title="我的优惠劵" :custom-back="$goback"></u-navbar>

		<view class="content_top">
			<u-tabs-swiper ref="uTabs" :list="topData" @change="tabsChange" :is-scroll="false" font-size="28"
				:current="current" active-color="#212121" inactive-color="#999999" bar-height="4" bar-width="80">
			</u-tabs-swiper>
		</view>

		<view class="content_box" :style="'height: calc(100vh - 80rpx - ' + heightInfo + 'px);'">
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
				style="height: 100%;">

				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<couponsNews :couponsData="couponsDataNot" :typePage="typePage" @changeCheckd="changeCheckd">
						</couponsNews>
					</scroll-view>
				</swiper-item>

				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<couponsNews :couponsData="couponsDataUsed" :typePage="typePage" @changeCheckd="changeCheckd">
						</couponsNews>
					</scroll-view>
				</swiper-item>

				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<couponsNews :couponsData="couponsDataExpired" :typePage="typePage"
							@changeCheckd="changeCheckd"></couponsNews>
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
					name: '未使用',
				}, {
					name: '已使用',
				}, {
					name: '已过期',
				}], //顶部数据
				current: 0, //tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, //swiper组件的current值，表示当前那个swiper-item是活动的
				couponsDataNot: [], //优惠劵数据 未使用
				couponsDataUsed: [], //优惠劵数据 已使用
				couponsDataExpired: [], //优惠劵数据 已过期
				numPage: 1, //分页
				numSize: 20, //分页 默认20
			}
		},
		onLoad(option) {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.typePage = option.typePage; //判断 0
			this.getMyCouponsListNot();
			// this.getMyCouponsListUsed();
			// this.getMyCouponsListExpired();
		},
		onPullDownRefresh() {
			setTimeout(() => {
				switch (Number(this.current)) {
					case 0: //优惠劵数据 未使用
						this.getMyCouponsListNot();
						break;
					case 1: //优惠劵数据 已使用
						this.getMyCouponsListUsed();
						break;
					case 2: //优惠劵数据 已过期
						this.getMyCouponsListExpired();
						break;
				}
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {

			//获取我的优惠券 未使用
			getMyCouponsListNot() {
				let that = this;
				that.$api.my.API_MYCOUPONLIST({
					coupon_status: 1,
					page: that.numPage,
				}).then(res => {
					that.couponsDataNot = res.data.coupon_list;
					that.couponsDataNot.forEach(item => {
						that.$set(item, 'openCheckd', false);
					})
				});
			},

			//获取我的优惠券 已使用
			getMyCouponsListUsed() {
				let that = this;
				that.$api.my.API_MYCOUPONLIST({
					coupon_status: 2,
					page: that.numPage,
				}).then(res => {
					that.couponsDataUsed = res.data.coupon_list;
					that.couponsDataUsed.forEach(item => {
						that.$set(item, 'openCheckd', false);
					})
				});
			},

			//获取我的优惠券 已过期
			getMyCouponsListExpired() {
				let that = this;
				that.$api.my.API_MYCOUPONLIST({
					coupon_status: 3,
					page: that.numPage,
				}).then(res => {
					that.couponsDataExpired = res.data.coupon_list;
					that.couponsDataExpired.forEach(item => {
						that.$set(item, 'openCheckd', false);
					})
				});
			},

			//点击展开关闭
			changeCheckd(index) {
				let that = this;
				switch (Number(that.current)) {
					case 0: //优惠劵数据 未使用
						that.couponsDataNot[index].openCheckd = !that.couponsDataNot[index].openCheckd
						break;
					case 1: //优惠劵数据 已使用
						that.couponsDataUsed[index].openCheckd = !that.couponsDataUsed[index].openCheckd
						break;
					case 2: //优惠劵数据 已过期
						that.couponsDataExpired[index].openCheckd = !that.couponsDataExpired[index].openCheckd
						break;
				}
			},

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
				switch (Number(that.current)) {
					case 0: //优惠劵数据 未使用
						if (that.couponsDataNot.length == 0) {
							that.getMyCouponsListNot();
						}
						break;
					case 1: //优惠劵数据 已使用
						if (that.couponsDataUsed.length == 0) {
							that.getMyCouponsListUsed();
						}
						break;
					case 2: //优惠劵数据 已过期
						if (that.couponsDataExpired.length == 0) {
							that.getMyCouponsListUsed();
						}
						break;
				}
			},

			// scroll-view到底部加载更多
			onreachBottom() {
				let that = this;
				// 模拟请求成功后的回调
				setTimeout(() => {
					let numPage = that.numPage + 1;
					that.$api.my.API_MYCOUPONLIST({
						coupon_status: that.current,
						page: numPage,
					}).then(res => {
						switch (Number(that.current)) {
							case 0: //优惠劵数据 未使用
								that.couponsDataNot = that.couponsDataNot.concat(res.data.coupon_list);
								break;
							case 1: //优惠劵数据 已使用
								that.couponsDataUsed = that.couponsDataUsed.concat(res.data.coupon_list);
								break;
							case 2: //优惠劵数据 已过期
								that.couponsDataExpired = that.couponsDataExpired.concat(res.data
									.coupon_list);
								break;
						}
						that.numPage = numPage;
					});
				}, 800)
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
			width: 100%;
		}



	}
</style>
