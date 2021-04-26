<template>
	<view class="page" :class="{'page_x': phoneModel}" v-if="loadend">
		<view class="page_main">
			<view class="top_line"></view>
			<goodsSwiper :swiperImage="goodsInfo.slider_image_arr" :autoplay="autoplay"></goodsSwiper>
			<block v-if="goodsInfo.product_status == 1">
				<view class="goods_price_normal">
					<view class="price_now font_family_din">
						<text class="icon">￥</text>
						<text class="text">{{goodsInfo.price}}</text>
					</view>
					<view class="price_old">￥{{goodsInfo.ot_price}}</view>
					<view class="discount">
						{{goodsInfo.discount_percent}}折
					</view>
				</view>
			</block>
			<!-- 正常商品 -->
			<block v-else>
				<view class="goods_price">
					<view class="left">
						<view class="price_now font_family_din">
							<text class="icon">￥</text>
							<text class="text">{{goodsInfo.price}}</text>
						</view>
						<view class="price_old">
							<view class="old">￥{{goodsInfo.ot_price}}</view>
							<view class="discount">
								{{goodsInfo.discount_percent}}折
							</view>
						</view>
					</view>
					<view class="right" v-if="false">
						<view class="open_time">1月12日 12:30 开售</view>
						<view class="count_down">
							<u-icon name="time" custom-prefix="custom-icon" size="24" color="#FFFFFF"></u-icon>
							<view class="text">倒计时：1天00:22:34</view>
						</view>
					</view>
				</view>
			</block>
			<view class="desc_info" >
				<view class="desc" :class="goodsInfo.label_list.length?'mb_24':''">
					<view class="left">
						{{goodsInfo.title}}
					</view>
					<view class="right">
						<view class="icon_favorite mr_24">
								
							<u-icon name="favorite" custom-prefix="custom-icon" size="36" color="#212121" v-if="goodsInfo.is_collect === 0" @click="collectionInfo"></u-icon>
							
							<u-icon name="favorite_click" custom-prefix="custom-icon" size="36" color="#212121" v-else @click="collectionInfo"></u-icon>
						</view>
						<block v-if="isLogin">
							<button class="icon_share" @click="openShare">
								<u-icon name="share" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
							</button>
						</block>
						<block v-else>
							<button class="icon_share" @click="$toUrl('/pages/my/login/login/login')">
								<u-icon name="share" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
							</button>
						</block>
					</view>
				</view>
				<view class="label_box">
					<view class="label" v-for="(label,index) in goodsInfo.label_list" :key='index'>{{label.label_name}}</view>
				</view>
			</view>

			<!-- 参数区域 -->
			<view class="param">
				<view class="param_list" v-if="goodsInfo.promotion_title">
					<view class="title">
						优惠
					</view>
					<view class="param_info">
						<view class="left">
							{{goodsInfo.promotion_title}}
						</view>
					</view>

				</view>
				<view class="param_list" v-if='goodsInfo.service_tip'>
					<view class="title">
						服务
					</view>
					<view class="param_info">
						<view class="left">
							{{goodsInfo.service_tip}}
						</view>
					</view>
				</view>
			</view>
			<!-- 参数区域 end -->
			<!-- 商品品牌 -->
			<view class="brand" v-if="goodsInfo.brand_info.brand_name">
				<view class="logo">
					<image class="image" :src="goodsInfo.brand_info.logo" mode="heightFix"></image>
				</view>
				<view class="brand_text">
					{{goodsInfo.brand_info.brand_name}}
				</view>
				<view class="brand_btn"  @click="$toUrl('/pages/index/brand/brand',{id: goodsInfo.brand_id})">
					进入品牌
				</view>
			</view>
			<!-- 商品品牌 end -->
		</view>

		<!-- 商品详情和参数 -->
		<view class="param_detail">
			<paramDetail ref="paramDetail" :affiliates="goodsInfo.affiliate_attr" :detail="goodsInfo.description" @jump="jump" @jumpTop="jumpTop"
				:current="current" @change="change"></paramDetail>
		</view>
		<!-- 商品详情和参数 end -->
		<!-- 商品详情 -->


		<!-- 商品详情 end -->
		<!-- 底部操作栏 -->
		<view :class="'goods_footer ' + (phoneModel?'goods_footer_x':'')">
			<block v-if="goodsInfo.product_status == 1">
				<view class="left">
					<block v-if="isLogin">
						
						<button class="u-reset-button consult mr_50" open-type="contact"
							    :session-from="'nickName=' + userInfo.nickname + '|avatarUrl='+ userInfo.avatar">
							<view class="icon">
								<u-icon name="sever" custom-prefix="custom-icon" size="40" color="#212121"></u-icon>
							</view>
							<view class="text">
								咨询
							</view>
						</button>
					</block>
					<block v-else>
						<button class="u-reset-button consult mr_50" @click="$toUrl('/pages/my/login/login/login')">
							<view class="icon">
								<u-icon name="sever" custom-prefix="custom-icon" size="40" color="#212121"></u-icon>
							</view>
							<view class="text">
								咨询
							</view>
						</button>
						
					</block>
					
					<view class="shopping_cart" @click="jumpP">
						<view class="icon">
							<u-icon name="shop" custom-prefix="custom-icon" size="40" color="#212121"></u-icon>
							<!-- <view class="cart_num" v-if="cartNum > 0">{{cartNum>99?'99+':cartNum}}</view> -->
						</view>
						<view class="text">
							购物车
						</view>
					</view>
				</view>
				<!-- 正常购买商品 -->
				<view class="right" v-if="true">
					<view class="add_cart" @click="$u.throttle(openSkuCart, 500)">加入购物车</view>
					<view class="buy_now" @click="$u.throttle(openSkuBuy, 500)">立即购买</view>
				</view>
				<!-- 预售商品 -->
				<view class="right" v-else>
					<view class="sale_remind" @click="saleRemind" v-if="true">开售提醒</view>
					<view class="sale_remind_disable" v-else>已设置开售提醒</view>
				</view>
			</block>
			<block v-else>
				<view class="down-tips">
					该商品已下架
				</view>
			</block>
			
		</view>
		<!-- 底部操作栏 end -->
		<skuChoose v-show="skuShow" :goodsId="id" :type="cartType" :skuShow="skuShow" @closeSku="closeSku"
			@saveSku="saveSku" :attr="goodsInfo.product_attr" :attrValues="goodsInfo.product_attr_values"
			@getCartNum="getCartNum"></skuChoose>

		<shareComponent ref="shareComponent" :shareImgUrl='goodsInfo.spread_poster_url' :shareData="shareData"></shareComponent>
	</view>
</template>

<script>
	import skuChoose from '@/component/index/goods/skuChoose.vue';
	import paramDetail from '@/component/index/goods/paramAndDetail.vue';
	import shareComponent from '@/component/common/shareComponent.vue';
	import imageBox from '@/component/common/imageBox.vue'
	import goodsSwiper from '@/component/index/goods/goodsSwiper.vue'
	export default {
		data() {
			return {
				id: 0, // 商品id
				inviteCode: '', //邀请码
				goodsInfo: {}, // 商品详情
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				phoneModel: uni.getStorageSync('phoneModel'),
				skuShow: false, // 规格选择控制
				cartType: '', // 打开购物车的类型
				// number: 1, // 购买数量
				// skuUnique: '', // sku唯一标识
				loadend: false, // 是否请求完毕
				cartNum: 0, // 购物车数量
				current: 0, // tab栏
				domTop: 0, // dom距离顶部高度
				shareData: {},// canvas画布分享内容
				autoplay: true, // 轮播图自动滚动状态
			};
		},
		components: {
			skuChoose: skuChoose,
			paramDetail: paramDetail, // 参数和详情
			shareComponent: shareComponent ,// 分享组件
			imageBox: imageBox,
			goodsSwiper: goodsSwiper
		},
		computed: {
			isLogin() {
				return this.user.is_bind_phone === 1 && this.user.token;
			}
		},
		onLoad() {
			this.id = this.$Route.query.id;
			this.inviteCode = this.$Route.query.inviteCode == undefined ? '' : this.$Route.query.inviteCode;
			if (this.inviteCode) {
				this.$u.vuex("setSharecode", this.inviteCode);
			};
		},
		onShow() {
			this.getGoods();
			this.getCartNum();
			this.autoplay = true
		},
		onHide() {
			this.autoplay = false
		},
		methods: {
			openShare() {
				this.$refs.shareComponent.openShare()
			},
			change(e) {
				this.current = e;
				if (this.current == 1) {
					this.jump();
					this.$refs.paramDetail.goTop();
				} else {
					this.jumpTop();
				};
			},
			openSkuCart() {
				this.skuShow = true;
				this.cartType = 'addCart';
			},
			openSkuBuy() {
				this.skuShow = true;
				this.cartType = 'buyNow';
			},
			closeSku(e) {
				this.skuShow = false;
			},
			getCartNum() {
				this.cartNum = uni.getStorageSync('cartNum');
			},
			saveSku(e) {
				let skuData = e;
				this.goodsInfo.price = skuData.skuPrice;
				this.goodsInfo.ot_price = skuData.skuOtPrice;
				this.number = skuData.number;
				this.skuUnique = skuData.unique;
				this.closeSku();
			},
			// 跳转页面购物车
			jumpP(url) {
				let that = this;
				that.$jumpPage('/pages/shopping/product/shoppingCart');
			},
			// 获取商品详情信息
			getGoods() {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				this.$api.index.GOODS_DETAIL({
					product_id: this.id
				}).then(res => {
					this.goodsInfo = res.data;
					this.shareData = {
						image: res.data.slider_image_arr[0],
						shareName: res.data.title,
						price: res.data.price,
						oldPrice: res.data.ot_price,
						
					}
					setTimeout(() => {
						this.getDom()
					}, 1000);
					// 把购物车数量缓存起来
					uni.setStorageSync('cartNum', res.data.cart_num);
					this.loadend = true;
					uni.hideLoading();
				});
			},

			//收藏
			collectionInfo() {
				this.$api.my.API_COLLECTOTHER({
					product_id: this.id
				}).then(res => {
					this.goodsInfo.is_collect = this.goodsInfo.is_collect === 0 ? 1 : 0;
					let title = this.goodsInfo.is_collect === 0 ? "已取消收藏" : "收藏成功";
					uni.showToast({
						title: title
					});
				});
			},

			// 跳转到指定位置
			jump() {
				uni.pageScrollTo({
					duration: 500,
					selector: '.param_detail',
				});
			},
			// 跳转到指定位置
			jumpTop() {
				uni.pageScrollTo({
					scrollTop: 1,
					duration: 500,
				});
			},
			// 获取dom 元素信息
			getDom() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.page_main').boundingClientRect(data => {
					this.qaramDetailTop = data.height;
				}).exec();
			}
		},
		onPageScroll(e) {
			if (e.scrollTop >= this.qaramDetailTop - 1 && this.current != 1) {
				this.current = 1;
			};
			if (e.scrollTop < this.qaramDetailTop - 1 && this.current != 0) {
				this.current = 0;
			};

		},
		onShareAppMessage(e) {
			let title = this.goodsInfo.title;
			let image = this.goodsInfo.slider_image_arr[0];
			let inviteCode = this.user.invite_code;
			let path = '/pages/index/goods/goods?id=' + this.id + '&inviteCode=' + inviteCode;
			return {
				title: title,
				path: path,
				imageUrl: image
			};
		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}

	.page {
		position: relative;
		padding-bottom: 114rpx;

		.page_main {
			.top_line {
				height: 1rpx;
				background: #EEEEEE;
				width: 100%;
			}

			.swiper_box {
				width: 100%;
				height: 729rpx;
			}

			.goods_price {
				width: 100%;
				height: 160rpx;
				background-image: url(../../../static/images/index/goods/goods_price_bg.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				padding: 34rpx 40rpx;
				display: flex;
				justify-content: space-between;

				.left {
					.price_now {
						color: #EED29C;

						.icon {
							font-size: 22rpx;
						}

						.text {
							font-size: 46rpx;
						}
					}

					.price_old {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 8rpx;

						.old {
							font-size: 24rpx;
							color: #999999;
							margin-right: 24rpx;
							text-decoration: line-through;
						}

						.discount {
							padding: 0rpx 10rpx;
							text-align: center;
							height: 26rpx;
							line-height: 26rpx;
							font-size: 18rpx;
							color: #333333;
							background: #EED29C;
						}


					}
				}

				.right {
					padding-top: 18rpx;
					text-align: right;
					.open_time {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						margin-bottom: 12rpx;
					}
					.count_down {
						display: flex;
						align-items: center;
						
						::v-deep.u-icon{
							margin-right: 8rpx;
						}
						
						.text {
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
						}
					}
				}
			}
			.goods_price_normal {
				width: 100%;
				height: 88rpx;
				padding: 34rpx 40rpx;
				display: flex;
				align-items: center;
				background: #FFFFFF;
				.price_now {
					color: #333333;
					margin-right: 16rpx;
					.icon {
						font-size: 22rpx;
					}
				
					.text {
						font-size: 46rpx;
					}
				}
				.price_old {
						font-size: 24rpx;
						color: #999999;
						margin-right: 16rpx;
						text-decoration: line-through;
				}
				.discount {
					padding: 0rpx 10rpx;
					height: 26rpx;
					line-height: 26rpx;
					text-align: center;
					background: #212121;
					font-size: 18rpx;
					color: #CCCCCC;
				}
			}

			.desc_info {
				padding: 17rpx 48rpx 24rpx;
				background: #FFFFFF;
				margin-bottom: 16rpx;
				.desc {
					display: flex;
					

					.left {
						font-size: 28rpx;
						color: #333333;
						line-height: 40rpx;
						flex-grow: 1;
						margin-right: 24rpx;
						text-align: justify;
					}

					.right {
						flex-grow: 0;
						flex-shrink: 0;
						display: flex;
						align-items: center;
						.icon_share {
							width: 36rpx;
							height: 36rpx;
							background: transparent;
							padding-left: 0;
							padding-right: 0;
							line-height: 1;
							overflow: visible;
						}

						.icon_share::after {
							border: none;
						}

						image {
							width: 36rpx;
							height: 36rpx;
						}

						.mr_24 {
							margin-right: 24rpx;
						}
					}
				}

				.label_box {
					display: flex;

					.label {
						padding: 4rpx 10rpx;
						background: #FFFFFF;
						border: 0rpx solid #212121 !important;
						margin-right: 24rpx;
						font-size: 22rpx;
						color: #333333;
						position: relative;
					}

					.label::after {
						position: absolute;
						content: '';
						width: 200% !important;
						height: 200% !important;
						left: 0;
						top: 0;
						border: 2rpx solid #212121;
						transform: scale(0.5);
						transform-origin: 0 0;
					}
				}
			}
			.mb_24 {
				margin-bottom: 24rpx;
			}

			.param {
				background: #FFFFFF;
				margin-bottom: 16rpx;

				.param_list {
					padding: 24rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.title {
						width: 100rpx;
						flex-grow: 0;
						flex-shrink: 0;
						font-size: 24rpx;
						color: #000000;
					}

					.param_info {
						flex-grow: 1;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.left {
							font-size: 24rpx;
							color: #666666;
						}

						.right {
							width: 24rpx;
							height: 24rpx;
						}
					}
				}
			}

			.brand {
				background: #FFFFFF;
				padding: 36rpx 0;
				margin-bottom: 16rpx;

				.logo {
					height: 46rpx;
					margin-bottom: 13rpx;
					display: flex;
					justify-content: center;

					.image {
						width: 100%;
						height: 100%;
					}
				}

				.brand_text {
					font-size: 26rpx;
					color: #333333;
					font-weight: 500;
					margin-bottom: 22rpx;
					text-align: center;
				}

				.brand_btn {
					width: 132rpx;
					padding: 8rpx 0rpx;
					text-align: center;
					background: rgba(0, 0, 0, 0);
					border: 0rpx solid #CCCCCC !important;
					margin: auto;
					font-size: 20rpx;
					color: #212121;
					font-weight: 500;
					position: relative;
				}

				.brand_btn::after {
					position: absolute;
					content: '';
					width: 200% !important;
					height: 200% !important;
					left: 0;
					top: 0;
					border: 2rpx solid #CCCCCC;
					transform: scale(0.5);
					transform-origin: 0 0;
				}
			}
		}



		// .param_detail {
		// 	position: sticky;
		// 	top: 0rpx;
		// 	z-index: 1;
		// }

		.goods_detail {
			background: #FFFFFF;
			width: 750rpx !important;
			overflow: hidden;

			image {
				max-width: 750rpx;
			}
		}

		.goods_footer {
			position: fixed;
			bottom: 0rpx;
			left: 0rpx;
			width: 100%;
			padding: 22rpx 24rpx;
			
			background: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 100;
			.down-tips {
				width: 100%;
				height: 66rpx;
				line-height: 66rpx;
				text-align: center;
				background: #CCCCCC;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
			.left {
				flex-grow: 0;
				display: flex;
				align-items: center;
				padding-left: 16rpx;
				.mr_50 {
					margin-right: 50rpx;
				}

				.consult,
				.shopping_cart {
					.icon {
						text-align: center;
						margin-bottom: 2rpx;
						position: relative;

						.cart_num {
							position: absolute;
							right: 0rpx;
							top: 0rpx;
							width: 24rpx;
							height: 24rpx;
							background: #F1444D;
							border-radius: 50rpx;
							text-align: center;
							line-height: 24rpx;
							font-size: 16rpx;
							color: #FFFFFF;
						}
					}

					.text {
						font-size: 22rpx;
						color: #333333;
					}
				}
			}

			.right {
				display: flex;

				.add_cart {
					width: 230rpx;
					height: 66rpx;
					text-align: center;
					line-height: 66rpx;
					background: #FFFFFF;
					border: 0rpx solid #212121;
					font-size: 24rpx;
					color: #333333;
					margin-right: 16rpx;
					position: relative;
				}
				.add_cart::after {
					position: absolute;
					content: '';
					width: 200% !important;
					height: 200% !important;
					left: 0;
					top: 0;
					border: 2rpx solid #212121;
					transform: scale(0.5);
					transform-origin: 0 0;
				}

				.buy_now,.sale_remind{
					width: 230rpx;
					height: 66rpx;
					text-align: center;
					line-height: 66rpx;
					background: #212121;
					font-size: 24rpx;
					color: #FFFFFF;
				}
				
				.sale_remind_disable {
					width: 230px;
					height: 66px;
					background: #CCCCCC;
					text-align: center;
					line-height: 66rpx;
					font-size: 24rpx;
					color: #FFFFFF;
				}
			}
		}

		.goods_footer_x {
			padding-bottom: 90rpx;
		}
	}

	.page_x {
		padding-bottom: 190rpx;
	}
</style>
