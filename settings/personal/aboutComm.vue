<template>
	<view class="content_main">

		<u-navbar :title="comTitle" :custom-back="$goback" :border-bottom="false"></u-navbar>

		<view class="content_box">
			<u-parse :html="content"></u-parse>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				comTitle: '', //标题名字
				typePage: '', //页面信息
				content: '', //协议数据
			}
		},
		onLoad(option) {
			this.typePage = option.typePage;
			switch (Number(this.typePage)) {
				case 1:
					this.comTitle = "向日葵介绍";
					break;
				case 2:
					this.comTitle = "隐私政策";
					break;
				case 3:
					this.comTitle = "会员服务协议";
					break;
				case 4:
					this.comTitle = "平台服务协议";
					break;
			};
			this.getAboutDetail();
		},
		methods: {

			//获取关于我们协议 数据
			getAboutDetail() {
				let that = this;
				that.$api.my.API_MYABOUT({
					type: that.typePage
				}).then(res => {
					let context = JSON.stringify(res.data.content);
					that.content=  context.replace(/\"/g, "");
				});
			},


		}
	}
</script>

<style lang="scss" scoped>
	.content_main {
		background-color: #FFFFFF;
		height: 100%;
		width: 100%;


		.content_box {
			padding: 24rpx;
			width: 750rpx;
		}

	}
</style>
