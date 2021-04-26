<template>
	<view class="content_main">

		<u-navbar title="选择反馈类型" :custom-back="$goback"></u-navbar>

		<view class="content_box">
			
			
			<view class="block_line" v-for="(item,index) in typeData" :key="index">
				
				<view class="line_name">{{item.name}}</view>
				
				<view class="line_checked">
					<u-checkbox v-model="item.checked" shape="circle" size="24" @change="changeClick"></u-checkbox>
				</view>
				
			</view>

		</view>


		<pageBottom title="确定" @footerBtnEvent="submit"></pageBottom>

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
				typeData:[
					{
						name:'商品相关',
						checked:false
					},
					{
						name:'产品建议',
						checked:false
					},
					{
						name:'违规举报',
						checked:false
					},
					{
						name:'优惠活动',
						checked:false
					},
					{
						name:'功能异常',
						checked:false
					},
					{
						name:'其它',
						checked:false
					},
				]
			}
		},
		methods: {
			
			//选择类型
			changeClick(e) {
				let that = this;
				that.typeData.forEach(item => {
					item.checked = false;
				})
				if (e.checked) {
					e.checked = true;
				} else {
					e.checked = false;
				}
			},
			
			//确定
			submit(){
				let that = this;
				let obj=[];
				that.typeData.forEach(item => {
					if(item.checked){
						obj.push(item)
					}
				})
				if(obj.length==0){
					that.$u.toast("请选择反馈类型");
					return
				}
				that.$goback();
				that.$cache('typeName', obj[0].name);
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background-color: #EEEEEE;
		height: 100%;
		width: 100%;

		.content_box {
			width: 100%;
			
			.block_line{
				width: 100%;
				height: 90rpx;
				padding-left: 60rpx;
				padding-right: 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background: #FFFFFF;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
				
				.line_name{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				
			}

		}

	}
</style>
