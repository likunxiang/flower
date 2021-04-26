<template>
	<view>
		<!-- 售后地址 -->
		<u-popup v-model="showAfter" mode="bottom" :mask-close-able="false" @close="closeFrm">
			<view class="after_main">
		
				<view class="after_top">
					<view class="top_name">填写售后信息</view>
					<u-icon class="image" name="close" custom-prefix="custom-icon" size="36" color="#212121" @click="closeFrm"></u-icon>
				</view>
		
				<view class="after_content">
		
					<view class="after_line">
						<view class="line_name">所在地区</view>
						<view class="line_input">
							<u-input type="text" style="width: 100%;" :border="false" v-model="after.region" disabled  @click="showRegion=true"
								placeholder="省、市、县（区)" placeholder-style="font-size: 28rpx;color: #999999;" />
							<u-picker mode="region" v-model="showRegion" @confirm="changeRegion"></u-picker>
						</view>
					</view>
					
					<view class="after_line">
						<view class="line_name">详细地址</view>
						<view class="line_input">
							<u-input type="text" style="width: 100%;" :border="false" v-model="after.address"
								placeholder="街道/门牌号" placeholder-style="font-size: 28rpx;color: #999999;" />
						</view>
					</view>
		
					<view class="after_line">
						<view class="line_name">收件人</view>
						<view class="line_input">
							<u-input type="text" style="width: 100%;" :border="false" v-model="after.name"
								placeholder="收件人姓名" placeholder-style="font-size: 28rpx;color: #999999;" />
						</view>
					</view>
		
					<view class="after_line">
						<view class="line_name">电话</view>
						<view class="line_input">
							<u-input type="text" style="width: 100%;" :border="false" maxlength="11"
								v-model="after.phone" placeholder="联系人电话"
								placeholder-style="font-size: 28rpx;color: #999999;" />
						</view>
					</view>
		
				</view>
		
				<view class="after_bottom" @click="addressInfo">
					<view>确定</view>
				</view>
		
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props:["showAfter","afterInfo"],
		data() {
			return {
				showRegion:false,//现在地址
				after: {
					id:'',//售后地址Id
					region:"",//省市区
					province: '', //省
					city: '', //市
					district:'',//区
					address: "", //售后地址
					name: '', //收货人
					phone: '', //电话
				}
			}
		},
		methods: {
			
			//打开售后地址
			openFrm(){
				let that = this;
				that.getRefundAddress();
			},
			
			//获取售后地址
			getRefundAddress(){
				let that = this;
				that.$api.my.API_GETREFUNDADDRESS().then(res => {
					that.after={
						region:res.data.province+ res.data.city + res.data.district,//省市区
						province: res.data.province_id, //省
						city: res.data.city_id, //市
						district: res.data.district_id,//区
						address:  res.data.detail, //售后地址
						name:  res.data.name, //收货人
						phone:  res.data.phone, //电话
					}
				});
			},
			
			//关闭售后地址
			closeFrm(){
				let that=this;
				that.showRegion=false;
				that.after= {
					id:'',//售后地址Id
					region:"",//省市区
					province: '', //省
					city: '', //市
					district:'',//区
					address: "", //售后地址
					name: '', //收货人
					phone: '', //电话
				}
				that.$emit("close")
			},
			
			//选择地区返回
			changeRegion(e) {
				let that = this;
				that.after.region = e.province.label + e.city.label + e.area.label;
				that.after.province = e.province.value;
				that.after.city = e.city.value;
				that.after.district = e.area.value;
			},
			
			//新增，修改收货地址
			addressInfo() {
				let that = this;
				if (that.after.region.length == 0) {
					that.$u.toast("所在地区不能为空!");
					return
				}
				if (that.after.address.length == 0) {
					that.$u.toast("详细地址不能为空!");
					return
				}
				if (that.after.name.length == 0) {
					that.$u.toast("收件人不能为空!");
					return
				}
				if (that.after.phone.length == 0) {
					that.$u.toast("电话不能为空!");
					return
				}
				that.$api.my.API_ADDRESSADD({
					name: that.after.name, //名字
					phone: that.after.phone, //电话
					province_code: that.after.province, //省
					city_code: that.after.city, //市
					district_code: that.after.district, //区
					detail: that.after.address, //详细地址
					is_default: '', //默认
					address_type:2
				}).then(res => {
					uni.showToast({
						title: res.msg
					});
					setTimeout(() => {
						that.closeAfter();
					}, 800)
				});
			},
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.after_main {
		width: 100%;
		padding-bottom: 30rpx;
	
		.after_top {
			padding: 0 40rpx;
			height: 50rpx;
			margin-top: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
	
			.top_name {
				font-size: 36rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
			}
	
			image {
				width: 24rpx;
				height: 24rpx;
			}
	
	
		}
	
		.after_content {
			margin-top: 60rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
	
			.after_line {
				height: 90rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
	
				.line_name {
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					width: 112rpx;
				}
	
				.line_input {
					margin-left: 32rpx;
					width: calc(100% - 160rpx);
				}
	
			}
	
		}
	
		.after_bottom {
			margin: 0 25rpx;
			height: 66rpx;
			background: #212121;
			color: #FFFFFF;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			align-items: center;
			display: flex;
			justify-content: space-around;
			margin-top: 40rpx;
		}
	
	}
	
</style>
