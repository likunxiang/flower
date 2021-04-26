<template>
	<view class="content_main">

		<u-navbar title="意见反馈" :custom-back="$goback"></u-navbar>

		<view class="content_box">

			<view class="box_top">

				<view class="top_line top_teShu">
					<view class="line_name">反馈类型</view>
					<view class="line_input">
						<u-input type="text" @click="jumpPage" style="width: 100%;" :border="false"
							v-model="form.feedBack" disabled placeholder="请选择问题类型"
							placeholder-style="font-size: 28rpx;color: #999999;" />
							<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#9B969A"></u-icon>
					</view>
				</view>

				<view class="top_line">
					<view class="line_name">手机号</view>
					<view class="line_input">
						<u-input type="text" maxlength="11" style="width: 100%;" v-model="form.phone" :border="false"
							placeholder="填写手机号码，方便我们与你联系" placeholder-style="font-size: 28rpx;color: #999999;" />
					</view>
				</view>

			</view>

			<view class="box_mian">

				<view class="mian_line">
					<view class="line_name">意见内容</view>
					<view>
						<u-input type="textarea" v-model="form.opinion" height="150" :border="false"
							placeholder="请填写具体的详细内容" placeholder-style="font-size: 28rpx;color: #999999;"
							:auto-height="true" maxlength="200" />
						<view class="line_tops">{{form.opinion.length}}/{{numAll}}</view>
					</view>
				</view>

			</view>

			<view class="box_img">

				<view class="img_line">
					<view class="line_name">上传图片</view>
					<view>
						<u-input type="text" :border="false" placeholder="最多可上传3张图片"
							placeholder-style="font-size: 28rpx;color: #999999;" disabled />
					</view>
				</view>

				<view class="img_png">

					<view class="img_info" v-for="(item,index) in imgData" :key="index">

						<image class="img_color" :src="item"></image>

						<view class="img_tops" @click="deleteImg(index)">
							<u-icon name="stoped" custom-prefix="custom-icon" size="25" color="#F1444D"></u-icon>
						</view>

					</view>

					<view class="img_add" v-if="imgData.length < 3" @click="addImg">
						<u-icon name="camera" custom-prefix="custom-icon" size="36" color="#CCCCCC"></u-icon>
						<view class="img_title">添加图片</view>
					</view>

				</view>

			</view>

		</view>


		<pageBottom title="提交" @footerBtnEvent=""></pageBottom>

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
				phoneModel: uni.getStorageSync('phoneModel'),
				form: {
					feedBack: '', //反馈类型
					phone: '', //手机号
					opinion: '', //意见内容
				},
				numAll: 200, //最大字符
				imgData: [], //图片数据
			}
		},
		onShow() {
			this.form.feedBack = this.$cache('typeName');
		},
		onUnload() {
			this.$cache('typeName', null);
		},
		methods: {

			//添加图片
			addImg() {
				let that = this;
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						tempFilePaths.forEach(item => {
							uni.uploadFile({
								url: 'https://api.xrkmall.com/common/file_upload', //仅为示例，非真实的接口地址
								filePath: item,
								name: 'file',
								formData: {
									'user': 'test'
								},
								success: (uploadFileRes) => {
									let obj = JSON.parse(uploadFileRes.data);
									that.imgData.push(obj.data.src);
								}
							});
						})
					}
				});
			},

			//删除图片
			deleteImg(index) {
				let that = this;
				that.imgData.splice(index, 1);
			},

			//跳转设置
			jumpPage() {
				this.$jumpPage('/settings/opinion/feedType');
			},

		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background-color: #EEEEEE;
		height: 100%;
		width: 100%;

		.content_box {
			width: 100%;

			.box_top {
				height: 180rpx;
				width: 100%;
				padding: 0 30rpx;
				background: #FFFFFF;

				.top_line {
					height: 90rpx;
					display: flex;
					align-items: center;

					.line_name {
						font-size: 28rpx;
						width: 112rpx;
						height: 40rpx;
						color: #333333;
						font-weight: 400;
						margin-right: 32rpx;
					}

					.line_input {
						width: calc(100% - 150rpx);
						height: 100%;
						display: flex;
						align-items: center;
					}

				}

				.top_teShu {
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
				}

			}

			.box_mian {
				height: 335rpx;
				width: 100%;
				background: #FFFFFF;
				margin-top: 16rpx;
				padding: 25rpx 30rpx;

				.mian_line {
					width: 100%;
					height: 100%;

					.line_tops {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #CCCCCC;
						height: 40rpx;
						text-align: right;
					}
					
					::v-deep.u-input__textarea {
						max-height: 150rpx;
					}

					.line_name {
						font-size: 28rpx;
						width: 112rpx;
						height: 40rpx;
						color: #333333;
						font-weight: 400;
						margin-bottom: 24rpx;
					}

				}

			}

			.box_img {
				height: 241rpx;
				width: 100%;
				background: #FFFFFF;
				margin-top: 16rpx;
				padding: 25rpx 30rpx;

				.img_line {
					display: flex;
					align-items: center;
					height: 40rpx;

					.line_name {
						font-size: 28rpx;
						width: 112rpx;
						height: 40rpx;
						color: #333333;
						font-weight: 400;
						margin-right: 32rpx;
					}

				}

				.img_png {
					width: 100%;
					height: 96rpx;
					margin-top: 40rpx;
					display: flex;

					.img_info {
						width: 96rpx;
						height: 96rpx;
						margin-right: 40rpx;
						position: relative;

						.img_tops {
							width: 25rpx;
							height: 25rpx;
							position: absolute;
							top: -15rpx;
							right: -10rpx;
						}

						.img_color {
							width: 96rpx;
							height: 96rpx;
						}

					}

					.img_add {
						width: 96rpx;
						height: 96rpx;
						border: 1rpx solid #EEEEEE;
						text-align: center;
						
						::v-deep.u-icon{
							margin-top: 10rpx;
						}


						.img_title {
							font-size: 18rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #CCCCCC;
						}

					}

				}

			}

		}

		.content_bottom {
			width: 100%;
			height: 100rpx;
			position: absolute;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 26rpx;
			position: fixed;

			.bottom_button {
				width: 702rpx;
				height: 66rpx;
				text-align: center;
				line-height: 66rpx;
				text-align: center;
				border: 1rpx solid #000000;
				background: #000000;
				color: #FFFFFF;
			}

		}

	}
</style>
