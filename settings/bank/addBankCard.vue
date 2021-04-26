<template>
	<view class="content_main">

		<u-navbar title="新增银行卡" :custom-back="$goback"></u-navbar>

		<view class="content_box">

			<view class="block_info">

				<view class="info_content">

					<view class="content_name">发卡行</view>

					<view class="content_input">
						<u-input type="text" @click="showCard = true" v-model="cardInfo.cardName" :border="false" placeholder="请选择发卡银行" placeholder-style="font-size: 28rpx;color: #999999;"
						 disabled />
					</view>

					<u-select v-model="showCard" :list="listCard" @confirm="changeCard"></u-select>

				</view>

				<view class="info_content">

					<view class="content_name">卡号</view>

					<view class="content_input">
						<u-input type="text" v-model="cardInfo.cardNumber" :border="false" placeholder="请输入银行卡号（仅支持储蓄卡)" placeholder-style="font-size: 28rpx;color: #999999;" maxlength="20"/>
					</view>

				</view>

				<view class="info_content">

					<view class="content_name">持卡人</view>

					<view class="content_input">
						<u-input type="text" v-model="cardInfo.cardPeo" :border="false" placeholder="请输入持卡人姓名" placeholder-style="font-size: 28rpx;color: #999999;"/>
					</view>

				</view>

				<view class="info_content">

					<view class="content_name">身份证</view>

					<view class="content_input">
						<u-input type="text" v-model="cardInfo.cardId" :border="false" placeholder="请输入持卡人身份证号码" placeholder-style="font-size: 28rpx;color: #999999;"/>
					</view>

				</view>

				<view class="info_content">

					<view class="content_name">手机号</view>

					<view class="content_input">
						<u-input type="text" v-model="cardInfo.cardTel" :border="false" placeholder="请输入银行预留手机号码" placeholder-style="font-size: 28rpx;color: #999999;" maxlength="11"/>
					</view>

				</view>

			</view>

			<view class="block_title">*仅支持储蓄卡，暂不支持信用卡</view>

		</view>
		
		<pageBottom title="保存" @footerBtnEvent="submitInfo"></pageBottom>


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
				phoneModel: uni.getStorageSync('phoneModel'),
				showCard: false, //发卡行
				listCard: [], //卡数据
				cardInfo: {
					cardName:'',//发卡行
					cardType:'',//发卡标识
					cardNumber:'',//卡号
					cardPeo:'',//持卡人
					cardId:'',//身份证
					cardTel:'',//手机号
				}, //银行卡数据
			}
		},
		onShow(){
			
		},
		onLoad() {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.getCardInfo();
		},
		methods: {
			
			//获取银行类型
			getCardInfo() {
				let that = this;
				that.$api.my.API_MYBANKLIST().then(res => {
					that.listCard=res.data;
					that.listCard.forEach(item=>{
						this.$set(item, 'value', item.type);
						this.$set(item, 'label', item.name);
					})
				});
			},
			
			//选择银行卡
			changeCard(e){
				let that=this;
				that.cardInfo.cardName=e[0].label;//发卡行
				that.cardInfo.cardType=e[0].value;//卡标识
			},
			
			//提交银行卡 手机号验证
			submitInfo(){
				let that=this;
				if(that.cardInfo.cardName.length==0){
					that.$u.toast("发卡行不能为空!");
					return
				}
				if(that.cardInfo.cardNumber.length==0){
					that.$u.toast("卡号不能为空!");
					return
				}
				if(that.cardInfo.cardPeo.length==0){
					that.$u.toast("持卡人不能为空!");
					return
				}
				if(that.cardInfo.cardId.length==0){
					that.$u.toast("身份证不能为空!");
					return
				}
				if(that.cardInfo.cardTel.length==0){
					that.$u.toast("手机号不能为空!");
					return
				}
				that.$jumpPage('/settings/bank/phoneTest',{
					phone:that.cardInfo.cardTel
				});
			},
			
			//创建银行卡
			addBankList(){
				let that=this;
				uni.showLoading({
					title: '拼命加载中',
					mask: true
				});
				that.$api.my.API_MYBANKLISTADD({
					bank_name: that.cardInfo.cardName,//银行名称
					bank_account: that.cardInfo.cardNumber,//银行卡号
					bank_code: that.cardInfo.cardType,//银行标识
					id_card:that.cardInfo.cardId,//身份证
					phone:that.cardInfo.cardTel,//手机号
					bank_username:that.cardInfo.cardPeo//持卡人
				}).then(res => {
					uni.hideLoading();
					uni.showToast({
						title: '添加银行卡成功!',
						duration:2000
					});
					setTimeout(() => {
						that.$goback();
					}, 800)
				});
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

			.block_info {
				height: 450rpx;
				background: #FFFFFF;
				padding: 0 30rpx;
				width: 100%;

				.info_content {
					height: 90rpx;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					width: 100%;
					display: flex;
					align-items: center;

					.content_name {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						margin-left: 30rpx;
						width: 85rpx;
					}

					.content_input {
						margin-left: 60rpx;
						width: calc(100% - 200rpx);
					}

				}

				.info_content:nth-child(5) {
					border-bottom: 0;
				}

			}

			.block_title {
				padding: 46rpx 63rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #E76234;
			}
		}

	}
</style>
