<template>
	<view class="content_main" :style="typePage==0?'':'padding-bottom: 166rpx;'">

		<u-navbar :title="typePage==0?'退款':'退款退货'" :custom-back="$goback"></u-navbar>

		<view class="content_box" :style="'height: calc(100vh - ' + heightInfo + 'px);'">

			<view class="box_product" :style="typePage==0?'':'height: 297rpx;'" v-for="(item,index) in orderProduct"
				:key="index">

				<view class="order_block" :style="typePage==0?'':'border-bottom: 1rpx solid rgba(0, 0, 0, 0.1)'">

					<view class="product_img">
						<image :src="item.image"></image>
					</view>

					<view class="product_title">
						<view class="title_top">
							<view class="title_name">{{item.product_name}}</view>
							<view class="title_num">
								<view class="num_price font_family_din">￥{{item.per_pay_price}}
								</view>
								<view class="num_tops font_family_din">X {{item.num}}</view>
							</view>
						</view>
						<view class="title_suk">{{item.suk}}</view>
					</view>

				</view>

				<view class="order_num" v-if="typePage==1">

					<view class="num_name">申请退货数量</view>

					<view class="num_click">
						<u-number-box bg-color="#FFFFFF" v-model="item.maxNum" :disabled-input="true" :min="1"
							:max="item.num">
						</u-number-box>
					</view>

				</view>

			</view>

			<view class="box_refund" :style="typePage==0?'':'height: 273rpx;'">

				<view class="refund_main">

					<view class="block_info" v-if="typePage==1" @click="commInfo(0)">
						<view class="block_name">货物状态</view>
						<view class="block_input">
							<view class="input_click">
								<view :class="valueState=='是否已收到货'?'input_color':''">{{valueState}}</view>
							</view>
							<view class="line_png">
								<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#CCCCCC"></u-icon>
							</view>
						</view>
					</view>

					<view class="block_info" @click="commInfo(1)">
						<view class="block_name">退款原因</view>
						<view class="block_input">
							<view class="input_click">
								<view :class="valueReason=='请选择退款原因'?'input_color':''">{{valueReason}}</view>
							</view>
							<view class="line_png">
								<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#CCCCCC"></u-icon>
							</view>
						</view>
					</view>

					<view class="block_item">
						<view class="block_name">退款金额</view>
						<view class="block_price font_family_din">¥ {{refundPrice}}</view>
					</view>

				</view>

			</view>

			<view class="box_describe">

				<view class="mian_line">
					<view class="line_name">补充描述和凭证</view>
					<view>
						<u-input type="textarea" v-model="desc" height="150" :border="false" placeholder="请填写具体的描述内容"
							placeholder-style="font-size: 28rpx;color: #999999;" :auto-height="true" maxlength="200" />
						<view class="line_tops">{{desc.length}}/{{numAll}}</view>
					</view>
				</view>

			</view>

			<view class="box_img">

				<view class="img_line">
					<view class="line_name">上传图片</view>
					<view>
						<u-input type="text" :border="false" placeholder="最多可上传5张图片"
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

					<view class="img_add" v-if="imgData.length < 5" @click="callInfo">
						<u-icon name="camera" custom-prefix="custom-icon" size="36" color="#CCCCCC"></u-icon>
						<view class="img_title">添加图片</view>
					</view>

				</view>

			</view>

			<view class="box_address" v-if="typePage==1">

				<view class="addrsss_name">退款收件人：{{refundAddressInfo.addressee}}</view>

				<view class="addrsss_name">退款电话：{{refundAddressInfo.phone}}</view>

				<view class="addrsss_name">退款地址：{{refundAddressInfo.address}}</view>

			</view>

		</view>

		<pageBottom title="提交" @footerBtnEvent="submitInfo" location="fixed" backGround="#FFFFFF"></pageBottom>

		<!-- 货物状态 -->
		<u-popup v-model="showComm" mode="bottom" @close="closeFrm">
			<view class="state_mian">

				<view class="state_top">
					{{valueType==0?'选择货物状态':'选择退款原因'}}
				</view>

				<view class="state_content">

					<view class="content_block" v-if="valueType==0">
						<!-- valueState -->
						<view class="block_line" v-for="(item, index) in productState" :key="index" @click="changeState(index)">
							<view class="line_name">{{item.name}}</view>
							<view class="line_checked">
								<u-icon name="onclick" custom-prefix="custom-icon" size="24" v-if="item.checked"></u-icon>
								<u-icon name="Multiple" custom-prefix="custom-icon" size="24" v-else></u-icon>
							</view>
						</view>

					</view>

					<view class="content_block" v-else>


						<template v-if="valueNum==0">

							<view class="block_line" v-for="(item, index) in goodsNoReceived" :key="index" @click="changeReason(index)">
								<view class="line_name">{{item.name}}</view>
								<view class="line_checked">
									<u-icon name="onclick" custom-prefix="custom-icon" size="24" v-if="item.checked"></u-icon>
									<u-icon name="Multiple" custom-prefix="custom-icon" size="24" v-else></u-icon>
								</view>
							</view>

						</template>

						<template v-if="valueNum==1">

							<view class="block_line" v-for="(item, index) in goodsReceived" :key="index" @click="changeReason(index)">
								<view class="line_name">{{item.name}}</view>
								<view class="line_checked">
									<u-icon name="onclick" custom-prefix="custom-icon" size="24" v-if="item.checked"></u-icon>
									<u-icon name="Multiple" custom-prefix="custom-icon" size="24" v-else></u-icon>
								</view>
							</view>

						</template>


					</view>

				</view>

				<view class="state_bottom" :style="phoneModel=='iPhone X'?'height: 180rpx;':''">
					<view class="bottom_button" @click="closeFrm">确定</view>
				</view>

			</view>
		</u-popup>

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
				heightInfo: '',
				showComm: false,
				phoneModel: uni.getStorageSync('phoneModel'),
				productId: '', //商品id
				orderId: '', //订单id
				orderProduct: [], //退货商品信息
				productState: [], // 已收到货 未收到货
				goodsReceived: [], //已收到货
				goodsNoReceived: [], //未收到货
				refundPrice: '', //退款金额
				refundAddressInfo: {}, //售后退款类型
				valueType: '', //判断 0 //货物状态 1退款原因
				valueState: '是否已收到货', //货物状态
				valueReason: '请选择退款原因', //退款原因
				valueNum: 0, //0未收到货 1已收到货
				desc: '', //退款描述
				typePage: '', //判断那种方式过来的
				numAll: 200, //最大字符
				imgData: [], //图片数据
				imgLength: 5,
			}
		},
		onLoad(option) {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
			this.productId = this.$cache('productId'); //商品id
			this.orderId = this.$cache('orderId'); //订单id
			this.typePage = option.typePage; //判断是那边跳转过来的
			this.getRefundInfo();
		},
		methods: {

			//获取申请售后页面
			getRefundInfo() {
				let that = this;
				uni.showLoading({
					title: '拼命加载中',
					mask: true
				});
				that.$api.my.API_MYREFUNDINFO({
					order_product_ids: that.productId,
				}).then(res => {
					that.orderProduct = res.data.order_product; //退货商品信息
					that.orderProduct.forEach(item => { //退货商品信息
						that.$set(item, 'maxNum', item.num);
					})
					let objState = {};
					let objReceived = {};
					let objNoReceived = {};
					if (res.data.product_state.length != 0) {
						res.data.product_state.forEach(item => { // 已收到货 未收到货
							objState = {
								name: item,
								checked: false
							}
							that.productState.push(objState)
						})
					}
					if (res.data.goods_received.length != 0) {
						res.data.goods_received.forEach(item => { //已收到货
							objReceived = {
								name: item,
								checked: false
							}
							that.goodsReceived.push(objReceived)
						})
					}
					if (res.data.goods_no_received.length != 0) {
						res.data.goods_no_received.forEach(item => { //未收到货
							objNoReceived = {
								name: item,
								checked: false
							}
							that.goodsNoReceived.push(objNoReceived)
						})
					}
					that.refundPrice = res.data.refund_amount; //退款金额
					that.refundAddressInfo = res.data.refund_address_info; //售后退款地址
					uni.hideLoading();
				});
			},

			//调用传图片
			callInfo() {
				let that = this;
				uni.chooseImage({
					count: that.imgLength, //默认5
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						that.imgLength = Number(that.imgLength) - Number(tempFilePaths.length);
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

			//选择货物状态
			changeState(index) {
				let that = this;
				that.productState.forEach(item => {
					item.checked = false;
				})
				that.productState[index].checked = !that.productState[index].checked;
				that.valueState = that.productState[index].name;
				that.valueReason="请选择退款原因";
				that.valueNum = index;
			},

			//选择退款原因
			changeReason(index) {
				let that = this;
				if (that.valueNum == 1) {
					that.goodsReceived.forEach(item => {
						item.checked = false;
					})
					that.goodsReceived[index].checked = !that.goodsReceived[index].checked;
					that.valueReason = that.goodsReceived[index].name;
				} else {
					that.goodsNoReceived.forEach(item => {
						item.checked = false;
					})
					that.goodsNoReceived[index].checked = !that.goodsNoReceived[index].checked;
					that.valueReason = that.goodsNoReceived[index].name;
				}
			},

			//提交退款
			submitInfo() {
				let that = this;
				if (that.typePage == 1) {
					if (that.valueState == '是否已收到货') {
						that.$u.toast("请选择退款状态");
						return
					}
				}
				if (that.valueReason == '请选择退款原因') {
					that.$u.toast("请选择退款原因");
					return
				}
				let objId = [];
				let objNum = [];
				if (that.orderProduct.length != 0) {
					that.orderProduct.forEach(item => {
						objId.push(item.id)
						objNum.push(item.maxNum)
					})
				}
				that.$api.my.API_MYREFUNDAPPLY({
					order_product_ids: objId.join(), //订单产品ids
					type_str: that.typePage == 1 ? that.valueState : '', //类型
					reason: that.valueReason, //原因
					desc: that.desc, //描述
					pic_list: that.imgData.length == 0 ? '' : that.imgData.join(), //图片
					order_id: that.orderId, //订单id
					refund_type: that.typePage == 1 ? 2 : 1, //退款或者售后（1是退款 2 是售后）
					order_product_nums: objNum.join(), //订单商品的退货退款数量（多个用,隔开，顺序同order_product_ids）
				}).then(res => {
					uni.showToast({
						title: '提交申请成功'
					});
					this.$cache('orderType', '1');
					setTimeout(() => {
						this.$goback(2);
					}, 2000)
				});
			},

			//货物状态
			commInfo(val) {
				let that = this;
				that.valueType = val;
				switch (val) {
					case 0:
						// if (that.valueState != '是否已收到货') {
						// 	that.valueReason = "请选择退款原因";
						// }
						that.showComm = true;
						break;
					case 1:
						if (that.typePage == 1) {
							if (that.valueState == '是否已收到货') {
								that.$u.toast("请先选择货物状态!");
								return
							}
						}
						that.showComm = true;
						break;
				}
			},

			//关闭选择框
			closeFrm() {
				let that = this;
				that.showComm = false;
				if (that.typePage == 1) {//判断如果是 重新选择 给它checked重置
					if (that.valueState != '是否已收到货') {
						if (that.valueNum == 1) {
							that.goodsReceived.forEach(item => {
								item.checked = false;
							})
						} else {
							that.goodsNoReceived.forEach(item => {
								item.checked = false;
							})
						}
					}
				}
			},

			//删除图片
			deleteImg(index) {
				let that = this;
				that.imgData.splice(index, 1);
				that.imgLength++
			},

		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}


	.content_main {
		background-color: #EEEEEE;
		min-height: 100%;
		position: relative;


		.content_box {

			.box_product {
				height: 208rpx;
				width: 100%;
				margin-bottom: 16rpx;
				background: #FFFFFF;

				.order_block {
					padding-top: 23rpx;
					padding-bottom: 25rpx;
					padding-left: 24rpx;
					padding-right: 24rpx;
					display: flex;
					width: 100%;

					.product_img {
						width: 160rpx;
						height: 160rpx;

						image {
							width: 100%;
							height: 100%;
						}

					}

					.product_title {
						width: calc(100% - 160rpx);
						padding-left: 24rpx;
						height: 160rpx;

						.title_top {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.title_name {
								width: 320rpx;
								height: 80rpx;
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #333333;
								text-overflow: -o-ellipsis-lastline;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								line-clamp: 2;
								-webkit-box-orient: vertical;

							}

							.title_num {

								.num_price {
									height: 40rpx;
									font-size: 28rpx;
									font-weight: bold;
									color: #666666;
									margin-bottom: 16rpx;
								}

								.num_tops {
									height: 28rpx;
									font-size: 24rpx;
									font-weight: bold;
									color: #666666;
									text-align: right;
								}


							}

						}

						.title_suk {
							margin-top: 22rpx;
							height: 33rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
						}



					}

				}

				.order_num {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 88rpx;
					padding-left: 60rpx;
					padding-right: 24rpx;

					.num_name {
						height: 37rpx;
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
					}

					.num_click {
						::v-deep.u-numberbox {
							width: 140rpx;
						}


						::v-deep.u-icon-minus {
							width: 36rpx !important;
							height: 36rpx !important;
							padding: 0 10rpx;
							border-radius: 0 !important;
							background: #000000 !important;
							color: #fff !important;
						}

						::v-deep.u-icon-plus {
							width: 36rpx !important;
							height: 36rpx !important;
							padding: 0 10rpx;
							border-radius: 0 !important;
							background: #000000 !important;
							color: #fff !important;
						}

						::v-deep.uicon-minus {
							font-size: 18rpx !important;
						}

						::v-deep.uicon-plus {
							font-size: 18rpx !important;
						}

						::v-deep.u-icon-disabled {
							color: #c8c9cc !important;
							background: #f7f8fa !important;
						}
					}

				}


			}

			.box_refund {
				width: 100%;
				margin-bottom: 16rpx;
				background: #FFFFFF;
				height: 183rpx;


				.refund_main {
					padding-left: 60rpx;
					padding-right: 24rpx;

					.block_info {
						height: 90rpx;
						display: flex;
						align-items: center;
						border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

						.block_name {
							font-size: 28rpx;
							font-weight: 400;
							color: #333333;
							width: 125rpx;
						}

						.block_input {
							align-items: center;
							display: flex;
							margin-left: 25rpx;
							justify-content: space-between;
							width: calc(100% - 110rpx);

							.input_click {
								display: flex;
								justify-content: space-between;

								.input_color {
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #999999;
								}

							}

							.line_png {
								width: 24rpx;
								height: 24rpx;

							}

						}


					}

					.block_item {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 90rpx;

						.block_price {
							font-size: 26rpx;
							font-weight: bold;
							color: #E76234;
						}

					}
				}

			}

			.box_describe {
				width: 100%;
				margin-bottom: 16rpx;
				background: #FFFFFF;
				height: 335rpx;
				padding-left: 60rpx;
				padding-right: 40rpx;
				padding-top: 25rpx;
				padding-bottom: 25rpx;

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
				padding-left: 60rpx;
				padding-right: 40rpx;
				padding-top: 25rpx;
				padding-bottom: 25rpx;
				margin-bottom: 16rpx;

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
							position: absolute;
							top: -5rpx;
							right: -10rpx;
							display: flex;
							align-items: center;
							z-index: 1000;
							background: #fff;
							border-radius: 50%;
							width: 24rpx;
							height: 23rpx;


							image {
								width: 25rpx !important;
								height: 25rpx !important;
							}
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

						::v-deep.u-icon {
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

			.box_address {
				width: 100%;
				height: 168rpx;
				padding: 24rpx 60rpx;
				background: #FFFFFF;

				.addrsss_name {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-bottom: 10rpx;
				}

			}

		}


		.state_mian {
			width: 100%;

			.state_top {
				height: 98rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #212121;
			}

			.state_content {
				padding: 0 24rpx;


				.content_block {

					.block_line {
						height: 90rpx;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
						padding-left: 36rpx;
						padding-right: 16rpx;

						.line_name {
							height: 40rpx;
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #333333;
						}

						.line_checked {}

					}

				}

			}

			.state_bottom {
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 26rpx;
				background: #fff;
				margin-top: 72rpx;

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
	}
</style>
