<template>
	<view class="content_main">

		<!-- 导航栏及标题 -->
		<u-navbar title="购物车" :is-back="false" :is-fixed="true">
			<view class="slot-wrap" v-if="goodsData.length!=0">
				<view @click="switchInfo" v-if="showInfo">管理</view>
				<view @click="switchInfo" v-else>完成</view>
			</view>
		</u-navbar>

		<!-- 框架标题栏站位 -->
		<view :style="heightInfo + 'px'"></view>

		<view class="box_main" v-if="goodsData.length!=0">

			<view class="box_block" v-for="(item,index) in goodsData" :key="index">

				<view class="box_supplier">



					<view class="supplier_choose" @click="changeSupplier(index)">
						<image src="/static/images/shopping/icon_true.png" v-if="item.supplierCheckd"></image>
						<image src="/static/images/shopping/icon_false.png" v-else></image>
					</view>


					<view class="supplier_logo">
						<imageBox :imageUrl="item.provider_info.provider_logo" width="36rpx" height="36rpx"
							shape="circle"></imageBox>
					</view>

					<view class="supplier_name">{{item.provider_info.provider_name}}</view>

				</view>

				<view class="box_product">

					<uni-swipe-action>
						<uni-swipe-action-item :right-options="options" v-for="(childItem,childIndex) in item.products"
							:key="childIndex" @click="deleteCollection(index,childIndex)">

							<view class="block_item" :style="childIndex < item.products.length-1?'':'border-bottom:0'">

								<view class="block_line">

									<template v-if="childItem.product_status==1 && childItem.stock_num>0 || !showInfo">

										<view class="block_choose" @click="changeSingle(index,childIndex)">
											<image src="/static/images/shopping/icon_true.png"
												v-show="childItem.product_status==1 || !showInfo"
												v-if="childItem.checked"></image>
											<image src="/static/images/shopping/icon_false.png"
												v-show="childItem.product_status==1 || !showInfo" v-else></image>
										</view>

									</template>

									<template v-else>

										<view class="block_choose">
											<!-- <image src="/static/images/shopping/icon_true.png"
												v-show="childItem.status==1 || !showInfo" v-if="childItem.checked"></image>
											<image src="/static/images/shopping/icon_false.png"
												v-show="childItem.status==1 || !showInfo" v-else></image> -->
										</view>

									</template>





									<view class="block_main">

										<template
											v-if="childItem.product_status==1 && childItem.stock_num>0 || !showInfo">

											<view class="block_img" @click="jumpPage(1,index,childIndex)">
												<imageBox :imageUrl="childItem.image" width="140rpx" height="140rpx">
												</imageBox>
											</view>

										</template>

										<template v-else>

											<view class="block_img">
												<imageBox :imageUrl="childItem.image" width="140rpx" height="140rpx">
												</imageBox>
											</view>

										</template>

										<view class="block_info">

											<view class="info_title" v-if="childItem.product_status==1 "
												@click="jumpPage(1,index,childIndex)">
												{{childItem.title}}
											</view>

											<view class="info_decline" v-else @click="jumpPage(1,index,childIndex)">
												{{childItem.title}}
											</view>

											<view class="info_tops" @click="jumpPage(1,index,childIndex)">
												{{childItem.suk}}
											</view>

											<view class="info_main">

												<template v-if="childItem.product_status==1 && childItem.stock_num>0">

													<view class="info_num">
														<view class="num_price font_family_din">￥{{childItem.price}}
														</view>
														<view class="num_discount font_family_din">
															￥{{childItem.ot_price}}</view>
													</view>

													<view class="info_add">
														<u-number-box bg-color="#FFFFFF" :disabled-input="true"
															v-model="childItem.cart_num" :min="1"
															:max="childItem.stock_num"
															@plus="changeNum(index,childIndex)"
															@minus="changeNum(index,childIndex)">
														</u-number-box>
													</view>

												</template>

												<template v-if="childItem.product_status==2">

													<view class="info_num">
														<view class="num_title">该产品已下架</view>
													</view>

												</template>

												<template v-if="childItem.product_status !=2 && childItem.stock_num==0">

													<view class="info_num">
														<view class="num_title">请重新选择商品规格</view>
													</view>

													<view class="info_add">
														<view class="info_button"
															@click="reselectInfo(index,childIndex)">重选
														</view>
													</view>

												</template>


											</view>

										</view>

									</view>

								</view>

							</view>

						</uni-swipe-action-item>
					</uni-swipe-action>


				</view>

			</view>


		</view>

		<view class="box_bottom" v-if="goodsData.length!=0" :style="phoneModel=='iPhone X'?'height: 160rpx;':''">

			<view class="bottom_choose" @click="changeAll">
				<image src="/static/images/shopping/icon_true.png" v-if="checkedAll"></image>
				<image src="/static/images/shopping/icon_false.png" v-else></image>
				<text class="choose_color">全选</text>
			</view>

			<view class="bottom_all">
				<view class="bottom_num" v-if="showInfo">合计金额:<text class="num_color">￥{{priceAll}}</text></view>
				<view class="bottom_button" v-if="showInfo && priceAll !=0" @click="settlement">结算</view>
				<view class="bottom_button bottom_color" v-if="showInfo && priceAll==0">结算</view>
				<view class="bottom_button" v-if="!showInfo && priceAll !=0" @click="deleteInfo">删除</view>
				<view class="bottom_button bottom_color" v-if="!showInfo && priceAll ==0">删除</view>
			</view>

		</view>

		<view class="box_img" v-if="goodsData.length==0">
			<view class="img_png">
				<image src="../../static/images/shopping/shopping_no.png"></image>
				<view class="img_title">空空如也，啥也没有</view>
				<view class="img_address">
					<view class="add_button" @click="jumpPage(0)">去购物</view>
				</view>
			</view>
		</view>

		<!-- 底部选择规格 end -->
		<skuChoose v-if="skuShow" :goodsId="goodsFrm.productId" type="reselectCart" :skuShow="skuShow"
			@closeSku="closeSku" :attr="goodsFrm.productAttr" :attrValues="goodsFrm.productAttrValues"
			@saveSku="reselectSku"></skuChoose>

	</view>
</template>

<script>
	import imageBox from '@/component/common/imageBox.vue';
	import skuChoose from '@/component/index/goods/skuChoose.vue';
	export default {
		components: {
			imageBox,
			skuChoose
		},
		data() {
			return {
				phoneModel: uni.getStorageSync('phoneModel'),
				heightInfo: '', //顶部栏高度
				showInfo: true, //切换管理 完成
				goodsData: [], //购物车数据
				checkedAll: false, //全选
				priceAll: 0, //总计
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				skuShow: false, // 规格选择控制
				goodsFrm: {
					productId: '', //商品id
					cartId: '', //购物车id
					productAttr: '',
					productAttrValues: '',
				}, //商品一些数据
				selectData: [], //选择的id缓存
				selectId: '', //获取缓存id的值
			}
		},
		onShow() {
			if (this.$cache('selectId')) { //先判断缓存id有没有
				this.selectId = this.$cache('selectId');
				this.selectData = this.selectId.length == 0 ? [] : this.selectId.split(',');
			}else{
				this.selectId = "";
				this.selectData = [];
			}
			this.getCartInfo();
			this.checkedAll= false; //全选
			// this.showInfo= true; //切换管理 完成
		},
		onLoad() {
			this.heightInfo = getApp().globalData.heightInfo; //标题栏高度
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getCartInfo();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {

			//获取购物车数据
			getCartInfo() {
				let that = this;
				that.$api.shopping.API_CARTLIST({
					cart_ids: that.selectId
				}).then(res => {
					that.priceAll = res.data.confirm_price;
					that.goodsData = res.data.normal_products;
					that.goodsData.forEach(item => {
						that.$set(item, 'supplierCheckd', false);
						item.products.forEach(childItem => {
							that.$set(childItem, 'checked', false);
						})
					})

					//判断缓存的id 勾选
					if (that.selectData.length != 0) {
						let allLength = 0; //判断全选有没有勾
						that.goodsData.forEach((item, index) => {
							let childLength = 0; //判断供应商有没有勾
							let checkedLength = 0; //判断能选择的数量
							item.products.forEach((childItem, childIndex) => {
								if (childItem.product_status == 1 && childItem.stock_num > 0) {
									checkedLength++
								}
								that.selectData.forEach(temp => {
									if (temp == childItem.cart_id) {
										that.$set(childItem, 'checked', true);
										childLength++
									}
								})
							})
							if(that.showInfo){//判断是管理 还是 完成 操作值不同
								if (childLength == checkedLength) {
									that.$set(item, 'supplierCheckd', true);
								} else {
									that.$set(item, 'supplierCheckd', false);
								}
								if (item.supplierCheckd) {
									if (item.checkbox_disabled) {
										that.$set(item, 'supplierCheckd', false);
									}
									allLength++
								}
							}else{
								if (childLength == item.products.length) {
									that.$set(item, 'supplierCheckd', true);
								} else {
									that.$set(item, 'supplierCheckd', false);
								}
								if (item.supplierCheckd) {
									allLength++
								}
							}
						})
						if (allLength == that.goodsData.length) {
							that.checkedAll = true;
						} else {
							that.checkedAll = false;
						}
					}
				});
			},

			//获取计算金额
			getCartPrice(val) {
				let that = this;
				uni.showLoading({
					title: '拼命加载中',
					mask: true
				});
				that.$api.shopping.API_CARTLIST({
					cart_ids: val
				}).then(res => {
					that.priceAll = res.data.confirm_price;
					uni.hideLoading();
				});
			},

			//选择供应商
			changeSupplier(index) {
				let that = this;
				let allCheckbox = that.goodsData.length; //供应商
				let isChecked = 0; //点击勾选的数量
				that.goodsData[index].supplierCheckd = !that.goodsData[index].supplierCheckd;
				if (that.showInfo) {
					if (that.goodsData[index].supplierCheckd) {
						that.goodsData[index].products.forEach(item => {
							if (item.product_status == 1 && item.stock_num > 0) {
								that.$set(item, 'checked', true);
							}
						})
					} else {
						that.goodsData[index].products.forEach(item => {
							if (item.product_status == 1 && item.stock_num > 0) {
								that.$set(item, 'checked', false);
							}
						})
					}
				} else {
					if (that.goodsData[index].supplierCheckd) {
						that.goodsData[index].products.forEach(item => {
							that.$set(item, 'checked', true);
						})
					} else {
						that.goodsData[index].products.forEach(item => {
							that.$set(item, 'checked', false);
						})
					}
				}
				that.changeComm();
			},

			//点击图片单选
			changeSingle(index, childIndex) {
				let that = this;
				let allCheckbox = that.goodsData.length; //供应商
				let supplierCheckbox = 0; //供应商下面商品的数量
				let isChecked = 0; //点击勾选的数量
				let supplierChecked = 0; //点击供应商勾选的数量
				that.goodsData[index].products[childIndex].checked = !that.goodsData[index].products[childIndex].checked;
				that.changeComm();
			},
			
			//全选
			changeAll() {
				let that = this;
				that.checkedAll = !that.checkedAll;
				if (that.showInfo) {
					if (that.checkedAll) {
						that.goodsData.forEach(item => {
							item.products.forEach(childItem => {
								if (childItem.product_status == 1 && childItem.stock_num > 0) {
									that.$set(childItem, 'checked', true);
								}
							})
						})
					} else {
						that.goodsData.forEach(item => {
							that.$set(item, 'supplierCheckd', false);
							item.products.forEach(childItem => {
								if (childItem.product_status == 1 && childItem.stock_num > 0) {
									that.$set(childItem, 'checked', false);
								}
							})
						})
					}
				} else {
					if (that.checkedAll) {
						that.goodsData.forEach(item => {
							that.$set(item, 'supplierCheckd', true);
							item.products.forEach(childItem => {
								that.$set(childItem, 'checked', true);
							})
						})
					} else {
						that.goodsData.forEach(item => {
							that.$set(item, 'supplierCheckd', false);
							item.products.forEach(childItem => {
								that.$set(childItem, 'checked', false);
							})
						})
					}
				}
				that.changeComm();
			},
			
			//切换管理 完成
			switchInfo() {
				let that = this;
				that.showInfo = !that.showInfo;
				that.goodsData.forEach(item => {
					item.products.forEach((childItem, childIndex) => {
						if (childItem.product_status != 1 || childItem.stock_num == 0) {
							that.$set(childItem, 'checked', false);
						}
					})
				})
				that.changeComm();
			},

			//全局调用
			changeComm() {
				let that = this;
				if (that.showInfo) {
					let allLength = 0; //判断全选有没有勾
					that.goodsData.forEach((item, index) => {
						let childLength = 0; //判断供应商有没有勾
						let checkedLength = 0; //判断能选择的数量
						item.products.forEach((childItem, childIndex) => {
							if (childItem.product_status == 1 && childItem.stock_num > 0) {
								checkedLength++
							}
							if (childItem.checked) {
								childLength++
							}
						})
						if (childLength == checkedLength) {
							that.$set(item, 'supplierCheckd', true);
						} else {
							that.$set(item, 'supplierCheckd', false);
						}
						if (that.goodsData.length>1) {
							if(item.supplierCheckd){
								allLength++
							}
							if (item.checkbox_disabled) {
								that.$set(item, 'supplierCheckd', false);
							}
						}else{
							if(item.supplierCheckd){
								if(item.checkbox_disabled){
									that.$set(item, 'supplierCheckd', false);
									allLength=0
								}else{
									allLength++
								}
							}
						}
					})
					if (allLength == that.goodsData.length) {
						that.checkedAll = true;
					} else {
						that.checkedAll = false;
					}
				} else {
					let allLength = 0; //判断全选有没有勾
					that.goodsData.forEach((item, index) => {
						let childLength = 0; //判断供应商有没有勾
						let checkedLength = 0; //判断能选择的数量
						item.products.forEach((childItem, childIndex) => {
							if (childItem.checked) {
								childLength++
							}
						})
						if (childLength == item.products.length) {
							that.$set(item, 'supplierCheckd', true);
						} else {
							that.$set(item, 'supplierCheckd', false);
						}
						if (item.supplierCheckd) {
							allLength++
						}
					})
					if (allLength == that.goodsData.length) {
						that.checkedAll = true;
					} else {
						that.checkedAll = false;
					}
				}
				that.changePrice();
			},
			
			//计算勾选的长度及计算金额
			changePrice(){
				let that = this;
				//判断当个勾选 全选要不要勾选及计算金额
				let obj = []; //当个勾选的cart_id
				that.goodsData.forEach(item => {
					item.products.forEach(childItem => {
						if(that.showInfo){
							if (childItem.checked && childItem.product_status == 1 && childItem.stock_num >
								0) {
								obj.push(childItem.cart_id)
							}
						}else{
							if (childItem.checked) {
								obj.push(childItem.cart_id)
							}
						}
					})
				})
				if (obj.length != 0) {
					that.$cache('selectId', obj.join());
					that.selectId = that.$cache('selectId');
					that.selectData = that.selectId.length == 0 ? [] : that.selectId.split(',');
				} else {
					that.$cache('selectId', null);
					that.selectId = "";
					that.selectData = [];
				}
				that.getCartPrice(obj.join());
			},

			//结算跳转
			settlement() {
				let that = this;
				if (this.$cache('selectId')) { //先判断缓存id有没有
					this.selectId = this.$cache('selectId');
					this.selectData = this.selectId.length == 0 ? [] : this.selectId.split(',');
				}
				this.$jumpPage('/pages/my/order/orderSettlement', {
					cartId: this.selectData.join()
				});
			},

			//删除购物车
			deleteInfo() {
				let that = this;
				let obj = [];
				that.goodsData.forEach(item => {
					item.products.forEach(childItem => {
						if (childItem.checked) {
							obj.push(childItem.cart_id)
						}
					})
				})
				if (obj.length == 0) {
					that.$u.toast("请选择删除商品!");
					return
				}
				uni.showModal({
					title: '提示',
					content: '您确定要删除选中商品吗?',
					success: function(res) {
						if (res.confirm) {
							that.$api.shopping.API_CARTDEL({
								cart_ids: obj.join()
							}).then(res => {
								uni.showToast({
									title: '删除成功',
									duration: 2000
								});
								
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			//去购物
			jumpPage(val, index, childIndex) {
				let that = this;
				switch (val) {
					case 0:
						that.$jumpPage('/pages/index/index', '', 'pushTab');
						break;
					case 1:
						that.$jumpPage('/pages/index/goods/goods', {
							id: that.goodsData[index].products[childIndex].product_id
						});
						break;
				}
			},

			//删除
			deleteCollection(index, childIndex) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '您确定要删除选中商品吗?',
					success: function(res) {
						if (res.confirm) {
							that.$api.shopping.API_CARTDEL({
								cart_ids: that.goodsData[index].products[childIndex].cart_id
							}).then(res => {
								that.selectData.forEach((item,delIndex)=>{
									if(item==that.goodsData[index].products[childIndex].cart_id){
										that.selectData.splice(delIndex,1)
									}
								})
								if(that.selectData.length!=0){
									that.$cache('selectId', that.selectData.join());
								}else{
									that.$cache('selectId', null);
									that.checkedAll= false;
								}
								if(!that.showInfo){
									if (that.checkedAll) {
										that.goodsData.forEach(item => {
											that.$set(item, 'supplierCheckd', true);
											item.products.forEach(childItem => {
												that.$set(childItem, 'checked', true);
											})
										})
									}
								}
								uni.showToast({
									title: '删除成功',
									duration: 2000
								});
								that.getCartInfo();
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			
			//添加数量
			changeNum(index, childIndex) {
				let that = this;
				//加减请求 编辑
				that.$api.shopping.API_CARTEDIT({
					cart_id: that.goodsData[index].products[childIndex].cart_id,
					cart_num: that.goodsData[index].products[childIndex].cart_num,
				}).then(res => {
					if (that.goodsData[index].products[childIndex].checked) {
						if (that.$cache('selectId')) { //先判断缓存id有没有
							that.selectId = that.$cache('selectId');
						}
						that.getCartPrice(that.selectId);
					}
				});
			},
			
			//重新选择规格
			reselectInfo(index, childIndex) {
				let that = this;
				that.goodsFrm.productId = that.goodsData[index].products[childIndex].product_id;
				that.goodsFrm.cartId = that.goodsData[index].products[childIndex].cart_id;
				that.$api.index.GOODS_DETAIL({
					product_id: that.goodsFrm.productId
				}).then(res => {
					that.goodsFrm.productAttr = res.data.product_attr;
					that.goodsFrm.productAttrValues = res.data.product_attr_values;
					that.skuShow = true;
				});
			},
			
			//关闭重选规格
			closeSku(e) {
				let that = this;
				that.skuShow = false;
			},
			
			//重新编辑购物车
			reselectSku(val) {
				let that = this;
				that.$api.shopping.API_CARTEDIT({
					cart_id: that.goodsFrm.cartId,
					cart_num: val.number,
					product_id: that.goodsFrm.productId,
					product_attr_unique: val.unique,
				}).then(res => {
					that.getCartInfo();
					that.skuShow = false;
				});
			},
			


		}
	}
</script>

<style lang="scss">
	page {
		background: #EEEEEE;
	}

	.content_main {
		min-height: 100%;
		position: relative;
		width: 100%;
		background: #EEEEEE;
		display: flex;
		flex-direction: column;

		.slot-wrap {
			display: flex;
			align-items: center;
			padding-left: 31rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #212121;
		}

		.box_main {
			padding-bottom: 100rpx;
			width: 100%;

			.box_block {
				width: 100%;
				background: #FFFFFF;
				margin-bottom: 16rpx;

				.box_supplier {
					width: 100%;
					height: 88rpx;
					display: flex;
					align-items: center;
					padding: 0 24rpx;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

					.supplier_choose {
						width: 24rpx;
						height: 88rpx;
						display: flex;
						align-items: center;
						margin-right: 24rpx;

						image {
							width: 24rpx;
							height: 24rpx;
						}

					}


					.supplier_logo {
						width: 36rpx;
						height: 36rpx;
						border-radius: 50rpx;

						image {
							width: 36rpx;
							height: 36rpx;
						}

						::v-deep.u-image__image {
							display: flex;
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
					padding: 0 24rpx;


					.block_item {
						height: 195rpx;
						width: 100%;
						border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
						padding-bottom: 8rpx;
						padding-top: 7rpx;

						.block_line {
							display: flex;
							align-items: center;
							height: 180rpx;
							width: 100%;

							.block_choose {
								width: 24rpx;
								margin-right: 18rpx;
								height: 180rpx;
								display: flex;
								align-items: center;

								image {
									width: 24rpx;
									height: 24rpx;
								}

							}



							.block_main {
								display: flex;
								align-items: center;
								width: calc(100% - 40rpx);

								.block_img {
									width: 140rpx;
									height: 140rpx;

									image {
										width: 100%;
										height: 100%;
									}

								}

								.block_info {
									margin-left: 24rpx;
									width: 500rpx;
									height: 140rpx;
									padding-right: 20rpx;

									.info_title {
										height: 40rpx;
										font-size: 28rpx;
										font-family: PingFang SC;
										font-weight: 400;
										color: #333333;
										margin-bottom: 8rpx;
										ext-overflow: -o-ellipsis-lastline;
										overflow: hidden;
										text-overflow: ellipsis;
										display: -webkit-box;
										-webkit-line-clamp: 1;
										line-clamp: 1;
										-webkit-box-orient: vertical;
									}

									.info_decline {
										height: 40rpx;
										font-size: 28rpx;
										font-family: PingFang SC;
										font-weight: 400;
										color: #CCCCCC;
										margin-bottom: 8rpx;
										ext-overflow: -o-ellipsis-lastline;
										overflow: hidden;
										text-overflow: ellipsis;
										display: -webkit-box;
										-webkit-line-clamp: 1;
										line-clamp: 1;
										-webkit-box-orient: vertical;
									}

									.info_tops {
										height: 30rpx;
										font-size: 22rpx;
										font-family: PingFang SC;
										font-weight: 400;
										color: #999999;
										margin-bottom: 19rpx;
									}

									.info_main {
										display: flex;
										align-items: flex-end;
										justify-content: space-between;

										.info_num {
											display: flex;
											align-items: center;
											height: 42rpx;

											.num_price {
												height: 42rpx;
												font-size: 30rpx;
												font-weight: bold;
												color: #E76234;
											}

											.num_discount {
												height: 33rpx;
												font-size: 24rpx;
												font-family: PingFang SC;
												font-weight: 400;
												text-decoration: line-through;
												color: #999999;
												margin-left: 16rpx;
											}

											.num_title {
												height: 33rpx;
												font-size: 24rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: #E76234;
											}

										}

										.info_add {


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

											.info_button {
												width: 140rpx;
												height: 36rpx;
												background: #FFFFFF;
												border: 1px solid #212121;
												font-size: 22rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: #333333;
												text-align: center;
											}

										}

									}

								}

							}

						}


					}

				}

			}


		}

		.box_bottom {
			position: absolute;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			bottom: 0;
			position: fixed;
			background: #FFFFFF;
			padding: 16rpx 24rpx;
			z-index: 1000;

			.bottom_choose {
				display: flex;
				align-items: center;
				height: 100rpx;

				image {
					width: 24rpx;
					height: 24rpx;
				}

				.choose_color {
					margin-left: 54rpx;
					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				}

			}


			.bottom_all {
				display: flex;
				align-items: center;

				.bottom_num {
					margin-right: 53rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #212121;
					display: flex;
					align-items: center;

					.num_color {
						font-size: 26rpx;
						font-family: Adobe Heiti Std;
						font-weight: bold;
						color: #E76234;
					}

				}

				.bottom_button {
					height: 66rpx;
					width: 230rpx;
					background: #212121;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}

				.bottom_color {
					background: #CCCCCC;
				}

			}

		}

		.box_img {
			width: 100%;
			height: 100%;
			display: flex;
			justify-items: center;
			align-items: center;
			background: #FFFFFF;
			flex: 1;

			.img_png {
				width: 100%;
				text-align: center;

				image {
					width: 160rpx;
					height: 160rpx;

				}

				.img_title {
					width: 100%;
					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					margin: 0 auto;
					margin-top: 80rpx;
				}


				.img_address {
					width: 100%;
					margin-top: 80rpx;


					.add_button {
						height: 66rpx;
						background: #FFFFFF;
						border: 1px solid #212121;
						text-align: center;
						line-height: 66rpx;
						width: 230rpx;
						color: #333333;
						font-size: 24rpx;
						margin: 0 auto;
					}

				}

			}


		}
	}
</style>
