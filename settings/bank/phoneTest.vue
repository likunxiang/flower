<template>
	<view class="content_main">

		<u-navbar title="验证手机号" :custom-back="$goback"></u-navbar>

		<view class="content_box">
			
			<view class="name_title">为保证您的账号安全，</view>
			
			<view class="name_title">绑定银行卡前需先进行手机号验证</view>
			
			<view class="name_title">我们已向您的手机号 {{phone}}  发送了一条验证码</view>
			
			<view class="name_title">验证通过后将继续绑定新银行卡</view>
			
			<view class="name_input">
				<u-input style="width: 100%;" v-model="phoneCode" type="number" :border="false" placeholder="请输入验证码"/>
			</view>


			
		</view>
		
		<pageBottom title="下一步" @footerBtnEvent="sumbit"></pageBottom>


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
				phone:'18623****88',//手机号
				phoneCode:'',//验证码
			}
		},
		onLoad(option) {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.phone=option.phone;
		},
		methods: {
			
			//提交下一步
			sumbit(){
				let that=this;
				if(that.phoneCode.length==0){
					that.$u.toast("验证码不能为空");
					return
				}
				that.$goback();
				this.$cache('phoneCode', that.phoneCode);
			}

		}
	}
</script>

<style lang="scss">
	.content_main {
		background: #FFFFFF;
		min-height: 100%;

		.content_box {
			padding: 60rpx 60rpx;
			
			.name_title{
				font-size: 22rpx;
				color: #666666;
				margin-bottom: 10rpx;
			}
			
			.name_input{
				height: 100rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.3);
				margin-top: 40rpx;
				
			}
		}

	}
</style>
