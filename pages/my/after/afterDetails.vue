<template>
	<view class="content_main">

		<u-navbar title="售后服务单详情" :custom-back="$goback"></u-navbar>

		<view class="content_box">

			<view class="box_remind">
				
				 <image src="/static/images/my/after/after_one.png" v-if="orderRefundInfo.refund_status==0"></image>
				 
				 <image src="/static/images/my/after/after_one.png" v-else-if="orderRefundInfo.refund_status==1"></image>
				 
				 <image src="/static/images/my/after/after_two.png" v-else-if="orderRefundInfo.refund_status==2"></image>
				 
				 <image src="/static/images/my/after/after_no.png"  v-else-if="orderRefundInfo.refund_status==3"></image>
				 
				 <image src="/static/images/my/after/after_four.png" v-else-if="orderRefundInfo.refund_status==6"></image>
				 
			</view>
			
			<view class="box_after">
				
				<view class="after_top">
					商家同意退款申请，请照如下地址退回商品
				</view>
				
				<view class="after_main">
					
					<view class="after_line">
						<view class="line_name">收件人:</view>
						<view class="line_tops">太阳男神</view>
					</view>
					
					<view class="after_line">
						<view class="line_name">收件电话:</view>
						<view class="line_tops">18469411334</view>
					</view>
					
					<view class="after_line">
						<view class="line_name">收件地址:</view>
						<view class="line_tops">宁夏回族自治区中卫市沙坡头区大同街795号美好家园A座502#</view>
					</view>
					
				</view>
				
			</view>
			
			<view class="box_refund">
			
				<view>退货物流信息</view>
			
				<u-icon name="rightBack" custom-prefix="custom-icon" size="24"></u-icon>
			
			</view>
			
			<view class="box_address" @click="jumpPage(0)">

				<view>协商详情</view>

				<u-icon name="rightBack" custom-prefix="custom-icon" size="24"></u-icon>

			</view>
			
			<view class="box_supplier">
			
				<view class="supplier_logo">
					<imageBox :imageUrl="orderRefundInfo.provider_info.provider_logo" width="36rpx" height="36rpx" shape="circle"></imageBox>
				</view>
			
				<view class="supplier_name">{{orderRefundInfo.provider_info.provider_name}}</view>
			
			</view>

			<view class="box_product">
				
				
				<view :class="'goods_item ' + (childIndex < orderRefundInfo.product.length - 1?'mb_16':'')" v-for="(childItem,childIndex) in orderRefundInfo.product" :key="childIndex">
					<view class="image">
						<imageBox :imageUrl="childItem.image" width="160rpx" height="160rpx"></imageBox>
					</view>
					<view class="goods_info">
						<view class="name_num_price">
							<view class="name u-line-2">{{childItem.product_name}}</view>
							<view class="num_price">
								<view class="price">￥{{childItem.per_pay_price}}</view>
								<view class="num">X {{childItem.refund_num}}</view>
							</view>
						</view>
						<view class="attr">
							{{childItem.suk}}
						</view>
				
					</view>
				</view>

			</view>
			
			<view class="box_all">
				
				<view class="all_main">
									
					<view class="all_line">
									
						<view class="line_title">
							<view class="title_color">商品金额</view>
							<view class="title_tops"></view>
						</view>
									
						<view class="line_num font_family_din">
							￥111
						</view>
									
					</view>
									
					<view class="all_line">
									
						<view class="line_title">
							<view class="title_color">会员折扣</view>
							<view class="title_tops"></view>
						</view>
									
						<view class="line_num line_color font_family_din">
							-￥123
						</view>
									
					</view>
									
					<view class="all_line">
									
						<view class="line_title">
							<view class="title_color">优惠活动</view>
							<view class="title_tops"></view>
						</view>
									
						<view class="line_num line_color font_family_din">
							-￥1231
						</view>
									
					</view>
					
					<view class="all_line" style="margin-bottom: 24rpx;">
										
						<view class="line_title">
							<view class="title_color">优惠券</view>
							<view class="title_tops"></view>
						</view>
										
						<view class="line_num line_color font_family_din">
							-￥1231
						</view>
										
					</view>
									
									
				</view>
									
				<view class="all_bottom">
					<view class="order_total">共 1 件产品</view>
					<view class="order_all">实付款：<text class="font_family_din" style="color: #E76234;">¥120</text>
					</view>
				</view>
											
			</view>
			
			<view class="box_bottom">
				
				<view class="service_num">
					<view class="num_info">
						<view class="info_title">退款编号:</view>
						<view class="info_tops">{{orderRefundInfo.refund_no}}</view>
					</view>
					<view class="num_info">
						<view class="info_title">售后类型:</view>
						<view class="info_tops">{{orderRefundInfo.refund_type_str}}</view>
					</view>
					<view class="num_info">
						<view class="info_title">申请账户:</view>
						<view class="info_tops"></view>
					</view>
					<view class="num_info">
						<view class="info_title">退款金额:</view>
						<view class="info_tops">￥{{orderRefundInfo.refund_amount}}</view>
					</view>
					<view class="num_info">
						<view class="info_title">商品状态:</view>
						<view class="info_tops"></view>
					</view>
					<view class="num_info">
						<view class="info_title">退款原因:</view>
						<view class="info_tops">{{orderRefundInfo.reason}}</view>
					</view>
					<view class="num_info">
						<view class="info_title">退款说明:</view>
						<view class="info_tops">{{orderRefundInfo.desc}}</view>
					</view>
					<view class="num_info">
						<view class="info_title">申请时间:</view>
						<view class="info_tops">{{orderRefundInfo.add_time}}</view>
					</view>
				</view>
				
				<view class="product_service">
					
					<view class="service_layer" style="width: 350rpx;" @click="serviceInfo(0)">
						<view class="layer_top">
							<u-icon name="sever" custom-prefix="custom-icon" size="36"></u-icon>
						</view>
						<view>在线客服</view>
					</view>
				
					<view class="service_layer" @click="serviceInfo(1)">
						<view class="layer_top">
							<u-icon name="phone2" custom-prefix="custom-icon" size="36"></u-icon>
						</view>
						<view>拨打电话</view>
					</view>
				
				</view>
				
				
			</view>

		</view>

		<view class="content_bottom" :style="phoneModel=='iPhone X'?'height: 140rpx;':''" v-if="orderRefundInfo.refund_status==0 || orderRefundInfo.refund_status==1">
			<!-- <view class="bottom_button" @click="revokeOrder">撤销申请</view> -->
			<view class="bottom_button" @click="openLogisticsNo">填写物流单号</view>
		</view>
		
		<!-- 填写物流单号 -->
		<refundNews :showLogisticsNo="showLogisticsNo" :refundId='refundId' @close="closeLogisticsNo"></refundNews>
		
	</view>
</template>

<script>
	import imageBox from '@/component/common/imageBox.vue';
	import refundNews from '@/component/my/after/refund_news.vue';
	export default {
		components: {
			imageBox,
			refundNews
		},
		data() {
			return {
				phoneModel: uni.getStorageSync('phoneModel'),
				refundId:0,//售后id
				orderRefundInfo:{},//售后信息
				showLogisticsNo:false,//物流单号弹窗
			}
		},
		onLoad(option) {
			this.refundId=option.refundId;
			this.getRefundDetail();
		},
		methods: {
			
			//获取售后记录详细
			getRefundDetail() {
				let that = this;
				uni.showLoading({
					title: '拼命加载中',
					mask: true
				});
				that.$api.my.API_MYREFUNDDETAIL({
					refund_id: that.refundId,
					request_type:0
				}).then(res => {
					that.orderRefundInfo=res.data.order_refund_info;
					uni.hideLoading();
				});
			},
			
			//撤销申请售后
			revokeOrder() {
				let that = this;
				uni.showModal({
					content: '确认撤销申请售后?',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							that.$api.my.API_MYREFUNDCANCEL({
								order_product_id: that.productId,
							}).then(res => {
								uni.showToast({
									title: '撤销成功!!!'
								});
								that.getRefundDetail();
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			//跳转设置
			jumpPage(val) {
				let that = this;
				switch (val) {
					case 0: //协商详情
						this.$jumpPage('/pages/my/after/consultDetails',{refundId:that.refundId});
						break;
				}
			},
			
			//客服咨询 客服电话
			serviceInfo(val){
				let that=this;
				switch (val) {
					case 0:
						break;
					case 1:
						uni.makePhoneCall({
							phoneNumber:""
						});
						break;
				}
			},
			
			//打开单号弹窗
			openLogisticsNo(){
				let that=this;
				that.showLogisticsNo=true;
			},
			
			//关闭单号弹窗
			closeLogisticsNo(){
				let that=this;
				that.showLogisticsNo=false;
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #EEEEEE;
	}
	
	
	.content_main {
		background: #EEEEEE;
		min-height: 100%;
		position: relative;
		padding-bottom: 180rpx;

		.content_box {
			

			.box_remind {
				height: 157rpx;
				width: 100%;
				background: #FFFFFF;
				
				
				image{
					width: 100%;
					height: 157rpx;
				}

				
			}
			
			.box_after{
				width: 100%;
				height: 298rpx;
				padding: 24rpx;
				background: #FFFFFF;
				margin-top: 16rpx;
				
				.after_top{
					height: 58rpx;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					font-size: 30rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
				}
				
				.after_main{
					width: 100%;
					margin-top: 15rpx;
					
					.after_line{
						display: flex;
						align-items: center;
						margin-bottom: 16rpx;
						
						.line_name{
							width: 112rpx;
							height: 37rpx;
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #333333;
							margin-right: 40rpx;
							text-align: right;
						}
						
						.line_tops{
							width: calc(100% - 160rpx);
							height: 37rpx;
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #666666;
						}
						
					}
					
				}
				
			}
			
			.box_refund {
				height: 94rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 25rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-top: 16rpx;
				background: #FFFFFF;
			}
			
			.box_address {
				height: 94rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 25rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-top: 16rpx;
				background: #FFFFFF;
			}
			
			.box_all {
				width: 100%;
				background: #FFFFFF;
				padding: 24rpx;
				margin-top: 16rpx;
			
				.all_main {
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
			
					.all_line {
						display: flex;
						justify-content: space-between;
						height: 37rpx;
						align-items: center;
						margin-bottom: 16rpx;
			
						.line_title {
							display: flex;
							height: 37rpx;
			
							.title_color {
								height: 37rpx;
								font-size: 26rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #333333;
								margin-right: 40rpx;
								width: 104rpx;
								text-align: right;
							}
			
							.title_tops {
								height: 37rpx;
								font-size: 26rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #999999;
							}
			
						}
			
						.line_num {
							height: 37rpx;
							font-size: 26rpx;
							font-weight: bold;
							color: #333333;
						}
			
						.line_color {
							color: #E76234;
						}
			
					}
			
				}
			
				.all_bottom {
					height: 37rpx;
					width: 100%;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					margin-top: 24rpx;
			
					.order_total {
						height: 37rpx;
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						margin-right: 24rpx;
					}
			
			
					.order_all {
						height: 37rpx;
						font-size: 26rpx;
						font-weight: bold;
						color: #333333;
			
					}
			
				}
			
			}
			
			.box_supplier {
				width: 100%;
				height: 88rpx;
				display: flex;
				align-items: center;
				background: #FFFFFF;
				padding: 0 40rpx;
				margin-top: 16rpx;
			
				.supplier_logo {
					width: 36rpx;
					height: 36rpx;
					border-radius: 50rpx;
			
					image {
						width: 36rpx;
						height: 36rpx;
					}
			
				}
			
				.supplier_name {
					height: 37rpx;
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-left: 16rpx;
				}
			
			}
			
			.box_product {
				width: 100%;
				background: #FFFFFF;
				padding: 24rpx;
				
				.mb_16 {
					margin-bottom: 16rpx;
				}
				
				
				.goods_item {
					display: flex;
				
					.image {
						flex-grow: 0;
						flex-shrink: 0;
						width: 160rpx;
						height: 160rpx;
						margin-right: 24rpx;
				
						image {
							width: 100%;
							height: 100%;
							background: #CCCCCC;
						}
					}
				
					.goods_info {
						flex-grow: 1;
				
						.name_num_price {
							display: flex;
							line-height: 50rpx;
							margin-bottom: 22rpx;
				
							.name {
								width: 320rpx;
								font-size: 28rpx;
								color: #333333;
								margin-right: 16rpx;
							}
				
							.num_price {
								text-align: right;
								flex: 1;
				
								.price {
									font-size: 28rpx;
									font-weight: bold;
									color: #666666;
								}
				
								.num {
									font-size: 24rpx;
									font-weight: bold;
									color: #666666;
								}
							}
						}
				
						.attr {
							font-size: 24rpx;
							color: #999999;
						}
					}
				}
			}
			
			.box_bottom{
				background: #FFFFFF;
				margin-top: 16rpx;
				
				.service_num {
					padding: 24rpx;
					padding-bottom: 0;
			
				
					.num_info {
						margin-bottom: 16rpx;
						width: 100%;
						display: flex;
						
						.info_title{
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #333333;
							margin-right: 40rpx;
							width: 112rpx;
						}
						
						.info_tops{
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #666666;
							width: calc(100% - 160rpx);
						}
			
				
					}
				
				}
				
				.product_service {
					width: 100%;
					height: 72rpx;
					background: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 20rpx 0;
					border-top: 1rpx solid rgba(0, 0, 0, 0.1);
				
					.service_layer:nth-child(1) {
						border-right: 1rpx solid rgba(0, 0, 0, 0.1);
					}
				
					.service_layer {
						width: 352rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
				
						.layer_top {
							display: flex;
							align-items: center;
				
							::v-deep.u-icon{
								margin-right: 10rpx;
							}
				
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
			justify-content: flex-end;
			padding: 0 26rpx;
			position: fixed;
			background: #fff;

			.bottom_button {
				width: 200rpx;
				height: 66rpx;
				border: 1rpx solid #000000;
				background: #000000;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
			}

		}
		
	}
</style>
