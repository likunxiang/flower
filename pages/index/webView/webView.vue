<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				url: 'https://api.xrkmall.com'
			}
		},
		onLoad() {
			let url = decodeURIComponent(this.$Route.query.id);
			this.url = url;
		},
		methods: {

		}
	}
</script>

<style lang="scss">

</style>
