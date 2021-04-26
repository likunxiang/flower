<template>
	<view class="content_main">

		<u-navbar title="实名认证" :custom-back="$goback"></u-navbar>

		<view class="content_box">

			<view class="box_img">

				<view class="img_info">
					<view class="info_title">添加身份证正面（国徽）</view>
					<view class="info_add" @click="callInfo(1)">
						<image src="/settings/static/settings_realname.png" v-if="imgSrcTwo.length==0"></image>
						<image :src="imgSrcTwo" v-else></image>
					</view>
				</view>
				
				<view class="img_info">
					<view class="info_title">添加身份证反面（人像）</view>
					<view class="info_add" @click="callInfo(0)">
						<image src="/settings/static/settings_realname.png" v-if="imgSrcOne.length==0"></image>
						<image :src="imgSrcOne" v-else></image>
					</view>
				</view>

			</view>

			<view class="box_block">

				<view class="block_line" style="border-top:1rpx solid rgba(0, 0, 0, 0.1)">
					<view class="line_name">姓名</view>
					<view>{{resp.Name}}</view>
				</view>

				<view class="block_line">
					<view class="line_name">证件号码</view>
					<view>{{resp.IdNum}}</view>
				</view>

			</view>

		</view>
		
		<pageBottom title="保存" @footerBtnEvent="submitInfo"></pageBottom>

	</view>
</template>

<script>
	import pageBottom from '@/component/common/pageFooter.vue';
	export default {
		components:{
			pageBottom
		},
		data() {
			return {
				heightInfo: '', //标题栏高度
				phoneModel: uni.getStorageSync('phoneModel'),
				imgSrcOne: "", //正面
				imgSrcTwo: "", //反面
				resp: {
					Name: "", //姓名
					Sex: "", //性别
					Nation: "", //民族
					Birth: "", //出生日期
					Address: "", //地址
					IdNum: "", //名族
					Authority: "", //发证机关
					ValidDate: "", //有效期
					AdvancedInfo: "",
					RequestId: ""
				},
			}
		},
		onLoad() {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
		},
		methods: {

			//调用传图片
			callInfo(val) {
				let that = this;
				switch (val) {
					case 0:
						uni.chooseImage({
							count: 1, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album'], //从相册选择
							success: (chooseImageRes) => {
								const tempFilePaths = chooseImageRes.tempFilePaths;
								uni.uploadFile({
									url: 'https://api.xrkmall.com/common/file_upload', //仅为示例，非真实的接口地址
									filePath: tempFilePaths[0],
									name: 'file',
									formData: {
										'user': 'test'
									},
									success: (uploadFileRes) => {
										let obj = JSON.parse(uploadFileRes.data);
										that.imgSrcOne = obj.data.src;
										that.getUserCard()
									}
								});
							}
						});
						break;
					case 1:
						uni.chooseImage({
							count: 1, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album'], //从相册选择
							success: (chooseImageRes) => {
								const tempFilePaths = chooseImageRes.tempFilePaths;
								uni.uploadFile({
									url: 'https://api.xrkmall.com/common/file_upload', //仅为示例，非真实的接口地址
									filePath: tempFilePaths[0],
									name: 'file',
									formData: {
										'user': 'test'
									},
									success: (uploadFileRes) => {
										let obj = JSON.parse(uploadFileRes.data);
										that.imgSrcTwo = obj.data.src;
									}
								});
							}
						});
						break;
				}
			},

			//获取实名认证校验
			getUserCard() {
				let that = this;
				that.$api.my.API_MYORCIDCARD({
					ImageUrl: that.imgSrcOne
				}).then(res => {
					that.resp = res.data.resp;
				});
			},

			//提交实名
			submitInfo() {
				let that = this;
				if (that.imgSrcOne.length == 0) {
					that.$u.toast("请先上传身份证正面照片!");
					return
				}
				if (that.imgSrcTwo.length == 0) {
					that.$u.toast("请先上传身份证反面照片!");
					return
				}
				that.$api.my.API_MYCARDSUBMIT({
					name: that.resp.Name, //姓名
					nation: that.resp.Nation, //民族
					sex: that.resp.Sex, //性别
					idnum: that.resp.IdNum, //身份证号
					birth: that.resp.Birth, //生日
					address: that.resp.Address, //住址
					front_side_image: that.imgSrcOne, //身份证正面
					authority: that.resp.Authority, //发证机关
					valid_date: that.resp.ValidDate, //证件有效期
					back_side_image: that.imgSrcTwo, //身份证反面
				}).then(res => {
					uni.showToast({
						title: '保存成功!'
					});
					setTimeout(function() {
						that.$jumpPage('/pages/my/index', '', 'pushTab');
					}, 1000);
				});
			},

		}
	}
</script>

<style lang="scss">
	.content_main {
		background: #FFFFFF;
		height: 100%;
		position: relative;

		.content_box {

			.box_img {
				padding: 36rpx 24rpx 0 24px;

				.img_info {
					align-items: center;

					.info_title {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						margin-bottom: 35rpx;
					}

					.info_add {
						display: flex;
						justify-content: center;
						margin-bottom: 35rpx;

						image {
							width: 450rpx;
							height: 284rpx;
						}
					}



				}

			}

			.box_block {

				.block_line {
					height: 97rpx;
					display: flex;
					align-items: center;
					padding: 35rpx 25rpx;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

					.line_name {
						width: 150rpx;
					}

				}

			}
		}
	}
</style>
