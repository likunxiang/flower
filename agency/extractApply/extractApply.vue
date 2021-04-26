<template>
	<view class="page">
		<view class="extract_input_box">
			<view class="title">
				提现金额(元)
			</view>
			<view class="input_box">
				<view class="left">
					<view class="icon">￥</view>
					<input class="input" type="number" :value="extValue" placeholder="可提现3,045,600.00 "
						placeholder-style="color: #CCCCCC;" @input="inputExt" />
				</view>
				<view class="right" @click="allIn">全部</view>
			</view>
		</view>

		<view class="main">
			<view class="extract_way">
				<view class="title">提现方法</view>
				<view class="answer">银行卡</view>
			</view>
			<view class="bank_card">
				<view class="title">选择银行卡</view>
				<view class="answer" @click="jumpPage">
					<image class="bank_logo"></image>
					<view class="bank_name">{{cardInfo.bank_name?cardInfo.bank_name:'前往选择银行卡'}}</view>
					<u-icon class="icon_jinru" name="rightBack" custom-prefix="custom-icon" size="24" color="#212121"></u-icon>
				</view>
			</view>
			
			<view class="btn_tip">
				<view class="btn" v-if="extValue > 0">确认提现</view>
				<view class="btn btn_disable" v-else>确认提现</view>
				<view class="tips">
					<view class="tips_item">1、提现最低金额10元起；</view>
					<view class="tips_item">2、提现后金额将打到您的银行卡，请确认添加的银行卡的姓名与卡号持有人姓名一致，以免造成损失</view>
					<view class="tips_item">3、提现卡需为储蓄卡；</view>
					<view class="tips_item">4、提现单笔手续费为1.5元</view>
					<view class="tips_item">5、金额到账时间为T+1，次日到账（遇节假日顺延），实际到账时间以银行打款时间为准</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bankList: [{
					logo: '../../../static/images/member/extract/bank_logo_1.png',
					name: '工商银行',
					id: 0
				}, {
					logo: '../../../static/images/member/extract/bank_logo_1.png',
					name: '农业银行',
					id: 1
				}, {
					logo: '../../../static/images/member/extract/bank_logo_1.png',
					name: '建设银行',
					id: 2
				}],
				bankIndex: 0,
				extValue: '',
				maxExt: 30000,
				cardInfo:'',//银行卡数据
				
			};
		},
		onShow(){
			if(this.$cache('cardInfo')){
				this.cardInfo=JSON.parse(this.$cache('cardInfo'));
				this.$cache('cardInfo',null)
			}
		},
		methods: {
			
			//跳转选择设置
			jumpPage() {
				let that = this;
				that.$jumpPage('/settings/bank/bankCardList', {
					typePage: 1
				});
			},
			
			inputExt(e) {
				this.extValue = e.detail.value;
			},
			allIn() {
				this.extValue = this.maxExt;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;

		.page {
			background: #EEEEEE;
			padding-top: 1rpx;

			.extract_input_box {
				background: #FFFFFF;
				padding: 40rpx;
				margin-bottom: 16rpx;

				.title {
					font-size: 22rpx;
					color: #666666;
					margin-bottom: 36rpx;
				}

				.input_box {
					display: flex;
					
					.left {
						flex-grow: 1;
						display: flex;
						align-items: center;

						.icon {
							flex-grow: 0;
							font-size: 30rpx;
							color: #333333;
							font-weight: 600;
							margin-right: 16rpx;
						}

						.input {
							flex-grow: 1;
							height: 50rpx;
							font-size: 36rpx;

						}
					}

					.right {
						flex-grow: 0;
						flex-shrink: 0;
						font-size: 22rpx;
						font-weight: 500;
						margin-top: 10rpx;
						color: #2995E6;
					}
				}
			}

			.main {
				.extract_way {
					display: flex;
					justify-content: space-between;
					padding: 24rpx 40rpx;
					font-size: 28rpx;
					color: #333333;
					background: #FFFFFF;
					margin-bottom: 1rpx;
				}

				.bank_card {
					display: flex;
					justify-content: space-between;
					padding: 24rpx 40rpx;
					padding-right: 24rpx;
					font-size: 28rpx;
					color: #333333;
					background: #FFFFFF;
					margin-bottom: 1rpx;

					.answer {
						display: flex;
						align-items: center;

						.bank_logo {
							width: 36rpx;
							height: 36rpx;
							margin-right: 16rpx;
						}

						.bank_name {
							margin-right: 24rpx;
						}

						.icon_jinru {
							width: 24rpx;
							height: 24rpx;
						}
					}
				}
			
				.btn_tip {
					background: #FFFFFF;
					padding: 24rpx;
					padding-top: 80rpx;
					.btn {
						width: 702rpx;
						height: 66rpx;
						line-height: 66rpx;
						text-align: center;
						background: #212121;
						font-size: 24rpx;
						color: #FFFFFF;
						margin-bottom: 38rpx;
					}
					.btn_disable {
						background: #CCCCCC;
					}
					.tips {
						padding: 0 16rpx;
						font-size: 24rpx;
						color: #999999;
						line-height: 50rpx;
						text-align: justify;
					}
				}
			}
		}
	}
</style>
