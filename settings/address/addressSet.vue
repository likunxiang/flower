<template>
	<view class="content_main">

		<u-navbar title="地址管理" :custom-back="$goback"></u-navbar>
		

		<view class="content_box" v-if="addressData.length!=0">

			<addressNews :addressData="addressData" :addressId="addressId" :typePage="typePage" @refresh="deleteInfo"></addressNews>

		</view>
		
		
		<pageBottom title="添加地址" @footerBtnEvent="jumpPage" v-if="addressData.length !=0" location="fixed" backGround="#FFFFFF"></pageBottom>
		
		
		<view class="content_img" v-else :style="'height: calc(100vh  - ' + heightInfo + 'px)'">
		
			<view class="img_png">
				<image src="/settings/static/address.png"></image>
				<view class="img_title">留个地址，说不定有惊喜</view>
				<view class="img_address">
					<view class="add_button" @click="jumpPage(2)">添加地址</view>
				</view>
			</view>
		
		
		</view>

	</view>
</template>

<script>
	import addressNews from '@/settings/components/address/address_news.vue';
	import pageBottom from '@/component/common/pageFooter.vue';
	export default {
		components:{
			addressNews,
			pageBottom
		},
		data() {
			return {
				heightInfo:'',//顶部栏高度
				phoneModel: uni.getStorageSync('phoneModel'),
				addressData:[],//获取地址数据
				typePage:0,//判断那个页面过来
				addressId:'',
			}
		},
		onShow(){
			this.getAddressInfo();
		},
		onLoad(option) {
			this.typePage=option.typePage;
			if(option.addressId !=undefined){
				this.addressId=option.addressId;
			}
			this.typePage=option.typePage;
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getAddressInfo();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			
			//获取收货地址-列表
			getAddressInfo() {
				let that = this;
				uni.showLoading({
					title: '拼命加载中',
					mask: true
				});
				that.$api.my.API_ADDRESSINDEX().then(res => {
					that.addressData=res.data.list;
					uni.hideLoading();
				});
			},
			
			//删除地址
			deleteInfo(index){
				let that=this;
				that.addressData.splice(index, 1);
			},
			
			
			//跳转新增地址
			jumpPage() {
				this.$jumpPage('/settings/address/addAddress');
			},

		}
	}
</script>

<style lang="scss">
	page{
		background: #EEEEEE;
	}
	.content_main {
		background: #EEEEEE;
		min-height: 100%;
		position: relative;

		.content_box {
			padding-bottom: 180rpx;
		}
		
		
		.content_img {
			width: 100%;
			display: flex;
			justify-items: center;
			align-items: center;
			background: #FFFFFF;
		
			.img_png {
				width: 100%;
				text-align: center;
		
				image {
					width: 160rpx;
					height: 160rpx;
		
				}
		
				.img_title {
					width: 100%;
					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					margin: 0 auto;
					margin-top: 80rpx;
				}
		
		
				.img_address {
					width: 100%;
					margin-top: 80rpx;
		
		
					.add_button {
						height: 66rpx;
						background: #FFFFFF;
						border: 1px solid #212121;
						text-align: center;
						line-height: 66rpx;
						width: 230rpx;
						color: #333333;
						font-size: 24rpx;
						margin: 0 auto;
					}
		
				}
		
			}
		
		
		
		
		
		}

	}
</style>
