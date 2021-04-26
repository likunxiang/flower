<template>
	<view class="">
		<u-popup v-model="shareShow" mode="bottom" width="100%" height="100%">
			<view class="content_main">


				<view class="content_box">

					<view class="box_img" @click="chooseImage" v-if="false">
						<image :src="shareImg"></image>
					</view>
					<view class="box_img" v-else>
						<canvas canvas-id="firstCanvas" id="firstCanvas" style="width: 100%;height: 100%;"></canvas>
					</view>

				</view>

				<view class="content_bottom" :class="{'content_bottom_x': phoneModel}">

					<view class="bottom_img">

						<button open-type="share" class="block_line_botton">
							<image class="image" src="/static/images/share_weChat.png"></image>
							<view class="name_title">微信</view>
						</button>

						<view class="block_line" @click="preservation">
							<image class="image" src="/static/images/share_save.png"></image>
							<view class="name_title">保存到相册</view>
						</view>

						<!-- <view class="block_line">
							<image class="image" src="/static/images/share_moment.png"></image>
							<view class="name_title">朋友圈</view>
						</view> -->

					</view>

					<view class="bottom_button" @click="closeShare">取消</view>

				</view>

			</view>
		</u-popup>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				shareShow: false,
				phoneModel: uni.getStorageSync('phoneModel'),
				userInfo: {}
			}
		},
		props: {
			shareImgUrl: {
				type: String,
				default: ''
			},
			// canvas
			shareData: {
				type: Object,
				default: res => {
					return {}
				}
			}
		},
		computed: {
			shareImg() {
				return this.shareImgUrl;
			}
		},
		mounted() {
			this.userInfo = this.user
			this.drawPic()
		},
		methods: {

			closeShare() {
				this.shareShow = false;
			},
			openShare() {
				this.shareShow = true;
			},
			//保存到相册
			preservation() {
				let that = this;
				if (false) {
					uni.downloadFile({
						url: that.shareImg,
						success: (res) => {
							if (res.statusCode === 200) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										uni.showToast({
											title: "保存成功",
										});
									},
									fail: function() {
										uni.showToast({
											title: "保存失败，请稍后重试",
											icon: "none"
										});
									}
								});
							}
						}
					})
				} else {
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						canvasId: 'firstCanvas',
						success: (image) => {
							uni.saveImageToPhotosAlbum({
								filePath: image.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});
						},
						fail: (res) => {
						}
					}, that)
				}

			},

			//保存图片
			chooseImage() {
				let urlImg = decodeURIComponent(this.shareImg);
				uni.previewImage({
					count: 1,
					urls: [urlImg],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							uni.saveImageToPhotosAlbum({
								filePath: data.path,
								success: function() {
								}
							});
						},
						fail: function(err) {
						}
					},
					success: (res) => {
					},
					fail: (res) => {
					}
				});
			},
			drawPic() {
				this.ctx = uni.createCanvasContext('firstCanvas', this);

				let info = uni.getSystemInfoSync()
				const pixelRatio = info.pixelRatio // 屏幕像素密度

				let ctx = this.ctx
				let shareBg = '/static/images/share_bg.png'
				// 画背景图
				uni.getImageInfo({
					src: shareBg,
					success: (res) => {

						ctx.drawImage('/' + res.path, 0, 0, uni.upx2px(628), uni.upx2px(958))
						// 用户头像
						ctx.save(); // 先保存状态 已便于画完圆再用
						ctx.arc(uni.upx2px(76), uni.upx2px(76), uni.upx2px(32), 0, 2 * Math.PI)
						ctx.setFillStyle('#EEEEEE')
						ctx.fill()
						ctx.clip(); //画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内

						ctx.draw(true)
						uni.getImageInfo({
							src: this.userInfo.avatar || this.shareData.image,
							success: (res) => {
								ctx.drawImage(res.path, uni.upx2px(44), uni.upx2px(44), uni
									.upx2px(64), uni.upx2px(64))
								ctx.restore();
								//用户名字和描述
								ctx.setTextBaseline('top')
								ctx.setFillStyle('#FFFFFF')
								ctx.setFontSize(uni.upx2px(24))
								ctx.fillText(this.userInfo.nickname, uni.upx2px(124), uni.upx2px(
									46))
								ctx.draw(true)
								ctx.setFillStyle('#FFFFFF')
								ctx.setTextBaseline('top')
								ctx.setFontSize(uni.upx2px(18))
								ctx.fillText('给你分享好物', uni.upx2px(124), uni.upx2px(90))
								ctx.draw(true)
								// 展示图片
								let image =
									this.shareData.image
								uni.getImageInfo({
									src: image,
									success: (res) => {
										ctx.drawImage(res.path, uni.upx2px(44), uni
											.upx2px(134), uni
											.upx2px(540), uni.upx2px(540))
										ctx.draw(true)
										// 商品名或者描述
										let shareName = this.shareData.shareName
										let shareNameWidth = ctx.measureText(shareName)
											.width
										if (shareNameWidth + 20 > uni.upx2px(540)) {
											// 第一行商品名
											let shareName1 = shareName.slice(0, 20)
											ctx.setTextBaseline('top')
											ctx.setFontSize(uni.upx2px(28))
											ctx.fillText(shareName1, uni.upx2px(44),
												uni.upx2px(690))
											ctx.setFillStyle('#FFFFFF')
											ctx.draw(true)
											// 第二行商品名
											let shareName2 = shareName.slice(21)

											let shareNameWidth2 = ctx.measureText(
												shareName2).width
											if (shareNameWidth2 + 20 > uni.upx2px(
												540)) {
												shareName2 = shareName2.slice(0, 15) +
													'...'
												ctx.setTextBaseline('top')
												ctx.setFontSize(uni.upx2px(28))
												ctx.fillText(shareName2, uni.upx2px(
													44), uni.upx2px(730))
												ctx.setFillStyle('#FFFFFF')
												ctx.draw(true)
											}
										} else {
											ctx.setTextBaseline('top')
											ctx.setFontSize(uni.upx2px(28))
											ctx.fillText(shareName, uni.upx2px(44), uni
												.upx2px(690))
											ctx.setFillStyle('#FFFFFF')
											ctx.draw(true)
										}


										// 价格
										let price = this.shareData.price
										ctx.setFillStyle('#F7DE9D')
										ctx.setTextBaseline('top')
										ctx.setFontSize(uni.upx2px(28))
										ctx.fillText('￥' + price, uni.upx2px(44), uni
											.upx2px(786))
										ctx.draw(true)
										// 计算宽度
										let priceWidth = ctx.measureText('￥' + price)
											.width
										// 原价
										let oldPrice = this.shareData.oldPrice
										ctx.setFillStyle('#999999')
										ctx.setTextBaseline('top')
										ctx.setFontSize(uni.upx2px(24))
										ctx.fillText('￥' + oldPrice, uni.upx2px(16 +
											44) + priceWidth, uni.upx2px(
											795))
										ctx.draw(true)
										ctx.beginPath()
										ctx.setStrokeStyle('#999999') // 线条颜色
										ctx.moveTo(uni.upx2px(16 + 44) + priceWidth,
											uni.upx2px(795 + 10))

										// 计算宽度
										let oldPriceWidth = ctx.measureText('￥' +
											oldPrice).width

										ctx.lineTo(uni.upx2px(16 + 44) + priceWidth +
											oldPriceWidth, uni
											.upx2px(795 + 10))
										ctx.stroke(true)
										ctx.draw(true)

										// 绘制二维码
										let qrcode = '/static/images/qrcode.png'
										uni.getImageInfo({
											src: qrcode,
											success: (res) => {

												ctx.drawImage('/' + res
													.path, uni.upx2px(
														479),
													uni.upx2px(786),
													uni.upx2px(99), uni
													.upx2px(99))
												ctx.draw(true)
											},
											fail: (res) => {
											}
										})
									}
								})
							}
						})


					}
				})

			},



		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background: rgba(0, 0, 0, 0.85);
		height: 100%;

		.content_box {
			padding: 48rpx 61rpx 27rpx;

			.box_img {
				width: 100%;
				height: 964rpx;

				image {
					width: 100%;
					height: 100%;
				}

			}

		}

		.content_bottom {
			width: 100%;
			height: 261rpx;
			position: absolute;
			bottom: 0;
			position: fixed;
			background: #333333;

			.bottom_img {
				height: 163rpx;
				border-bottom: 1rpx solid rgba(255, 255, 255, 0.3);
				width: 100%;
				padding: 0 91rpx;
				display: flex;

				.block_line_botton {
					flex: 1;
					height: 164rpx;
					line-height: 1.4;
					background: transparent;
					padding-left: 0;
					padding-right: 0;
					overflow: visible;

					.image {
						display: block;
						width: 72rpx;
						height: 72rpx;
						margin: 31rpx auto 12rpx;
					}

					.name_title {
						text-align: center;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}
				}

				.block_line_botton::after {
					border: none;
				}

				.block_line {
					flex: 1;
					height: 164rpx;
					align-items: center;

					.image {
						display: block;
						width: 72rpx;
						height: 72rpx;
						margin: 31rpx auto 12rpx;
					}

					.name_title {
						text-align: center;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}

				}

			}

			.bottom_button {
				height: 98rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}

		}

		.content_bottom_x {
			height: 300rpx;
		}

	}
</style>
