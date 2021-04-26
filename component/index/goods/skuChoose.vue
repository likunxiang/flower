<template>
	<view class="">
		<u-popup v-model="skuShow" mode="bottom" width="100%" :mask-close-able="false">
			<view :class="'content ' + (phoneModel?'content_x':'')">
				<view class="padr_30">
					<view class="close_icon" @click="closeSku">
						<u-icon name="close" custom-prefix="custom-icon" size="36" color="#212121"></u-icon>
					</view>
					<view class="good_info">
						<imageBox width="160rpx" height="160rpx" margin="margin-right: 24rpx" :imageUrl="skuImage" @clickImage="previewImage(skuImage)"></imageBox>
						<view class="info">
							<view class="price">￥{{skuPrice}}</view>
							<view class="inventory">库存：{{skuNum}}件</view>
							<view class="selected">已选：{{skuText}}</view>
						</view>
					</view>
				</view>
				<view class="">
					<scroll-view scroll-y="true" class="scroll_box">
						<view class="sku_choose_box">
							<view class="padr_12">
								<view :class="index < attr.length-1?'mb_43':''" v-for="(attrs,index) in attr" :key="index">
									<view class="sku_title">{{attrs.attr_name}}</view>
									<view class="sku_item_box">
										<view
											:class="'sku_item mr_18 mt_18 u-line-1 ' + (skuInit.indexOf(attrVal) > -1?'sku_item_check':'')"
											v-for="(attrVal,valIndex) in attrs.attr_values" :key="valIndex"
											@click="cilckSku(index,valIndex)">{{attrVal}}</view>
									</view>
								</view>

							</view>
						</view>
						<view class="padr_30">
							<view class="counter_box">
								<view class="main">
									<view class="text">
										购买数量
									</view>
									<view class="number_box">
										<view class="reduce_box" v-if="number > 1" @click="reduce">-</view>
										<view class="reduce_box reduce_box_disable" v-else>-</view>
										<input class="number_item number_item_text u-line-1" type="number" v-model="number" @blur="editNumber" />
										<view class="add_box" @click="add" v-if="number < skuNum">+</view>
										<view class="add_box add_box_disable" v-else>+</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view :class="'footer ' + (phoneModel?'footer_x':'')" @click="$u.throttle(saveSku, 500)" v-if="skuNum > 0">
					<view class="btn">确认</view>
				</view>
				<view :class="'footer ' + (phoneModel?'footer_x':'')" v-else>
					<view class="btn btn_disable">无库存</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import imageBox from '@/component/common/imageBox.vue'
	export default {
		data() {
			return {
				phoneModel: uni.getStorageSync('phoneModel'),
				skuInit: [], // 选中的sku数组
				skuPrice: '0.00', // 现价
				skuImage: '', // 图片
				skuNum: 0, // 库存
				skuOtPrice: '0.00', // 原价
				skuId: 0, // skuid
				unique: '' ,// 唯一标识,
				number: 1, // 数量
			}
		},
		props: {
			goodsId: {
				type: Number,
				default: 0
			},
			//购物车id
			cartId: {
				type: Number,
				default: 0
			},
			type: {
				type: String,
				default: ''
			},
			skuShow: {
				type: Boolean,
				default: false
			},
			attr: {
				type: Array,
				default: () => {
					return {}
				}
			},
			attrValues: {
				type: Array,
				default: () => {
					return {}
				}
			}
		},
		components: {
			imageBox: imageBox
		},
		mounted() {
			this.checkSku();
		},
		computed: {
			skuText: {
				// getter
				get() {
					return this.skuInit.toString();
				},
				// setter
				set(newValue) {

				}
			}
		},
		methods: {
			closeSku() {
				this.$emit('closeSku');
			},
			close() {
				this.closeSku();
			},
			// 确定按钮
			saveSku() {
				let data = {
					skuImage: this.skuImage,
					skuNum: this.skuNum,
					skuPrice: this.skuPrice,
					skuOtPrice: this.skuOtPrice,
					skuId: this.skuId,
					unique: this.unique,
					number: this.number
				}
				if (this.type == 'addCart') {
					this.addCart();
				} else if (this.type == 'reselectCart'){
					
				}else{
					this.buyNow();
				}
				this.$emit('saveSku',data);
			},
			
			
			// 加入购物车
			addCart() {
				this.$api.index.ADD_CART({
					product_id: this.goodsId,
					// product_attr_unique: this.unique,
					product_sku_id: this.skuId,
					cart_num: this.number,
					// is_select: 1
				}).then(res => {
					let cartNum = uni.getStorageSync('cartNum');
					cartNum = cartNum + this.number;
					uni.setStorageSync('cartNum',cartNum);
					this.$emit('getCartNum');
					uni.showToast({
						title: res.msg
					});
				})
			},
			// 立即购买
			buyNow() {
				let obj = {
					product_id: this.goodsId,
					// product_attr_unique: this.unique,
					product_sku_id: this.skuId,
					cart_num: this.number
				}
				let json = JSON.stringify([obj]);
				this.$jumpPage('/pages/my/order/orderSettlement', { goods_sku_list_json: json});
			},
			// 预览图片 
			previewImage(url) {
				// 预览图片
				uni.previewImage({
					urls: [url],
					success: (res) => {
					},
					fail: (res) => {
						console.log('失败',res);
					}
				});
			},
			// 初始化选中的sku
			checkSku() {
				let sku = [];
				let attr = this.attr;
				for (let i in attr) {
					sku.push(attr[i].attr_values[0]);
				};
				this.skuInit = sku;
				this.skuText = sku.toString();
				let skuText = this.skuText;
				let attrVal = this.attrValues;
				for (let i in attrVal) {
					if (attrVal[i].suk === skuText) {
						this.skuImage = attrVal[i].image;
						this.skuNum = attrVal[i].stock_num;
						this.skuPrice = attrVal[i].price;
						this.skuOtPrice = attrVal[i].ot_price;
						this.skuId = attrVal[i].id;
						this.unique = attrVal[i].unique; // 唯一标识
					}
				}
			},
			cilckSku(index, valindex) {
				let sku = this.skuInit;
				let attr = this.attr;
				let checkSku = attr[index].attr_values[valindex];
				this.$set(this.skuInit, index, checkSku);

				let attrVal = this.attrValues;
				let skuText = sku.toString();
				for (let i in attrVal) {
					if (attrVal[i].suk === skuText) {
						this.skuImage = attrVal[i].image;
						this.skuPrice = attrVal[i].price;
						this.skuOtPrice = attrVal[i].ot_price;
						this.skuId = attrVal[i].id;
						this.unique = attrVal[i].unique; // 唯一标识
						this.skuNum = attrVal[i].stock_num;
						// 数量单独处理
						this.number = 1;
						
					}
				}

			},
			
			
			reduce() {
				this.number = this.number - 1;
			},
			add() {
				this.number = +this.number + 1;
			},
			editNumber(e) {
				if (e.detail.value > 0) {
					if (e.detail.value > this.skuNum) {
						this.number = this.skuNum;
					} else {
						this.number = e.detail.value;
					};
				} else {
					this.number = 1;
				};
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 30rpx;
		padding-right: 0rpx;
		padding-bottom: 98rpx;
		background: #FFFFFF;
		position: relative;
		.padr_30 {
			padding-right: 30rpx;
		}
		.close_icon {
			position: absolute;
			padding-left: 23rpx;
			top: 27rpx;
			right: 25rpx;
			width: 50rpx;
			height: 50rpx;
		}

		.good_info {
			display: flex;
			padding-bottom: 30rpx;
			border-bottom: 1rpx solid #CCCCCC;

			.image {
				width: 160rpx;
				height: 160rpx;
				background: #CCCCCC;
				margin-right: 24rpx;
			}

			.info {
				padding-right: 24rpx;

				.price {
					font-size: 44rpx;
					color: #212121;
					margin-bottom: 10rpx;
				}

				.inventory {
					font-size: 24rpx;
					color: #212121;
					margin-bottom: 25rpx;
				}

				.selected {
					font-size: 24rpx;
					color: #212121;
				}
			}
		}

		.scroll_box {
			width: 100%;
			max-height: 800rpx;
		}

		.sku_choose_box {
			padding-bottom: 40rpx;
			padding-top: 40rpx;

			.padr_12 {
				padding-right: 12rpx;
			}

			.mb_43 {
				margin-bottom: 43rpx;
			}

			.sku_title {
				font-size: 24rpx;
				color: #212121;
				font-weight: bold;
				margin-bottom: 19rpx;
				padding-right: 18rpx;
			}

			.sku_item_box {
				display: flex;
				flex-wrap: wrap;
				.sku_item {
					padding: 12rpx 45rpx;
					font-size: 24rpx;
					color: #212121;
					background: #FFFFFF;
					border: 1px solid #212121;
				}

				.sku_item_check {
					padding: 12rpx 45rpx;
					font-size: 24rpx;
					color: #FFFFFF;
					background: #212121;
				}

				.mr_18 {
					margin-right: 18rpx;
				}
				.mt_18 {
					margin-bottom: 18rpx;
				}
			}

		}

		.counter_box {
			padding: 40rpx 0rpx;
			border-top: 1rpx solid #CCCCCC;
			.main {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.text {
					font-size: 24rpx;
					color: #212121;
					font-weight: bold;
				}
				.number_box {
					width: 140rpx;
					display: flex;
					align-items: center;
					.reduce_box {
						width: 36rpx;
						height: 36rpx;
						line-height: 36rpx;
						font-size: 22rpx;
						background: #212121;
						text-align: center;
						color: #FFFFFF;
					}
					.reduce_box_disable {
						background: #EEEEEE;
					}
					.add_box {
						width: 36rpx;
						height: 36rpx;
						line-height: 36rpx;
						font-size: 22rpx;
						background: #212121;
						text-align: center;
						color: #FFFFFF;
					}
					.add_box_disable {
						background: #EEEEEE;
					}
					.number_item {
						width: 68rpx;
						font-size: 24rpx;
						text-align: center;
					}
				}
			}
		}


		.footer {
			width: 100%;
			padding: 0rpx 24rpx 32rpx;
			position: absolute;
			bottom: 0rpx;
			left: 0rpx;
			.btn {
				width: 100%;
				height: 66rpx;
				line-height: 66rpx;
				text-align: center;
				font-size: 24rpx;
				color: #FFFFFF;
				background: #212121;
			}
			.btn_disable {
				background: #CCCCCC;
			}
		}
		.footer_x {
			height: 166rpx;
		}
	}
	.content_x {
		padding-bottom: 167rpx;
	}
</style>
