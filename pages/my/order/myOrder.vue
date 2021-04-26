<template>
	<view class="content_main">

		<u-navbar title="我的订单" :custom-back="$goback" :border-bottom="false"></u-navbar>


		<view class="content_box" :style="'height: calc(100vh - ' + heightInfo + 'px);'">

			<view class="box_top">
				<u-tabs-swiper ref="uTabs" :list="topData" :current="current" @change="tabsChange" :is-scroll="false" font-size="28"
				 active-color="#212121" inactive-color="#999999" bar-height="4" bar-width="80"></u-tabs-swiper>
			</view>

			<view class="box_main">
				<swiper :current="swiperCurrent" @animationfinish="animationfinish" style="height: 100%;" :circular="true"
				 :skip-hidden-item-layout="true">

					<!--全部-->
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
							<orderNews :orderData="orderDataALL" @deleteInfo="deleteInfo" @cancelInfo="cancelInfo" @deliveryInfo="deliveryInfo"
							 :current="current"></orderNews>
						</scroll-view>
					</swiper-item>

					<!--待付款-->
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
							<orderNews :orderData="orderDataPaid" @cancelInfo="cancelInfo" :current="current"></orderNews>
						</scroll-view>
					</swiper-item>

					<!--待发货-->
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
							<orderNews :orderData="orderDataDelivered" :current="current"></orderNews>
						</scroll-view>
					</swiper-item>

					<!--待收货-->
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
							<orderNews :orderData="orderDataReceived" @deliveryInfo="deliveryInfo" :current="current"></orderNews>
						</scroll-view>
					</swiper-item>

					<!--已完成-->
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
							<orderNews :orderData="orderDataIsok" @deleteInfo="deleteInfo" @deliveryInfo="deliveryInfo" :current="current"></orderNews>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>

		</view>

	</view>
</template>

<script>
	import orderNews from '@/component/my/order/order_news.vue'

	export default {
		components: {
			orderNews,
		},
		data() {
			return {
				heightInfo: "", //标题栏高度
				typePage: '', //跳转请求判断
				topData: [{
					name: '全部',
				}, {
					name: '待付款',
				}, {
					name: '待发货',
				}, {
					name: '待收货',
				}, {
					name: '已完成',
				}], //顶部数据
				current: 0, //tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, //swiper组件的current值，表示当前那个swiper-item是活动的
				orderDataALL: [], //订单数据 全部
				orderDataPaid: [], //订单数据 待付款
				orderDataDelivered: [], //订单数据 待发货
				orderDataReceived: [], //订单数据 待收货
				orderDataIsok: [], //订单数据 已完成
				numPage: 1, //分页
				orderId: '', //订单索引
				orderStatus: '', //订单状态
				orderType: '', //判断是什么操作 1申请退款 2删除 3支付 4确认收货
			}
		},
		onLoad(option) {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.typePage = Number(option.typePage);
			this.current = this.typePage;
			this.swiperCurrent = this.typePage;
			this.getAllList();
		},
		onShow() {
			let that = this;
			that.orderId = that.$cache('orderId')?that.$cache('orderId'):'';
			that.orderStatus = that.$cache('orderStatus')?that.$cache('orderStatus'):'';
			that.orderType = that.$cache('orderType')?Number(that.$cache('orderType')):'';//判断有没有操作状态
			if (that.orderId && that.orderStatus) {//判断订单id 和 订单状态
				that.changeOrder()
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.numPage = 1;
				this.getAllList();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onUnload() {
			this.$cache('orderId', null);
			this.$cache('orderStatus', null);
			this.$cache('orderType', null);
			this.$cache('productId', null);
		},
		methods: {

			//更新订单状态
			changeOrder() {
				let that = this;
				switch (Number(that.orderStatus)) {
					case 0: //全部
						if (that.orderDataALL.length != 0) {
							that.orderDataALL.forEach((item, index) => {
								if (that.orderId == item.id) {
									if (that.orderType == 1) { //退款申请直接变更状态 申请退款
										item.status = 13;
										item.status_str="退款中";
										that.getOrderListDelivered();
									}
									if (that.orderType == 2) { //删除订单直接移除项 删除
										that.orderDataALL.splice(index, 1);
										that.getOrderListIsok(); //获取订单列表 已完成
									}
									if (that.orderType == 3) {//支付
										item.status = 2;
										item.status_str="待发货";
										that.getOrderListPaid();
									}
								}
							})
						}
						break;
					case 1: //待付款
						if (that.orderDataPaid.length != 0) {
							that.orderDataPaid.forEach((item, index) => {
								if (that.orderId == item.id) {
									if (that.orderType == 3) {//支付
										that.orderDataPaid.splice(index, 1)
										that.getOrderListALL();
									}
								}
							})
						}
						break;
					case 2: //待发货
						if (that.orderDataDelivered.length != 0) {
							that.orderDataDelivered.forEach((item, index) => {
								if (that.orderId == item.id) {
									if (that.orderType == 1) { //退款申请直接变更状态 申请退款
										that.orderDataDelivered.splice(index, 1)
										that.getOrderListALL();
										that.getOrderListReceived();
									}
								}
							})
						}
						break;
					case 3: //待收货
						if (that.orderDataReceived.length != 0) {
							that.orderDataReceived.forEach((item, index) => {
								if (that.orderId == item.id) {
									if (that.orderType == 4) { //确认收货
										that.orderDataReceived.splice(index, 1);
										that.getOrderListALL();
										that.getOrderListIsok();
									}
								}
							})
						}
						break;
					case 4: //已完成
						if (that.orderDataIsok.length != 0) {
							that.orderDataIsok.forEach((item, index) => {
								if (that.orderId == item.id) {
									if (that.orderType == 1) {
										that.getOrderListALL(); //获取订单列表 全部
										that.getOrderListIsok();//获取订单列表 已完成
									}
									if (that.orderType == 2) { //删除订单直接移除项 删除
										that.orderDataIsok.splice(index, 1);
										that.getOrderListALL(); //获取订单列表 全部
									}
								}
							})
						}
						break;	
				}
				that.$cache('orderId', null);
				that.$cache('orderStatus', null);
				that.$cache('orderType', null);
				that.$cache('productId', null);
			},

			//获取全部订单
			getAllList() {
				let that = this;
				that.$api.my.API_MYORDERLISTALL().then(res => {
					that.orderDataALL = res.data.all.list; //全部
					that.orderDataPaid = res.data.unpaid.list; //待付款
					that.orderDataDelivered = res.data.unshipped.list; //待发货
					that.orderDataReceived = res.data.untakedelivery.list; //待收货
					that.orderDataIsok = res.data.takedelivery.list; //已完成
				});
			},

			//获取订单列表 全部
			getOrderListALL() {
				let that = this;
				that.$api.my.API_MYORDERLIST({
					status: 0,
					page: 1,
				}).then(res => {
					that.orderDataALL = res.data.list;
				});
			},

			//获取订单列表 待付款
			getOrderListPaid() {
				let that = this;
				that.$api.my.API_MYORDERLIST({
					status: 1,
					page: 1,
				}).then(res => {
					that.orderDataPaid = res.data.list;
				});
			},

			//获取订单列表 待发货
			getOrderListDelivered() {
				let that = this;
				that.$api.my.API_MYORDERLIST({
					status: 2,
					page: 1,
				}).then(res => {
					that.orderDataDelivered = res.data.list;
				});
			},

			//获取订单列表 待收货
			getOrderListReceived() {
				let that = this;
				that.$api.my.API_MYORDERLIST({
					status: 3,
					page: 1,
				}).then(res => {
					that.orderDataReceived = res.data.list;
				});
			},

			//获取订单列表 已完成
			getOrderListIsok() {
				let that = this;
				that.$api.my.API_MYORDERLIST({
					status: 4,
					page: 1,
				}).then(res => {
					that.orderDataIsok = res.data.list;
				});
			},

			// tabs通知swiper切换
			tabsChange(index) {
				let that = this;
				that.swiperCurrent = index;
			},

			//删除订单
			deleteInfo(index) {
				let that = this;
				switch (Number(this.current)) {
					case 0: //删除订单 刷新已完成
					console.log(22)
						that.orderDataALL.splice(index, 1);
						this.getOrderListIsok(); //获取订单列表 已完成
						break;
					case 1:

						break;
					case 2:

						break;
					case 3:

						break;
					case 4:
						that.orderDataIsok.splice(index, 1);
						this.getOrderListALL(); //获取订单列表 全部
						break;
				}
			},

			//取消订单
			cancelInfo(index) {
				let that = this;
				switch (Number(this.current)) {
					case 0: //取消订单 请求全部和待付款
						that.orderDataALL[index].status=10;//取消状态
						that.orderDataALL[index].status_str="已取消";//取消状态
						that.getOrderListPaid();
						break;
					case 1: //取消请求全部接口
						that.orderDataPaid.splice(index, 1)
						that.getOrderListALL();
						break;
					case 2:

						break;
					case 3:

						break;
					case 4:

						break;
				}
			},

			//确认收货
			deliveryInfo(index) {
				let that = this;
				switch (Number(this.current)) {
					case 0: //确认收货 刷新全部 待收货 已完成
						that.getOrderListALL();
						that.getOrderListReceived();
						that.getOrderListIsok();
						break;
					case 1:

						break;
					case 2:

						break;
					case 3: //确认收货 刷新全部 待收货 已完成
						that.orderDataReceived.splice(index, 1);
						that.getOrderListALL();
						that.getOrderListIsok();
						break;
					case 4:

						break;
				}
			},

			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let that = this;
				let current = e.detail.current;
				that.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				that.current = current;
				that.numPage = 1; //分页
			},

			// scroll-view到底部加载更多
			onreachBottom() {
				let that = this;
				// 模拟请求成功后的回调
				setTimeout(() => {
					let numPage = that.numPage + 1;
					that.$api.my.API_MYORDERLIST({
						status: that.current,
						page: numPage,
					}).then(res => {
						switch (Number(that.current)) {
							case 0: //订单数据 全部
								that.orderDataALL = that.orderDataALL.concat(res.data.list);
								break;
							case 1: //订单数据 待付款
								that.orderDataPaid = that.orderDataPaid.concat(res.data.list);
								break;
							case 2: //订单数据 待发货
								that.orderDataDelivered = that.orderDataDelivered.concat(res.data.list);
								break;
							case 3: //订单数据 待收货
								that.orderDataReceived = that.orderDataReceived.concat(res.data.list);
								break;
							case 4: //订单数据 已完成
								that.orderDataIsok = that.orderDataIsok.concat(res.data.list);
								break;
						}
						that.numPage = numPage;
					});
				}, 800)
			},


		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background-color: #FFFFFF;
		height: 100%;

		.content_box {

			.box_top {
				height: 76rpx;
			}

			.box_main {
				height: calc(100% - 80rpx);
				padding-bottom: 40rpx;
			}

		}

	}
</style>
