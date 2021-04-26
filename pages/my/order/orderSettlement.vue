<template>
	<view class="content_main">

		<u-navbar title="订单结算" :custom-back="$goback"></u-navbar>

		<view class="content_box">

			<view class="box_address" @click="jumpPage(0)">

				<view class="address_png">
					<u-icon name="adress" custom-prefix="custom-icon" size="36"></u-icon>
				</view>

				<view class="address_name">

					<view class="name_telname" v-if="addressInfo.id">
						<text class="name_title u-line-1">{{addressInfo.name}}</text> 
						<text>{{addressInfo.phone}}</text>
					</view>

					<view class="name_telname" v-else>
						<text>收货地址</text> <text style="margin-left: 15rpx;"></text>
					</view>

					<view class="name_address" v-if="addressInfo.id">
						{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.district}}{{addressInfo.detail}}
					</view>

					<view class="name_address" v-else>请添加你的收货地址</view>

				</view>

				<view class="address_right">
					<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#CCCCCC"></u-icon>
				</view>

			</view>

			<view class="box_product" v-for="(item,index) in ordersList" :key="index">
				
				<view class="product_name">
					
					<view class="supplier_logo">
						<imageBox :imageUrl="item.provider_info.provider_logo" width="36rpx" height="36rpx" shape="circle"></imageBox>
					</view>
					
					<view class="supplier_name">{{item.provider_info.provider_name}}</view>
					
				</view>

				<view class="product_main" >
					
					<view class="order_block" v-for="(childItem,childIndex) in item.products" :key="childIndex">
					
						<view class="product_img">
							<imageBox :imageUrl="childItem.image" width="160rpx" height="160rpx"></imageBox>
						</view>
					
						<view class="product_title">
							<view class="title_top">
								<view class="title_name">{{childItem.product_name}}</view>
								<view class="title_num">
									<view class="num_price font_family_din">￥{{childItem.ot_price}}</view>
									<view class="num_tops font_family_din">X{{childItem.cart_num}}</view>
								</view>
							</view>
							<view class="title_suk">
								
								<view class="suk_name">{{childItem.suk}}</view>
								
								<view class="suk_button"></view>
								
							</view>
						</view>
					
					</view>

				</view>

				<view class="product_remarks">
					<view class="remarks_title">备注</view>
					<view class="remarks_tops">
						<u-input v-model="item.remarks" type="text" :border="false" style="width: 100%;"/>
					</view>
				</view>
				
				<view class="product_all">
					
					<view class="all_main">
					
						<view class="all_line">
					
							<view class="line_title">
								<view class="title_color">商品金额</view>
								<view class="title_tops"></view>
							</view>
					
							<view class="line_num font_family_din">
								￥{{item.price.goods_total_price}}
							</view>
					
						</view>
					
						<view class="all_line">
					
							<view class="line_title">
								<view class="title_color">运费</view>
								<view class="title_tops"></view>
							</view>
					
							<view class="line_num font_family_din">
								￥{{item.price.postage_amount}}
							</view>
					
						</view>
					
						<view class="all_line">
					
							<view class="line_title">
								<view class="title_color">会员折扣</view>
								<view class="title_tops"></view>
							</view>
					
							<view class="line_num line_color font_family_din">
								-￥{{item.price.deduction_amount}}
							</view>
					
						</view>
					
						<view class="all_line" style="margin-bottom: 24rpx;">
					
							<view class="line_title">
								<view class="title_color">优惠活动</view>
								<view class="title_tops"></view>
							</view>
					
							<view class="line_num line_color font_family_din">
								-￥{{item.price.promotion_amount}}
							</view>
					
						</view>
					
					
					</view>
					
					<view class="all_bottom">
						<view class="order_total">共 {{item.products_count}} 件产品</view>
						<view class="order_all">合计：<text class="font_family_din" style="color: #E76234;">¥ {{item.price.subtotal_amount}}</text>
						</view>
					</view>
					
					
				</view>

			</view>
			
			<view class="box_coupon">
				<view class="coupon_name">优惠劵</view>
				<view class="coupon_tops" v-if="couponInfo.usable.length==0">
					<view class="tops_title">暂无可用优惠劵</view>
				</view>
				
				<view class="coupon_tops" v-else @click="jumpPage(2)">
					<view class="tops_color font_family_din" style="color: #E76234;">-￥{{couponDiscountAmount}}</view>
					<u-icon name="rightBack" custom-prefix="custom-icon" size="24" color="#9B969A" v-if="couponInfo.usable.length!=0"></u-icon>
				</view>
			</view>

		</view>

		<view class="content_bottom" :style="phoneModel=='iPhone X'?'height: 140rpx;':''">

			<view class="bottom_all">
				合计：<text class="price_color font_family_din">¥ {{totalAmount}}</text>
			</view>

			<view class="bottom_button">
				<view class="button_color" @click="jumpPage(1)">提交订单</view>
			</view>

		</view>

	</view>
</template>

<script>
	import imageBox from '@/component/common/imageBox.vue';
	export default {
		components: {
			imageBox
		},
		data() {
			return {
				phoneModel: uni.getStorageSync('phoneModel'),
				goodsSku: [], //从商品详情页过来
				cartId: "", //购物车id
				couponId: "", //优惠劵id
				addressInfo: {}, //地址数据
				ordersList: [], //商品数据
				couponList:{},//优惠劵数据
				couponInfo:{},//选择优惠劵带过来数据
				couponDiscountAmount:'',//优惠劵金额
				couponUserId:'',//优惠劵金额id
				totalAmount:'',//总价格
			}
		},
		onShow() {
			if(this.$cache('addressId')){
				this.addressInfo.id = this.$cache('addressId'); //地址id
			}
			if(this.$cache('couponInfo')){
				this.couponInfo = this.$cache('couponInfo'); //优惠劵
				this.couponDiscountAmount=this.couponInfo.discount_amount;//优惠劵金额
				this.couponUserId=this.couponInfo.id;//优惠劵金额id
			}
			this.getOrderInfo();
		},
		onLoad(option) {
			if (option.goods_sku_list_json) {
				this.goodsSku = option.goods_sku_list_json;
			}
			if (option.cartId) {
				this.cartId = option.cartId;
			}
		},
		methods: {

			//获取下单-结算页预览
			getOrderInfo() {
				let that = this;
				uni.showLoading({
					title: '拼命加载中',
					mask: true
				});
				that.$api.my.API_ORDERPREVIEW({
					cart_ids: that.cartId,
					goods_sku_list_json: that.goodsSku,
					address_id: that.addressInfo.id?that.addressInfo.id:'',
					coupon_user_id: that.couponUserId,
				}).then(res => {
					that.addressInfo = res.data.address_info; //地址详情
					that.ordersList = res.data.orders; //商品信息
					that.ordersList.forEach(item=>{
						that.$set(item, 'remarks', '');
					})
					that.totalAmount = res.data.total_amount; //总价格
					that.couponList = res.data.coupon_list; //优惠劵数据
					that.couponDiscountAmount = res.data.coupon_discount_amount; //优惠劵金额
					that.couponUserId = res.data.coupon_user_id; //优惠劵金额id
					uni.hideLoading();
				});
			},

			//跳转设置
			jumpPage(val) {
				let that = this;
				switch (val) {
					case 0: //地址设置
						that.$jumpPage('/settings/address/addressSet', {
							typePage: 1,
							addressId: that.addressInfo.id ? that.addressInfo.id : ""
						});
						break;
					case 1: //提交订单
						that.$u.throttle(that.submit, 2000)
						break;
					case 2: //选择优惠劵
						that.$jumpPage('/pages/my/coupons/purchaseCoupons', {
							typePage: 1,
							couponsData: JSON.stringify(that.couponList)
						});
						break;
				}
			},

			//提交订单
			submit() {
				let that = this;
				if (!that.addressInfo.id) {
					that.$u.toast("收货地址不能为空!");
					return
				}
				that.$api.my.API_MYCOUPONLISTSUBMIT({
					cart_ids: that.cartId,
					goods_sku_list_json: that.goodsSku,
					address_id: that.addressInfo.id,
					coupon_user_id: that.couponId?'': that.couponId,
					mark: that.remarks
				}).then(res => {
					that.$jumpPage('/settings/payment/paymentPlatform', {
						orderData: JSON.stringify(res.data),
						typePage: 0
					}, 'replace');
				});
			},


		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background-color: #FFFFFF;
		height: 100%;
		position: relative;

		.content_box {
			padding-bottom: 200rpx;
			
			.box_address {
				height: 140rpx;
				width: 100%;
				border-bottom: 16rpx solid #EEEEEE;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 31rpx 24rpx 31rpx 40rpx;
			
				.address_png {
					width: 36rpx;
					height: 36rpx;
				}
			
				.address_name {
					margin-left: 21rpx;
					margin-right: 27rpx;
					width: calc(100% - 120rpx);
			
					.name_telname {
						height: 40rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						margin-bottom: 8rpx;
						align-items: center;
						display: flex;
						
						.name_title{
							width: 112rpx;
							margin-right: 15rpx;
						}
						
					}
			
					.name_address {
						height: 30rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						line-clamp: 1;
						-webkit-box-orient: vertical;
					}
			
				}
			
				.address_right {
					width: 24rpx;
					height: 24rpx;
				}
			}

			.box_product {
				width: 100%;
				border-bottom: 16rpx solid #EEEEEE;
				
				.product_name{
					height: 88rpx;
					padding: 28rpx 72rpx 24rpx 72rpx;
					display: flex;
					align-items: center;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
					
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

				.product_main {
					border-bottom: 8rpx solid #EEEEEE;
					
					.order_block {
						width: 100%;
						height: 208rpx;
						padding: 24rpx;
						display: flex;
						margin-bottom: 8rpx;
						background: #FFFFFF;
					
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
								display: flex;
								align-items: center;
								justify-content: space-between;
								
								.suk_name{
									font-size: 24rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #999999;
								}
								
								.suk_button{
									
								}
								
							}
					
					
					
						}
					
					}
					
				}

				.product_remarks {
					border-bottom: 8rpx solid #EEEEEE;
					height: 88rpx;
					display: flex;
					align-items: center;
					padding: 0 24rpx;
					
					.remarks_title {
						height: 37rpx;
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						margin-right: 24rpx;
					}
					
					.remarks_tops {
						// height: 37rpx;
						// font-size: 26rpx;
						// font-family: PingFangSC-Regular, PingFang SC;
						// font-weight: 400;
						// color: #CCCCCC;
					}
				}
				
				.product_all{
					width: 100%;
					height: 330rpx;
					padding: 24rpx;
					
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

			}
			
			.box_coupon{
				height: 88rpx;
				padding: 0 24rpx;
				background: #FFFFFF;
				border-bottom: 16rpx solid #EEEEEE;
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.coupon_name{
					height: 37rpx;
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				
				.coupon_tops{
					display: flex;
					align-items: center;
					
					.tops_title{
						height: 37rpx;
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #CCCCCC;
						margin-right: 24rpx;
					}
					
					.tops_color{
						height: 37rpx;
						font-size: 26rpx;
						font-weight: bold;
						color: #333333;
						margin-right: 24rpx;
					}
					
					image{
						width: 24rpx;
						height: 24rpx;
					}
					
				}
				
			}

		}

		.content_bottom {
			width: 100%;
			height: 114rpx;
			position: absolute;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx;
			position: fixed;
			background: #fff;
			z-index: 999;

			.bottom_all {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				.price_color {
					font-size: 26rpx;
					font-weight: bold;
					color: #E76234;
				}



			}

			.bottom_button {
				display: flex;

				.button_color {
					width: 200rpx;
					height: 66rpx;
					line-height: 66rpx;
					text-align: center;
					background: #000000;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}

			}

		}

	}
</style>
