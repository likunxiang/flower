<script>
	export default {
		data() {
			return {};
		},
		onLaunch: function(e) {
			let that = this;
			// 获取手机状态栏高度
			that.menuButtonInfo = uni.getMenuButtonBoundingClientRect().top;
			uni.getSystemInfo({
				success: function(data) {
					that.globalData.heightInfo = that.menuButtonInfo + data.statusBarHeight;
				}
			})
			//设置设备信息
			let device_info = uni.getSystemInfoSync();
			that.globalData.deviceInfo = device_info;
			uni.setStorageSync('os', that.globalData.deviceInfo.system); //系统版本
			uni.setStorageSync('device', that.$md5.hex_md5_32(that.globalData.deviceInfo.deviceId)); //设备ID
			uni.setStorageSync('model', that.globalData.deviceInfo.model); //设备型号
			if (device_info.model) {
				if (device_info.model.indexOf('iPhone X') >= 0) {
					uni.setStorageSync('phoneModel', 'iPhone X')
				}
				if (device_info.model.indexOf('iPhone 11') >= 0) {
					uni.setStorageSync('phoneModel', 'iPhone 11')
				}
			}

			// 加载网络字体
			uni.loadFontFace({
				global: true,
				family: 'DINAlternate-Bold',
				source: 'url("https://api.xrkmall.com/static/font/DIN-Alternate-Bold.ttf")',
				success: (res) => {
				},
				fail: (res) => {
				}
			})
		},
		onShow: function() {

		},
		onHide: function() {

		},
		globalData: {
			heightInfo: "",
			deviceInfo: ''
		},
		methods: {

		},
	};
</script>

<style lang="scss">
	/**
     * 在引入uView的全局SCSS主题文件
     * 参考：https://www.uviewui.com/components/npmSetting.html
     */
	// uview自定金主题
	@import "uview-ui/index.scss";
	@import "./static/iconfont.css";

	@font-face {
		font-family: "Microsoft YaHei";
		font-weight: normal;
		font-style: normal;
	}

	page {
		height: 100%;
	}

	.font_family_din {
		font-family: DINAlternate-Bold;
	}
</style>
