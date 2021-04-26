<template>
	<view class="content_main">

		<u-navbar title="银行卡列表" :custom-back="$goback"></u-navbar>

		<view class="content_box" v-if="cardData.length !=0">

			<view class="block_info" v-for="(item,index) in cardData" :key="index">

				<view class="info_img">
					<image src="/settings/static/bank_nongye.png" v-if="item.bank_code=='ABC'"></image>
					<image src="/settings/static/bank_gongshang.png" v-else-if="item.bank_code=='CBC'"></image>
					<image src="/settings/static/bank_jianse.png" v-else-if="item.bank_code=='CCB'"></image>
					<image src="/settings/static/bank_zhongguo.png" v-else-if="item.bank_code=='BOC'"></image>
				</view>

				<view class="info_name">{{item.bank_name}}</view>

				<view class="info_num">{{item.bank_account_format1}}</view>

				<view class="info_click" v-if="typePage==1">
					<u-checkbox v-model="item.checked" shape="circle" size="24" @change="changeClick"></u-checkbox>
				</view>

			</view>

			<view class="block_info" @click="jumpPage">

				<view class="info_img" style="background: #FFFFFF;">
					<u-icon name="bankcard" custom-prefix="custom-icon" size="64"></u-icon>
				</view>

				<view class="info_name info_teShu">添加新的银行卡 <u-icon name="rightBack" custom-prefix="custom-icon" size="20" color="#CCCCCC"></u-icon>
				</view>

			</view>

		</view>
		
		<view class="content_box" v-else :style="phoneModel=='iPhone X'?'height: calc(100vh - ' + heightInfo + 'px);background: #FFFFFF;padding-bottom: 0;':'height: calc(100vh - 50rpx - ' + heightInfo + 'px);background: #FFFFFF;padding-bottom: 0;'">
		
			<view class="order_img">
		
				<view class="img_png">
					<image src="/settings/static/settings_bankcard.png"></image>
					<view class="img_title">购物怎能没有银行卡</view>
					<view class="img_address">
						<view class="add_button" @click="jumpPage">添加银行卡</view>
					</view>
				</view>
		
		
			</view>
		
		</view>
		
		<pageBottom title="确定" @footerBtnEvent="selectCard" v-if="cardData.length !=0&&typePage==1"></pageBottom>


	</view>
</template>

<script>
	import pageBottom from '@/component/common/pageFooter.vue';
	export default {
		components: {
			pageBottom
		},
		data() {
			return {
				heightInfo: '', //标题栏高度
				typePage:'',//判断哪个跳转页面过来
				phoneModel: uni.getStorageSync('phoneModel'),
				cardData: [], //银行卡数据
			}
		},
		onShow(){
			this.getCardDetail();
		},
		onLoad(option) {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.typePage = option.typePage;
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getCardDetail();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			
			//获取银行卡列表
			getCardDetail() {
				let that = this;
				that.$api.my.API_MYBANKCARDLIST().then(res => {
					that.cardData = res.data.list;
					that.cardData.forEach(item=>{
						this.$set(item, 'checked', false);
					})
				});
			},
			
			//选择银行卡
			changeClick(e) {
				let that = this;
				that.cardData.forEach(item => {
					item.checked = false;
				})
				if (e.checked) {
					e.checked = true;
				} else {
					e.checked = false;
				}
			},
			
			//确定选择银行卡
			selectCard(){
				let that = this;
				let obj={};
				that.cardData.forEach(item => {
					if(item.checked){
						obj=item;
					}
				})
				if(obj.length==0){
					that.$u.toast("请选择银行卡!");
					return
				}else{
					that.$cache('cardInfo', JSON.stringify(obj));
					that.$goback();
				}
			},
			
			
			//跳转新增银行卡
			jumpPage(val) {
				this.$jumpPage('/settings/bank/addBankCard');
			},

		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}

	.content_main {
		background: #EEEEEE;
		min-height: 100%;

		.content_box {
			padding-bottom: 150rpx;
			padding-top: 8rpx;

			.block_info:nth-child(1) {
				margin-top: 0;
			}

			.block_info {
				height: 120rpx;
				background: #FFFFFF;
				margin-top: 8rpx;
				padding: 0 40rpx;
				display: flex;
				align-items: center;

				.info_img {
					width: 64rpx;
					height: 64rpx;
					margin-left: 20rpx;
				}

				.info_name {
					margin-left: 24rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					
					::v-deep.u-icon{
						margin-right: 20rpx;
					}

				}

				.info_teShu {
					width: calc(100% - 84rpx);
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.info_num {
					margin-left: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.info_click {
					margin-left: 40rpx;

					::v-deep.u-checkbox {
						width: 30rpx;
					}

				}

			}

			.order_img {
				width: 100%;
				height: 100%;
				display: flex;
				justify-items: center;
				align-items: center;

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

	}
</style>
