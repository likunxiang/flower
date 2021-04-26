<template>
	<view class="">
		<view :class="'slogan_box ' + (active?'active':'')" @click="change">{{notifys[navIns].name}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navIns: 0,
				active: false,
				timer: null
			}
		},
		props: {
			notifys: {
				type: Array,
				default: () => {
					return
				}
			}
		},
		methods: {
			change() {
				this.active = true;
				this.timer = setInterval(() => {

					if (this.navIns == this.notifys.length - 1) {
						this.navIns = 0;
					} else {
						this.navIns = this.navIns + 1;
					};
				}, 3000);

			},
			clearTimer() {
				clearInterval(this.timer);
				this.active = false;
			}
		}
	}
</script>

<style scoped lang="scss">
	@keyframes example {
		0% {
			opacity: 0;
		}

		// 25% {
		// 	opacity: 0.5;
		// }
		25% {
			opacity: 1;
		}

		75% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	.slogan_box {
		width: 100%;
		height: 56rpx;
		padding-top: 17rpx;
		padding-bottom: 9rpx;
		color: #333333;
		font-size: 22rpx;
		text-align: center;
		font-weight: 500;
		background: linear-gradient(180deg, #F8F8F8 0%, #EEEEEE 100%);

	}

	.active {
		animation-name: example;
		animation-duration: 3s;
		animation-iteration-count: infinite;
	}
</style>
