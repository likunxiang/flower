<template>
	<view class="pc_in">
		<view class="pc_on">
			<view :class="'g_hx ' + (index < smsCodeLength - 1?'mr_30 ':'') + (smsCode[index]?'':'g_hx_gray')" v-for="(item,index) in smsCodeLength" :key="index">{{smsCode[index]}}</view>
		</view>
		<view class="pp">
			<input :maxlength="smsCodeLength" :focus="isFocus" class="input" @input="change" :value="smsCode" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isFocus: true
			}
		},
		props: {
			// 输入内容
			smsCode: {
				type: String,
				default: ''
			},
			// 输入长度
			smsCodeLength: {
				type: Number,
				default: 4
			},
		},
		methods: {
			change(e) {
				let smsCode = e.detail.value;
				this.$emit('changeSmsCode',smsCode); // 触发父组件 输入值改变
				if (smsCode.length >= this.smsCodeLength) {
					this.isFocus = false;
					this.$emit('loginSuccess'); // 触发父组件 输入完成回调
				};
				
			},
		}
	}
</script>

<style scoped lang="scss">
	.pc_in {
		position: relative;
		height: 90rpx;
		line-height: 90rpx;
		.pc_on {
			display: flex;
			height: 90rpx;
			line-height: 90rpx;
			.mr_30 {
				margin-right: 30rpx;
			}
			.g_hx {
				flex: 1;
				border: 1rpx solid #212121;
				text-align: center;
			}
			.g_hx_gray {
				border: 1rpx solid #CCCCCC;
			}
		}
		.pp {
			position: absolute;
			height: 90rpx;
			line-height: 90rpx;
			width: 100%;
			top: 0;
			left: 0;
			background: none;
			overflow: hidden;
			.input {
				font-family: '';
				font-size: 30rpx;
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				background: none;
				text-align: left;
				text-indent: 34rpx;
				opacity: 0;
				padding-left:1000px;
				ovflow:hidden;
			}
		}
		
	}
</style>
