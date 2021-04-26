<template>
	<view class="content_main">

		<u-navbar title="修改昵称" :custom-back="$goback"></u-navbar>

		<view class="content_box">

			<view class="box_item" style="margin-top: 20rpx;">
				<view class="item_line">
					<u-form :model="form" ref="uForm">
						<u-form-item>
							<u-input v-model="form.name" maxlength="20"/>
						</u-form-item>
					</u-form>
				</view>

			</view>

			<view class="box_item">
				<view class="item_title">4-20个字符，可由中英文/数字/下划线组成</view>
				<view class="item_button" @click="getModifyInfo">保存</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					nickname:'',//现在
					name: '', //修改昵称
				}
			}
		},
		onLoad(option) {
			if(option.nickname.length!=0){
				this.form.name=option.nickname;
				this.form.nickname=option.nickname;
			}else{
				this.form.name=""
			}
		},
		methods: {
			
			//获取用户信息
			getModifyInfo() {
				let that = this;
				if(that.form.name.length==0){
					that.$u.toast("昵称不能为空!");
					return
				}
				if(that.form.nickname==that.form.name){
					that.$u.toast("修改昵称不能相同!");
					return
				}
				that.$api.my.API_USERMODIFY({
					nickname:that.form.name
				}).then(res => {
					uni.showToast({
						title: '昵称修改成功!'
					});
					setTimeout(() => {
						that.$goback();
					},1000)
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background-color: #FFFFFF;
		height: 100%;

		.content_box {

			.box_item {
				padding: 0 25rpx;
				
				.item_title{
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #D0CBCF;
					margin-bottom: 64rpx;
					margin-top: 20rpx;
				}
				
				.item_button{
					width: 702rpx;
					height: 66rpx;
					background: #212121;
					text-align: center;
					line-height: 66rpx;
					color: #FFFFFF;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
				}
	
			}

		}

	}
</style>
