<template>
	<view class="content_main">

		<u-navbar title="售后订单管理" :custom-back="$goback" :border-bottom="false"></u-navbar>

		<view class="content_top">
			<u-tabs-swiper ref="uTabs" :list="topData" :current="current" @change="tabsChange" :is-scroll="false"
				font-size="28" active-color="#212121" inactive-color="#999999" bar-height="4" bar-width="80">
			</u-tabs-swiper>
		</view>

		<view class="content_box" :style="'height: calc(100vh - 80rpx - ' + heightInfo + 'px);'">
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
				style="height: 100%;">

				<!--处理中-->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<afterNews :afterData="afterDataProcess" :currentIsok="currentIsok" @revokeOrder="revokeOrder">
						</afterNews>
					</scroll-view>
				</swiper-item>

				<!--处理记录-->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<afterNews :afterData="afterDataRecord" :currentOn="currentOn" @deleteInfo="deleteInfo">
						</afterNews>
					</scroll-view>
				</swiper-item>

			</swiper>

		</view>

	</view>
</template>

<script>
	import afterNews from '@/component/my/after/after_news'
	export default {
		components: {
			afterNews,
		},
		data() {
			return {
				heightInfo: "", //标题栏高度
				typePage: '', //跳转请求判断
				topData: [{
					name: '处理中',
				}, {
					name: '处理记录',
				}], //顶部数据
				current: 0, //tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, //swiper组件的current值，表示当前那个swiper-item是活动的
				afterDataProcess: [], //订单数据 处理中
				afterDataRecord: [], //订单数据 处理记录
				numPage: 1, //分页
				currentIsok: 1, //处理中
				currentOn: 2, // 处理记录
			}
		},
		onLoad(option) {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.getAfterListInfoProcess(); //处理中
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.numPage = 1;
				switch (Number(this.current)) {
					case 0:
						this.getAfterListInfoProcess();
						break;
					case 1:
						this.getAfterListInfoRecord();
						break;
				}
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {

			//获取订单列表 处理中
			getAfterListInfoProcess() {
				let that = this;
				that.$api.my.API_MYREFUNDLIST({
					type: 0,
					page: that.numPage,
				}).then(res => {
					that.afterDataProcess = res.data.list;
				});
			},

			//获取订单列表 处理记录
			getAfterListInfoRecord() {
				let that = this;
				that.$api.my.API_MYREFUNDLIST({
					type: 1,
					page: that.numPage,
				}).then(res => {
					that.afterDataRecord = res.data.list;
				});
			},

			//撤销申请
			revokeOrder(index) {
				let that = this;
				that.afterDataProcess.splice(index, 1)
				that.getAfterListInfoRecord();
			},

			//删除申请
			deleteInfo(index) {
				let that = this;
				that.afterDataRecord.splice(index, 1)
			},

			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
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
					case 0: //订单数据 全部
						if (that.afterDataProcess.length == 0) {
							that.getAfterListInfoProcess(); //处理中
						}
						break;
					case 1: //订单数据 待付款
						if (that.afterDataRecord.length == 0) {
							that.getAfterListInfoRecord(); //处理记录
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
					that.$api.my.API_MYREFUNDLIST({
						status: that.current,
						page: numPage,
					}).then(res => {
						switch (Number(that.current)) {
							case 0: //订单数据 全部
								that.afterDataProcess = that.afterDataProcess.concat(res.data.list);
								break;
							case 1: //订单数据 待付款
								that.afterDataRecord = that.afterDataRecord.concat(res.data.list);
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
		background: #EEEEEE;
	}

	.content_main {
		background-color: #EEEEEE;
		min-height: 100%;

		.content_top {
			height: 76rpx;
		}

		.content_box {}

	}
</style>
