<template>
	<view class="main">
		<view class="text">
			购买数量
		</view>
		<view class="number_box">
			<view class="reduce_box" v-if="number > 1" @click="reduce">-</view>
			<view class="reduce_box reduce_box_disable" v-else>-</view>
			<input class="number_item number_item_text u-line-1" type="number" :value="number" @blur="editNumber" />
			<view class="add_box" @click="add" v-if="number < skuNum">+</view>
			<view class="add_box add_box_disable" v-else>+</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: {
			number: {
				type: Number,
				default: 1
			},
			// 当前规格的库存
			skuNum: {
				type: Number,
				default: 1
			}
		},
		methods: {
			reduce() {
				this.$emit('reduce');
			},
			add() {
				this.$emit('add');
			},
			editNumber(e) {
				this.$emit('editNumber',e.detail.value);
			}
				
		}
	}
</script>

<style scoped lang="scss">
	.main {
		display: flex;
		justify-content: space-between;
		.text {
			font-size: 24rpx;
			color: #212121;
			font-weight: bold;
		}
		.number_box {
			width: 140rpx;
			height: 36rpx;
			display: flex;
			line-height: 36rpx;
			.reduce_box {
				width: 36rpx;
				height: 36rpx;
				font-size: 36rpx;
				background: #212121;
				text-align: center;
			}
			.reduce_box_disable {
				background: #EEEEEE;
			}
			.add_box {
				width: 36rpx;
				height: 36rpx;
				font-size: 36rpx;
				background: #212121;
				text-align: center;
			}
			.add_box_disable {
				background: #EEEEEE;
			}
			.number_item {
				width: 68rpx;
				height: 36rpx;
				font-size: 36rpx;
				text-align: center;
			}
		}
	}
</style>
