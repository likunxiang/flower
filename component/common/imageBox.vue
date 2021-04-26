<template>
	<view @click="clickImage" :style="margin">
		<u-image :width="width" :height="height" :src="imageUrl" :mode="mode" :fade="false" :shape="shape">
			<view slot="loading">
				<u-image :width="width" :height="height" src="/static/images/image_loading.png" :mode="mode" :fade="false" :shape="shape"></u-image>
			</view>
			<view slot="error">
				<u-image :width="width" :height="height" src="/static/images/image_error.png" :mode="mode" :fade="false" :shape="shape"></u-image>
			</view>
		</u-image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			// 图片容器宽度
			width: {
				type: String,
				default: '200rpx'
			},
			// 图片容器高度
			height: {
				type: String,
				default: '0rpx'
			},
			// 展示的图片路径
			imageUrl: {
				type: String,
				default: ''
			},
			// 图片填充方式
			mode: {
				type: String,
				default: 'aspectFill'
			},
			margin: {
				type: String,
				default: 'margin: 0rpx'
			},
			//图片性质
			shape:{
				type: String,
				default: 'square'
			}
		},
		methods: {
			clickImage() {
				this.$emit('clickImage')
			}
		}
	}
</script>

<style scoped lang="scss">
	
</style>
