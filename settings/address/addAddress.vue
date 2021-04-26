<template>
	<view class="content_main">

		<u-navbar title="添加新地址" :custom-back="$goback"></u-navbar>

		<view class="content_box">

			<view class="box_item">

				<view class="item_line">
					<view class="line_name">姓名</view>
					<view class="line_input">
						<u-input style="width: 100%;" v-model="form.name" type="text" :border="false" placeholder="请输入你的真实姓名" maxlength="20" placeholder-style="color: #CCCCCC;font-size: 26rpx;" @input="changeNum"/>
					</view>
				</view>

				<view class="item_line">
					<view class="line_name">手机号码</view>
					<view class="line_input">
						<u-input style="width: 100%;" v-model="form.tel" type="number"  :border="false" placeholder="请输入手机号码" maxlength="11" placeholder-style="color: #CCCCCC;font-size: 26rpx;"/>
					</view>
				</view>

				<view class="item_line">
					<view class="line_name">所在地区</view>
					<view class="line_input"  @click="showRegion = true">
						<view class="input_color" v-if="form.region.length==0">省、市、县（区)</view>
						<view v-else>{{form.region}}</view>
					</view>
					<u-picker mode="region" v-model="showRegion" @confirm="changeRegion"></u-picker>
				</view>

				<view class="item_line" style="border-bottom: 0;height: auto;">
					<view class="line_name">详细地址</view>
					<view class="line_input">
						<u-input style="width: 100%;" height="80" maxlength="30" v-model="form.address" type="textarea" :border="false" placeholder="街道/门牌号" placeholder-style="color: #CCCCCC;font-size: 26rpx;" :auto-height="true"/>
					</view>
				</view>


			</view>
			
			<view class="box_item" style="border-top: 4rpx solid #EEEEEE">
				
				<view class="item_line item_teShu">
					<view>设为默认地址 <u-checkbox v-model="form.default" shape="circle" size="28" style="margin-left: 40rpx;"></u-checkbox></view>
				</view>
				
			</view>

		</view>

<!-- 		<view class="content_agreement" :style="phoneModel=='iPhone X'?'height: 120rpx;':'height: 24rpx'">
			<u-checkbox v-model="form.agreement" shape="circle" size="28"></u-checkbox>同意 <text style="color:#2A95E5;">《隐私政策》</text>，以上信息仅用于下单和收货
		</view> -->
		
		<pageBottom title="保存" @footerBtnEvent="addressInfo"></pageBottom>

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
				phoneModel: uni.getStorageSync('phoneModel'),
				showRegion: false, //地区选择
				form: {
					id: '',
					name: '', //姓名
					tel: '', //电话
					region: '', //所在地区
					province: '', //省
					city: '', //市
					district: '', //区
					address: '', //详细地址
					default: true, //设为默认地址
					// agreement: true, //协议
					delete: false, //判断有没有删除
				},
				provinceData:[],//省数据
				cityData: [], //市
				districtData: [], //区
			}
		},
		onLoad(option) {
			if (option.addressData != undefined) {
				let bojItem = JSON.parse(option.addressData)
				this.form = {
					id: bojItem.id,
					name: bojItem.name, //姓名
					tel: bojItem.phone, //电话
					region: bojItem.province + bojItem.city + bojItem.district, //所在地区
					province: bojItem.province, //省
					city: bojItem.city, //市
					district: bojItem.district, //区
					address: bojItem.detail, //详细地址
					default: bojItem.is_default == 1 ? true : false, //设为默认地址
					// agreement: true, //协议
					delete: true, //判断有没有删除
				}
			}
			// this.getAddressInfo();
		},
		methods: {
			
			// //获取省
			// getAddressInfo(){
			// 	let that = this;
			// 	that.$api.my.API_GETREGIONLIST().then(res => {
			// 		if(res.data.length !=0){
			// 			res.data.forEach(item=>{
			// 				if(item.level==1){
			// 					that.provinceData.push(item);//省数据
			// 				}
			// 				if(item.level==2){
			// 					that.cityData.push(item);//市
			// 				}
			// 				if(item.level==3){
			// 					that.districtData.push(item); //区
			// 				}
			// 			})
			// 		}
			// 		console.log(that.provinceData)
			// 		console.log(that.cityData)
			// 		console.log(that.districtData)
			// 	});
			// },
			
			inputChange() { //输入框值改变
			console.log(1)
			        this.form.tel = this.form.tel.replace(/[^\d]/g, '')
			    },
			
			
			//选择地区返回
			changeRegion(e) {
				let that = this;
				that.form.region = e.province.label + e.city.label + e.area.label;
				that.form.province = e.province.value;
				that.form.city = e.city.value;
				that.form.district = e.area.value;
			},
		
			//新增，修改收货地址
			addressInfo() {
				let that = this;
				if (that.form.name.length == 0) {
					that.$u.toast("姓名不能为空!");
					return
				}
				if (that.form.tel.length == 0) {
					that.$u.toast("手机号码不能为空!");
					return
				}
				if(that.$changePhone(that.form.tel)){
					that.$u.toast("手机号码输入格式不正确");
					return
				}
				if (that.form.region.length == 0) {
					that.$u.toast("所在地区不能为空!");
					return
				}
				if (that.form.address.length == 0) {
					that.$u.toast("详细地址不能为空!");
					return
				}
				// if (!that.form.agreement) {
				// 	that.$u.toast("未勾选《隐私政策》!!!");
				// 	return
				// }
				if(that.form.delete){//判断是新增还是修改
					that.$api.my.API_ADDRESSEDIT({
						address_id:that.form.id,
						name: that.form.name, //名字
						phone: that.form.tel, //电话
						province_code: that.form.province, //省
						city_code: that.form.city, //市
						district_code: that.form.district, //区
						detail: that.form.address, //详细地址
						is_default: !that.form.default ? '' : '1', //默认
						address_type:1
					}).then(res => {
						uni.showToast({
							title: '修改地址成功!'
						});
						setTimeout(() => {
							that.$goback();
						}, 800)
					});
				}else{
					that.$api.my.API_ADDRESSADD({
						name: that.form.name, //名字
						phone: that.form.tel, //电话
						province_code: that.form.province, //省
						city_code: that.form.city, //市
						district_code: that.form.district, //区
						detail: that.form.address, //详细地址
						is_default: !that.form.default ? '' : '1', //默认
						address_type:1
					}).then(res => {
						uni.showToast({
							title: '新增地址成功!'
						});
						setTimeout(() => {
							that.$goback();
						}, 800)
					});
				}
			},
			
			//判断
			changeNum(e){
				let that = this;
				if(e.length==20){
					that.$u.toast("名字最多输入20个字符");
					return
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background-color: #FFFFFF;
		height: 100%;
		position: relative;

		.content_box {

			.box_item {
				border-top:8rpx solid rgba(0, 0, 0, 0.1);
				padding: 0 30rpx;

				.item_line {
					width: 100%;
					height: 100rpx;
					display: flex;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

					::v-deep.u-checkbox {
						width: 30rpx;
					}
					
					::v-deep.u-input__textarea{
						min-height: 0 !important;
					}

					.line_name {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						width: 125rpx;
						height: 100rpx;
						line-height: 100rpx;
					}

					.line_input {
						align-items: center;
						display: flex;
						margin-left: 25rpx;
						justify-content: space-between;
						width: calc(100% - 110rpx);
						
						.input_color{
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #CCCCCC;
						}
						
					}

				}

				.item_teShu {
					border-bottom: 0;
					align-items: center;
					display: flex;
					justify-content: space-between;
				}

			}

		}

		.content_agreement {
			width: 100%;
			position: absolute;
			bottom: 123rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;

			::v-deep.u-checkbox {
				width: 40rpx;
			}

		}

	}
</style>
