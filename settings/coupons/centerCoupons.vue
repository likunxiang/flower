<template>
	<view class="content_main">

		<u-navbar title="领劵中心" :custom-back="$goback"></u-navbar>
		
		<view class="content_box" :style="couponsDataIsOk?'padding-bottom: 80rpx':'height: calc(100vh - ' + heightInfo + 'px);'">
			<couponsNews :couponsData="couponsData" :typePage="typePage" @refresh="getCouponsList" @changeCheckd="changeCheckd"></couponsNews>
		</view>
		
	</view>
</template>

<script>
	import couponsNews from '@/component/my/coupons/coupons_news.vue'
	export default {
		components:{
			couponsNews,
		},
		data() {
			return {
				heightInfo:'',//标题栏高度
				couponsData:[],//劵数据
				typePage:'',//判断跳转页面
				pageNum:1,//分页
				couponsDataIsOk:true,//判断有无数据 高的大小
			}
		},
		onLoad(option) {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.typePage = option.typePage;//判断 2
			this.getCouponsList();
		},
		onReachBottom() {
			this.loadMore();
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getCouponsList();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			
			//获取优惠券列表
			getCouponsList(){
				let that=this;
				uni.showLoading({
					title: '拼命加载中',
					mask: true
				});
				that.$api.my.API_COUPONLIST({
					page:1,
				}).then(res => {
					that.couponsData=res.data.coupon_list;
					that.couponsDataIsOk=res.data.coupon_list.length !=0?true:false;
					that.couponsData.forEach(item=>{
						that.$set(item, 'openCheckd', false);
					})
					uni.hideLoading();
				});
			},
			
			//点击展开关闭
			changeCheckd(index){
				let that=this;
				that.couponsData[index].openCheckd = ! that.couponsData[index].openCheckd;
			},
			
			//滚动到底部请求
			loadMore() {
				let that = this;
				// 模拟请求成功后的回调
				setTimeout(() => {
					let pageNum = that.pageNum + 1;
					that.$api.my.API_COUPONLIST({
						page: pageNum,
					}).then(res => {
						that.couponsData = that.couponsData.concat(res.data.coupon_list);
						that.pageNum = pageNum;
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
		height: 100%;

		.content_box {
			width: 100%;
		}
	}
</style>
